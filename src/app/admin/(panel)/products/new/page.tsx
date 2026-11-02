import ProductForm from "@/components/admin/ProductForm";
import { AdminHeader } from "@/components/admin/ui";
import { adminRoutes } from "@/lib/routes";

export const metadata = { title: "New product" };

export default function NewProductPage() {
  return (
    <>
      <AdminHeader back={{ href: adminRoutes.products(), label: "Products" }} title="New product" description="It goes live on the site once published." />
      <ProductForm />
    </>
  );
}
