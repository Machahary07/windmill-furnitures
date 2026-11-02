import type { Metadata } from "next";
import Catalog from "@/components/product/Catalog";
import PageHeader from "@/components/ui/PageHeader";
import { isSortId } from "@/lib/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handcrafted solid-wood seating, tables, storage and beds — every piece made to order in our New Delhi workshop.",
  alternates: { canonical: routes.shop() },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const { sort } = await searchParams;
  return (
    <>
      <PageHeader
        title="CATALOG."
        crumbs={[{ label: "Home", href: routes.home }, { label: "Shop" }]}
        intro="Every piece below is made to order in our Aya Nagar workshop, in the wood and upholstery you choose. Photographed pieces are ready designs; pieces shown as drawings are built from our workshop drawings."
      />
      <Catalog sort={isSortId(sort) ? sort : "featured"} />
    </>
  );
}
