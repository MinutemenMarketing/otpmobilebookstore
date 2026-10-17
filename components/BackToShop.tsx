"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./icons";

/** Always a plain button (server and client render identically, so there's no hydration
 * mismatch). The choice between history-back and a hard navigation to "/" is made at click
 * time, so the shop's search/filter/sort state (kept in component state, not the URL) survives
 * the round trip when the visitor actually came from the shop. */
export function BackToShop() {
  const router = useRouter();

  function handleClick() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink-soft hover:text-ink"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back to shop
    </button>
  );
}
