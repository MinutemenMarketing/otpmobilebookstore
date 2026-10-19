"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ApparelProduct } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatCents } from "@/lib/money";
import { QuantityStepper } from "./QuantityStepper";
import { AddToCartButton } from "./AddToCartButton";
import { DemoBadge } from "./DemoBadge";

export function TeeProduct({ tee }: { tee: ApparelProduct }) {
  const { addLine } = useCart();
  const [view, setView] = useState<"front" | "back">("front");
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const errorId = useId();

  const image = tee.images[view];
  const outOfStock = tee.availability === "out-of-stock";
  const href = `/merch`;

  function handleAdd(): boolean {
    if (!sizeId) {
      setSizeError(true);
      return false;
    }
    const variant = tee.variants.find((v) => v.id === sizeId);
    if (!variant) return false;
    addLine({
      lineId: `apparel:${tee.slug}:${variant.id}`,
      productKind: "apparel",
      productSlug: tee.slug,
      title: tee.name,
      variantLabel: `Size ${variant.size}`,
      unitPriceCents: tee.priceCents,
      quantity,
      image: tee.images.front,
      href,
    });
    return true;
  }

  return (
    <div className="grid min-w-0 gap-10 md:grid-cols-12 md:gap-14">
      <div className="flex min-w-0 flex-col gap-3 md:col-span-6">
        <div className="relative flex min-w-0 aspect-square items-center justify-center border border-line bg-cream-high p-5 sm:aspect-[4/5] sm:p-8">
          <Image
            key={view}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 440px, 90vw"
            priority
            className="h-auto w-full min-w-0 max-w-[340px] object-contain"
            data-reveal
          />
        </div>
        <div className="flex min-w-0 gap-2" role="tablist" aria-label="Tee view">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`h-10 min-w-0 flex-1 border font-body text-sm font-semibold capitalize transition-colors ${
                view === v ? "border-ink bg-ink text-cream" : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-6 md:col-span-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
            {tee.name}
          </h1>
          <div className="flex items-center gap-3">
            <span className="tabular font-display text-3xl font-bold text-ink">
              {formatCents(tee.priceCents)}
            </span>
            {tee.demoPricing && <DemoBadge />}
          </div>
        </div>

        <p className="font-body text-[15px] leading-relaxed text-ink-soft">{tee.description}</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Size
            </span>
            {tee.demoPricing && (
              <span className="font-body text-xs text-ink-soft">Sample size run</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size" aria-describedby={sizeError ? errorId : undefined}>
            {tee.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={sizeId === v.id}
                disabled={!v.inStock}
                onClick={() => {
                  setSizeId(v.id);
                  setSizeError(false);
                }}
                className={`h-11 min-w-[48px] border px-3 font-body text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                  sizeId === v.id
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
          {sizeError && (
            <p id={errorId} className="font-body text-sm font-semibold text-tomato-red">
              Pick a size before adding to cart.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Quantity
          </span>
          <QuantityStepper value={quantity} onChange={setQuantity} label={tee.name} />
        </div>

        <AddToCartButton disabled={outOfStock} className="w-full" onAdd={handleAdd}>
          {outOfStock ? "Sold out" : "Add to cart"}
        </AddToCartButton>
      </div>
    </div>
  );
}
