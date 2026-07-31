# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a statically prerendered blog to the portfolio at `/blog` and `/blog/[slug]`, with the MongoDB → PostgreSQL migration case study as the first post.

**Architecture:** Posts are markdown files in `content/blog/`. A server-only module (`lib/blog.ts`) reads and validates them at build time. A separate server-only module (`lib/markdown.ts`) runs a unified remark/rehype pipeline that produces an HTML string with syntax highlighting, heading anchors, and accessibility attributes. Pages, the homepage section, the sitemap, and the OG image routes all consume typed objects — only `lib/blog.ts` touches the filesystem.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, unified/remark/rehype, shiki, gray-matter.

## Deviation from the spec

The spec named `react-markdown` as the renderer. `react-markdown` runs unified **synchronously**, and `rehype-pretty-code` is **asynchronous** (shiki loads grammars and themes at runtime). They cannot be combined. This plan uses the unified pipeline directly inside an async Server Component and renders the resulting HTML string. The content is authored in this repository and processed at build time — there is no untrusted input, so `dangerouslySetInnerHTML` is safe here. Everything else in the spec is unchanged.

## Global Constraints

- Node modules must be added with exact-ish semver ranges matching the versions listed in Task 1. Do not upgrade Next.js, React, or Tailwind.
- Every blog route must be statically prerendered. No `dynamic = "force-dynamic"`, no runtime data fetching.
- Only `lib/blog.ts` and `lib/markdown.ts` may import `node:fs` or `node:path`. Neither may be imported from a `"use client"` file.
- Accessibility follows the project's A11Y.md Standard AA rule: one `<h1>` per page, no skipped heading levels, scrollable regions keyboard-focusable with accessible names, visible focus rings, interactive elements never nested.
- Dates in frontmatter are `YYYY-MM-DD` and must be treated as UTC. Never construct a date with `new Date("2026-07-31")` and read local getters off it.
- File paths and component naming follow the existing codebase: kebab-case filenames, default exports for page/section components, named exports for `ui/` primitives.
- Commit messages use the existing convention (`feat:`, `fix:`, `docs:`, `chore:`) and must not contain a `Co-Authored-By` trailer or any AI attribution.
- Verification in this repo is `npx tsc --noEmit` and `npm run build`. There is no test runner installed; do not add one.

---

## File Structure

**Create:**

| path | responsibility |
|---|---|
| `content/blog/migrating-mongodb-to-postgresql.md` | the first post: frontmatter + body |
| `lib/blog.ts` | read, validate, sort posts from disk; reading time |
| `lib/markdown.ts` | unified pipeline: markdown string → HTML string |
| `lib/rehype-a11y.ts` | local rehype plugin: focusable code blocks, wrapped tables, external link rel |
| `lib/format-date.ts` | UTC-safe date formatting, shared by server and client |
| `components/blog/markdown-content.tsx` | async Server Component wrapping rendered HTML in prose styles |
| `components/ui/blog-post-card.tsx` | presentational card for one post, used by index and homepage |
| `components/sections/writing.tsx` | homepage "Writing" section, latest 3 posts |
| `app/blog/page.tsx` | blog index |
| `app/blog/not-found.tsx` | 404 for unknown post slugs |
| `app/blog/[slug]/page.tsx` | post page + `BlogPosting` JSON-LD |
| `app/blog/[slug]/opengraph-image.tsx` | per-post OG image |

**Modify:**

| path | change |
|---|---|
| `package.json` | add markdown dependencies |
| `app/globals.css` | register typography plugin; prose, shiki, and heading-anchor styles |
| `types/index.ts` | add `BlogPostMeta` and `BlogPost` |
| `app/page.tsx` | mount `<Writing />` between `<Projects />` and `<Experience />` |
| `app/sitemap.ts` | add `/blog` and per-post entries |
| `components/sections/navbar.tsx` | add Blog nav item and route-aware active state |

---

## Task 1: Dependencies and prose styling

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing
- Produces: the `prose-post` CSS class and `.heading-anchor` styling used by Task 4; the `@tailwindcss/typography` plugin registration all later prose markup depends on.

- [ ] **Step 1: Install the runtime dependencies**

