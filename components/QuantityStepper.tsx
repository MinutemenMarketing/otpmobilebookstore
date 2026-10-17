"use client";

import { MinusIcon, PlusIcon } from "./icons";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  return (
    <div className="inline-flex h-12 items-center border border-ink">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-full w-12 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        aria-label={`Decrease quantity, ${label}`}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="tabular w-10 text-center font-body text-base font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-full w-12 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        aria-label={`Increase quantity, ${label}`}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
