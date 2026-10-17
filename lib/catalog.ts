import type { ApparelProduct, Book } from "./types";

/**
 * Single structured source of truth for the demo catalog. The live build replaces this file
 * with calls into `lib/commerce` (see `lib/commerce/types.ts`) — no page or component reads
 * catalog data directly, they all go through `lib/commerce`.
 *
 * `demoPricing: true` marks fields that are sample values pending client/POS confirmation.
 * Never add a field here that was not supplied by the client or explicitly marked as a sample.
 */

export const books: Book[] = [
  {
    kind: "book",
    id: "book-lion-women-of-tehran",
    slug: "the-lion-women-of-tehran",
    title: "The Lion Women of Tehran",
    author: "Marjan Kamali",
    genres: ["Fiction", "Historical Fiction"],
    synopsis:
      "In 1950s Tehran, seven-year-old Homa and Ellie become inseparable friends from opposite sides of the city — one working-class and fiercely political, the other newly rich and uncertain where she belongs. Their bond carries them through girlhood ambition, betrayal, and decades of a changing Iran, until a hidden choice resurfaces an ocean away and threatens everything it built. A novel about the price of loyalty and the stories we tell to survive it, from the author of The Stationery Shop.",
    cover: {
      src: "/images/book-lion-women-of-tehran-1050.webp",
      width: 1050,
      height: 1580,
      alt: "The Lion Women of Tehran by Marjan Kamali — hardcover, teal cover with a gold and crimson phoenix illustration",
    },
    formats: [{ id: "hardcover", label: "Hardcover", priceCents: 2800 }],
    availability: "in-stock",
    demoPricing: true,
  },
];

export const apparel: ApparelProduct[] = [
  {
    kind: "apparel",
    id: "apparel-off-the-page-tee",
    slug: "off-the-page-tee",
    name: "Off the Page Tee",
    description:
      "A black short-sleeve tee carrying the Off the Page mark two ways: the road-and-pages logo printed small on the left chest, and the full trailer illustration printed large across the back.",
    priceCents: 2800,
    images: {
      front: {
        src: "/images/tee-front-1408.webp",
        width: 704,
        height: 982,
        alt: "Off the Page tee, front — small road-and-pages logo on the left chest of a black tee",
      },
      back: {
        src: "/images/tee-back-1408.webp",
        width: 708,
        height: 982,
        alt: "Off the Page tee, back — full trailer illustration with checkerboard details across a black tee",
      },
    },
    variants: [
      { id: "s", size: "S", inStock: true },
      { id: "m", size: "M", inStock: true },
      { id: "l", size: "L", inStock: true },
      { id: "xl", size: "XL", inStock: true },
      { id: "xxl", size: "XXL", inStock: true },
    ],
    availability: "in-stock",
    demoPricing: true,
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getTee(): ApparelProduct {
  return apparel[0];
}

export function getAllGenres(): string[] {
  const set = new Set<string>();
  for (const b of books) for (const g of b.genres) set.add(g);
  return Array.from(set).sort();
}
