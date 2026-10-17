import Image from "next/image";
import type { CartLine } from "@/lib/types";
import { formatCents } from "@/lib/money";
import { RouteLine } from "../RouteLine";

export function OrderSummary({
  lines,
  subtotalCents,
  totalCents,
}: {
  lines: CartLine[];
  subtotalCents: number;
  totalCents: number;
}) {
  return (
    <div className="border border-line bg-cream-high p-5">
      <ul>
        {lines.map((line) => (
          <li key={line.lineId} className="flex gap-3 border-b border-line py-3 first:pt-0 last:border-b-0">
            <div className="relative h-16 w-11 shrink-0 overflow-hidden border border-line bg-cream">
              <Image src={line.image.src} alt="" fill sizes="44px" className="object-cover" />
            </div>
            <div className="flex flex-1 items-start justify-between gap-2">
              <div>
                <p className="font-body text-sm font-semibold text-ink">{line.title}</p>
                {line.variantLabel && <p className="font-body text-xs text-ink-soft">{line.variantLabel}</p>}
                <p className="tabular font-body text-xs text-ink-soft">Qty {line.quantity}</p>
              </div>
              <span className="tabular font-body text-sm font-semibold text-ink">
                {formatCents(line.unitPriceCents * line.quantity)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
        <div className="flex justify-between font-body text-sm text-ink-soft">
          <span>Subtotal</span>
          <span className="tabular">{formatCents(subtotalCents)}</span>
        </div>
        <div className="flex justify-between font-body text-sm text-ink-soft">
          <span>Shipping &amp; tax</span>
          <span>Calculated once checkout is connected</span>
        </div>
        <RouteLine width={44} className="my-2" />
        <div className="flex items-baseline justify-between">
          <span className="font-body text-sm font-semibold uppercase tracking-wide text-ink">Total</span>
          <span className="tabular font-display text-2xl font-bold text-ink">{formatCents(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
