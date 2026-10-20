import type { ApparelProduct, Book } from "./types";

/**
 * Single structured source of truth for the demo catalog. The live build replaces this file
 * with calls into `lib/commerce` (see `lib/commerce/types.ts`) — no page or component reads
 * catalog data directly, they all go through `lib/commerce`.
 *
 * `demoPricing: true` marks fields that are sample values pending client/POS confirmation.
 * `status: "review"` marks a book with real, verified bibliographic data (title/author/ISBN/
 * cover) but no confirmed retail price or stock — these are never shown on the storefront.
 * See CATALOG_REVIEW.md for how each entry below was sourced and what's still needed to
 * publish it.
 *
 * Never add a field here that was not supplied by the client, verified against a real source,
 * or explicitly marked as a sample.
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
    status: "published",
  },

  // ---- Supplier order, confirmed ISBN + title (see CATALOG_REVIEW.md) ----
  // Real bibliographic data looked up from Open Library. No retail price or stock has been
  // confirmed for any of these, so every entry below is `status: "review"` — not shown on the
  // storefront until the client confirms pricing and the client approves genre tags.

  {
    kind: "book",
    id: "book-above-the-salt",
    slug: "above-the-salt",
    title: "Above the Salt",
    author: "Katherine Vaz",
    genres: ["Fiction"],
    synopsis: "A novel by Katherine Vaz, published by Flatiron Books in 2024.",
    formats: [],
    isbn: "9781250873828",
    publisher: "Flatiron Books",
    publicationDate: "2024",
    pageCount: 432,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-ace-marvel-spy",
    slug: "ace-marvel-spy",
    title: "Ace, Marvel, Spy: A Novel of Alice Marble",
    author: "Jenni L. Walsh",
    genres: ["Fiction", "Historical Fiction"],
    synopsis:
      "A novel by Jenni L. Walsh about Alice Marble, the real-life tennis champion who became a spy during World War II.",
    formats: [],
    isbn: "9781400246748",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-adam-and-evies-matchmaking-tour",
    slug: "adam-and-evies-matchmaking-tour",
    title: "Adam and Evie's Matchmaking Tour",
    author: "Nora Nguyen",
    genres: ["Fiction"],
    synopsis: "A novel by Nora Nguyen, published by HarperCollins in 2024.",
    cover: {
      src: "/images/catalog/9780063381506-700.webp",
      width: 700,
      height: 1000,
      alt: "Adam and Evie's Matchmaking Tour by Nora Nguyen",
    },
    formats: [],
    isbn: "9780063381506",
    publisher: "HarperCollins",
    publicationDate: "2024",
    pageCount: 304,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-africa-dream",
    slug: "africa-dream",
    title: "Africa Dream",
    author: "Eloise Greenfield",
    genres: ["Children's"],
    synopsis:
      "A picture book about a Black child whose dreams carry her back through time to the people and places of Africa.",
    cover: {
      src: "/images/catalog/9780064432771-700.webp",
      width: 700,
      height: 734,
      alt: "Africa Dream by Eloise Greenfield",
    },
    formats: [],
    isbn: "9780064432771",
    publisher: "HarperTrophy",
    publicationDate: "December 1, 1991",
    pageCount: 32,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-africa-in-my-blood",
    slug: "africa-in-my-blood",
    title: "Africa in My Blood: An Autobiography in Letters",
    author: "Jane Goodall",
    genres: ["Nonfiction"],
    synopsis:
      "A self-portrait in letters tracing Jane Goodall's early years, from a childhood studying animals to the publication of In the Shadow of Man.",
    cover: {
      src: "/images/catalog/9780618127351-700.webp",
      width: 700,
      height: 1052,
      alt: "Africa in My Blood: An Autobiography in Letters by Jane Goodall",
    },
    formats: [],
    isbn: "9780618127351",
    publisher: "Mariner Books",
    publicationDate: "April 22, 2001",
    pageCount: 386,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-afterparties",
    slug: "afterparties",
    title: "Afterparties",
    author: "Anthony Veasna So",
    genres: ["Fiction", "Short Stories"],
    synopsis: "A debut story collection by Anthony Veasna So.",
    cover: {
      src: "/images/catalog/9780063049895-700.webp",
      width: 700,
      height: 1059,
      alt: "Afterparties by Anthony Veasna So",
    },
    formats: [],
    isbn: "9780063049895",
    publisher: "Ecco",
    publicationDate: "June 7, 2022",
    pageCount: 288,
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-day-is-a-long-time",
    slug: "all-day-is-a-long-time",
    title: "All Day Is a Long Time",
    author: "David Sanchez",
    genres: ["Fiction"],
    synopsis: "A novel by David Sanchez, published by Houghton Mifflin Harcourt in 2022.",
    formats: [],
    isbn: "9780358572015",
    publisher: "Houghton Mifflin Harcourt",
    publicationDate: "2022",
    pageCount: 256,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-grown-up",
    slug: "all-grown-up",
    title: "All Grown Up",
    author: "Jami Attenberg",
    genres: ["Fiction"],
    synopsis:
      "A novel following Andrea Bern as she reckons with her family, her choices, and what “having it all” really means.",
    formats: [],
    isbn: "9781328915320",
    publisher: "Mariner Books",
    publicationDate: "March 13, 2018",
    pageCount: 224,
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-signs-point-to-malibu",
    slug: "all-signs-point-to-malibu",
    title: "All Signs Point to Malibu",
    author: "Jennifer Snow",
    genres: ["Fiction", "Romance"],
    synopsis: "A romance novel from Harlequin author Jennifer Snow.",
    formats: [],
    isbn: "9781335993953",
    publisher: "Harlequin",
    publicationDate: "2024",
    pageCount: 304,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-the-dangerous-things",
    slug: "all-the-dangerous-things",
    title: "All the Dangerous Things",
    author: "Stacy Willingham",
    genres: ["Fiction", "Mystery & Thriller"],
    synopsis: "A thriller by Stacy Willingham, author of A Flicker in the Dark.",
    cover: {
      src: "/images/catalog/9781250803856-700.webp",
      width: 700,
      height: 1063,
      alt: "All the Dangerous Things by Stacy Willingham",
    },
    formats: [],
    isbn: "9781250803856",
    publisher: "St. Martin's Press",
    publicationDate: "2023",
    pageCount: 320,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-the-other-mothers-hate-me",
    slug: "all-the-other-mothers-hate-me",
    title: "All the Other Mothers Hate Me",
    author: "Sarah Harman",
    genres: ["Fiction"],
    synopsis: "A novel by Sarah Harman, published in 2025.",
    formats: [],
    isbn: "9798217067527",
    publisher: "Diversified Publishing",
    publicationDate: "2025",
    pageCount: 464,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-all-the-water-in-the-world",
    slug: "all-the-water-in-the-world",
    title: "All the Water in the World",
    author: "Eiren Caffall",
    genres: ["Fiction"],
    synopsis:
      "A literary thriller narrated by a girl with an intuitive feel for water, set in a flooded future New York.",
    cover: {
      src: "/images/catalog/9781250353528-700.webp",
      width: 700,
      height: 1084,
      alt: "All the Water in the World by Eiren Caffall",
    },
    formats: [],
    isbn: "9781250353528",
    publisher: "St. Martin's Press",
    publicationDate: "2025",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-the-american-daughters",
    slug: "the-american-daughters",
    title: "The American Daughters",
    author: "Maurice Carlos Ruffin",
    genres: ["Fiction", "Historical Fiction"],
    synopsis: "A novel by Maurice Carlos Ruffin, author of We Cast a Shadow.",
    cover: {
      src: "/images/catalog/9780593729397-700.webp",
      width: 700,
      height: 1061,
      alt: "The American Daughters by Maurice Carlos Ruffin",
    },
    formats: [],
    isbn: "9780593729397",
    publisher: "Oneworld Publications",
    publicationDate: "2024",
    pageCount: 304,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
  },
  {
    kind: "book",
    id: "book-and-then-there-was-you",
    slug: "and-then-there-was-you",
    title: "And Then There Was You",
    author: "Sophie Cousens",
    genres: ["Fiction", "Romance"],
    synopsis: "A novel by Sophie Cousens, published by Penguin in 2025.",
    formats: [],
    isbn: "9780593718926",
    publisher: "Penguin",
    publicationDate: "2025",
    pageCount: 352,
    language: "English",
    availability: "preorder",
    demoPricing: true,
    status: "review",
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

/** Published books only — this is what the storefront, search, filters, and sitemap read. */
export function getAllBooks(): Book[] {
  return books.filter((b) => b.status === "published");
}

/** Every book regardless of status, for internal/admin use only — never import this into a
 * client component or a route that's reachable without going through `getAllBooks`. */
export function getAllBooksIncludingReview(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find((b) => b.slug === slug);
}

export function getTee(): ApparelProduct {
  return apparel[0];
}

export function getAllGenres(): string[] {
  const set = new Set<string>();
  for (const b of getAllBooks()) for (const g of b.genres) set.add(g);
  return Array.from(set).sort();
}
