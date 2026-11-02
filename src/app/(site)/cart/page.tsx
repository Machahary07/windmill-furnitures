import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/lib/routes";
import CartView from "./CartView";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader title="YOUR CART." crumbs={[{ label: "Home", href: routes.home }, { label: "Cart" }]} />
      <CartView />
    </>
  );
}
