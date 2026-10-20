# Catalog review — not customer-facing

This file tracks catalog entries that have real bibliographic data but are **not yet published**
to the storefront (`status: "review"` in `lib/catalog.ts`). It is intentionally kept out of the
Next.js `app/` tree so it's never bundled or served.

## Source material (as of 2026-10-20)

The client (via her sister/helper "Mandy") sent two things that do **not** share a reliable join
key, so they could not be reconciled into one list:

1. **One screenshot** of a BookDepot order showing an **ISBN + title** table (14 rows fully or
   partially visible, alphabetical by title).
2. **Six screenshots** of a BookDepot cart showing **price + quantity** rows only — no ISBN, no
   title, ~100+ rows, in whatever order items were added to the cart (not alphabetical, not
   matching the ISBN list's order).

The client's own message about the price/quantity screenshots: *"I know it's a little confusing
so I'll print and take a pic of isbn next to full title and quantities I ordered and email it to
you tomorrow"* — i.e. she had not yet sent a version where price/quantity are tied to a specific
title. Matching the two lists by row position would be a guess, not a reliable correspondence, so
**no price or quantity from the six cart screenshots was attached to any book below.** Per the
brief, supplier cost must never become a customer-facing price, and quantities were not applied
without a confirmed link to a specific ISBN.

## The 14 confirmed ISBN + title entries

All 14 are in `lib/catalog.ts` with `status: "review"` — real title/author/publisher/ISBN (looked
up via the Open Library API), but **no retail price or confirmed stock**, so none are visible on
the live site. Flip `status` to `"published"` and add a `formats` entry once pricing is confirmed.

| ISBN | Title | Author | Cover | Notes |
|---|---|---|---|---|
| 9781250873828 | Above the Salt | Katherine Vaz | **Placeholder** | No cover on file in Open Library yet |
| 9781400246748 | Ace, Marvel, Spy: A Novel of Alice Marble | Jenni L. Walsh | **Placeholder** | This exact ISBN has no edition record in Open Library. A large-print edition of the same title exists under a *different* ISBN (9798891644496, Center Point Large Print) — its cover was deliberately **not** used, since it's a different edition than what was likely ordered. Worth confirming the binding with the client. |
| 9780063381506 | Adam and Evie's Matchmaking Tour | Nora Nguyen | ✅ verified | |
| 9780064432771 | Africa Dream | Eloise Greenfield | ✅ verified | Children's picture book, 32pp |
| 9780618127351 | Africa in My Blood: An Autobiography in Letters | Jane Goodall | ✅ verified | |
| 9780063049895 | Afterparties | Anthony Veasna So | ✅ verified | Story collection |
| 9780358572015 | All Day Is a Long Time | David Sanchez | **Placeholder** | |
| 9781328915320 | All Grown Up | Jami Attenberg | ✅ verified | |
| 9781335993953 | All Signs Point to Malibu | Jennifer Snow | **Placeholder** | Harlequin imprint |
| 9781250803856 | All the Dangerous Things | Stacy Willingham | ✅ verified | |
| 9798217067527 | All the Other Mothers Hate Me | Sarah Harman | **Placeholder** | |
| 9781250353528 | All the Water in the World | Eiren Caffall | ✅ verified | |
| 9780593729397 | The American Daughters | Maurice Carlos Ruffin | ✅ verified | |
| 9780593718926 | And Then There Was You | Sophie Cousens | **Placeholder** | |

9 of 14 covers verified and in use; 5 show `BookCoverPlaceholder` (title/author on a styled card,
clearly marked "Cover pending") until a real cover is confirmed.

## The price/quantity screenshots (6 images, ~103 rows)

Not usable without a shared key. Kept as reference only — not entered anywhere in the codebase.
**What's needed:** the client already said she'd send a sheet with ISBN next to full title *and*
quantity — once that arrives, re-run `node tools/lookup-isbn.mjs <isbn...>` for any new titles and
add real `formats` (price) + `availability` to the matching entries in `lib/catalog.ts`.

## Still needed before any of the 14 can publish

- Retail price per title (the supplier cost sheet is not a retail price source)
- Confirmed stock / quantity received (vs. quantity ordered)
- Genre tags were assigned conservatively from only what's verifiable (page count, imprint,
  subtitle, cover text) — worth a quick client sanity check, not a hard blocker
- A real cover for the 5 flagged above, or explicit sign-off to keep the placeholder at launch
- Confirmation on the "Ace, Marvel, Spy" edition/binding

## How to add more books later

```bash
node tools/lookup-isbn.mjs 9780000000000 9780000000001
```

Prints real metadata + downloads any available cover into `tools/originals/catalog/`. Then run
`node tools/prep-images.mjs` to build the optimized cover sizes, and add the entry to
`lib/catalog.ts` by hand (`status: "review"` until price/stock are confirmed, then `"published"`
with a real `formats` array).
