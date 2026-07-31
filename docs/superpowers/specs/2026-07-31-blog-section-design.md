# Blog Section — Design

Date: 2026-07-31
Status: Approved

## Goal

Add a blog to the portfolio so long-form engineering write-ups are discoverable by
recruiters through search. First post is a MongoDB → PostgreSQL production migration
case study.

Discoverability comes from static prerendered HTML, per-post metadata, `BlogPosting`
structured data tied to the existing `Person` entity, and sitemap coverage — not from
the authoring format. Markdown files were chosen over MDX because both prerender to
identical HTML, and markdown is faster to write.

## Scope

In scope:

- Markdown content layer with frontmatter
- `/blog` index page
- `/blog/[slug]` post page
- Navbar link
- Homepage "Writing" section showing the latest 3 posts
- SEO: sitemap entries, per-post metadata, JSON-LD, dynamic OG images
- Accessibility per the project's A11Y.md Standard AA rule

Out of scope (deliberate, revisit when post count grows):

- RSS feed
- Tag filter pages / archive pages
- Pagination
- Comments, reactions, view counts
- Search

## Content layer

Posts live as markdown files:

```
content/blog/<slug>.md
```

The filename is the slug. Frontmatter drives the list card, page metadata, JSON-LD,
the OG image, and the sitemap entry:

```yaml
---
title: "Migrating a Production Dating App from MongoDB to PostgreSQL"
description: "How 1.8 million documents, a 40-minute maintenance window, and four surprises taught me more than the plan did."
date: "2026-07-31"
updated: "2026-07-31"
tags: ["PostgreSQL", "MongoDB", "Prisma", "Data Migration", "NestJS"]
featured: true
---
```

Field rules:

- `title`, `description`, `date`, `tags` are required. A post missing any of them
  fails the build with a message naming the file.
- `updated` is optional and falls back to `date`.
- `featured` is optional, defaults to `false`. It controls ordering emphasis on the
  homepage section only; it does not change the index page.
- `date` and `updated` are `YYYY-MM-DD` strings, parsed as UTC so the rendered date
  does not shift by timezone.

The first post's body is the supplied case study, used verbatim. The `#` H1 line and
the italic subtitle line are removed from the body — the page renders them from
`title` and `description` so there is exactly one `<h1>` per page.

## Dependencies

| package | why |
|---|---|
| `gray-matter` | parse frontmatter |
| `react-markdown` | render markdown in a Server Component |
| `remark-gfm` | tables, strikethrough, autolinks |
| `rehype-pretty-code` | syntax highlighting |
| `shiki` | highlighter engine for `rehype-pretty-code` |
| `rehype-slug` | heading ids |
| `rehype-autolink-headings` | anchor links on headings |
| `@tailwindcss/typography` | prose styles |

All markdown processing happens at build time inside Server Components. No client
JavaScript is added by the blog beyond what the site already ships.

`@tailwindcss/typography` is registered for Tailwind v4 with `@plugin
"@tailwindcss/typography";` in `app/globals.css`.

`rehype-pretty-code` is configured with dual themes (`github-light` / `github-dark`)
so highlighting follows the existing `next-themes` class-based dark mode via CSS
variables rather than a second render.

## Modules

Each module has one job and can be understood without reading the others.

### `lib/blog.ts`

Server-only. The single source of truth for reading posts.

- `getAllPosts(): BlogPostMeta[]` — reads `content/blog/*.md`, parses frontmatter,
  validates required fields, sorts by `date` descending, returns metadata only (no
  body).
- `getPostBySlug(slug: string): BlogPost | null` — returns metadata plus raw markdown
  body, or `null` when the file does not exist.
- `getReadingTime(markdown: string): number` — whole minutes, `ceil(words / 200)`,
  minimum 1. Word count is taken from the raw markdown; fenced code blocks are
  stripped first so a long code sample does not inflate the estimate.

Depends on: `node:fs`, `node:path`, `gray-matter`. Nothing else in the app depends on
the filesystem.

### `types/index.ts` (edit)

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

### `components/blog/markdown-content.tsx`

Server Component. Takes `{ content: string }`, returns rendered markdown wrapped in a
`prose` container themed to the site tokens.

It owns the remark/rehype plugin configuration and the component overrides:

- `table` — wrapped in a `div` with `overflow-x-auto`, `tabIndex={0}`,
  `role="region"`, and an `aria-label`, so a horizontally scrollable table is
  reachable by keyboard.
- `pre` — same treatment: `tabIndex={0}`, `role="region"`, `aria-label` naming the
  language when `rehype-pretty-code` provides it.
- `a` — external links get `target="_blank"` and `rel="noopener noreferrer"`;
  internal links render through `next/link`.
- Heading anchors from `rehype-autolink-headings` use `aria-label` (`"Link to section:
  <heading text>"`) and are `opacity-0 focus-visible:opacity-100 group-hover:opacity-100`
  so they are reachable by keyboard, not hover-only.

Consumers pass markdown in and get elements out. Changing the plugin set does not
affect any caller.

### `components/ui/blog-post-card.tsx`

Presentational. Takes `{ post: BlogPostMeta }`. Renders the whole card as a single
`next/link` to `/blog/<slug>` — one interactive element, no nested anchors or buttons.
Shows title, description, formatted date in a `<time dateTime={post.date}>`, reading
time, and up to three tags as existing `Badge` components. Focus ring is the site's
`ring` token, visible against both themes.

Used by both `/blog` and the homepage section, so the two never drift.

