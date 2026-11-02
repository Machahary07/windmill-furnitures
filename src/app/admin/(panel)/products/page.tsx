import Link from "next/link";
import Form from "next/form";
import { PlusIcon } from "@/components/admin/icons";
import { AdminHeader, Empty, FilterTabs, button, card, field, ghostButton, tableRow, td, th } from "@/components/admin/ui";
import Photo from "@/components/ui/Photo";
import { formatPrice } from "@/lib/money";
import { cardImage, categories, products } from "@/lib/products";
import { adminRoutes } from "@/lib/routes";

export const metadata = { title: "Products" };

export default async function ProductsPage({ searchParams }: PageProps<"/admin/products">) {
  const sp = await searchParams;
  const category = categories.find((c) => c.handle === sp.category);
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const needle = q?.trim().toLowerCase();
  const list = products.filter(
    (p) => (!category || p.category === category.handle) && (!needle || [p.name, p.code, p.slug].join(" ").toLowerCase().includes(needle)),
  );

  return (
    <>
      <AdminHeader
        title="Products"
        description={`${products.length} pieces in the catalog, ${products.filter((p) => p.featured).length} featured on the home page.`}
        actions={
          <Link href={adminRoutes.newProduct} className={button}>
            <PlusIcon size={16} /> New product
          </Link>
        }
      />

      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f0] p-3">
          <FilterTabs
            tabs={[
              { label: "All", href: adminRoutes.products({ q }), active: !category, count: products.length },
              ...categories.map((c) => ({
                label: c.title,
                href: adminRoutes.products({ category: c.handle, q }),
                active: category?.handle === c.handle,
                count: products.filter((p) => p.category === c.handle).length,
              })),
            ]}
          />
          <Form action={adminRoutes.products()} role="search" className="flex w-[300px] gap-2 max-md:w-full">
            {category && <input type="hidden" name="category" value={category.handle} />}
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input id="product-search" name="q" defaultValue={q} placeholder="Name or code" className={field} />
            <button type="submit" className={ghostButton}>
              Search
            </button>
          </Form>
        </div>

        {list.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Product</th>
                <th className={`${th} max-md:hidden`}>Category</th>
                <th className={`${th} text-right`}>Price</th>
                <th className={`${th} max-sm:hidden`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => {
                const cat = categories.find((c) => c.handle === p.category)!;
                return (
                  <tr key={p.slug} className={`${tableRow} relative`}>
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Photo src={cardImage(p)} alt="" width={44} height={44} sizes="44px" className={`size-11 shrink-0 rounded-md ${p.drawing ? "bg-white object-contain" : "object-cover"}`} />
                        <div className="min-w-0">
                          <Link prefetch={false} href={adminRoutes.product(p.slug)} className="font-semibold after:absolute after:inset-0 hover:underline">
                            {p.name}
                          </Link>
                          <span className="block text-[12px] text-gray-nav">{p.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`${td} text-gray-body max-md:hidden`}>
                      {cat.title} · {cat.types.find((t) => t.id === p.type)?.label}
                    </td>
                    <td className={`${td} text-right font-semibold whitespace-nowrap`}>{formatPrice(p.price)}</td>
                    <td className={`${td} max-sm:hidden`}>
                      <span className="flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-[#eef6f1] px-2.5 py-1 text-[12px] font-semibold">Published</span>
                        {p.featured && <span className="rounded-full bg-[#f1f1ee] px-2.5 py-1 text-[12px] font-semibold">Featured</span>}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Empty title="No products match">Try another name or stock code.</Empty>
        )}
      </div>
    </>
  );
}