```bash
npm install gray-matter@4.0.3 unified@11.0.5 remark-parse@11.0.0 remark-gfm@4.0.1 remark-rehype@11.1.2 rehype-slug@6.0.0 rehype-autolink-headings@7.1.0 rehype-pretty-code@0.14.5 rehype-stringify@10.0.1 shiki@4.4.1 unist-util-visit@5.1.0
```

- [ ] **Step 2: Install the dev dependencies**

```bash
npm install -D @tailwindcss/typography@0.5.20 @types/hast@3.0.5
```

- [ ] **Step 3: Register the typography plugin**

In `app/globals.css`, the file currently begins:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

Change it to:

```css
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));
```

- [ ] **Step 4: Add blog prose, shiki, and heading-anchor styles**

Append to the very end of `app/globals.css`:

```css
/* ---------- Blog post typography ---------- */

.prose-post :is(h2, h3, h4) {
  scroll-margin-top: 6rem;
}

.prose-post :is(h2, h3, h4) .heading-anchor {
  margin-left: 0.35rem;
  color: var(--primary);
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.prose-post :is(h2, h3, h4):hover .heading-anchor,
.prose-post .heading-anchor:focus-visible {
  opacity: 1;
}

.prose-post .heading-anchor:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Scrollable code blocks and tables are focusable regions; make that visible. */
.prose-post [tabindex="0"]:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* ---------- Shiki dual theme ---------- */

[data-rehype-pretty-code-figure] pre {
  overflow-x: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background-color: var(--shiki-light-bg);
  color: var(--shiki-light);
}

[data-rehype-pretty-code-figure] pre span {
  color: var(--shiki-light);
}

.dark [data-rehype-pretty-code-figure] pre {
  background-color: var(--shiki-dark-bg);
  color: var(--shiki-dark);
}

.dark [data-rehype-pretty-code-figure] pre span {
  color: var(--shiki-dark);
}

[data-rehype-pretty-code-figure] code {
  display: grid;
  font-size: 0.875rem;
  line-height: 1.6;
  background-color: transparent;
  padding: 0;
}

[data-rehype-pretty-code-figure] code::before,
[data-rehype-pretty-code-figure] code::after {
  content: none;
}
```

- [ ] **Step 5: Verify the build still passes**

Run: `npm run build`
Expected: build completes with no errors and the existing routes (`/`, `/projects`, `/projects/[slug]`) still listed in the output.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json app/globals.css
git commit -m "chore: add markdown pipeline dependencies and blog prose styles"
```

---

## Task 2: Content file and the post reader

**Files:**
- Create: `content/blog/migrating-mongodb-to-postgresql.md`
- Create: `lib/blog.ts`
- Create: `lib/format-date.ts`
- Modify: `types/index.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `types/index.ts`: `BlogPostMeta`, `BlogPost`
  - `lib/blog.ts`: `getAllPosts(): BlogPostMeta[]`, `getPostBySlug(slug: string): BlogPost | null`, `getReadingTime(markdown: string): number`
  - `lib/format-date.ts`: `formatPostDate(isoDate: string): string`

- [ ] **Step 1: Add the types**

Append to `types/index.ts`:

```ts
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
```

- [ ] **Step 2: Create the date formatter**

Create `lib/format-date.ts`:

```ts
/**
 * Formats a `YYYY-MM-DD` frontmatter date for display.
 *
 * The date is forced to UTC so a reader east or west of the author never sees
 * the published date shift by a day.
 */
export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
```

- [ ] **Step 3: Create the post reader**

Create `lib/blog.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(file: string, message: string): never {
  throw new Error(`Invalid blog post "${file}": ${message}`);
}

function readString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter field "${field}" must be a non-empty string`);
  }
  return value.trim();
}

function readTags(value: unknown, file: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(file, `frontmatter field "tags" must be a non-empty array`);
  }
  return value.map((tag, index) => {
    if (typeof tag !== "string" || tag.trim() === "") {
      fail(file, `tag at index ${index} must be a non-empty string`);
    }
    return tag.trim();
  });
}

/**
 * Accepts either a quoted `YYYY-MM-DD` string or the Date that js-yaml produces
 * from an unquoted one, and normalises both to a `YYYY-MM-DD` string.
 */
