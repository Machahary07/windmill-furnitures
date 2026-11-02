"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { formatDate } from "@/components/account/OrderBits";
import { primaryButton, redLink } from "@/components/ui/styles";
import { formatPrice } from "@/lib/money";
import { getProduct } from "@/lib/products";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { useOrders } from "@/lib/store/account";
import { useHydrated } from "@/lib/store/persistent";

/* HSN 9401 = seats, 9403 = other furniture */
const hsnFor = (slug: string) => (getProduct(slug)?.category === "seating" ? "9401" : "9403");

/* TODO(backend): generate the invoice server-side (numbered series, GSTIN,
   signature) and offer it as a PDF; this printable view mirrors that layout. */
export default function Invoice({ id }: { id: string }) {
  const hydrated = useHydrated();
  const order = useOrders().find((o) => o.id === id);

  if (!hydrated) return null;
  if (!order) {
    return (
      <main className="mx-auto max-w-[820px] px-6 py-20 font-jakarta">
        <p className="text-xl font-bold text-ink">Invoice not found.</p>
        <Link href={routes.account} className={`${redLink} mt-6`}>
          Back to your account
        </Link>
      </main>
    );
  }

  const { totals } = order;
  const cell = "border-b border-[#ececec] py-3 align-top";

  return (
    <main className="mx-auto max-w-[820px] px-6 py-12 font-jakarta text-[13px] text-ink print:max-w-none print:p-0">
      <div className="no-print mb-10 flex items-center justify-between gap-4">
        <Link href={routes.order(order.id)} className="text-[13px] font-medium text-gray-nav hover:text-ink">
          ← Order {order.id}
        </Link>
        <button type="button" onClick={() => window.print()} className={primaryButton}>
          Print / Save PDF
        </button>
      </div>

      <header className="flex items-start justify-between gap-8 border-b-2 border-ink pb-6">
        <div>
          <Logo />
          <address className="mt-3 leading-5 text-gray-body not-italic">
            {site.legalName}
            <br />
            {site.address.slice(1).join(", ")}
            <br />
            {site.email}
            {site.gstin && (
              <>
                <br />
                GSTIN {site.gstin}
              </>
            )}
          </address>
        </div>
        <div className="text-right">
          <h1 className="font-outfit text-[28px] leading-none font-bold tracking-[0.12em]">TAX INVOICE</h1>
          <dl className="mt-4 grid grid-cols-[auto_auto] justify-end gap-x-4 gap-y-1 text-gray-body">
            <dt>Invoice no.</dt>
            <dd className="font-semibold text-ink">INV-{order.id}</dd>
            <dt>Order</dt>
            <dd className="text-ink">{order.id}</dd>
            <dt>Date</dt>
            <dd className="text-ink">{formatDate(order.createdAt)}</dd>
            <dt>Place of supply</dt>
            <dd className="text-ink">{order.address.state}</dd>
          </dl>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-nav uppercase">Billed to</p>
          <p className="mt-2 leading-5">
            <strong>{order.contact.name}</strong>
            <br />
            {order.contact.email}
            <br />
            {order.contact.phone}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-nav uppercase">Shipped to</p>
          <p className="mt-2 leading-5">
            <strong>{order.address.name}</strong>
            <br />
            {order.address.line1}
            {order.address.line2 && `, ${order.address.line2}`}
            <br />
            {order.address.city}, {order.address.state} {order.address.pincode}
          </p>
        </div>
      </section>

      <table className="mt-8 w-full border-collapse text-left">
        <thead>
          <tr className="text-[10px] tracking-[0.15em] text-gray-nav uppercase">
            <th className="border-b border-ink pb-2 font-semibold">Item</th>
            <th className="border-b border-ink pb-2 font-semibold">HSN</th>
            <th className="border-b border-ink pb-2 text-right font-semibold">Qty</th>
            <th className="border-b border-ink pb-2 text-right font-semibold">Rate</th>
            <th className="border-b border-ink pb-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.lines.map((l) => (
            <tr key={l.slug + l.wood + l.upholstery}>
              <td className={cell}>
                <strong>{l.name}</strong>
                <br />
                <span className="text-gray-nav">
                  {l.code} · {l.wood}
                  {l.upholstery && ` · ${l.upholstery}`}
                </span>
              </td>
              <td className={cell}>{hsnFor(l.slug)}</td>
              <td className={`${cell} text-right`}>{l.qty}</td>
              <td className={`${cell} text-right`}>{formatPrice(l.price)}</td>
              <td className={`${cell} text-right`}>{formatPrice(l.price * l.qty)}</td>
            </tr>
          ))}
          {totals.delivery > 0 && (
            <tr>
              <td className={cell} colSpan={4}>
                Delivery
              </td>
              <td className={`${cell} text-right`}>{formatPrice(totals.delivery)}</td>
            </tr>
          )}
        </tbody>
      </table>

      <dl className="mt-6 ml-auto grid w-[300px] grid-cols-[1fr_auto] gap-y-1.5 text-gray-body">
        <dt>Taxable value</dt>
        <dd className="text-right text-ink">{formatPrice(totals.gst.taxable)}</dd>
        {totals.gst.igst ? (
          <>
            <dt>IGST @ 18%</dt>
            <dd className="text-right text-ink">{formatPrice(totals.gst.igst)}</dd>
          </>
        ) : (
          <>
            <dt>CGST @ 9%</dt>
            <dd className="text-right text-ink">{formatPrice(totals.gst.cgst)}</dd>
            <dt>SGST @ 9%</dt>
            <dd className="text-right text-ink">{formatPrice(totals.gst.sgst)}</dd>
          </>
        )}
        <dt className="mt-2 border-t border-ink pt-2 text-[15px] font-bold text-ink">Total</dt>
        <dd className="mt-2 border-t border-ink pt-2 text-right text-[15px] font-bold text-ink">{formatPrice(totals.total)}</dd>
      </dl>

      <footer className="mt-12 border-t border-[#ececec] pt-5 text-[12px] leading-5 text-gray-nav">
        Paid by {order.payment.method} · ref. {order.payment.reference}. Prices include GST. This is a computer-generated invoice.
      </footer>
    </main>
  );
}
