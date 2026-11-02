import Link from "next/link";
import { AdminHeader, Card, EnquiryPill, OrderPill, card, dateTime, orderStatusLabel, shortDate, tableRow, td, th } from "@/components/admin/ui";
import Photo from "@/components/ui/Photo";
import { TODAY, dashboardStats, enquiries, enquiryTopics, orders } from "@/lib/admin/data";
import { formatPrice } from "@/lib/money";
import { adminRoutes } from "@/lib/routes";

/* the panel layout's title template only reaches nested segments, not this page */
export const metadata = { title: { absolute: "Dashboard — Windmill Admin" } };

const change = (now: number, before: number) => {
  if (!before) return null;
  const pct = Math.round(((now - before) / before) * 100);
  return { pct, up: pct >= 0 };
};

export default function DashboardPage() {
  const s = dashboardStats();
  const stats = [
    { label: "Revenue, last 30 days", value: formatPrice(s.revenue30), delta: change(s.revenue30, s.revenuePrev30), href: adminRoutes.orders() },
    { label: "Orders, last 30 days", value: String(s.orders30), delta: change(s.orders30, s.ordersPrev30), href: adminRoutes.orders() },
    { label: "In the workshop", value: String(s.inWorkshop), note: `${s.toDispatch} new to start`, href: adminRoutes.orders({ status: "in-production" }) },
    { label: "New enquiries", value: String(s.newEnquiries), note: "Waiting for a reply", href: adminRoutes.enquiries({ status: "new" }) },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description={new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${TODAY}T12:00:00+05:30`))}
      />

      <ul className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
        {stats.map((st) => (
          <li key={st.label}>
            <Link href={st.href} className={`${card} block p-5 transition-colors hover:border-[#d6d6d6]`}>
              <p className="font-jakarta text-[13px] font-semibold text-gray-nav">{st.label}</p>
              <p className="mt-3 font-jakarta text-[28px] leading-none font-bold tracking-[-0.01em] text-ink">{st.value}</p>
              <p className="mt-3 font-jakarta text-[12px] font-semibold text-gray-nav">
                {st.delta ? (
                  <>
                    <span className={st.delta.up ? "text-[#2f7a4f]" : "text-red"}>
                      {st.delta.up ? "▲" : "▼"} {Math.abs(st.delta.pct)}%
                    </span>{" "}
                    vs previous 30 days
                  </>
                ) : (
                  st.note
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-[1.6fr_1fr] items-start gap-4 max-xl:grid-cols-1">
        {/* two independent columns, so neither leaves a gap under a shorter card */}
        <div className="space-y-4">
          <Card title="Workshop pipeline" actions={<Link href={adminRoutes.orders()} className="font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">All orders</Link>}>
            <ol className="grid grid-cols-4 gap-3 max-sm:grid-cols-2">
              {s.pipeline.map((p, i) => (
                <li key={p.status}>
                  <Link prefetch={false} href={adminRoutes.orders({ status: p.status })} className="block rounded-lg bg-[#f7f7f4] p-4 transition-colors hover:bg-[#f0f0ec]">
                    <span className="font-jakarta text-[11px] font-semibold tracking-[0.08em] text-faint uppercase">Step {i + 1}</span>
                    <span className="mt-1 block font-jakarta text-[13px] font-semibold text-ink">{orderStatusLabel(p.status)}</span>
                    <span className="mt-4 block font-jakarta text-[26px] leading-none font-bold text-ink">{p.count}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Recent orders" padded={false} actions={<Link href={adminRoutes.orders()} className="font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">View all</Link>}>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={th}>Order</th>
                  <th className={`${th} max-sm:hidden`}>Customer</th>
                  <th className={`${th} max-md:hidden`}>Placed</th>
                  <th className={`${th} text-right`}>Total</th>
                  <th className={`${th} max-[420px]:hidden`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className={tableRow}>
                    <td className={td}>
                      <Link prefetch={false} href={adminRoutes.order(o.id)} className="font-semibold hover:underline">
                        {o.id}
                      </Link>
                    </td>
                    <td className={`${td} max-sm:hidden`}>{o.contact.name}</td>
                    <td className={`${td} text-gray-nav max-md:hidden`}>{shortDate(o.createdAt)}</td>
                    <td className={`${td} text-right font-semibold`}>{formatPrice(o.totals.total)}</td>
                    <td className={`${td} max-[420px]:hidden`}>
                      <OrderPill status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <div className="space-y-4">
          <Card title="Top pieces" padded={false}>
            <ul className="divide-y divide-[#f0f0f0]">
              {s.topProducts.map((p) => (
                <li key={p.slug}>
                  <Link prefetch={false} href={adminRoutes.product(p.slug)} className="flex items-center gap-3 px-5 py-3 hover:bg-[#fafaf8]">
                    <Photo src={p.image} alt="" width={40} height={40} sizes="40px" className="size-10 shrink-0 rounded-md object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-jakarta text-[13px] font-semibold text-ink">{p.name}</span>
                      <span className="block font-jakarta text-[12px] text-gray-nav">{p.qty} sold</span>
                    </span>
                    <span className="font-jakarta text-[13px] font-semibold text-ink">{formatPrice(p.revenue)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Latest enquiries" padded={false} actions={<Link href={adminRoutes.enquiries()} className="font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">Inbox</Link>}>
            <ul className="divide-y divide-[#f0f0f0]">
              {enquiries.slice(0, 4).map((e) => (
                <li key={e.id}>
                  <Link prefetch={false} href={adminRoutes.enquiries({ id: e.id })} className="block px-5 py-3.5 hover:bg-[#fafaf8]">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate font-jakarta text-[13px] font-semibold text-ink">{e.name}</span>
                      <EnquiryPill status={e.status} />
                    </span>
                    <span className="mt-1 block font-jakarta text-[12px] text-gray-nav">
                      {enquiryTopics[e.topic]} · {dateTime(e.receivedAt)}
                    </span>
                    <span className="mt-1.5 line-clamp-1 block font-jakarta text-[13px] text-gray-body">{e.message}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
