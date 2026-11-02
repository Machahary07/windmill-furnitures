import { notFound } from "next/navigation";
import Link from "next/link";
import ImageManager from "@/components/admin/ImageManager";
import PreviewForm from "@/components/admin/PreviewForm";
import { AdminHeader, Card, Field, area, field, hint } from "@/components/admin/ui";
import { products } from "@/lib/products";
import { getProject } from "@/lib/projects";
import { adminRoutes, routes } from "@/lib/routes";

const kinds = ["Residence", "Workplace", "Hospitality"] as const;

export async function generateMetadata({ params }: PageProps<"/admin/projects/[slug]">) {
  const { slug } = await params;
  return { title: slug === "new" ? "New project" : (getProject(slug)?.title ?? "Project") };
}

/* "new" shares this route: same form, empty */
export default async function ProjectPage({ params }: PageProps<"/admin/projects/[slug]">) {
  const { slug } = await params;
  const p = slug === "new" ? undefined : getProject(slug);
  if (slug !== "new" && !p) notFound();

  return (
    <>
      <AdminHeader back={{ href: adminRoutes.projects, label: "Projects" }} title={p?.title ?? "New project"} description={p ? `/projects/${p.slug}` : "It appears on the Projects page once saved."} />
      <PreviewForm saveLabel={p ? "Save project" : "Create project"}>
        <div className="grid grid-cols-[1fr_340px] items-start gap-4 max-lg:grid-cols-1">
          <div className="space-y-4">
            <Card title="Write-up">
              <div className="space-y-4">
                <Field label="Title" htmlFor="title">
                  <input id="title" name="title" required defaultValue={p?.title} className={field} />
                </Field>
                <Field label="Summary" htmlFor="summary" hint="One or two sentences, shown on the Projects page.">
                  <textarea id="summary" name="summary" defaultValue={p?.summary} className={`${area} min-h-[84px]`} />
                </Field>
                <Field label="The brief" htmlFor="body" hint="Leave a blank line between paragraphs.">
                  <textarea id="body" name="body" defaultValue={p?.body.join("\n\n")} className={`${area} min-h-[200px]`} />
                </Field>
              </div>
            </Card>
            <Card title="Photos">
              <ImageManager name="images" images={p?.images ?? []} />
              <p className={hint}>The first photo is the cover.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Details">
              <div className="space-y-4">
                <Field label="Link" htmlFor="slug" hint={<>windmillfurnitures.com/projects/{p?.slug ?? "…"}</>}>
                  <input id="slug" name="slug" required pattern="[a-z0-9\-]+" defaultValue={p?.slug} className={field} />
                </Field>
                <Field label="Kind" htmlFor="kind">
                  <select id="kind" name="kind" defaultValue={p?.kind} className={`${field} cursor-pointer`}>
                    {kinds.map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Location" htmlFor="location">
                  <input id="location" name="location" defaultValue={p?.location} className={field} />
                </Field>
                {p && (
                  <Link href={routes.project(p.slug)} target="_blank" className="inline-block font-jakarta text-[13px] font-semibold text-ink underline underline-offset-4">
                    View on site
                  </Link>
                )}
              </div>
            </Card>
            <Card title="Pieces in this project">
              <ul className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
                {products.map((prod) => (
                  <li key={prod.slug}>
                    <label className="flex cursor-pointer items-center gap-2.5 font-jakarta text-[13px] text-ink">
                      <input type="checkbox" name="pieces" value={prod.slug} defaultChecked={p?.pieces.includes(prod.slug)} className="size-4 accent-[#141414]" />
                      {prod.name}
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </PreviewForm>
    </>
  );
}
