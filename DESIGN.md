# Off the Page Mobile Bookstore — Design System

Legal/working name: Off the Page Mobile Bookstore · Instagram/TikTok handle: `offthepagebook_club`
Intended future domain: `otpmobilebookstore.com` (not yet confirmed connected)
Sector: mobile independent bookstore (trailer-based) · Direction: vintage road-trip Americana, commercially sharp
Conversion goals: browse catalog → add to cart → demo checkout (live payments pending POS selection)

## Anti-default stance
The generic AI look this brief could collapse into is: flat cream page + bold Playfair-style serif
headline + a single terracotta accent + every product in a soft-shadowed rounded card + a bloated
hero that pushes the shop below the fold.

We deliberately deviate: a near-black "trailer paint" ground used selectively (not cream everywhere),
a chunky idiosyncratic grotesque for display type instead of a serif, the four accents lifted directly
from the client's own supplied artwork (teal / burnt orange / golden yellow / tomato red) run as a
single disciplined tri-stripe rule instead of a decorative rainbow, flat-edged cards with hairline
borders instead of soft drop shadows, and one structural device — **the route line** — carried across
every page instead of icon rows or filler sections. The shop starts above the fold, not below a hero.

## Palette
| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--cream` | `#F3E7CC` | Page background (light sections) | — |
| `--cream-high` | `#FAF3E3` | Card / surface fill on cream | — |
| `--ink` | `#17130F` | Primary text, dark section ground | 14.8:1 on cream |
| `--ink-soft` | `#4A4337` | Secondary text on cream | 7.3:1 on cream |
| `--line` | `#D9C9A3` | Hairlines on cream — too pale for text | — |
| `--line-dark` | `#332C22` | Hairlines on ink ground | — |
| `--teal` | `#166B64` | Accent — links, active state, price rule | 5.9:1 on cream |
| `--burnt-orange` | `#B85A1E` | Accent — hover, secondary CTA ring | 4.6:1 on cream |
| `--golden-yellow` | `#D99A2B` | Accent — highlight chip, never body text | 2.6:1 (decorative only) |
| `--tomato-red` | `#B33B24` | Accent — sale/alert sparingly, out-of-stock | 5.2:1 on cream |
| `--cream-on-ink` | `#F3E7CC` | Text/logo fill on ink ground | 14.8:1 on ink |

Never raw hex in components — tokens only. Golden yellow never carries body text; it is a fill behind
dark ink or a 3–4px stripe segment only.

## Typography
- **Display:** Bricolage Grotesque (700/800), a wide-set idiosyncratic grotesque with road-sign
  character — distinct from the logo's own hand-built lettering, never used to recreate it.
- **Body/UI:** Hanken Grotesk (400/500/600) — warm humanist grotesk, built for dense product listings.
  NOT Inter.
- **Eyebrow:** Hanken Grotesk 600, 12px, 0.14em tracking, uppercase, `--ink-soft` or `--cream-on-ink`.
- Scale desktop → mobile: display `64→36`, h2 `40→28`, h3 `24→20`, body `17→16`, small `14→13`.
- Figures: `font-variant-numeric: tabular-nums` on every price, quantity, and ISBN.

## Signature element
**The route line** — a 3px horizontal rule split into three equal segments (teal / golden-yellow /
tomato-red), taken directly from the road in the supplied artwork. It appears under the active nav
tab, under every section eyebrow, beneath the order total on checkout, and nowhere else — never as a
page border, divider between every paragraph, or decorative repeat.

Secondary motif: a single flying-page corner glyph (cropped from the supplied logo artwork, never
redrawn) used once per page at most — shop intro, empty search state, checkout complete state.
Checkerboard appears only as a 4-tile strip on the merch page, echoing the trailer artwork.

## Layout
- Shell 1280px max; gutters 20px mobile / 48px desktop; spacing scale 4/8/12/16/24/32/48/64/96/128.
- Section rhythm: eyebrow → display heading → short lede → content, separated by hairlines, not shadow.
- Asymmetry: shop intro is a 7/5 split (headline+CTA / book-cover composition), not centered.
- One full ink (near-black) section per primary page: footer band on Shop/Merch, trailer gallery
  ground on About.
