"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddressBlock } from "@/components/account/OrderBits";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { eyebrow, primaryButton, redLink, sectionHeading, shell, smallBody } from "@/components/ui/styles";
import { computeTotals, formatPrice } from "@/lib/money";
import { isDemoPayments, paymentMethods, startPayment, type PaymentMethodId } from "@/lib/payments";
import { routes } from "@/lib/routes";
import { account, useCheckoutDraft } from "@/lib/store/account";
import { cart, useCart } from "@/lib/store/cart";
import { useHydrated } from "@/lib/store/persistent";

export default function PaymentStep() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { lines, subtotal } = useCart();
  const draft = useCheckoutDraft();
  const [method, setMethod] = useState<PaymentMethodId>("upi");
  const [status, setStatus] = useState<"idle" | "paying" | "done">("idle");

  if (!hydrated) return <div className={`${shell} min-h-[60vh]`} aria-busy="true" />;

  if (status === "done") {
    return (
      <div className={`${shell} py-24 text-center`} role="status">
        <p className="font-jakarta text-xl font-bold text-ink">Payment received — confirming your order…</p>
      </div>
    );
  }

  if (lines.length === 0 || !draft) {
    return (
      <div className={`${shell} py-20`}>
        <p className="font-jakarta text-xl font-bold text-ink">{lines.length === 0 ? "Your cart is empty." : "We need your delivery details first."}</p>
        <Link href={lines.length === 0 ? routes.shop() : routes.checkout} className={`${redLink} mt-6`}>
          {lines.length === 0 ? "Browse the catalog" : "Enter delivery details"}
        </Link>
      </div>
    );
  }

  const totals = computeTotals(subtotal, draft.address.state);
  const label = paymentMethods.find((m) => m.id === method)!.label;

  const pay = async () => {
    setStatus("paying");
    const result = await startPayment({ amount: totals.total, method, email: draft.contact.email, phone: draft.contact.phone });
    if (!result.ok) {
      setStatus("idle");
      router.push(routes.paymentFailed);
      return;
    }
    const order = account.placeOrder(draft, lines, label);
    setStatus("done");
    cart.clear();
    account.saveDraft({ ...draft, notes: undefined });
    router.replace(routes.orderConfirmed(order.id));
  };

  return (
    <div className={`${shell} grid grid-cols-[1fr_400px] gap-[70px] pt-12 pb-[110px] max-lg:grid-cols-1 max-lg:gap-12 max-md:pt-8`}>
      <div>
        <section className="grid grid-cols-2 gap-8 rounded-xl border border-border p-7 max-sm:grid-cols-1">
          <div>
            <p className={eyebrow}>Contact</p>
            <p className="mt-3 font-jakarta text-sm leading-6 text-ink">
              {draft.contact.email}
              <br />
              {draft.contact.phone}
            </p>
          </div>
          <div>
            <p className={eyebrow}>Deliver to</p>
            <div className="mt-3">
              <AddressBlock address={draft.address} />
            </div>
          </div>
          <Link href={routes.checkout} className="font-jakarta text-[13px] font-semibold text-ink underline underline-offset-4 sm:col-span-2">
            Change details
          </Link>
        </section>

        <section className="mt-12">
          <h2 className={sectionHeading}>Payment method</h2>
          <fieldset className="mt-6 divide-y divide-[#ececec] rounded-xl border border-border" disabled={status === "paying"}>
            <legend className="sr-only">Choose how to pay</legend>
            {paymentMethods.map((m) => (
              <label key={m.id} className="flex cursor-pointer items-center gap-4 px-6 py-5 has-checked:bg-[#f6f6f4]">
                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="size-4 accent-ink" />
                <span className="flex-1">
                  <span className="block font-jakarta text-[15px] font-semibold text-ink">{m.label}</span>
                  <span className="block font-jakarta text-[13px] text-gray-nav">{m.detail}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <p className={`${smallBody} mt-4`}>
            You’ll complete payment in Razorpay’s secure window. We never see or store your card or bank details.
          </p>
        </section>

        <button type="button" onClick={pay} disabled={status === "paying"} className={`${primaryButton} mt-10 w-full`}>
          {status === "paying" ? "Processing payment…" : `Pay ${formatPrice(totals.total)}`}
        </button>
        <p className={`${smallBody} mt-4 text-center text-[12px]`}>
          By placing this order you agree to our{" "}
          <Link href={routes.terms} className="text-ink underline underline-offset-2">
            terms of sale
          </Link>
          . Each piece is made to order.
          {isDemoPayments && " (Demo mode — no real payment is taken.)"}
        </p>
      </div>

      <CheckoutSummary lines={lines} state={draft.address.state} />
    </div>
  );
}
