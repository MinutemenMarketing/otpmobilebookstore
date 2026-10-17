import type { Cents } from "./types";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCents(cents: Cents): string {
  return formatter.format(cents / 100);
}