### `app/blog/page.tsx`

Server Component index page. Mirrors the shell of `app/projects/page.tsx`: back link,
display heading, intro paragraph, then a responsive grid of `BlogPostCard`.

Exports `metadata` with title `Blog`, a description, and canonical `/blog`. Renders a
`Blog` JSON-LD node whose `author` and `publisher` reference `${SITE_URL}/#person`.

Empty state: when `getAllPosts()` returns nothing, renders a short "no posts yet"
message rather than an empty grid.

### `app/blog/[slug]/page.tsx`

Server Component post page.

- `generateStaticParams()` from `getAllPosts()` — every post is statically prerendered.
- `generateMetadata()` — title, description, canonical `/blog/<slug>`,
  `openGraph.type: "article"` with `publishedTime`, `modifiedTime`, `authors`, `tags`,
  and `twitter.card: "summary_large_image"`.
- `notFound()` when `getPostBySlug` returns `null`.
- Renders a `BlogPosting` JSON-LD script: `headline`, `description`, `datePublished`,
  `dateModified`, `keywords`, `mainEntityOfPage`, `image` pointing at the post's OG
  image route, and `author` / `publisher` referencing `${SITE_URL}/#person`.
- Page body: back link to `/blog`, `<article>` containing `<h1>{title}</h1>`, a
  `<time dateTime>` line with reading time, tag badges, then `<MarkdownContent />`.

### `app/blog/[slug]/opengraph-image.tsx`

Per-post OG image via `next/og` `ImageResponse`. Reuses the dark gradient, accent
colour, and type scale of the existing `app/opengraph-image.tsx`. Shows the post title
(clamped), the site name, and the date. Exports `alt`, `size`, `contentType`, and
`generateStaticParams` so images are generated at build time.

### `app/blog/not-found.tsx`

Mirrors `app/projects/not-found.tsx`, linking back to `/blog`.

### `components/sections/writing.tsx`

Homepage section. Placed between `<Projects />` and `<Experience />`. Uses the existing
`SectionHeading` with `id="writing-heading"`, and the wrapping `<section>` carries
`id="writing"` and `aria-labelledby="writing-heading"`.

Renders the latest three posts as `BlogPostCard`, plus a "Read all posts" link to
`/blog`. Featured posts sort ahead of non-featured within the same selection; ordering
is otherwise by date descending. Renders nothing when there are no posts.

## Edits to existing files

- `components/sections/navbar.tsx` — add `{ name: "Blog", href: "/blog", id: "blog" }`
  to `navItems`. Because it points at a route rather than a homepage anchor, the
  `IntersectionObserver` block is left alone; `blog` simply never becomes the active
  section id on the homepage. Active state on `/blog` comes from `usePathname()`
  matching `/blog`, which is added alongside the existing section logic.
- `app/page.tsx` — mount `<Writing />` between `<Projects />` and `<Experience />`.
- `app/sitemap.ts` — add `/blog` (priority `0.8`, `changeFrequency: "weekly"`) and one
  entry per post (priority `0.7`, `lastModified` from the post's `updated`).
- `app/globals.css` — register the typography plugin and add prose token overrides
  plus the shiki dual-theme CSS variable rules.
- `types/index.ts` — add the two interfaces above.

## Data flow

```
content/blog/*.md
   -> lib/blog.ts        (fs read, gray-matter parse, validate, sort)
   -> BlogPostMeta[]     (index page, homepage section, sitemap, generateStaticParams)
   -> BlogPost           (post page)
   -> MarkdownContent    (remark/rehype -> React elements)
```

Only `lib/blog.ts` touches the filesystem. Everything downstream consumes typed
objects, so swapping the storage layer later would not require touching components.

## Error handling

- Missing or malformed required frontmatter throws during `getAllPosts()`, failing the
  build with the offending filename. Broken metadata never reaches production.
- `getPostBySlug` returns `null` for an unknown slug; the page calls `notFound()` and
  `app/blog/not-found.tsx` renders.
- Unparseable dates throw at build time with the filename, for the same reason.
- No runtime fetching, so there are no network failure paths.

## Accessibility

Follows the project's A11Y.md Standard AA rule.

- One `<h1>` per page; markdown H2/H3 hierarchy preserved with no skipped levels.
- Semantic `<article>`, `<time dateTime>`, `<nav>` where applicable.
- Scrollable code blocks and tables are focusable regions with accessible names.
- Heading anchor links are keyboard-reachable and labelled, not hover-only.
- Card links are single interactive elements with a visible focus ring meeting 3:1
  against adjacent colours.
- Homepage section labelled via `aria-labelledby`.
- Shiki light and dark themes checked for 4.5:1 body-text contrast in both modes.
- Any motion added to the section respects `prefers-reduced-motion`, matching the
  existing sections' behaviour.

## Verification

- `npm run build` succeeds; `/blog` and `/blog/<slug>` appear as statically prerendered
  routes in the build output.
- `curl` the built post page and confirm the `BlogPosting` JSON-LD block is present in
  the HTML source.
- `/sitemap.xml` includes `/blog` and the post URL.
- The post's OG image route returns a PNG.
- Keyboard pass on `/blog/<slug>`: tab through back link, heading anchors, code blocks,
  table, and the footer without a trap and without losing focus visibility.
- Both themes rendered and inspected for code block contrast.

## Future work

Add RSS, tag pages, and pagination once there is more than a handful of posts. The
frontmatter already carries `tags` and `featured`, so neither needs a content
migration.
