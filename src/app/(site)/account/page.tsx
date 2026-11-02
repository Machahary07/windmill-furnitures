"use client";

import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { formatDate, StatusBadge } from "@/components/account/OrderBits";
import { redLink, sectionHeading, smallBody } from "@/components/ui/styles";
import { formatPrice } from "@/lib/money";
import { routes } from "@/lib/routes";
import { useOrders, useSession } from "@/lib/store/account";

export default function AccountPage() {
  const session = useSession();
  const orders = useOrders();

  return (
    <div className="pb-[110px]">
      <p className="font-jakarta text-2xl font-bold text-ink">Hello, {session?.name.split(" ")[0]}.</p>
      <p className={`${smallBody} mt-1`}>{session?.email}</p>

      <h2 className={`${sectionHeading} mt-12`}>Your orders</h2>
      {orders.length === 0 ? (
        <div className="mt-6">
          <p className={smallBody}>No orders yet. When you place one, you can follow it through the workshop here.</p>
          <Link href={routes.shop()} className={`${redLink} mt-6`}>
            Browse the catalog
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-[#ececec] border-y border-[#ececec]">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={routes.order(o.id)} className="group flex items-center gap-6 py-5 max-sm:flex-wrap max-sm:gap-4">
                <div className="flex shrink-0 -space-x-4">
                  {o.lines.slice(0, 3).map((l) => (
                    <div key={l.slug + l.wood} className="relative size-[64px] overflow-hidden rounded-md border-2 border-white bg-[#f2f2f2]">
                      <Photo src={l.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-jakarta text-[15px] font-bold text-ink group-hover:underline">Order {o.id}</p>
                  <p className="mt-0.5 font-jakarta text-[13px] text-gray-nav">
                    {formatDate(o.createdAt)} · {o.lines.reduce((n, l) => n + l.qty, 0)} items
                  </p>
                </div>
                <StatusBadge status={o.status} />
                <p className="w-[110px] text-right font-jakarta text-[15px] font-bold text-ink max-sm:w-auto">{formatPrice(o.totals.total)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
