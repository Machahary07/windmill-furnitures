import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import PageHeader from "@/components/ui/PageHeader";
import { SearchIcon } from "@/components/ui/icons";
import { redLink, shell } from "@/components/ui/styles";
import { categories, searchProducts } from "@/lib/products";
import { projects } from "@/lib/projects";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 80) ?? "";
  const results = q ? searchProducts(q) : [];
  const projectHits = q ? projects.filter((p) => `${p.title} ${p.kind} ${p.summary}`.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <>
      <PageHeader title="SEARCH." crumbs={[{ label: "Home", href: routes.home }, { label: "Search" }]}>
        <Form action="/search" className="mt-9 flex max-w-[760px] items-center gap-4 border-b-2 border-ink pb-3" role="search">
          <SearchIcon size={22} className="shrink-0 text-search" />
          <label htmlFor="q" className="sr-only">
            Search furniture
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            autoFocus
            placeholder="Chairs, walnut, cane, WM-SE-01…"
            className="min-w-0 flex-1 bg-transparent font-jakarta text-2xl font-medium text-ink outline-none placeholder:text-faint max-md:text-lg"
          />
          <button type="submit" className="cursor-pointer font-jakarta text-[10px] font-semibold tracking-[0.3em] text-ink uppercase">
            Search
          </button>
        </Form>
      </PageHeader>

      <section className={`${shell} pb-[90px]`}>
        {!q ? (
          <div>
            <p className="font-jakarta text-[13px] font-medium text-gray-nav">Browse by category</p>
            <ul className="mt-5 flex flex-wrap gap-10">
              {categories.map((c) => (
                <li key={c.handle}>
                  <Link href={routes.collection(c.handle)} className={redLink}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <p className="font-jakarta text-[13px] font-medium text-gray-nav" role="status">
              {results.length} {results.length === 1 ? "piece" : "pieces"} for “{q}”
            </p>
            {results.length > 0 ? (
              <ul className="mt-8 grid grid-cols-4 gap-x-[25px] gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-4">
                {results.map((p, i) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} eager={i < 8} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 340px" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 max-w-[560px] font-jakarta text-base leading-7 text-gray-body">
                <p>Nothing in the catalog matches that yet. Most of what we make is drawn for a particular room, so we may well be able to make it.</p>
                <Link href={routes.bespoke(q)} className={`${redLink} mt-6`}>
                  Ask about a bespoke piece
                </Link>
              </div>
            )}
            {projectHits.length > 0 && (
              <div className="mt-16">
                <p className="font-jakarta text-[13px] font-medium text-gray-nav">Projects</p>
                <ul className="mt-4 space-y-2">
                  {projectHits.map((p) => (
                    <li key={p.slug}>
                      <Link href={routes.project(p.slug)} className="font-jakarta text-lg font-semibold text-ink hover:underline">
                        {p.title} <span className="font-normal text-gray-nav">— {p.kind}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
