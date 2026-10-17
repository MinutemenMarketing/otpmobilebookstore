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
6. Confirm and publish: founder/about story, contact email, service area & schedule, real book
   prices/ISBNs, and connect `otpmobilebookstore.com`.

## Known demo limitations (by design, not bugs)

- Checkout never contacts a network — "Complete demo checkout" only simulates a result locally.
- No customer-entered checkout data is ever written to `localStorage` or logged; only cart
  contents (product + variant + quantity) persist across a refresh.
- There's no admin UI — the client manages the catalog by editing `lib/catalog.ts` until a real
  commerce backend is connected, consistent with "ready for the client to add inventory," not "has
  inventory management already."
