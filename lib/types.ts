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

export interface Book {
  kind: "book";
  id: string;
  slug: string;
  title: string;
  author: string;
  genres: string[];
  synopsis: string;
  cover: ImageAsset;
  formats: BookFormat[];
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  pageCount?: number;
  language?: string;
  availability: Availability;
  demoPricing: boolean;
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
