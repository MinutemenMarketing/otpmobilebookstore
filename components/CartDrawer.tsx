"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { formatCents } from "@/lib/money";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./icons";
import { RouteLine } from "./RouteLine";

export function CartDrawer() {
  const { lines, subtotalCents, isDrawerOpen, closeDrawer, setQuantity, removeLine } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 bg-ink/50"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-cream-high shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-drawer-title" className="font-display text-lg font-bold">
            Your cart
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
            aria-label="Close cart"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-body text-ink-soft">Your cart is empty.</p>
            <Link
              href="/"
              onClick={closeDrawer}
              className="inline-flex h-11 items-center bg-ink px-5 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
            >
              Shop books
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {lines.map((line) => (
                <li key={line.lineId} className="flex gap-3 border-b border-line py-4 first:pt-0">
                  <div className="relative h-20 w-14 shrink-0 overflow-hidden border border-line bg-cream">
                    <Image
                      src={line.image.src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={line.href}
                        onClick={closeDrawer}
                        className="font-body text-sm font-semibold leading-snug text-ink hover:text-burnt-orange"
                      >
                        {line.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeLine(line.lineId)}
                        className="shrink-0 text-ink-soft hover:text-tomato-red"
                        aria-label={`Remove ${line.title} from cart`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    {line.variantLabel && (
                      <p className="font-body text-xs text-ink-soft">{line.variantLabel}</p>
                    )}
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:bg-ink hover:text-cream"
                          aria-label={`Decrease quantity of ${line.title}`}
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="tabular w-8 text-center font-body text-sm" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:bg-ink hover:text-cream"
                          aria-label={`Increase quantity of ${line.title}`}
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="tabular font-body text-sm font-semibold text-ink">
                        {formatCents(line.unitPriceCents * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-4">
              <RouteLine width={44} className="mb-3" />
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-body text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Subtotal
                </span>
                <span className="tabular font-display text-xl font-bold text-ink">
                  {formatCents(subtotalCents)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="flex h-12 items-center justify-center bg-ink px-5 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex h-12 items-center justify-center border border-ink px-5 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
