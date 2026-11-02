import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Catalog from "@/components/product/Catalog";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { body, displayHeading, shell } from "@/components/ui/styles";
import { categories, getCategory, isSortId } from "@/lib/products";
import { routes } from "@/lib/routes";
import { openGraph, shareImage } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const category = getCategory((await params).handle);
  if (!category) return {};
  return {
    title: category.title,
    description: category.blurb,
    alternates: { canonical: routes.collection(category.handle) },
    openGraph: openGraph(shareImage("collections", category.handle, `${category.title} by Windmill`)),
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps<"/collections/[handle]">) {
  const category = getCategory((await params).handle);
  if (!category) notFound();
  const { type, sort } = await searchParams;
  const validType = category.types.some((t) => t.id === type) ? (type as string) : undefined;

  return (
    <>
      <div className={`${shell} pt-9 max-md:pt-6`}>
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Shop", href: routes.shop() }, { label: category.title }]} />
      </div>

      {/* same image + tint-band treatment as the home About section */}
      <header className="mt-8 bg-[linear-gradient(to_bottom,transparent_55%,#f3f7f4_55%)]">
        <div className={shell}>
          <div className="relative aspect-[1337/480] overflow-hidden max-md:aspect-[4/3]">
            <Photo src={category.image} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 1440px) 93vw, 1337px" className="object-cover" />
          </div>
          <div className="grid grid-cols-[1fr_1.2fr] items-end gap-10 pt-12 pb-14 max-md:grid-cols-1 max-md:gap-5 max-md:pt-8 max-md:pb-10">
            <h1 data-reveal="split" className={displayHeading}>
              {category.title.toUpperCase()}.
            </h1>
            <p data-reveal="lines" className={`${body} text-gray-body`}>
              {category.blurb}
            </p>
          </div>
        </div>
      </header>

      <div className="pt-10">
        <Catalog category={category} type={validType} sort={isSortId(sort) ? sort : "featured"} />
      </div>
    </>
  );
}
