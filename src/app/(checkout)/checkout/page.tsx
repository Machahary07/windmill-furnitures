import type { Metadata } from "next";
import CheckoutDetails from "./CheckoutDetails";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <CheckoutDetails />;
}
