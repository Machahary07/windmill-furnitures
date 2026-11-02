import type { Metadata } from "next";
import Invoice from "./Invoice";

export async function generateMetadata({ params }: PageProps<"/account/orders/[id]/invoice">): Promise<Metadata> {
  return { title: `Invoice ${(await params).id}`, robots: { index: false } };
}

export default async function InvoicePage({ params }: PageProps<"/account/orders/[id]/invoice">) {
  return <Invoice id={(await params).id} />;
}
