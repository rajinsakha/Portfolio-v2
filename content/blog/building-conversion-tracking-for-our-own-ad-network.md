---
title: "Building Conversion Tracking for Our Own Ad Network"
description: "Every test passed and the feature was completely dead. Four bugs from building a pixel, and why only a browser could find the worst one."
date: "2026-08-11"
updated: "2026-08-11"
tags: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Ad Tech", "Attribution"]
featured: true
---

We run ads inside our own dating app. Not Meta's ads — ours. Advertisers buy campaigns through a self-serve dashboard, and the ads render in the feed alongside everything else.

That works fine until an advertiser asks the only question they actually care about: **did it sell anything?**

Impressions and clicks happen inside our app, so we own that data completely. The sale happens on the advertiser's website, in a different browser, possibly four days later. No shared session. No shared login. And third-party cookies — the thing that used to bridge exactly this gap — are dead in Safari, dead in Firefox, and dying in Chrome.

So I built the bridge. This post is about the four bugs that survived until the very last review, and what they have in common.

## The mechanism, in one paragraph

You can't follow a user across the boundary, so you hand them something on the way out and ask the advertiser to hand it back. When someone taps an ad, the backend mints an opaque random token and stores it on the click row. The app appends it to the destination URL as `?fvclid=…`. The advertiser has pasted a small script — a pixel — on their site; it reads that token, saves it in a **first-party cookie on their own domain**, and sends it back with any conversion. We look the token up, check the click was within seven days, and stamp the sale with the campaign that earned it.

The cookie being first-party is the whole reason this design outlived third-party cookies. We never needed one.

Everything after that is bookkeeping: a second server-to-server ingestion door because browsers are lossy, an advertiser-supplied `eventId` so the same purchase arriving through both doors counts once, and an hourly job that collapses raw events into one row per ad per day. That daily row is also what we'd invoice from, which is the detail that made the rest of this stressful.

## Surprise 1: the feature was dead, and every test passed

The pixel is loaded by a `<script src>` on someone else's domain. I'd thought carefully about CORS — the endpoint echoes the origin, the allowlist is checked per pixel, all of it tested.

CORS was never the problem.

A `<script src>` is a **no-cors subresource request**, and those are governed by a different header entirely: `Cross-Origin-Resource-Policy`. We use `helmet` for security defaults, and helmet sets `Cross-Origin-Resource-Policy: same-origin` on every response.

So a browser would fetch `/t.js`, read that header, and refuse to hand the script to the page. `window.fiveone` never gets defined. The queue never drains. Not a single event ever fires.

The part that stuck with me: **`curl` does not implement CORP.** It requests the script, gets a 200, and prints the body. Every integration test I had — status code, content type, cache header, body contents — passed against a completely non-functional feature. The end-to-end verification I'd written passed too, because it also used `curl`.

```ts
// The route serving the pixel has to opt out explicitly.
res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
```

One line. The browser-pixel door had been dead the entire time, and nothing in my toolchain could see it.

## Surprise 2: any advertiser could bill conversions to a competitor

Attribution matched a conversion to a click by looking up the click ID. That's it. That was the whole check.

Here's the attack, and it needs no special access at all. Advertiser B is a normal user of our dating app. B scrolls the feed, taps advertiser A's ad, and lands on A's website — with `?fvclid=…` sitting in the address bar. B copies it.

B owns a pixel. B posts a conversion through their own pixel, from their own registered domain, with their own credentials, carrying A's click ID:

```json
{ "pixelId": "<B's pixel>", "eventName": "Purchase",
  "eventId": "x1", "clickId": "<A's click>", "value": 999999999999.99 }
```

Every authorization check passes, because every one of them is about B. The click ID resolves to **A's** campaign, and the hourly rollup sums it into A's daily row — the invoice line. A sees conversions they never earned, with no trace of where they came from, and B can repeat it forever with fresh event IDs.

The fix is that attribution has to resolve the click's owner and refuse unless it matches the pixel's owner. What makes this one worth writing down is that we'd already found and fixed a *pixel*-ownership hole earlier in the same module — and closing it made the *click* side look like it was covered. It wasn't. Fixing half of a symmetry is worse than fixing neither, because it retires the suspicion.

## Surprise 3: one bad number could stop billing for everyone

`value` on a conversion is advertiser-supplied. I'd validated it as a non-negative number with at most two decimal places, and stopped there.

The column is `Decimal(14,2)` — twelve integer digits. Two failures fall out of that gap.

A single event with a large enough value passes validation and then fails at insert with a Postgres numeric overflow. That's a 500 on advertiser input, which the design doc I'd written explicitly forbids.

The second one is worse. Roughly a thousand max-value events against one ad make that ad's *summed* daily value exceed the column. The rollup wrote all of a day's rows in a single transaction, so the overflow aborted the whole thing — and no ad got a row for that day at all. Not impressions, not clicks, not spend. Every subsequent hourly run failed identically. **Billing for that day would have stopped silently until someone deleted the poisoned rows by hand.**

Two fixes, because either alone leaves the door ajar: an upper bound on the per-event value, and splitting the batch so one ad's failure can't take down the day.

## Surprise 4: the deduplication threw away the better copy

We tell advertisers to send every conversion twice — once from the browser pixel, once from their server. That sounds wasteful and isn't. Ad blockers and Safari's ITP eat 20–40% of browser events, and some conversions never touch a browser at all. Neither door is complete.

The `eventId` — their own order number — is what makes the duplicate safe. Unique constraint on `(pixel, eventId)`, second arrival dropped.

Except "dropped" was doing more work than I realised. Consider the case the server door exists for: the pixel fires first, but ITP had capped the cookie, so it arrives **without** a click ID and gets stored unattributed. Milliseconds later the server posts the same `eventId` **with** the click ID. First-write-wins drops it.

The conversion is now permanently unattributed — in exactly the scenario the second door was built to rescue. Our own documentation recommended the setup that triggered it.

The dedup now upgrades the stored row when a later delivery carries attribution the first one lacked, guarded so it never overwrites an attribution that's already there.

## What these have in common

I keep coming back to the fact that all four survived a review of every individual piece of work. Each one lives at a seam: between a security default and a route, between two ownership checks, between validation and a column type, between a dedup rule and the advice we give advertisers. Reviewing each unit in isolation is exactly the process that cannot see them.

The other pattern is more uncomfortable. Three of the four were invisible to my tooling — not hard to find, *invisible*. `curl` doesn't enforce CORP. Unit tests don't have two advertisers. Dev data never overflows a numeric column.

The honest lesson isn't "write more tests." It's that a green suite tells you the things you thought of are still true. It says nothing at all about the things you didn't.

## Where it actually stands

The pipeline is built and verified end to end: 282 tests, both ingestion doors, deduplication confirmed by direct row count, the origin check, the attribution window, the tenant boundary.

And it is not producing a single attributed conversion, because nothing appends `fvclid` to the destination URL yet. That's a small change in the mobile app — call the click endpoint, read the token from the response, append it, then open the browser — and until it lands, every conversion arrives with no ticket and gets stored unattributed.

Which is, at least, the correct behaviour. The dashboard shows unattributed conversions as their own number rather than quietly discarding them, so the gap is visible instead of looking like the feature working badly.

The last thing on my list is the one I'd most like to skip and won't: install the snippet on a scratch domain and watch a `PageView` land in a real browser. Surprise 1 is the entire argument for why.
