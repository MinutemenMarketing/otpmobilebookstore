"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";
import { RouteLine } from "./RouteLine";

const NAV_ITEMS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
  { href: "/events", label: "Events" },
] as const;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 shrink-0 items-center justify-center text-ink md:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Portaled to document.body: the header's backdrop-blur creates a new containing block
          for fixed-position descendants in Chromium, which would otherwise trap this overlay
          inside the header's own (68px-tall) box instead of covering the viewport. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[70] md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/50"
            />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-cream-high shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-display text-base font-bold text-ink">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-5 py-6">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex flex-col gap-1 py-3 font-display text-xl font-bold text-ink"
                    >
                      {item.label}
                      {active && <RouteLine width={28} thickness={3} />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
