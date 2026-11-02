"use client";

import OrderSummary from "@/components/cart/OrderSummary";
import Photo from "@/components/ui/Photo";
import { computeTotals, formatPrice } from "@/lib/money";
import { cardImage } from "@/lib/products";
import type { ResolvedLine } from "@/lib/store/cart";

/* Right-hand order summary on both checkout steps */
export default function CheckoutSummary({ lines, state }: { lines: ResolvedLine[]; state?: string }) {
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  return (
    <aside className="h-fit rounded-xl bg-[#f6f6f4] p-8 max-sm:p-6 lg:sticky lg:top-8">
      <h2 className="font-jakarta text-lg font-bold text-ink">Order summary</h2>
      <ul className="mt-5 space-y-4 border-b border-[#e4e4e0] pb-6">
        {lines.map((l) => (
          <li key={l.key} className="flex items-center gap-4">
            <div className="relative size-[60px] shrink-0 overflow-hidden rounded-md bg-white">
              <Photo src={cardImage(l.product)} alt="" fill sizes="60px" className={l.product.drawing ? "object-contain p-1" : "object-cover"} />
              <span className="absolute top-0.5 right-0.5 grid size-5 place-items-center rounded-full bg-ink font-jakarta text-[10px] font-bold text-white">{l.qty}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-jakarta text-[13px] font-semibold text-ink">{l.product.name}</p>
              <p className="font-jakarta text-[12px] text-gray-nav">
                {l.woodLabel}
                {l.upholsteryLabel && ` · ${l.upholsteryLabel}`}
              </p>
            </div>
            <p className="font-jakarta text-[13px] font-semibold text-ink">{formatPrice(l.lineTotal)}</p>
          </li>
        ))}
      </ul>
      <div className="pt-6">
        <OrderSummary totals={computeTotals(subtotal, state)} deliveryKnown={!!state} />
      </div>
    </aside>
  );
}
