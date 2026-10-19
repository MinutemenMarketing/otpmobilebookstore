import Image from "next/image";
import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { TeeProduct } from "@/components/TeeProduct";
import { CheckerStrip } from "@/components/CheckerStrip";

export const metadata: Metadata = {
  title: "Merch",
  description: "The Off the Page tee — black, with the road-and-pages mark on the chest and the full trailer illustration across the back.",
};

export default async function MerchPage() {
  const tee = await commerce.getApparel("off-the-page-tee");
  if (!tee) return null;

  return (
    <div>
      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-12 md:py-12">
        <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Merch
        </span>
        <TeeProduct tee={tee} />
      </div>

      <section className="on-ink mt-12 border-y border-line-dark bg-ink py-14 text-cream md:py-20">
        <div className="mx-auto flex min-w-0 max-w-[1280px] flex-col items-center gap-6 px-4 text-center md:px-12">
          <CheckerStrip />
          <Image
            src="/images/merch-badge-artwork-800.webp"
            alt="Illustration of the Off the Page trailer with a stack of books beside it, checkerboard ground"
            width={1200}
            height={952}
            sizes="(min-width: 768px) 520px, 90vw"
            loading="lazy"
            className="w-full max-w-[460px]"
          />
          <p className="max-w-[46ch] font-body text-sm text-cream/70">
            The same trailer illustration riding on the tee — straight off the artwork built for
            the shop itself.
          </p>
        </div>
      </section>
    </div>
  );
}
