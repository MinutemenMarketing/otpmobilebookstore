"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { RouteLine } from "./RouteLine";
import { CartIcon } from "./icons";

// Natural size of public/images/logo-horizontal-*.webp after padding trim — keeps next/image's
// layout reservation accurate at every rendered size.
const LOGO_WIDTH = 1903;
const LOGO_HEIGHT = 489;

const NAV_ITEMS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/90">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:h-[84px] md:px-12">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Image
            src="/images/logo-horizontal-900.webp"
            alt="Off the Page Mobile Bookstore"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-7 w-auto sm:h-10 md:h-12"
            sizes="(min-width: 768px) 210px, (min-width: 640px) 175px, 110px"
          />
        </Link>

        <nav aria-label="Primary" className="flex-1">
          <ul className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="relative py-2">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="font-body text-[13px] font-semibold uppercase tracking-wide text-ink-soft transition-colors hover:text-ink sm:text-[14px] data-[active=true]:text-ink"
                    data-active={active}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <RouteLine
                      width={28}
                      thickness={3}
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={openDrawer}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center text-ink transition-colors hover:text-burnt-orange"
          aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
        >
          <CartIcon className="h-6 w-6" />
          {itemCount > 0 && (
            <span
              className="tabular absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-tomato-red px-1 text-[11px] font-bold text-cream"
              aria-hidden="true"
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
