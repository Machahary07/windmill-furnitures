"use client";

import Link from "next/link";
import Photo from "@/components/ui/Photo";
import OrderSummary from "@/components/cart/OrderSummary";
import { AddressBlock, formatDate, StatusBadge, StatusRail } from "@/components/account/OrderBits";
import { eyebrow, redLink, secondaryButton, smallBody } from "@/components/ui/styles";
import { formatPrice } from "@/lib/money";
import { routes } from "@/lib/routes";
import { useOrders } from "@/lib/store/account";

export default function OrderDetail({ id }: { id: string }) {
  const order = useOrders().find((o) => o.id === id);

  if (!order) {
    return (
      <div className="pb-[110px]">
        <p className="font-jakarta text-xl font-bold text-ink">We couldn’t find order {id}.</p>
        <p className={`${smallBody} mt-3`}>It may have been placed from another device or account.</p>
        <Link href={routes.account} className={`${redLink} mt-6`}>
          All orders
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-[110px]">
      <Link href={routes.account} className="font-jakarta text-[13px] font-medium text-gray-nav hover:text-ink">
        ← All orders
      </Link>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-jakarta text-[32px] font-bold text-ink">Order {order.id}</h2>
          <p className="mt-1 font-jakarta text-sm text-gray-nav">Placed {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={order.status} />
          <Link href={routes.invoice(order.id)} className={secondaryButton}>
            GST invoice
          </Link>
        </div>
      </div>

      <div className="mt-9 max-w-[720px]">
        <StatusRail status={order.status} />
      </div>

      <div className="mt-12 grid grid-cols-[1fr_360px] gap-[70px] max-lg:grid-cols-1 max-lg:gap-12">
        <ul className="divide-y divide-[#ececec] border-y border-[#ececec]">
          {order.lines.map((l) => (
            <li key={l.slug + l.wood + l.upholstery} className="flex gap-5 py-5">
              <Link href={routes.product(l.slug)} className="relative h-[110px] w-[96px] shrink-0 overflow-hidden rounded-md bg-[#f2f2f2]">
                <Photo src={l.image} alt={l.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <Link href={routes.product(l.slug)} className="font-jakarta text-sm font-semibold tracking-[0.04em] text-ink uppercase hover:underline">
                    {l.name}
                  </Link>
                  <p className="font-jakarta text-sm font-bold text-ink">{formatPrice(l.price * l.qty)}</p>
                </div>
                <p className="mt-1 font-jakarta text-[12px] text-gray-nav">
                  {l.code} · {l.wood}
                  {l.upholstery && ` · Upholstery ${l.upholstery}`} · Qty {l.qty}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="space-y-9">
          <OrderSummary totals={order.totals} />
          <div>
            <p className={eyebrow}>Delivering to</p>
            <div className="mt-3">
              <AddressBlock address={order.address} />
            </div>
          </div>
          <div>
            <p className={eyebrow}>Payment</p>
            <p className="mt-3 font-jakarta text-sm text-gray-body">
              {order.payment.method} · <span className="text-[12px]">{order.payment.reference}</span>
            </p>
          </div>
          <p className={smallBody}>
            Questions about this order?{" "}
            <Link href={routes.contact("order")} className="text-ink underline underline-offset-2">
              Contact the studio
            </Link>{" "}
            and quote {order.id}.
          </p>
        </aside>
      </div>
    </div>
  );
}
