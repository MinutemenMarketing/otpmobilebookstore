# Off the Page Mobile Bookstore — demo storefront

Next.js (App Router) + TypeScript + Tailwind v4. See [`DESIGN.md`](./DESIGN.md) for the full
design system and the commerce architecture decision.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Images are pre-built from `tools/originals/` into `public/images/` via `node tools/prep-images.mjs`
(only needs to be re-run if you replace a source image — already-built output is committed).

## What's real vs. sample

Everything under **Shop / About / Merch** is live, working code — search, filters, sort, cart,
checkout flow, persistence. What's *sample data*, clearly marked in the UI with a "Demo pricing"
badge and called out in [`DESIGN.md`](./DESIGN.md#facts-of-record):

- The Lion Women of Tehran's price ($28.00), format (Hardcover), and availability.
- The Off the Page tee's price ($28.00) and size run (S–XXL).
- ISBN, publisher, publication date, and page count are **not shown** for the current book — they
  were never supplied, so rather than invent them the product page just omits that section. Add
  real values to `lib/catalog.ts` and the "Publication details" panel will appear automatically.

Everything else on the site — the business concept copy, the trailer images (labeled as concept
renders, not finished photos), the social handles, and the logo/artwork — comes directly from what
the client supplied.

## Content model

`lib/catalog.ts` is the single source of truth for the demo catalog (books + the one apparel
product). No component reads it directly — everything goes through `lib/commerce` (see
`lib/commerce/types.ts`), so swapping in a real commerce provider later doesn't touch any page or
component, only `lib/commerce/index.ts`.

**To add a book today:** add an entry to the `books` array in `lib/catalog.ts` (cover image dropped
in `tools/originals/`, run the prep script, point `cover.src` at the built file) — it appears in the
shop grid, search, filters, and gets its own `/product/[slug]` page automatically.

## Newsletter signup

`lib/newsletter.ts` is a server action written against the **Mailchimp Marketing API** — the
most common small-business choice, and the client manages contacts/campaigns/unsubscribes
entirely from Mailchimp's own dashboard, no code needed on her end. It is **not connected**: no
API key is configured, so the form currently shows an honest "not connected yet" state and never
claims a subscriber was saved.

To go live, set these server-only env vars (never `NEXT_PUBLIC_`, never sent to the client):

| Variable | Where to find it |
|---|---|
| `MAILCHIMP_API_KEY` | Mailchimp → Account → Extras → API keys |
| `MAILCHIMP_SERVER_PREFIX` | The suffix on that key, e.g. `us21` |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp → Audience → Settings → Audience name and defaults |

Once set, signups use double opt-in (Mailchimp emails the subscriber to confirm) and the
"Member Exists" case is treated as success so existing subscribers aren't shown an error.

## Events

`lib/events.ts` is the source of truth — currently empty, since no dates have been confirmed.
`getUpcomingEvents()` auto-excludes anything before today, so adding a past-dated entry by
mistake can't surface it. Add an object to the `events` array (date, time, venue, address,
directions link) and it appears on `/events` automatically, in date order.

## Book catalog: what's published vs. what's pending review

See `CATALOG_REVIEW.md` for the full sourcing notes on all 106 books reconciled from the
client's supplier screenshots (the complete ISBN/title order, across six screenshots). Short
version: real title/author/ISBN data for all 106 (42 with verified covers, 64 with a styled
placeholder; 87 with a confirmed author, 19 marked "Author to be confirmed"), but **no confirmed
retail price or stock for any of them**, so they're all `status: "review"` in `lib/catalog.ts` —
present in the codebase, excluded from the live shop. Flip to `"published"` with a real `formats`
price once confirmed.

## What's needed before this takes real orders

1. **Pick a commerce/POS provider.** Shopify (Storefront API + hosted Checkout, or POS Go for
   in-trailer sales) is the recommended fit — see the "Commerce architecture decision" in
   `DESIGN.md`. Square is the fallback if the client already uses it.
2. Implement `CommerceProvider` (`lib/commerce/types.ts`) against that provider and swap the export
   in `lib/commerce/index.ts` — no UI changes required.
3. Move checkout-session creation server-side (an API route or server action calling the
   provider's SDK with secrets kept server-only).
4. Replace the demo checkout's simulated shipping/tax line with the provider's real quote.
5. Verify completed payments via the provider's server-side webhook/confirmation flow before ever
   marking an order fulfilled.
6. Confirm and publish: founder/about story, contact email, service area & schedule, and connect
   `otpmobilebookstore.com`.
7. Confirm retail prices (and stock) for the 106 `status: "review"` books so they can publish —
   see `CATALOG_REVIEW.md`.
8. Set the three `MAILCHIMP_*` env vars above to turn on real newsletter signups.
9. Confirm the first event date/venue to replace the Events empty state.

## Known demo limitations (by design, not bugs)

- Checkout never contacts a network — "Complete demo checkout" only simulates a result locally.
- No customer-entered checkout data is ever written to `localStorage` or logged; only cart
  contents (product + variant + quantity) persist across a refresh.
- There's no admin UI — the client manages the catalog by editing `lib/catalog.ts` until a real
  commerce backend is connected, consistent with "ready for the client to add inventory," not "has
  inventory management already."
