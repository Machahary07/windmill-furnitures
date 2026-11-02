import type { Metadata } from "next";
import Confirmation from "./Confirmation";

export const metadata: Metadata = { title: "Order confirmed" };

export default async function SuccessPage({ params }: PageProps<"/checkout/success/[id]">) {
  return <Confirmation id={(await params).id} />;
}
