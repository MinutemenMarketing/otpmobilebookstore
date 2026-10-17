import { demoCommerceProvider } from "./demo-provider";
import type { CommerceProvider } from "./types";

/**
 * Active commerce provider for the whole app. Today: the local demo provider. When a POS /
 * payment provider is selected, implement `CommerceProvider` (e.g. `shopify-provider.ts`) and
 * swap the export below — no other file in the app needs to change.
 */
export const commerce: CommerceProvider = demoCommerceProvider;

export type {
  CheckoutContact,
  CheckoutSessionInput,
  CheckoutSessionResult,
  CommerceProvider,
} from "./types";
