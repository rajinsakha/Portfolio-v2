---
title: "Migrating a Production Dating App from MongoDB to PostgreSQL"
description: "How 1.8 million documents, a 40-minute maintenance window, and four surprises taught me more than the plan did."
date: "2026-07-31"
updated: "2026-07-31"
tags: ["PostgreSQL", "MongoDB", "Prisma", "Data Migration", "NestJS"]
featured: true
---

We were paying $60 a month for a MongoDB Atlas cluster holding 335 MB of data.

That sentence is the whole reason this project existed, and it also contains the first thing I got wrong.

## The setup

The app is a dating platform — around 18,000 users, chat, stories, a swipe feed, and a game mode with bots. It ran on MongoDB from day one, with Mongoose models across 22 collections. The Atlas bill was $60/month for a dedicated M10 instance.

The obvious read: MongoDB is expensive, move to PostgreSQL, save money.

The honest read, which took me longer to arrive at: **we were paying for a tier sized for roughly 30× the data we actually had.** A smaller Atlas tier would have captured most of that saving without touching a line of code.

I want to lead with that because it's the part most migration write-ups skip. The port was still worth doing — we wanted referential integrity, a schema we could reason about, and control over our own tier rather than climbing someone else's pricing ladder. But "we migrated and saved 70%" would be a misleading way to describe it. We *right-sized*, and the migration is what let us do that on our terms.

## Building the pipeline

The application port — Mongoose to Prisma across all 22 collections — is its own story. This one is about moving the data.

The core constraint was that **MongoDB ObjectIds had to survive**. JWTs referenced user ids. Socket rooms were keyed on chat ids. Mobile clients had ids cached locally. Regenerating them as UUIDs would have logged out every user and broken every cached reference.

So every primary key stayed a 24-character hex string:

```prisma
model User {
  id String @id @db.VarChar(24)
  // deliberately no @default — ids are app-generated to match Mongo's format
}
```

That single decision made the ETL idempotent for free. Every write became an upsert keyed on the original `_id`, so the pipeline could be run repeatedly without duplicating anything — which mattered more than I expected during rehearsals.

The pipeline itself: `mongoexport` each collection to JSONL, then load into PostgreSQL in dependency order, validating foreign keys against an in-memory registry built as each collection lands.

## Surprise 1: The verifier that lied

After every load I ran a parity check — row counts reconciled, sample rows deep-compared field by field, ids confirmed preserved.

Against the full production dataset, it reported `PASS`. And it was wrong.

Four collections — including `messages`, the largest — hadn't actually been checked. The verifier collected every accepted id and passed them into a single query:

```ts
await prisma.message.count({ where: { id: { in: parentIds } } })
```

With 345,962 ids, Prisma's query builder blew its call stack. The error was caught per-collection, the collection was marked unprobed, and the run still summarised as passing.

The fix was chunking:

```ts
async function countByIds(delegate, distinctIds) {
  let total = 0
  for (let i = 0; i < distinctIds.length; i += ID_CHUNK) {
    total += await delegate.count({
      where: { id: { in: distinctIds.slice(i, i + ID_CHUNK) } }
    })
  }
  return total
}
```

Note `distinctIds`. Summing per-chunk counts only equals the single-query count when no id repeats across chunks — SQL's `IN` deduplicates implicitly, chunked sums don't. Getting that wrong would have produced inflated counts that *looked* like a successful check.

The lesson isn't "chunk your queries." It's that **a verification tool that degrades silently is worse than no verification tool** — it converts uncertainty into false confidence. Dev-scale data never triggered it. Only production volume did.

## Surprise 2: 1.35 million orphaned rows

The load dropped 1,348,977 rows. The bulk of it: **1,164,377 messages — 77% of every message ever sent — referencing 119,242 chat ids that don't exist.**

The app deletes chats without deleting their messages. MongoDB doesn't enforce referential integrity, so this accumulated invisibly for years. PostgreSQL's foreign keys made it visible in a single run.

Those messages were already unreachable — no parent chat means no conversation to open them from. Users couldn't see them before the migration and won't miss them after. But it's worth sitting with what that number means: **three quarters of a core table was garbage nobody knew about.**

Keeping them would have meant dropping the `chatId` foreign key — discarding the integrity guarantee we were migrating *for* — or fabricating 119,242 placeholder chat rows. We took the loss, with explicit written sign-off rather than a quiet decision buried in a script.

## Surprise 3: The database wasn't the version I picked

I selected PostgreSQL 16.8 in the RDS console. Everything — local Docker, the dev box, every rehearsal — was on 16.

The instance came up on **18.3**.

I found out because a `psql` 16 client threw `column d.daticulocale does not exist` against it, which reads like database corruption and is actually a client/server version mismatch.

