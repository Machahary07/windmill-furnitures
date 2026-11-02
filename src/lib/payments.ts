"use client";

/* Payment adapter. DEMO MODE: resolves after a short pause as if the customer
   completed payment. TODO(backend) — replace startPayment with:
     1. POST /api/orders → server creates a Razorpay order for the total
     2. load https://checkout.razorpay.com/v1/checkout.js and open it with that order id
     3. on success, POST the razorpay_payment_id + signature to the server to verify
     4. on dismiss/failure, route to routes.paymentFailed
   Card, UPI and bank details never touch this site — Razorpay collects them. */

export const paymentMethods = [
  { id: "upi", label: "UPI", detail: "Google Pay, PhonePe, Paytm or any UPI app" },
  { id: "card", label: "Credit / debit card", detail: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net banking", detail: "All major Indian banks" },
  { id: "emi", label: "EMI", detail: "Card and cardless EMI on orders over ₹10,000" },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export const isDemoPayments = true;

export async function startPayment(input: { amount: number; method: PaymentMethodId; email: string; phone: string }) {
  if (input.amount <= 0) return { ok: false as const };
  await new Promise((r) => setTimeout(r, 1400));
  return { ok: true as const };
}
