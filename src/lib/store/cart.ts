"use client";

import { findSwatch, getProduct, upholstery, woodTypes, type Product } from "@/lib/products";
import { persistentStore, useStore } from "./persistent";

/* TODO(backend): move the cart server-side (Payload) once accounts exist, so it
   follows the customer across devices. The shape below is what checkout reads. */

export type CartLine = { slug: string; wood: string; upholstery?: string; qty: number };

export type ResolvedLine = CartLine & {
  key: string;
  product: Product;
  woodLabel: string;
  upholsteryLabel?: string;
  lineTotal: number;
};

const MAX_QTY = 9;

const cartStore = persistentStore<CartLine[]>("wm:cart", []);
const drawerStore = persistentStore<boolean>("wm:cart-open", false, false);

export const lineKey = (l: Pick<CartLine, "slug" | "wood" | "upholstery">) => `${l.slug}:${l.wood}:${l.upholstery ?? "-"}`;

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = getProduct(line.slug);
    if (!product) return [];
    return [
      {
        ...line,
        key: lineKey(line),
        product,
        woodLabel: findSwatch(woodTypes, line.wood)?.label ?? line.wood,
        upholsteryLabel: line.upholstery ? findSwatch(upholstery, line.upholstery)?.label : undefined,
        lineTotal: product.price * line.qty,
      },
    ];
  });
}

export function useCart() {
  const lines = resolveLines(useStore(cartStore));
  return {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
  };
}

export const useCartDrawer = () => useStore(drawerStore);

export const cart = {
  add(line: CartLine) {
    cartStore.set((lines) => {
      const key = lineKey(line);
      const existing = lines.find((l) => lineKey(l) === key);
      return existing
        ? lines.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + line.qty) } : l))
        : [...lines, line];
    });
    drawerStore.set(true);
  },
  setQty(key: string, qty: number) {
    cartStore.set((lines) =>
      qty <= 0 ? lines.filter((l) => lineKey(l) !== key) : lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  },
  remove(key: string) {
    cartStore.set((lines) => lines.filter((l) => lineKey(l) !== key));
  },
  clear() {
    cartStore.set([]);
  },
  open: () => drawerStore.set(true),
  close: () => drawerStore.set(false),
};

export { MAX_QTY };