Rather than rebuild, I moved local and dev up to 18. That surfaced a second trap: PostgreSQL 18's official Docker image **relocated the data directory**. The mount has to be `/var/lib/postgresql`, not `/var/lib/postgresql/data`, and the container refuses to start on an existing PG16 volume.

Two habits came out of this:

- **Verify the version with `select version()`, not the form you filled in.**
- When bumping a database major version in Docker, use a **new volume name**. The old cluster stays intact as a rollback instead of being deleted to make room.

## Surprise 4: The failure that was silent at startup

Cutover night. App stopped, data exported, loaded, verified, restored into RDS — every row count matched. Published the release. Container came up. Logs read:

```
Nest application successfully started
```

Then the first real request returned a 500:

```
Invalid `prisma.pickupLine.findMany()` invocation:
Error opening a TLS connection: self-signed certificate in certificate chain
```

RDS requires TLS. I'd set `sslmode=require` accordingly. But `sslmode=require` makes node-postgres **verify the certificate chain** against Node's built-in CA store — which doesn't include the Amazon RDS regional root CA. Every query failed. `sslmode=no-verify` keeps the connection encrypted without chain verification, and that fixed it.

The part worth internalising: **the container started cleanly and reported healthy.** Nothing connects to the database until the first query, so every startup signal was green while the app was completely broken. A boot log is not proof that your database works. Only a query is.

## The cutover

Because the FK registry is built from the export being processed, an incremental catch-up pass wasn't possible — a partial export would reject new rows whose parents were absent and silently drop them. So the export and load both had to sit inside the freeze window.

Measured, not estimated:

| step | time |
|---|---|
| Stop app, record baseline counts | 2 min |
| Export 1.86M documents from Atlas | 2 min |
| Load into local PostgreSQL | **16 min** |
| Automated verification | 1 min |
| `pg_dump` → 42 MB | <1 min |
| Transfer + restore into RDS | 3 min |
| Deploy + smoke tests | 15 min |

One deliberate choice: **the ETL never ran against RDS.** It wraps every row in its own transaction — good for idempotency, terrible over a network. Loading locally and shipping a 42 MB compressed dump turned what would have been millions of round trips into a **28-second restore**.

## A red herring worth including

The day after cutover: *bot profile pictures aren't loading in chat.*

Exactly the shape of a migration bug. It wasn't one.

The data was intact — every affected bot had a valid media row with all URLs populated. But `media.url` pointed at an S3 key containing a **Google Drive link**. Someone had passed a Drive URL where a filename was expected. The upload succeeded; the URL was built by raw string concatenation:

```ts
const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
```

No percent-encoding. So `?usp=drive_link` in the key gets parsed as a **query string**, and S3 looks up a key that ends early. Percent-encode it and the object returns 200 with 487 KB — the image was never lost, just unreachable.

Why only chat screens? Chat resolves avatars through `getMediaUrl()`, which reads `media.url`. Every other screen uses a different helper that reads the compressed variant — and compressed uploads are keyed `compressed-${uuid}`, ignoring the original filename entirely. That one difference is the whole bug surface.

Byte-identical in the MongoDB export, and the resolver was unchanged from the pre-migration build. It had been broken for months. **The migration didn't cause it; it just made us look.**

## Results

- 18,665 users, 64,197 media records, 348,320 messages migrated with counts reconciled against a frozen source baseline
- Original MongoDB ObjectIds preserved throughout — no forced logouts, no broken client caches
- ~40 minutes of planned downtime
- Right-sized from $60/month to **$17.95/month** — most of which a correctly sized Atlas tier would also have delivered, without the migration
- Referential integrity now enforced, and 1.35M rows of hidden data rot surfaced and accounted for

## What I'd tell myself before starting

**Rehearse against production-scale data, not production-shaped data.** Every bug that mattered — the verifier, the orphan volume, the query-builder stack overflow — only appeared at real volume. Dev-scale rehearsals were green throughout and taught me nothing.

**Distrust green.** The verifier passed while skipping four collections. The container logged "successfully started" while every query failed. Both were technically accurate and completely misleading. Ask what a passing signal actually proves.

**Separate the data migration from the code deploy.** Atlas was only ever *read* during this — never written to, never modified. That meant rollback at any point before the final deploy was "restart the old container," which made every irreversible-feeling step reversible.

**Write down the pre-existing bugs you find, and don't fix them mid-migration.** We found several — an increment that never persisted due to an invalid Mongo operator, a filter on a field that didn't exist. They got inline comments and left alone. Mixing bug fixes into a data migration means that when something breaks afterward, you can't tell which change caused it.
