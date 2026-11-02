"use client";

import Link from "next/link";
import CartLineItem from "@/components/cart/CartLineItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { primaryButton, redLink, shell, smallBody } from "@/components/ui/styles";
import { computeTotals } from "@/lib/money";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { useCart } from "@/lib/store/cart";
import { useHydrated } from "@/lib/store/persistent";

export default function CartView() {
  const hydrated = useHydrated();
  const { lines, count, subtotal } = useCart();

  if (!hydrated) return <div className={`${shell} min-h-[320px]`} aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className={`${shell} pb-[110px]`}>
        <p className="font-jakarta text-xl font-bold text-ink">Your cart is empty.</p>
        <p className={`${smallBody} mt-3 max-w-[440px]`}>Every Windmill piece is made to order — choose a wood and upholstery on any product page.</p>
        <div className="mt-8 flex flex-wrap gap-10">
          <Link href={routes.shop()} className={redLink}>
            Browse the catalog
          </Link>
          <Link href={routes.wishlist} className={redLink}>
            Your wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${shell} grid grid-cols-[1fr_380px] gap-[70px] pb-[110px] max-lg:grid-cols-1 max-lg:gap-12`}>
      <section aria-label="Items">
        <ul className="divide-y divide-[#ececec] border-y border-[#ececec]">
          {lines.map((line) => (
            <CartLineItem key={line.key} line={line} large />
          ))}
        </ul>
        <Link href={routes.shop()} className={`${redLink} mt-8`}>
          Continue shopping
        </Link>
      </section>

      <aside className="h-fit rounded-xl bg-[#f6f6f4] p-8 max-sm:p-6 lg:sticky lg:top-[90px]">
        <h2 className="mb-6 font-jakarta text-lg font-bold text-ink">Summary</h2>
        <OrderSummary totals={computeTotals(subtotal)} deliveryKnown={false}>
          <Link href={routes.checkout} className={`${primaryButton} mt-4 w-full`}>
            Proceed to checkout
          </Link>
          <p className={`${smallBody} pt-2 text-[12px]`}>
            Free delivery in {site.freeDeliveryStates.join(", ")}. Pay by UPI, card, net banking or EMI.
            {count >= site.bulkOrderQty && (
              <>
                {" "}
                Ordering {site.bulkOrderQty} or more?{" "}
                <Link href={routes.contact("bulk")} className="text-ink underline underline-offset-2">
                  Talk to the studio
                </Link>{" "}
                about lead times and pricing.
              </>
            )}
          </p>
        </OrderSummary>
      </aside>
    </div>
  );
}
