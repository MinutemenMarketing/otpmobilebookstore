export function DemoBadge({ label = "Demo pricing" }: { label?: string }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-1.5 border border-golden-yellow/60 bg-golden-yellow/15 px-2 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-burnt-orange"
      title="Sample value for this demo — the client will confirm final pricing and inventory."
    >
      {label}
    </span>
  );
}
