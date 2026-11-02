import type { ReactNode } from "react";
import { formatPrice, type Totals } from "@/lib/money";

/* Totals block shared by /cart, checkout, confirmation and order pages */
export default function OrderSummary({ totals, deliveryKnown = true, children }: { totals: Totals; deliveryKnown?: boolean; children?: ReactNode }) {
  const row = "flex items-baseline justify-between gap-6 font-jakarta text-sm";
  const { gst } = totals;
  return (
    <div className="space-y-3">
      <div className={row}>
        <span className="text-gray-body">Subtotal</span>
        <span className="font-semibold text-ink">{formatPrice(totals.subtotal)}</span>
      </div>
      <div className={row}>
        <span className="text-gray-body">Delivery</span>
        <span className="font-semibold text-ink">{!deliveryKnown ? "Calculated at checkout" : totals.delivery ? formatPrice(totals.delivery) : "Free"}</span>
      </div>
      <div className={`${row} border-t border-[#ececec] pt-4`}>
        <span className="font-bold text-ink">Total</span>
        <span className="text-xl font-bold text-ink">{formatPrice(totals.total)}</span>
      </div>
      <p className="font-jakarta text-[12px] leading-5 text-gray-nav">
        Includes GST of {formatPrice(gst.cgst + gst.sgst + gst.igst)}
        {deliveryKnown && (gst.igst ? " (IGST 18%)" : ` (CGST ${formatPrice(gst.cgst)} + SGST ${formatPrice(gst.sgst)})`)}.
      </p>
      {children}
    </div>
  );
}