- Mobile: header stays slim with brand + 3 tabs + cart; no sticky bottom action bar needed since Add
  to Cart buttons are already in-flow and prominent.

## Components
- **Buttons:** primary = ink fill / cream text, 2px square-cornered (not pill), hover = burnt-orange
  fill; 48px min height. Secondary = cream fill, 1.5px ink border, hover = ink fill.
- **Cards:** flat `--cream-high` fill, 1px `--line` border, no radius beyond 2px, no shadow at rest;
  on hover, border shifts to ink and cover lifts 2px via `translateY`.
- **Price:** tabular-nums, ink, 600 weight; route-line stripe (6px wide, 3-segment) sits left of price
  on product cards as a repeating identity mark, not as full-width rules everywhere.
- **Filters/sort:** flat select + pill-less toggle chips, ink border, active = ink fill.
- **Forms:** visible labels above inputs, 48px inputs, 1.5px border, teal focus ring, inline error
  text under the field tied by `aria-describedby`.
- **Demo badge:** small cream-on-ink pill reading "Demo pricing" / "Demo checkout" — one per context,
  not repeated in every card.

## Motion
- `--ease: cubic-bezier(.22,.61,.36,1)`, `--dur-fast: 150ms`, `--dur: 250ms`.
- Cart add: button micro-press + cart badge count tick, no confetti/toast spam — a single inline
  "Added" state for 1.2s.
- Reveals limited to the shop intro and section eyebrows: opacity + 8px translateY, 250ms, staggered
  60ms. No animation on checkout/purchasing controls.
- `prefers-reduced-motion`: all reveals resolve to final state instantly; road-line never animates.

## Commerce architecture decision
No POS/payment provider is selected yet. The app is built against a provider-agnostic
`CommerceProvider` interface (`lib/commerce/types.ts`) covering catalog read, cart/checkout-session
creation, and order confirmation. Today it is implemented by `lib/commerce/demo-provider.ts`, which
reads the structured local catalog (`lib/catalog.ts`) and simulates a checkout session with no network
calls and no payment collection. **Recommendation for the live build:** Shopify (Storefront API for
catalog/cart + Shopify-hosted Checkout, or Shopify POS Go for in-person trailer sales) — it is the
most common fit for a small retail business that needs synced online/in-person inventory across books
(ISBN-based) and apparel (size variants), with no PCI burden on this codebase. Square is the practical
alternative if the client already runs Square elsewhere. Either swaps in behind the same interface
without touching any page component.

## Pages
| Route | Purpose | Sections |
|---|---|---|
| `/` | Shop (home) | Compact intro + CTA, search/filter/sort, book grid, demo-pricing notice |
| `/product/[slug]` | Book detail | Cover, price, format, qty, add to cart, synopsis, collapsible details |
| `/merch` | Merch | Off the Page tee: front/back toggle, size, qty, add to cart |
| `/about` | About | Concept intro, trailer concept imagery (labeled), follow-the-journey links |
| `/checkout` | Demo checkout | Contact/shipping form → review → simulated complete state |

Cart is a slide-in drawer reachable from the header on every page, plus state persisted to
localStorage (cart contents only — never checkout form data).

## Facts of record
- Business concept, name, logo, trailer concept renders, merch artwork, and the initial book (The Lion
  Women of Tehran by Marjan Kamali) — supplied directly by the client.
- Social handles `offthepagebook_club` (Instagram + TikTok) — supplied directly by the client.
- Intended domain `otpmobilebookstore.com` — stated by client as a future/intended domain, not
  confirmed live; not linked anywhere as if active.
- `TODO(client):` confirmed book price, ISBN, publisher, publication date, page count, format/edition;
  confirmed founder story and founding year; confirmed contact email; service area and schedule
  (where the trailer will be); apparel price, sizes, and fabric details; POS/payment provider
  selection. All of the above are marked as demo/sample values in the code and UI, centrally defined
  in `lib/catalog.ts`, so the client can replace them without touching layout code.
