---
title: "Building Conversion Tracking for Our Own Ad Network"
description: "We run ads inside our own dating app. Here's how we built cross-domain attribution without third-party cookies, and the review process that caught five silent failure modes before launch."
date: "2026-08-11"
updated: "2026-08-11"
tags: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Ad Tech", "Attribution"]
featured: true
---

We run ads inside our own dating app. Not Meta's ads — ours. Advertisers buy campaigns through a self-serve dashboard, and the ads render in the feed alongside everything else.

That works fine until an advertiser asks the only question they actually care about: **did it sell anything?**

Impressions and clicks happen inside our app, so we own that data completely. The sale happens on the advertiser's website, in a different browser, possibly four days later. No shared session. No shared login. And third-party cookies — the thing that used to bridge exactly this gap — are dead in Safari, dead in Firefox, and dying in Chrome.

So I built the bridge.

## The mechanism, in one paragraph

You can't follow a user across the boundary, so you hand them something on the way out and ask the advertiser to hand it back. When someone taps an ad, the backend mints an opaque random token and stores it on the click row. The app appends it to the destination URL as `?fvclid=…`. The advertiser has pasted a small script — a pixel — on their site; it reads that token, saves it in a **first-party cookie on their own domain**, and sends it back with any conversion. We look the token up, check the click was within seven days, and stamp the sale with the campaign that earned it.

The cookie being first-party is the whole reason this design outlived third-party cookies. We never needed one.

Everything after that is bookkeeping: a second server-to-server ingestion door because browsers are lossy, an advertiser-supplied `eventId` so the same purchase arriving through both doors counts once, and an hourly job that collapses raw events into one row per ad per day. That daily row is also what we'd invoice from.

## What the review process caught before launch

Attribution touches billing, so every part of the pipeline went through a deliberate pass looking for failure modes that a green test suite wouldn't surface. Five held up the release.

**Cross-origin delivery.** The pixel is loaded by a `<script src>` on someone else's domain — a no-cors subresource request, governed by `Cross-Origin-Resource-Policy` rather than CORS. Our default security headers set that policy to same-origin platform-wide, which meant the pixel route needed an explicit opt-out or no browser would ever load it. The catch: tooling like `curl` doesn't enforce CORP at all, so this class of failure is invisible to anything that isn't an actual browser. Fix was one header override on the pixel route, plus adding a real-browser check to the release process rather than trusting `curl`-based smoke tests.

**Attribution ownership.** The original lookup matched a conversion to a click purely by click ID, without confirming the click and the reporting pixel belonged to the same advertiser. Since click IDs travel in a plain URL parameter, that's a spoofable link between two independent tenants. Fixed by resolving the click's owner and refusing the match unless it agrees with the pixel's owner — the same ownership check we'd already applied on the pixel side, extended to the click side for symmetry.

**Numeric bounds.** Conversion values are advertiser-supplied and land in a fixed-precision decimal column. Without an upper bound, a single oversized value fails the insert, and because the hourly rollup wrote a full day's ads in one transaction, one bad value could abort every ad's row for that day — silently halting billing until someone found it. Fixed with a sane per-event ceiling and by splitting the rollup so one ad's failure can't take the batch down with it.

**Deduplication vs. attribution.** Advertisers send every conversion through both doors — pixel and server — because ad blockers and Safari's ITP drop 20–40% of browser events. The dedup key is the advertiser's own order ID, first arrival wins. That's correct for duplicates but wrong for the case the second door exists to rescue: pixel fires without a click ID (cookie was capped), server fires milliseconds later with one, and first-write-wins keeps the worse copy permanently. Fixed by upgrading a stored row when a later delivery carries attribution the first one lacked.

**Credential scope drift.** A separate security-hardening pass started enforcing API scopes that had previously existed on client records but were never checked. That correctly closed a real gap — but any credential issued before enforcement carried scopes that no longer matched what the delivery endpoint required, and failed with no visible signal at the credential level. Caught during integration by testing against the live delivery endpoint rather than trusting that an active-looking credential still worked.

## What these have in common

All five sit at a seam — between a security default and a route, between two ownership checks, between validation and a column type, between a dedup rule and the advice we give advertisers, between a scope enum and a credential issued before it existed. Reviewing each piece of the system in isolation is exactly the process that can't see a seam between two pieces.

The other pattern: most of these were invisible to standard tooling, not hard to find. `curl` doesn't enforce CORP. A single-tenant test suite doesn't have two advertisers. Dev-scale data never overflows a numeric column. The takeaway isn't "write more tests" — a green suite confirms the things you already thought to check. It says nothing about the things you didn't.

## Where it stands

The pipeline is built and verified: 282 tests, both ingestion doors, deduplication confirmed by direct row count, the origin check, the attribution window, the tenant boundary.

The click passthrough exists too, verified against the running backend:

```
POST /ad/clicked  →  { "recorded": true,  "clickId": "j1m2-MYSAoRpKdV2QPaxdg" }
repeat            →  { "recorded": false, "reason": "duplicate",
                       "clickId": "j1m2-MYSAoRpKdV2QPaxdg" }
```

A repeat tap returning the *same* token is deliberate — both taps attribute to one click rather than billing twice.

One decision I'd defend anywhere: tracking never blocks the link. If the click call fails, is rate limited, or the user has no id yet, the plain destination URL still opens. A lost attribution costs a row in a report. A dead call-to-action costs the advertiser the sale.

Remaining before general release: impression reporting (reach and CTR still read zero), and a live end-to-end check of the pixel snippet against a real browser on a real domain — the one class of failure that a test suite, by definition, can't rule out for itself.
