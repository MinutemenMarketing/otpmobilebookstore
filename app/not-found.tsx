import Link from "next/link";
import { RouteLine } from "@/components/RouteLine";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 py-28 text-center md:px-12">
      <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        404
      </span>
      <h1 className="font-display text-3xl font-bold text-ink">This page went off the page.</h1>
      <RouteLine width={44} />
      <p className="font-body text-sm text-ink-soft">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-12 items-center bg-ink px-6 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
      >
        Back to shop
      </Link>
    </div>
  );
}
