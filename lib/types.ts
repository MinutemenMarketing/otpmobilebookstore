/** Integer cents. Never float dollars internally. */
export type Cents = number;

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface BookFormat {
  id: string;
  label: string;
  priceCents: Cents;
}

export type Availability = "in-stock" | "limited" | "preorder" | "out-of-stock";

/**
 * "published" — real, confirmed data (price + stock); shown in the live shop.
 * "review" — real bibliographic data (ISBN/title/author/cover) but price and/or stock are not
 * yet confirmed. Never shown on the storefront; kept here so the catalog is the single source
 * of truth and publishing later is a one-field flip, not re-entry. See CATALOG_REVIEW.md.
 */
export type CatalogStatus = "published" | "review";

export interface Book {
  kind: "book";
  id: string;
  slug: string;
  title: string;
  author: string;
  genres: string[];
  synopsis: string;
  /** Absent for a "review" book whose cover couldn't be verified yet — render BookCoverPlaceholder. */
  cover?: ImageAsset;
  /** Empty for a "review" book — no confirmed price to sell at yet. */
  formats: BookFormat[];
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  pageCount?: number;
  language?: string;
  availability: Availability;
  demoPricing: boolean;
  status: CatalogStatus;
}

export interface ApparelVariant {
  id: string;
  size: string;
  inStock: boolean;
}

export interface ApparelProduct {
  kind: "apparel";
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: Cents;
  images: {
    front: ImageAsset;
    back: ImageAsset;
  };
  variants: ApparelVariant[];
  availability: Availability;
  demoPricing: boolean;
}

export type Product = Book | ApparelProduct;

export interface StoreEvent {
  id: string;
  slug: string;
  name: string;
  /** ISO date, e.g. "2026-11-15" */
  date: string;
  startTime?: string;
  endTime?: string;
  venue: string;
  address: string;
  description?: string;
  directionsUrl: string;
  websiteUrl?: string;
}

/** A line item as it lives in the cart — already resolved to a concrete price and variant. */
export interface CartLine {
  /** Unique per product+variant combination, e.g. "book:lion-women-of-tehran:hardcover" */
  lineId: string;
  productKind: "book" | "apparel";
  productSlug: string;
  title: string;
  variantLabel: string | null;
  unitPriceCents: Cents;
  quantity: number;
  image: ImageAsset;
  href: string;
}
