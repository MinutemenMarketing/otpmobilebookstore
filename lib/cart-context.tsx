"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "ADD"; line: CartLine }
  | { type: "SET_QUANTITY"; lineId: string; quantity: number }
  | { type: "REMOVE"; lineId: string }
  | { type: "CLEAR" };

const STORAGE_KEY = "otp-cart-v1";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines };
    case "ADD": {
      const existing = state.lines.find((l) => l.lineId === action.line.lineId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.lineId === action.line.lineId
              ? { ...l, quantity: l.quantity + action.line.quantity }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "SET_QUANTITY":
      return {
        lines: state.lines
          .map((l) => (l.lineId === action.lineId ? { ...l, quantity: action.quantity } : l))
          .filter((l) => l.quantity > 0),
      };
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.lineId !== action.lineId) };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  addLine: (line: CartLine) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lastAddedLineId: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedLineId, setLastAddedLineId] = useState<string | null>(null);

  // Hydrate from localStorage after mount only, so SSR and first client render match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const lines = JSON.parse(raw) as CartLine[];
        if (Array.isArray(lines)) dispatch({ type: "HYDRATE", lines });
      }
    } catch {
      // corrupt or inaccessible storage — start with an empty cart
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // storage unavailable (private mode, quota) — cart just won't persist
    }
  }, [state.lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const addLine = (line: CartLine) => {
      dispatch({ type: "ADD", line });
      setLastAddedLineId(line.lineId);
      setDrawerOpen(true);
    };

    return {
      lines: state.lines,
      itemCount: state.lines.reduce((n, l) => n + l.quantity, 0),
      subtotalCents: state.lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0),
      addLine,
      setQuantity: (lineId, quantity) => dispatch({ type: "SET_QUANTITY", lineId, quantity }),
      removeLine: (lineId) => dispatch({ type: "REMOVE", lineId }),
      clear: () => dispatch({ type: "CLEAR" }),
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      lastAddedLineId,
    };
  }, [state.lines, isDrawerOpen, lastAddedLineId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
