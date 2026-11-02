import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { isAdmin } from "@/lib/admin/auth";
import { enquiries, orders } from "@/lib/admin/data";
import { adminRoutes } from "@/lib/routes";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Windmill Admin" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  /* proxy.ts already redirects; this is the authoritative check */
  if (!(await isAdmin())) redirect(adminRoutes.login());
  return (
    <AdminShell newOrders={orders.filter((o) => o.status === "confirmed").length} newEnquiries={enquiries.filter((e) => e.status === "new").length}>
      {children}
    </AdminShell>
  );
}
