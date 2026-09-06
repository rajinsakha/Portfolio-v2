---
title: "Migrating a Production Dating App from MongoDB to PostgreSQL"
description: "How we moved 1.8 million documents across a 40-minute maintenance window, right-sized our database spend, and what the verification process caught before it reached users."
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

The more accurate read: **we were paying for a tier sized for roughly 30× the data we actually had.** A smaller Atlas tier would have captured most of that saving without touching a line of code.

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

That single decision made the ETL idempotent for free. Every write became an upsert keyed on the original `_id`, so the pipeline could be run repeatedly without duplicating anything — which mattered during rehearsals.

The pipeline itself: `mongoexport` each collection to JSONL, then load into PostgreSQL in dependency order, validating foreign keys against an in-memory registry built as each collection lands.

## What the verification process caught before cutover

Rehearsing against production-scale data — not just production-shaped sample data — surfaced four issues that dev-scale testing never would have.

**A verifier that reported green while skipping work.** The parity check compared every migrated row against the source. At production scale, four collections — including `messages`, the largest — silently failed to be checked at all: the count query exceeded a query-builder limit at 345,962 ids, the error was caught per-collection, and the run still summarized as `PASS`. Fixed by chunking the count query, with care taken that summed per-chunk counts still matched the true distinct count. The broader fix was procedural: treat a verification tool that can degrade silently as worse than no tool, and design it to fail loud instead.

**1.35 million orphaned rows.** The app deleted chats without deleting their messages, and MongoDB never enforced the relationship, so it accumulated invisibly for years — 1,164,377 messages (77% of every message ever sent) referencing chat ids that no longer existed. PostgreSQL's foreign keys made this visible on the first load attempt. Those rows were already unreachable in the product, so we took the loss with explicit written sign-off rather than fabricating placeholder parents or dropping the integrity constraint we were migrating to get.

**A database version that didn't match the console selection.** RDS provisioned PostgreSQL 18 despite 16 being selected, which surfaced as a client/server mismatch that initially looked like corruption. Moving local and dev environments up to match uncovered a second wrinkle — Postgres 18's official Docker image relocated its data directory, so an existing PG16 volume needs a new volume name rather than reuse. Two habits came out of it: verify the running version with `select version()`, not the form you filled in, and always give a database major-version bump a new volume so the old cluster survives as a rollback path.

**A startup log that proved nothing.** Every row count matched, the release deployed, and the container logged "Nest application successfully started." The first real request then failed — RDS requires TLS, and the driver's default certificate verification didn't trust Amazon's regional root CA, so every query failed against a server that reported itself healthy. A boot log confirms the process started, not that the database connection works; only a real query does. Fixed the trust configuration and added a live query to the deploy's health check rather than relying on startup logs alone.

## The cutover

Because the foreign-key registry is built from the export being processed, an incremental catch-up pass wasn't possible — a partial export would reject and silently drop new rows whose parents were absent. So export and load both had to sit inside the freeze window.

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

The day after cutover: *bot profile pictures aren't loading in chat.* Exactly the shape of a migration bug. It wasn't one.

The data was intact — every affected bot had a valid media row with all URLs populated. The URL was assembled by raw string concatenation of bucket, region, and key, with no percent-encoding. One key happened to contain characters that get parsed as a query string once unescaped, so the object lookup ended early and 404'd. Percent-encoding the key fixed it — the image had never been lost, just unreachable through one code path. It only affected chat because chat resolved avatars through a helper that read the original key, while every other screen read a differently-keyed compressed variant. Byte-identical before and after the migration: it had been broken for months, and the migration just made someone look at that screen.

## Results

- 18,665 users, 64,197 media records, 348,320 messages migrated with counts reconciled against a frozen source baseline
- Original MongoDB ObjectIds preserved throughout — no forced logouts, no broken client caches
- ~40 minutes of planned downtime
- Right-sized from $60/month to **$17.95/month** — most of which a correctly sized Atlas tier would also have delivered, without the migration
- Referential integrity now enforced, and 1.35M rows of hidden data rot surfaced and accounted for

## What I'd tell myself before starting

**Rehearse against production-scale data, not production-shaped data.** Every issue that mattered — the verifier, the orphan volume, the query-builder limit — only appeared at real volume. Dev-scale rehearsals were green throughout and taught me nothing.

**Distrust green.** The verifier passed while skipping four collections. The container logged "successfully started" while every query failed. Both were technically accurate and completely misleading. Ask what a passing signal actually proves.

**Separate the data migration from the code deploy.** Atlas was only ever *read* during this — never written to, never modified. That meant rollback at any point before the final deploy was "restart the old container," which made every irreversible-feeling step reversible.

**Write down the pre-existing bugs you find, and don't fix them mid-migration.** We found several — an increment that never persisted due to an invalid Mongo operator, a filter on a field that didn't exist. They got inline comments and left alone. Mixing bug fixes into a data migration means that when something breaks afterward, you can't tell which change caused it.
