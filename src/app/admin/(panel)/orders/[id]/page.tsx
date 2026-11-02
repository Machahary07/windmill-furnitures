import { notFound } from "next/navigation";
import Link from "next/link";
import OrderStatusControl from "@/components/admin/OrderStatusControl";
import PreviewForm from "@/components/admin/PreviewForm";
import { AdminHeader, Card, area, dateTime, ghostButton } from "@/components/admin/ui";
import Photo from "@/components/ui/Photo";
import { getAdminOrder } from "@/lib/admin/data";
import { formatPrice } from "@/lib/money";
import { paymentMethods } from "@/lib/payment-methods";
import { adminRoutes } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/admin/orders/[id]">) {
  return { title: `Order ${(await params).id}` };
}

const Row = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <div className={`flex justify-between gap-4 font-jakarta text-[13px] ${strong ? "border-t border-[#f0f0f0] pt-3 text-[15px] font-bold text-ink" : "text-gray-body"}`}>
    <dt>{label}</dt>
    <dd className={strong ? "" : "font-semibold text-ink"}>{value}</dd>
  </div>
);

export default async function OrderPage({ params }: PageProps<"/admin/orders/[id]">) {
  const order = getAdminOrder((await params).id);
  if (!order) notFound();
  const { totals, address, contact } = order;
  const intraState = totals.gst.igst === 0;

  return (
    <>
      <AdminHeader
        back={{ href: adminRoutes.orders(), label: "Orders" }}
        title={`Order ${order.id}`}
        description={`Placed ${dateTime(order.createdAt)} · Invoice ${order.invoiceNo}`}
        actions={
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Your Windmill order ${order.id}`)}`} className={ghostButton}>
            Email customer
          </a>
        }
      />

      <div className="grid grid-cols-[1fr_360px] items-start gap-4 max-lg:grid-cols-1">
        <div className="space-y-4">
          <Card title={`Pieces (${order.lines.reduce((n, l) => n + l.qty, 0)})`} padded={false}>
            <ul className="divide-y divide-[#f0f0f0]">
              {order.lines.map((l) => (
                <li key={l.slug + l.wood} className="flex items-center gap-4 px-5 py-4">
                  <Photo src={l.image} alt="" width={64} height={64} sizes="64px" className="size-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link href={adminRoutes.product(l.slug)} className="font-jakarta text-sm font-semibold text-ink hover:underline">
                      {l.name}
                    </Link>
                    <p className="font-jakarta text-[12px] text-gray-nav">
                      {l.code} · {l.wood}
                      {l.upholstery && ` · ${l.upholstery}`}
                    </p>
                  </div>
                  <p className="text-right font-jakarta text-[13px] text-gray-body">
                    {l.qty} × {formatPrice(l.price)}
                    <span className="block font-semibold text-ink">{formatPrice(l.qty * l.price)}</span>
                  </p>
                </li>
              ))}
            </ul>
            <dl className="space-y-2.5 border-t border-[#f0f0f0] px-5 py-4">
              <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
              <Row label="Delivery" value={totals.delivery ? formatPrice(totals.delivery) : "Free"} />
              {intraState ? (
                <>
                  <Row label="CGST 9% (included)" value={formatPrice(totals.gst.cgst)} />
                  <Row label="SGST 9% (included)" value={formatPrice(totals.gst.sgst)} />
                </>
              ) : (
                <Row label="IGST 18% (included)" value={formatPrice(totals.gst.igst)} />
              )}
              <Row label="Total paid" value={formatPrice(totals.total)} strong />
            </dl>
          </Card>

          {order.notes && (
            <Card title="Note from the customer">
              <p className="font-jakarta text-sm leading-6 text-gray-body">“{order.notes}”</p>
            </Card>
          )}

          <Card title="Workshop notes">
            <PreviewForm saveLabel="Save note" savedMessage="Note saved — preview only" className="">
              <label htmlFor="staff-notes" className="sr-only">
                Workshop notes
              </label>
              <textarea id="staff-notes" name="staffNotes" defaultValue={order.staffNotes} placeholder="Only staff see these notes." className={area} />
            </PreviewForm>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Status">
            <OrderStatusControl order={order} />
          </Card>

          <Card title="Customer">
            <p className="font-jakarta text-sm font-semibold text-ink">{contact.name}</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block font-jakarta text-[13px] text-gray-body hover:text-ink">
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block font-jakarta text-[13px] text-gray-body hover:text-ink">
              {contact.phone}
            </a>
            <Link href={adminRoutes.orders({ q: contact.email })} className="mt-3 inline-block font-jakarta text-[13px] font-semibold text-ink underline underline-offset-4">
              Order history
            </Link>
          </Card>

          <Card title="Delivery address">
            <address className="font-jakarta text-[13px] leading-6 text-gray-body not-italic">
              {address.name}
              <br />
              {address.line1}
              <br />
              {address.city}, {address.state} {address.pincode}
            </address>
            <p className="mt-3 font-jakarta text-[12px] text-gray-nav">
              {site.freeDeliveryStates.includes(address.state as never) ? "Free delivery zone" : `Outside the free zone — ${formatPrice(site.deliveryCharge)} charged`}
            </p>
          </Card>

          <Card title="Payment">
            <dl className="space-y-2.5">
              <Row label="Method" value={paymentMethods.find((m) => m.id === order.payment.method)?.label ?? order.payment.method} />
              <Row label="Razorpay ID" value={order.payment.reference} />
              <Row label="Status" value="Paid" />
            </dl>
          </Card>
        </div>
      </div>
    </>
  );
}
