import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/Checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-12 md:py-12">
      <CheckoutFlow />
    </div>
  );
}
