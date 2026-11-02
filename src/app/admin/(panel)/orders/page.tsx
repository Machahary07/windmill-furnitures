import Link from "next/link";
import Form from "next/form";
import { AdminHeader, Empty, FilterTabs, OrderPill, card, field, ghostButton, orderStatusLabel, shortDate, tableRow, td, th } from "@/components/admin/ui";
import { listOrders, orders, statusOrder } from "@/lib/admin/data";
import { formatPrice } from "@/lib/money";
import { paymentMethods } from "@/lib/payment-methods";
import { adminRoutes } from "@/lib/routes";

export const metadata = { title: "Orders" };

const methodLabel = (id: string) => paymentMethods.find((m) => m.id === id)?.label ?? id;

export default async function OrdersPage({ searchParams }: PageProps<"/admin/orders">) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" && statusOrder.includes(sp.status as never) ? sp.status : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const list = listOrders({ status, q });

  return (
    <>
      <AdminHeader title="Orders" description="Every order is made to order — move each one along as the workshop finishes it." />

      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f0] p-3">
          <FilterTabs
            tabs={[
              { label: "All", href: adminRoutes.orders({ q }), active: !status, count: orders.length },
              ...statusOrder.map((s) => ({
                label: orderStatusLabel(s),
                href: adminRoutes.orders({ status: s, q }),
                active: status === s,
                count: orders.filter((o) => o.status === s).length,
              })),
            ]}
          />
          <Form action={adminRoutes.orders()} className="flex w-[300px] gap-2 max-md:w-full" role="search">
            {status && <input type="hidden" name="status" value={status} />}
            <label htmlFor="order-search" className="sr-only">
              Search orders
            </label>
            <input id="order-search" name="q" defaultValue={q} placeholder="Order, customer, city or piece" className={field} />
            <button type="submit" className={ghostButton}>
              Search
            </button>
          </Form>
        </div>

        {list.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Order</th>
                <th className={`${th} max-sm:hidden`}>Customer</th>
                <th className={`${th} max-lg:hidden`}>Pieces</th>
                <th className={`${th} max-md:hidden`}>Payment</th>
                <th className={`${th} text-right`}>Total</th>
                <th className={`${th} max-[480px]:hidden`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className={`${tableRow} relative`}>
                  <td className={td}>
                    {/* whole row is clickable via the stretched link */}
                    <Link prefetch={false} href={adminRoutes.order(o.id)} className="font-semibold after:absolute after:inset-0 hover:underline">
                      {o.id}
                    </Link>
                    <span className="block text-[12px] text-gray-nav">{shortDate(o.createdAt)}</span>
                    {/* the Customer and Status columns are hidden on phones */}
                    <span className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
                      <span className="text-[12px] font-semibold">{o.contact.name}</span>
                      <span className="min-[480px]:hidden">
                        <OrderPill status={o.status} />
                      </span>
                    </span>
                  </td>
                  <td className={`${td} max-sm:hidden`}>
                    <span className="block font-semibold">{o.contact.name}</span>
                    <span className="block text-[12px] text-gray-nav">
                      {o.address.city}, {o.address.state}
                    </span>
                  </td>
                  <td className={`${td} max-w-[260px] max-lg:hidden`}>
                    <span className="line-clamp-2">{o.lines.map((l) => `${l.qty > 1 ? `${l.qty} × ` : ""}${l.name}`).join(", ")}</span>
                  </td>
                  <td className={`${td} text-gray-body max-md:hidden`}>{methodLabel(o.payment.method)}</td>
                  <td className={`${td} text-right font-semibold whitespace-nowrap`}>{formatPrice(o.totals.total)}</td>
                  <td className={`${td} max-[480px]:hidden`}>
                    <OrderPill status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty title="No orders match">Try another search or status.</Empty>
        )}
      </div>
    </>
  );
}
