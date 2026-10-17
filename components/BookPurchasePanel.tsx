"use client";

import { useState } from "react";
import type { Book } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatCents } from "@/lib/money";
import { QuantityStepper } from "./QuantityStepper";
import { AddToCartButton } from "./AddToCartButton";
import { DemoBadge } from "./DemoBadge";

const AVAILABILITY_LABEL: Record<Book["availability"], string> = {
  "in-stock": "In stock",
  limited: "Limited stock",
  preorder: "Available for preorder",
  "out-of-stock": "Out of stock",
};

export function BookPurchasePanel({ book }: { book: Book }) {
  const { addLine } = useCart();
  const [formatId, setFormatId] = useState(book.formats[0].id);
  const [quantity, setQuantity] = useState(1);

  const format = book.formats.find((f) => f.id === formatId) ?? book.formats[0];
  const outOfStock = book.availability === "out-of-stock";
  const href = `/product/${book.slug}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="tabular font-display text-3xl font-bold text-ink">
          {formatCents(format.priceCents)}
        </span>
        {book.demoPricing && <DemoBadge />}
      </div>

      <p className="font-body text-sm font-semibold text-ink-soft">
        <span className={outOfStock ? "text-tomato-red" : "text-teal"}>
          {AVAILABILITY_LABEL[book.availability]}
        </span>
        {book.demoPricing && " — demo inventory"}
      </p>

      {book.formats.length > 1 && (
        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Format
          </span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Format">
            {book.formats.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={f.id === formatId}
                onClick={() => setFormatId(f.id)}
                className={`border px-4 py-2 font-body text-sm font-semibold transition-colors ${
                  f.id === formatId
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Quantity
        </span>
        <QuantityStepper value={quantity} onChange={setQuantity} label={book.title} />
      </div>

      <AddToCartButton
        disabled={outOfStock}
        className="w-full"
        onAdd={() =>
          addLine({
            lineId: `book:${book.slug}:${format.id}`,
            productKind: "book",
            productSlug: book.slug,
            title: book.title,
            variantLabel: format.label,
            unitPriceCents: format.priceCents,
            quantity,
            image: book.cover,
            href,
          })
        }
      >
        {outOfStock ? "Sold out" : "Add to cart"}
      </AddToCartButton>
    </div>
  );
}
