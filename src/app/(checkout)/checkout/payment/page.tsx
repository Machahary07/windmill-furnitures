import type { Metadata } from "next";
import PaymentStep from "./PaymentStep";

export const metadata: Metadata = { title: "Payment" };

export default function PaymentPage() {
  return <PaymentStep />;
}
