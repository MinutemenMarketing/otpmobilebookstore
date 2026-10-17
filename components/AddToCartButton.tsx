"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

export function AddToCartButton({
  onAdd,
  className = "",
  children = "Add to cart",
  disabled = false,
}: {
  /** Return `false` to signal the add was rejected (e.g. missing variant) and skip the "Added" state. */
  onAdd: () => boolean | void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (disabled) return;
    const result = onAdd();
    if (result === false) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex h-12 items-center justify-center gap-2 bg-ink px-6 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange disabled:cursor-not-allowed disabled:bg-ink-soft disabled:hover:bg-ink-soft ${className}`}
    >
      {added ? (
        <>
          <CheckIcon className="h-4 w-4" /> Added
        </>
      ) : (
        children
      )}
    </button>
  );
}
