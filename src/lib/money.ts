import { site } from "./site";

/* All prices are whole rupees, GST inclusive. Switch currency/locale here only. */
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const formatPrice = (amount: number) => inr.format(amount);

export type Totals = {
  subtotal: number;
  delivery: number;
  total: number;
  /** GST already included in total */
  gst: { taxable: number; cgst: number; sgst: number; igst: number };
};

export function computeTotals(subtotal: number, state?: string): Totals {
  const delivery =
    subtotal === 0 || !state || (site.freeDeliveryStates as readonly string[]).includes(state) ? 0 : site.deliveryCharge;
  const total = subtotal + delivery;
  const taxable = Math.round(total / (1 + site.gstRate));
  const tax = total - taxable;
  const intraState = !state || state === site.gstState;
  const half = Math.round(tax / 2);
  return {
    subtotal,
    delivery,
    total,
    gst: intraState ? { taxable, cgst: half, sgst: tax - half, igst: 0 } : { taxable, cgst: 0, sgst: 0, igst: tax },
  };
}
