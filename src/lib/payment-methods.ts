/* Plain module (no "use client") so server components — the admin order
   screens — get the real list; payments.ts re-exports it for the checkout. */
export const paymentMethods = [
  { id: "upi", label: "UPI", detail: "Google Pay, PhonePe, Paytm or any UPI app" },
  { id: "card", label: "Credit / debit card", detail: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net banking", detail: "All major Indian banks" },
  { id: "emi", label: "EMI", detail: "Card and cardless EMI on orders over ₹10,000" },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];
