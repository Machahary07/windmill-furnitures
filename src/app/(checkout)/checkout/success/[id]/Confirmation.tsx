"use client";

import Link from "next/link";
import OrderSummary from "@/components/cart/OrderSummary";
import { AddressBlock, formatDate } from "@/components/account/OrderBits";
import { displayHeading, eyebrow, primaryButton, redLink, secondaryButton, shell, smallBody } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { useOrders } from "@/lib/store/account";
import { useHydrated } from "@/lib/store/persistent";

const nextSteps = [
  { title: "Confirmation", text: "A receipt is on its way to your inbox." },
  { title: "Into the workshop", text: "Your piece is scheduled and the timber selected for it." },
  { title: "Progress updates", text: "We email you as your piece moves through carpentry and polishing." },
  { title: "Delivery", text: "We call to agree a delivery date before it leaves Aya Nagar." },
];

export default function Confirmation({ id }: { id: string }) {
  const hydrated = useHydrated();
  const order = useOrders().find((o) => o.id === id);

  if (!hydrated) return <div className={`${shell} min-h-[60vh]`} aria-busy="true" />;

  if (!order) {
    return (
      <div className={`${shell} py-20`}>
        <p className="font-jakarta text-xl font-bold text-ink">We couldn’t find order {id} on this device.</p>
        <p className={`${smallBody} mt-3`}>If you were charged, your confirmation email has the details — or contact the studio.</p>
        <Link href={routes.contact("order")} className={`${redLink} mt-6`}>
          Contact the studio
        </Link>
      </div>
    );
  }

  return (
    <div className={`${shell} pt-16 pb-[110px] max-md:pt-10`}>
      <p className={eyebrow}>Order {order.id} · {formatDate(order.createdAt)}</p>
      <h1 className={`${displayHeading} mt-4`}>THANK YOU.</h1>
      <p className="mt-6 max-w-[640px] font-jakarta text-lg leading-[30px] text-gray-body">
        Your order is confirmed, {order.contact.name.split(" ")[0]}. We’ve sent a receipt to <strong className="text-ink">{order.contact.email}</strong>. Every piece
        is made by hand, so here is what happens next.
      </p>

      <ol className="mt-12 grid grid-cols-4 border-t border-ink max-lg:grid-cols-2 max-sm:grid-cols-1">
        {nextSteps.map((s, i) => (
          <li key={s.title} className={`pt-6 pr-6 pb-8 ${i > 0 ? "lg:border-l lg:border-[#e6e6e6] lg:pl-6" : ""}`}>
            <span className="font-jakarta text-[25px] font-medium text-ink">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-4 font-jakarta text-lg font-bold text-ink">{s.title}</p>
            <p className="mt-1 font-jakarta text-sm leading-6 text-gray-body">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid grid-cols-[1fr_400px] gap-[70px] max-lg:grid-cols-1 max-lg:gap-10">
        <div>
          <p className={eyebrow}>Delivering to</p>
          <div className="mt-3">
            <AddressBlock address={order.address} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={routes.order(order.id)} className={primaryButton}>
              View order
            </Link>
            <Link href={routes.invoice(order.id)} className={secondaryButton}>
              GST invoice
            </Link>
          </div>
          <Link href={routes.shop()} className={`${redLink} mt-10`}>
            Continue shopping
          </Link>
        </div>
        <div className="rounded-xl bg-[#f6f6f4] p-8">
          <OrderSummary totals={order.totals} />
        </div>
      </div>
    </div>
  );
}
