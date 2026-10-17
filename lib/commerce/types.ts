import type { ApparelProduct, Book, CartLine, Cents } from "../types";

/**
 * Provider-agnostic commerce boundary. Pages and components only ever talk to the active
 * `CommerceProvider` (see `./index.ts`) — never to `lib/catalog.ts` or a specific vendor SDK
 * directly. Swapping the demo provider for a real one (Shopify Storefront API + hosted
 * Checkout is the recommended fit — see DESIGN.md) means implementing this interface and
 * changing one line in `./index.ts`; no page or component changes.
 */
export interface CommerceProvider {
  listBooks(): Promise<Book[]>;
  getBook(slug: string): Promise<Book | null>;
  listGenres(): Promise<string[]>;
  getApparel(slug: string): Promise<ApparelProduct | null>;
  /** Creates (or in the demo, simulates) a checkout session for the given cart + contact info. */
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
}

export interface CheckoutContact {
  name: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface CheckoutSessionInput {
  lines: CartLine[];
  contact: CheckoutContact;
}

export interface CheckoutSessionResult {
  mode: "demo" | "live";
  orderReference: string;
  subtotalCents: Cents;
  /** null = not yet calculable (no provider connected to quote real shipping/tax). */
  shippingCents: Cents | null;
  taxCents: Cents | null;
  totalCents: Cents;
}
