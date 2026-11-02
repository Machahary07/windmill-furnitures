import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { AdminHeader } from "@/components/admin/ui";
import { getProduct } from "@/lib/products";
import { adminRoutes } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/admin/products/[slug]">) {
  return { title: getProduct((await params).slug)?.name ?? "Product" };
}

export default async function EditProductPage({ params }: PageProps<"/admin/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return (
    <>
      <AdminHeader back={{ href: adminRoutes.products(), label: "Products" }} title={product.name} description={product.code} />
      <ProductForm product={product} />
    </>
  );
}
