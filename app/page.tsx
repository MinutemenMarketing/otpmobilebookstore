import Image from "next/image";
import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { ShopCatalog } from "@/components/ShopCatalog";
import { RouteLine } from "@/components/RouteLine";
import { formatCents } from "@/lib/money";

export default async function ShopPage() {
  const [books, genres] = await Promise.all([commerce.listBooks(), commerce.listGenres()]);
  const featured = books[0];

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-12">
      <section className="grid items-center gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-16" data-reveal>
        <div className="flex flex-col gap-5 md:col-span-7">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Mobile bookstore
          </span>
          <h1 className="font-display text-[36px] font-extrabold leading-[1.05] text-ink sm:text-[48px] md:text-[64px]">
            Your next chapter starts here.
          </h1>
          <p className="max-w-[46ch] font-body text-base text-ink-soft md:text-lg">
            Off the Page brings a curated shelf of books on the road — this is the demo storefront
            for what we&apos;ll be selling in person and online.
          </p>
          <div className="flex items-center gap-4 pt-1">
            <a
              href="#catalog"
              className="flex h-12 items-center bg-ink px-6 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
            >
              Shop books
            </a>
            <RouteLine width={40} />
          </div>
        </div>

        {featured && (
          <Link
            href={`/product/${featured.slug}`}
            className="group relative flex items-center justify-center border border-line bg-cream-high p-6 md:col-span-5 md:p-10"
          >
            <span className="absolute left-4 top-4 font-body text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
              Featured now
            </span>
            <Image
              src={featured.cover.src}
              alt={featured.cover.alt}
              width={featured.cover.width}
              height={featured.cover.height}
              sizes="(min-width: 768px) 320px, 70vw"
              priority
              fetchPriority="high"
              className="h-auto w-[200px] object-contain shadow-[0_18px_36px_-18px_rgba(23,19,15,0.45)] transition-transform duration-[var(--dur)] group-hover:-translate-y-1 sm:w-[240px]"
            />
          </Link>
        )}
      </section>

      <p className="pb-6 font-body text-xs text-ink-soft">
        This catalog is a starting demo — prices, formats, and availability shown are sample values
        the client will confirm as the real inventory comes online.{" "}
        {featured && (
          <span className="tabular">
            Current demo price: {formatCents(featured.formats[0].priceCents)}.
          </span>
        )}
      </p>

      <ShopCatalog books={books} genres={genres} />

      <div className="h-16" />
    </div>
  );
}