function readDate(value: unknown, field: string, file: string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  const raw = readString(value, field, file);
  if (!DATE_PATTERN.test(raw)) {
    fail(file, `frontmatter field "${field}" must be formatted YYYY-MM-DD`);
  }
  if (Number.isNaN(new Date(`${raw}T00:00:00Z`).getTime())) {
    fail(file, `frontmatter field "${field}" is not a real date`);
  }
  return raw;
}

/**
 * Whole minutes at 200 words per minute. Fenced code blocks are removed first —
 * a long code sample is scanned, not read, and would otherwise inflate the
 * estimate well past what the prose actually takes.
 */
export function getReadingTime(markdown: string): number {
  const prose = markdown.replace(/```[\s\S]*?```/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parsePost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const date = readDate(data.date, "date", fileName);

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: readString(data.title, "title", fileName),
    description: readString(data.description, "description", fileName),
    date,
    updated: data.updated === undefined ? date : readDate(data.updated, "updated", fileName),
    tags: readTags(data.tags, fileName),
    featured: data.featured === true,
    readingTime: getReadingTime(content),
    content,
  };
}

function readAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Metadata for every post, newest first. Bodies are omitted. */
export function getAllPosts(): BlogPostMeta[] {
  return readAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    tags: post.tags,
    featured: post.featured,
    readingTime: post.readingTime,
  }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, fileName))) return null;
  return parsePost(fileName);
}
```

- [ ] **Step 4: Create the first post**

Create `content/blog/migrating-mongodb-to-postgresql.md`. The `#` title and the italic subtitle from the original draft are **not** in the body — the page renders those from `title` and `description` so each page has exactly one `<h1>`.

````markdown
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

The load dropped 1,348,977 rows. The bulk of it: **1,164,377 messages — 74% of every message ever sent — referencing 119,242 chat ids that don't exist.**

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
- $60/month → **$17.95/month**
- Referential integrity now enforced, and 1.35M rows of hidden data rot surfaced and accounted for

## What I'd tell myself before starting

**Rehearse against production-scale data, not production-shaped data.** Every bug that mattered — the verifier, the orphan volume, the query-builder stack overflow — only appeared at real volume. Dev-scale rehearsals were green throughout and taught me nothing.

**Distrust green.** The verifier passed while skipping four collections. The container logged "successfully started" while every query failed. Both were technically accurate and completely misleading. Ask what a passing signal actually proves.

**Separate the data migration from the code deploy.** Atlas was only ever *read* during this — never written to, never modified. That meant rollback at any point before the final deploy was "restart the old container," which made every irreversible-feeling step reversible.

**Write down the pre-existing bugs you find, and don't fix them mid-migration.** We found several — an increment that never persisted due to an invalid Mongo operator, a filter on a field that didn't exist. They got inline comments and left alone. Mixing bug fixes into a data migration means that when something breaks afterward, you can't tell which change caused it.
````

- [ ] **Step 5: Verify the reader parses the post**

Run:

```bash
npx tsx --version 2>/dev/null || npx --yes tsx@4 -e "1" >/dev/null 2>&1
npx --yes tsx@4 -e "import {getAllPosts,getPostBySlug} from './lib/blog.ts'; const posts=getAllPosts(); console.log(JSON.stringify(posts,null,2)); const post=getPostBySlug('migrating-mongodb-to-postgresql'); console.log('bodyChars', post?.content.length); console.log('missing', getPostBySlug('nope'));"
```

Expected output: one post object with `slug: "migrating-mongodb-to-postgresql"`, `featured: true`, five tags, `readingTime` between 8 and 14, a `bodyChars` value over 8000, and `missing null`.

If `@/types` fails to resolve under tsx, run the same check with a relative import (`./types`) — the check is about the parsing logic, not the alias.

- [ ] **Step 6: Verify validation actually fails the build**

Run:

```bash
cp content/blog/migrating-mongodb-to-postgresql.md /tmp/post-backup.md
sed -i '' 's/^title: .*/title: ""/' content/blog/migrating-mongodb-to-postgresql.md
npx --yes tsx@4 -e "import {getAllPosts} from './lib/blog.ts'; getAllPosts();"
```

Expected: throws `Invalid blog post "migrating-mongodb-to-postgresql.md": frontmatter field "title" must be a non-empty string`.

Then restore:

```bash
cp /tmp/post-backup.md content/blog/migrating-mongodb-to-postgresql.md
rm /tmp/post-backup.md
```

