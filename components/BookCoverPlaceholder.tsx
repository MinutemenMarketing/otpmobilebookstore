import { RouteLine } from "./RouteLine";

/** Shown in place of a real cover for a catalog entry whose exact-edition artwork hasn't been
 * verified yet (see CATALOG_REVIEW.md) — deliberately reads as a placeholder, never as a real
 * cover. */
export function BookCoverPlaceholder({
  title,
  author,
  className = "",
}: {
  title: string;
  author: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[2/3] w-full flex-col items-center justify-center gap-4 border border-line bg-cream px-5 text-center ${className}`}
    >
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Cover pending
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-base font-bold leading-snug text-ink">{title}</span>
        <span className="font-body text-sm text-ink-soft">{author}</span>
      </div>
      <RouteLine width={32} thickness={3} />
    </div>
  );
}
