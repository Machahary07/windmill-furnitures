"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { redLink, shell, smallBody } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { useHydrated } from "@/lib/store/persistent";
import { useWishlist } from "@/lib/store/wishlist";

export default function WishlistView() {
  const hydrated = useHydrated();
  const { products } = useWishlist();

  if (!hydrated) return <div className={`${shell} min-h-[320px]`} aria-busy="true" />;

  return (
    <section className={`${shell} pb-[110px]`}>
      {products.length === 0 ? (
        <>
          <p className="font-jakarta text-xl font-bold text-ink">Nothing saved yet.</p>
          <p className={`${smallBody} mt-3 max-w-[440px]`}>Tap the heart on any piece to keep it here while you decide.</p>
          <Link href={routes.shop()} className={`${redLink} mt-8`}>
            Browse the catalog
          </Link>
        </>
      ) : (
        <>
          <p className="font-jakarta text-[13px] font-medium text-gray-nav">
            {products.length} saved {products.length === 1 ? "piece" : "pieces"} · saved on this device
          </p>
          <ul className="mt-8 grid grid-cols-4 gap-x-[25px] gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-4">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} sizes="(max-width: 768px) 50vw, 340px" />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