- [ ] **Step 7: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add types/index.ts lib/blog.ts lib/format-date.ts content/blog/migrating-mongodb-to-postgresql.md
git commit -m "feat: add blog content layer and first post"
```

---

## Task 3: Markdown rendering pipeline

**Files:**
- Create: `lib/rehype-a11y.ts`
- Create: `lib/markdown.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks
- Produces:
  - `lib/rehype-a11y.ts`: `rehypeA11y(): (tree: Root) => void`
  - `lib/markdown.ts`: `renderMarkdown(markdown: string): Promise<string>`

- [ ] **Step 1: Write the accessibility rehype plugin**

Create `lib/rehype-a11y.ts`:

```ts
import type { Element, Root } from "hast";
import { SKIP, visit } from "unist-util-visit";

const EXTERNAL_HREF = /^https?:\/\//i;
const OWN_DOMAIN = "rajinsakha.com.np";

function readLanguage(properties: Element["properties"]): string | null {
  const value = properties?.dataLanguage ?? properties?.["data-language"];
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/**
 * Post-processing that keeps generated markup keyboard-accessible:
 *
 * - `pre` scrolls horizontally, so it becomes a focusable, named region.
 * - `table` is wrapped in its own focusable scroll container so a wide table
 *   never forces the page body to scroll sideways.
 * - External links get `rel="noopener noreferrer"`.
 */
export function rehypeA11y() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "pre") {
        const language = readLanguage(node.properties);
        node.properties = {
          ...node.properties,
          tabIndex: 0,
          role: "region",
          "aria-label": language ? `${language} code block` : "Code block",
        };
        return;
      }

      if (node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && EXTERNAL_HREF.test(href) && !href.includes(OWN_DOMAIN)) {
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: "noopener noreferrer",
          };
        }
        return;
      }

      if (node.tagName === "table" && parent && typeof index === "number") {
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["not-prose", "my-6", "overflow-x-auto", "rounded-lg", "border", "border-border"],
            tabIndex: 0,
            role: "region",
            "aria-label": "Table, scrollable horizontally",
          },
          children: [node],
        };
        parent.children[index] = wrapper;
        // Skip the subtree so the table we just wrapped is not wrapped again.
        return SKIP;
      }
    });
  };
}
```

- [ ] **Step 2: Write the pipeline**

Create `lib/markdown.ts`:

```ts
import type { Element, ElementContent } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeA11y } from "@/lib/rehype-a11y";

/** Flattens a heading's children to plain text for the anchor's accessible name. */
function headingText(node: Element): string {
  return node.children
    .map((child: ElementContent) => {
      if (child.type === "text") return child.value;
      if (child.type === "element") return headingText(child);
      return "";
    })
    .join("")
    .trim();
}

/**
 * Renders post markdown to an HTML string at build time.
 *
 * `rehype-pretty-code` is asynchronous — shiki loads grammars and themes on
 * demand — which is why the pipeline is awaited here rather than run through a
 * synchronous renderer.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties(node: Element) {
        return {
          className: ["heading-anchor"],
          "aria-label": `Link to section: ${headingText(node)}`,
        };
      },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeA11y)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
```

- [ ] **Step 3: Verify the pipeline output**

Run:

```bash
npx --yes tsx@4 -e "import {renderMarkdown} from './lib/markdown.ts'; const html = await renderMarkdown('## Hi there\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n\`\`\`ts\nconst x: number = 1\n\`\`\`\n\n[ext](https://example.com)\n'); console.log(html);"
```

Expected in the output:
- `<h2 id="hi-there">` with an appended `<a class="heading-anchor" aria-label="Link to section: Hi there" href="#hi-there">#</a>`
- a `<div class="not-prose my-6 overflow-x-auto rounded-lg border border-border" tabindex="0" role="region" aria-label="Table, scrollable horizontally">` wrapping exactly one `<table>`
- `<pre ... tabindex="0" role="region" aria-label="ts code block">` containing `style="color:var(--shiki-light)"`-style spans
- `<a href="https://example.com" target="_blank" rel="noopener noreferrer">`

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/markdown.ts lib/rehype-a11y.ts
git commit -m "feat: add markdown rendering pipeline for blog posts"
```

---

## Task 4: Markdown content component and post card

**Files:**
- Create: `components/blog/markdown-content.tsx`
- Create: `components/ui/blog-post-card.tsx`

**Interfaces:**
- Consumes: `renderMarkdown` (Task 3), `BlogPostMeta` (Task 2), `formatPostDate` (Task 2), the `.prose-post` styles (Task 1)
- Produces:
  - `components/blog/markdown-content.tsx`: default export `MarkdownContent`, props `{ content: string }`, async Server Component
  - `components/ui/blog-post-card.tsx`: default export `BlogPostCard`, props `{ post: BlogPostMeta }`

- [ ] **Step 1: Create the markdown content component**

Create `components/blog/markdown-content.tsx`:

```tsx
import { renderMarkdown } from "@/lib/markdown";

