import { getAllBooks, getAllGenres, getBookBySlug, getTee } from "../catalog";
import type { ApparelProduct, Book } from "../types";
import type { CheckoutSessionInput, CheckoutSessionResult, CommerceProvider } from "./types";

function randomOrderReference(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `OTP-DEMO-${n}`;
}

/**
 * Local, network-free implementation backed by `lib/catalog.ts`. No payment is ever collected
 * or represented as collected — `createCheckoutSession` only simulates a completed order shape
 * so the demo checkout flow has something real to review and confirm against.
 */
export const demoCommerceProvider: CommerceProvider = {
  async listBooks(): Promise<Book[]> {
    return getAllBooks();
  },

  async getBook(slug: string): Promise<Book | null> {
    return getBookBySlug(slug) ?? null;
  },

  async listGenres(): Promise<string[]> {
    return getAllGenres();
  },

  async getApparel(slug: string): Promise<ApparelProduct | null> {
    const tee = getTee();
    return tee.slug === slug ? tee : null;
  },

  async createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult> {
    const subtotalCents = input.lines.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0);
    return {
      mode: "demo",
      orderReference: randomOrderReference(),
      subtotalCents,
      shippingCents: null,
      taxCents: null,
      totalCents: subtotalCents,
    };
  },
};
