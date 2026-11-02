import Link from "next/link";
import ChipList from "@/components/admin/ChipList";
import PreviewForm from "@/components/admin/PreviewForm";
import { AdminHeader, Card, Field, area, field } from "@/components/admin/ui";
import Photo from "@/components/ui/Photo";
import { categories, products } from "@/lib/products";
import { adminRoutes, routes } from "@/lib/routes";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <AdminHeader title="Categories" description="The four shop sections and the types inside each. Types become the filter chips on each collection page." />
      <PreviewForm>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          {categories.map((c) => (
            <Card
              key={c.handle}
              title={c.title}
              actions={
                <Link href={adminRoutes.products({ category: c.handle })} className="font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">
                  {products.filter((p) => p.category === c.handle).length} products
                </Link>
              }
            >
              <div className="flex gap-4 max-sm:flex-col">
                <div className="relative aspect-[4/5] w-[120px] shrink-0 overflow-hidden rounded-lg max-sm:aspect-[16/9] max-sm:w-full">
                  <Photo src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 120px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <Field label="Title" htmlFor={`title-${c.handle}`} hint={<Link href={routes.collection(c.handle)} target="_blank" className="hover:text-ink">/collections/{c.handle}</Link>}>
                    <input id={`title-${c.handle}`} name={`${c.handle}.title`} defaultValue={c.title} className={field} />
                  </Field>
                  <Field label="Intro" htmlFor={`blurb-${c.handle}`}>
                    <textarea id={`blurb-${c.handle}`} name={`${c.handle}.blurb`} defaultValue={c.blurb} className={`${area} min-h-[96px]`} />
                  </Field>
                </div>
              </div>
              <div className="mt-5 border-t border-[#f0f0f0] pt-4">
                <p className="mb-2.5 font-jakarta text-[13px] font-semibold text-ink">Types</p>
                <ChipList name={`${c.handle}.types`} items={c.types.map((t) => t.label)} placeholder="Add a type, e.g. Benches" />
              </div>
            </Card>
          ))}
        </div>
      </PreviewForm>
    </>
  );
}
