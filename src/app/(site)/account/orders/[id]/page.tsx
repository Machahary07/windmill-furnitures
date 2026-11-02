import type { Metadata } from "next";
import OrderDetail from "./OrderDetail";

export async function generateMetadata({ params }: PageProps<"/account/orders/[id]">): Promise<Metadata> {
  return { title: `Order ${(await params).id}` };
}

export default async function OrderPage({ params }: PageProps<"/account/orders/[id]">) {
  return <OrderDetail id={(await params).id} />;
}
