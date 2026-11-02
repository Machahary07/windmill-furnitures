import Link from "next/link";
import { categories, upholstery, woodTypes, type Product } from "@/lib/products";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import CategoryTypeFields from "./CategoryTypeFields";
import ImageManager from "./ImageManager";
import PreviewForm from "./PreviewForm";
import { Card, Field, Toggle, area, field, hint } from "./ui";

/* Product editor, shared by "new" and "edit". Field names mirror the
   Product type so they map 1:1 onto the Payload collection later. */
export default function ProductForm({ product }: { product?: Product }) {
  const p = product;
  return (
    <PreviewForm saveLabel={p ? "Save product" : "Create product"} savedMessage={p ? "Product saved — preview only" : "Product created — preview only"}>
      <div className="grid grid-cols-[1fr_340px] items-start gap-4 max-lg:grid-cols-1">
        <div className="space-y-4">
          <Card title="Details">
            <div className="space-y-4">
              <Field label="Name" htmlFor="name">
                <input id="name" name="name" required defaultValue={p?.name} placeholder="e.g. Library Easy Chair" className={field} />
              </Field>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <Field label="Link" htmlFor="slug" hint={<>windmillfurnitures.com/products/{p?.slug ?? "…"}</>}>
                  <input id="slug" name="slug" required pattern="[a-z0-9\-]+" defaultValue={p?.slug} placeholder="library-easy-chair" className={field} />
                </Field>
                <Field label="Stock code" htmlFor="code" hint="Also a short link: /p/CODE">
                  <input id="code" name="code" required defaultValue={p?.code} placeholder="WM-SE-01" className={`${field} uppercase`} />
                </Field>
              </div>
              <Field label="Description" htmlFor="description">
                <textarea id="description" name="description" defaultValue={p?.description} className={area} />
              </Field>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <Field label="Dimensions" htmlFor="dimensions">
                  <input id="dimensions" name="dimensions" defaultValue={p?.dimensions} placeholder={'25″W x 29½″D x 16½″H'} className={field} />
                </Field>
                <Field label="Materials" htmlFor="materials">
                  <input id="materials" name="materials" defaultValue={p?.materials} className={field} />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Photos">
            <ImageManager name="images" images={p?.images ?? []} />
            <p className={hint}>The first photo is the main image — use the arrows to change the order.</p>
            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-[#f0f0f0] pt-5 max-sm:grid-cols-1">
              <div>
                <p className="mb-2 font-jakarta text-[13px] font-semibold text-ink">Catalog card</p>
                <ImageManager name="card" images={p?.card ? [p.card] : []} columns="grid-cols-2" />
                <p className={hint}>Portrait crop for the shop grid. Falls back to the main photo.</p>
              </div>
              <div>
                <p className="mb-2 font-jakarta text-[13px] font-semibold text-ink">Cut-out</p>
                <ImageManager name="cutout" images={p?.cutout ? [p.cutout] : []} columns="grid-cols-2" />
                <p className={hint}>Transparent PNG shown beside the care notes.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Visibility">
            <div className="space-y-4">
              <Field label="Status" htmlFor="status">
                <select id="status" name="status" defaultValue="published" className={`${field} cursor-pointer`}>
                  <option value="published">Published — on the site</option>
                  <option value="draft">Draft — hidden</option>
                </select>
              </Field>
              <Toggle name="featured" label="Featured" detail="Shown in the home page catalog" defaultChecked={p?.featured} />
              {p && (
                <Link href={routes.product(p.slug)} target="_blank" className="inline-block font-jakarta text-[13px] font-semibold text-ink underline underline-offset-4">
                  View on site
                </Link>
              )}
            </div>
          </Card>

          <Card title="Organisation">
            <CategoryTypeFields categories={categories.map(({ handle, title, types }) => ({ handle, title, types }))} category={p?.category} type={p?.type} />
          </Card>

          <Card title="Price">
            <Field label="Price (₹, incl. GST)" htmlFor="price" hint={`GST ${site.gstRate * 100}% is included and split on the invoice.`}>
              <input id="price" name="price" type="number" min={0} step={500} required defaultValue={p?.price} className={field} />
            </Field>
          </Card>

          <Card title="Options">
            <div className="space-y-4">
              <fieldset>
                <legend className="mb-2 font-jakarta text-[13px] font-semibold text-ink">Woods offered</legend>
                <ul className="grid grid-cols-2 gap-2">
                  {woodTypes.map((w) => (
                    <li key={w.id}>
                      <label className="flex cursor-pointer items-center gap-2 font-jakarta text-[13px] text-ink">
                        <input type="checkbox" name="woods" value={w.id} defaultChecked className="size-4 accent-[#141414]" />
                        {w.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
              <Toggle name="upholstered" label="Upholstered" detail={`Customer picks one of ${upholstery.length} fabrics`} defaultChecked={p?.upholstered} />
              <Toggle name="drawing" label="Images are drawings" detail="Show photos on white, uncropped" defaultChecked={p?.drawing} />
            </div>
          </Card>
        </div>
      </div>
    </PreviewForm>
  );
}
