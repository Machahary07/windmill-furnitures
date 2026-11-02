import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/lib/routes";
import WishlistView from "./WishlistView";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <>
      <PageHeader title="WISHLIST." crumbs={[{ label: "Home", href: routes.home }, { label: "Wishlist" }]} />
      <WishlistView />
    </>
  );
}