/**
 * Renders post markdown. The HTML is produced at build time from content
 * authored in this repository, so there is no untrusted input here.
 */
export default async function MarkdownContent({ content }: { content: string }) {
  const html = await renderMarkdown(content);

  return (
    <div
      className="prose-post prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-2xl
        prose-a:text-primary prose-a:underline-offset-4
        prose-strong:text-foreground
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
        prose-code:before:content-none prose-code:after:content-none
        prose-blockquote:border-l-primary
        prose-th:text-left prose-td:align-top"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

- [ ] **Step 2: Create the post card**

Create `components/ui/blog-post-card.tsx`. The whole card is one link — no nested interactive elements — matching the card pattern already used on `app/projects/page.tsx`:

```tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPostDate } from "@/lib/format-date";
import type { BlogPostMeta } from "@/types";

export default function BlogPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full flex flex-col transition-[box-shadow,transform] duration-300 group-hover:shadow-md group-hover:-translate-y-1">
        <CardContent className="flex flex-col flex-grow px-5 py-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-balance group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="mt-2 mb-4 text-sm text-muted-foreground line-clamp-3 flex-grow">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/blog/markdown-content.tsx components/ui/blog-post-card.tsx
git commit -m "feat: add blog markdown content and post card components"
```

---

## Task 5: Blog index page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/not-found.tsx`

**Interfaces:**
- Consumes: `getAllPosts` (Task 2), `BlogPostCard` (Task 4), `SITE_URL` from `app/sitemap.ts`
- Produces: the `/blog` route

- [ ] **Step 1: Create the index page**

Create `app/blog/page.tsx`:

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/ui/blog-post-card";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/app/sitemap";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering write-ups by Rajin Sakha on production migrations, web performance, and building React and Next.js applications.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Rajin Sakha",
    description:
      "Engineering write-ups on production migrations, web performance, and building React and Next.js applications.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Rajin Sakha's Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Engineering write-ups on production migrations, web performance, and building React and Next.js applications.",
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="container">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-12 max-w-3xl">
          <h1 className="font-display text-5xl md:text-6xl font-normal mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Write-ups from real production work — what broke, what the numbers
            actually were, and what I would tell myself before starting.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the not-found page**

Create `app/blog/not-found.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="font-display text-7xl font-normal mb-4">404</h1>
      <h2 className="font-display text-3xl font-normal mb-6">Post Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the post you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/blog">View All Posts</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: Verify the route builds and prerenders**

Run: `npm run build`
Expected: the route table includes `/blog` marked as static (`○`).

- [ ] **Step 4: Commit**

```bash
git add app/blog/page.tsx app/blog/not-found.tsx
git commit -m "feat: add blog index page"
```

---

## Task 6: Post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts`, `getPostBySlug` (Task 2), `MarkdownContent` (Task 4), `formatPostDate` (Task 2), `SITE_URL`
- Produces: the `/blog/[slug]` route, statically prerendered per post

- [ ] **Step 1: Create the post page**

Create `app/blog/[slug]/page.tsx`. The `params` type is a Promise, matching `app/projects/[slug]/page.tsx` on Next 15:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MarkdownContent from "@/components/blog/markdown-content";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { SITE_URL } from "@/app/sitemap";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every post at build time for faster crawling and indexing.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, "Rajin Sakha"],
    authors: [{ name: "Rajin Sakha", url: SITE_URL }],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Rajin Sakha"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    keywords: post.tags,
    inLanguage: "en",
    url: postUrl,
    image: `${postUrl}/opengraph-image`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <div className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />

      <div className="container">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" /> Back to Blog
            </Link>
          </Button>
        </div>

        <article className="max-w-3xl">
          <header className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>

            <h1 className="mt-4 font-display text-4xl md:text-5xl font-normal tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="mt-4 text-xl text-muted-foreground text-pretty">
              {post.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Post topics">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </header>

          <MarkdownContent content={post.content} />
        </article>

        <div className="mt-16">
          <Button asChild>
            <Link href="/blog">Read more posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the route prerenders**

Run: `npm run build`
Expected: the route table shows `/blog/[slug]` as SSG with 1 generated path.

- [ ] **Step 3: Verify the rendered HTML**

Run:

```bash
npm start &
sleep 4
curl -s http://localhost:3000/blog/migrating-mongodb-to-postgresql > /tmp/post.html
kill %1
grep -c 'BlogPosting' /tmp/post.html
grep -o '<h1' /tmp/post.html | wc -l
grep -c 'aria-label="Table, scrollable horizontally"' /tmp/post.html
grep -o 'role="region"' /tmp/post.html | wc -l
```

Expected: `BlogPosting` at least 1, exactly one `<h1`, the table wrapper at least 1, and `role="region"` at 7 or more — the post has six fenced code blocks plus one table.

- [ ] **Step 4: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "feat: add blog post page with BlogPosting structured data"
```

---

## Task 7: Per-post Open Graph image

**Files:**
- Create: `app/blog/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `getAllPosts`, `getPostBySlug` (Task 2)
- Produces: the `/blog/[slug]/opengraph-image` route. `generateMetadata` in Task 6 deliberately omits `openGraph.images` so this file convention supplies them.

- [ ] **Step 1: Create the image route**

Create `app/blog/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";

export const alt = "Blog post by Rajin Sakha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Rajin Sakha";
  const date = post ? formatPostDate(post.date) : "";
  const readingTime = post ? `${post.readingTime} min read` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          rajinsakha.com.np / blog
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <span style={{ color: "#e2503f" }}>Rajin Sakha</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span style={{ color: "#a1a1aa" }}>{date}</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span style={{ color: "#a1a1aa" }}>{readingTime}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Verify the image generates**

Run:

```bash
npm run build
npm start &
sleep 4
curl -s -o /tmp/og.png -w "%{http_code} %{content_type} %{size_download}\n" \
  http://localhost:3000/blog/migrating-mongodb-to-postgresql/opengraph-image
kill %1
```

Expected: `200 image/png` and a size well above 10000 bytes.

Also confirm the tag is wired into the page:

```bash
npm start &
sleep 4
curl -s http://localhost:3000/blog/migrating-mongodb-to-postgresql | grep -o 'og:image[^>]*'
kill %1
```

Expected: an `og:image` meta tag whose content ends in `/blog/migrating-mongodb-to-postgresql/opengraph-image`.

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/opengraph-image.tsx"
git commit -m "feat: add per-post open graph images"
```

---

## Task 8: Homepage Writing section

**Files:**
- Create: `components/sections/writing.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts` (Task 2), `BlogPostCard` (Task 4), existing `SectionHeading` from `components/ui/section-heading.tsx`
- Produces: default export `Writing`, no props

- [ ] **Step 1: Create the section**

Create `components/sections/writing.tsx`. It is a Server Component — it reads from the filesystem and renders the client `SectionHeading` as a child, which is allowed:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import BlogPostCard from "@/components/ui/blog-post-card";
import { getAllPosts } from "@/lib/blog";

const HOMEPAGE_POST_COUNT = 3;

export default function Writing() {
  // Newest three, with featured posts leading within that selection.
  const posts = getAllPosts()
    .slice(0, HOMEPAGE_POST_COUNT)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-16 md:py-24" aria-labelledby="writing-heading">
      <div className="container">
        <SectionHeading
          id="writing-heading"
          title="Writing"
          subtitle="Notes from production work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/blog">
              Read All Posts <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount it on the homepage**

In `app/page.tsx`, add the import alongside the others:

```tsx
import Writing from "@/components/sections/writing";
```

and place the component between `<Projects />` and `<Experience />`:

```tsx
      <Projects />
      <Writing />
      <Experience />
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run build
npm start &
sleep 4
curl -s http://localhost:3000 | grep -c 'id="writing"'
curl -s http://localhost:3000 | grep -c 'Migrating a Production Dating App'
kill %1
```

Expected: both counts at least 1.

- [ ] **Step 4: Commit**

```bash
git add components/sections/writing.tsx app/page.tsx
git commit -m "feat: add writing section to homepage"
```

---

## Task 9: Navigation and sitemap

**Files:**
- Modify: `components/sections/navbar.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `getAllPosts` (Task 2)
- Produces: no new exports

- [ ] **Step 1: Add the nav item**

In `components/sections/navbar.tsx`, add `Blog` between `Experience` and `Contact`:

```ts
const navItems = [
  { name: "Home", href: "/", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Blog", href: "/blog", id: "blog" },
  { name: "Contact", href: "/#contact", id: "contact" },
];
```

No change is needed to the `IntersectionObserver` effect: it maps nav ids to homepage elements and filters out anything missing, and there is no `#blog` element on the homepage.

- [ ] **Step 2: Make the active state route-aware**

Add the import:

```ts
import { usePathname } from "next/navigation";
```

Inside the component, after the existing `useState` declarations:

```ts
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blog");

  // Section highlighting is only meaningful on the homepage; on a route like
  // /blog the nav highlights the route itself instead.
  const isActiveItem = (id: string) =>
    isBlogRoute ? id === "blog" : pathname === "/" && activeSection === id;
```

Then replace both active checks. In the desktop nav, `aria-current={activeSection === item.id ? "page" : undefined}` becomes:

```tsx
                  aria-current={isActiveItem(item.id) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActiveItem(item.id) ? "text-primary" : "text-muted-foreground"
                  )}
```

And in the mobile nav:

```tsx
                          aria-current={isActiveItem(item.id) ? "page" : undefined}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            isActiveItem(item.id) ? "text-primary" : "text-muted-foreground"
                          )}
```

- [ ] **Step 3: Add sitemap entries**

In `app/sitemap.ts`, add the import:

```ts
import { getAllPosts } from "@/lib/blog";
```

Add `/blog` to `staticRoutes`, after the `/projects` entry:

```ts
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
```

Add post routes before the return:

```ts
  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run build
npm start &
sleep 4
curl -s http://localhost:3000/sitemap.xml | grep -o '<loc>[^<]*blog[^<]*</loc>'
kill %1
```

Expected: two lines — `.../blog` and `.../blog/migrating-mongodb-to-postgresql`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/navbar.tsx app/sitemap.ts
git commit -m "feat: add blog to navigation and sitemap"
```

---

## Task 10: Final verification pass

**Files:**
- Modify: none expected. Fix whatever this task surfaces.

**Interfaces:**
- Consumes: everything
- Produces: nothing

- [ ] **Step 1: Lint and typecheck**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: no errors. Fix any that appear before continuing.

- [ ] **Step 2: Full build with route inspection**

Run: `npm run build`

Expected in the route table: `/blog` static, `/blog/[slug]` SSG with 1 path, `/blog/[slug]/opengraph-image` present. No route marked dynamic (`ƒ`) that was static before.

- [ ] **Step 3: Keyboard pass**

Run `npm run dev`, open `http://localhost:3000/blog/migrating-mongodb-to-postgresql`, and tab through the page from the top.

Confirm:
- The skip link appears first and jumps to `#main-content`.
- The Blog nav item shows as current.
- Every code block and the cutover table receive focus with a visible ring, and arrow keys scroll them horizontally.
- Each `h2`/`h3` anchor becomes visible when focused, and Enter updates the URL hash.
- Focus never gets trapped and never disappears.

- [ ] **Step 4: Theme pass**

With the page open, toggle light and dark mode.

Confirm code block text and background switch themes, body text stays readable in both, and heading anchors are visible against both backgrounds.

- [ ] **Step 5: Reduced-motion pass**

Enable "Reduce motion" in the OS accessibility settings, reload `/blog` and the homepage, and confirm no card or section animation plays and nothing becomes permanently invisible.

- [ ] **Step 6: Mobile pass**

At a 375px viewport, confirm the page body never scrolls horizontally — the wide table and long code lines must scroll inside their own containers only.

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix: blog accessibility and layout corrections from verification pass"
```

Skip this step if nothing needed fixing.
