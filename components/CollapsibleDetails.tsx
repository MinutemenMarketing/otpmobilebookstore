import { ChevronDown } from "./icons";

export function CollapsibleDetails({
  summary,
  rows,
}: {
  summary: string;
  rows: Array<[string, string]>;
}) {
  if (rows.length === 0) return null;

  return (
    <details className="group border-t border-line py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-body text-sm font-semibold text-ink">
        {summary}
        <ChevronDown className="h-4 w-4 text-ink-soft transition-transform duration-[var(--dur)] group-open:rotate-180" />
      </summary>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-body text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-ink-soft">{label}</dt>
            <dd className="tabular text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
