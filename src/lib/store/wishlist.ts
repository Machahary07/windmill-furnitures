"use client";

import { getProduct, type Product } from "@/lib/products";
import { persistentStore, useStore } from "./persistent";

const wishlistStore = persistentStore<string[]>("wm:wishlist", []);

export function useWishlist() {
  const slugs = useStore(wishlistStore);
  return {
    slugs,
    products: slugs.map(getProduct).filter((p): p is Product => !!p),
    has: (slug: string) => slugs.includes(slug),
  };
}

export const wishlist = {
  toggle(slug: string) {
    wishlistStore.set((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  },
  remove(slug: string) {
    wishlistStore.set((s) => s.filter((x) => x !== slug));
  },
};
