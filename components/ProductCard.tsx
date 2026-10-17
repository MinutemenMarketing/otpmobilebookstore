"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatCents } from "@/lib/money";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ book }: { book: Book }) {
  const { addLine } = useCart();
  const defaultFormat = book.formats[0];
  const href = `/product/${book.slug}`;
  const outOfStock = book.availability === "out-of-stock";

  return (
    <article className="group flex flex-col border border-line bg-cream-high transition-colors hover:border-ink">
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={book.cover.src}
          alt={book.cover.alt}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4 transition-transform duration-[var(--dur)] group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {book.genres.map((g) => (
            <span
              key={g}
              className="border border-line px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
            >
              {g}
            </span>
          ))}
        </div>
        <Link href={href} className="font-display text-base font-bold leading-snug text-ink hover:text-burnt-orange">
          {book.title}
        </Link>
        <p className="font-body text-sm text-ink-soft">{book.author}</p>
        <p className="line-clamp-2 font-body text-sm text-ink-soft">{book.synopsis}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="flex flex-col">
            <span className="tabular font-display text-lg font-bold text-ink">
              {formatCents(defaultFormat.priceCents)}
            </span>
            <span className="font-body text-xs text-ink-soft">{defaultFormat.label}</span>
          </div>
          <AddToCartButton
            disabled={outOfStock}
            onAdd={() =>
              addLine({
                lineId: `book:${book.slug}:${defaultFormat.id}`,
                productKind: "book",
                productSlug: book.slug,
                title: book.title,
                variantLabel: defaultFormat.label,
                unitPriceCents: defaultFormat.priceCents,
                quantity: 1,
                image: book.cover,
                href,
              })
            }
          >
            {outOfStock ? "Sold out" : "Add"}
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
