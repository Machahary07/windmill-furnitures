import Link from "next/link";
import { categories, listProducts, sortOptions, type Category, type SortId } from "@/lib/products";
import { routes } from "@/lib/routes";
import { redLink, shell } from "@/components/ui/styles";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";

const tabClass =
  "relative pb-3 font-jakarta text-[15px] font-medium text-gray-nav transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-red";

const chipClass =
  "rounded-full border px-4 py-1.5 font-jakarta text-[13px] font-medium transition-colors aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white border-border text-gray-body hover:border-ink";

/* Category tabs + type chips + sort + grid. Filters are plain links, so every
   filtered view has its own shareable URL and works without JavaScript. */
export default function Catalog({ category, type, sort }: { category?: Category; type?: string; sort: SortId }) {
  const list = listProducts({ category: category?.handle, type, sort });
  const hrefFor = (next: { type?: string; sort?: SortId }) => {
    const s = next.sort === "featured" ? undefined : next.sort;
    return category ? routes.collection(category.handle, { type: next.type, sort: s }) : routes.shop({ sort: s });
  };

  return (
    <section className={`${shell} pb-[90px]`}>
      <nav aria-label="Categories" className="flex gap-9 overflow-x-auto no-scrollbar shadow-[inset_0_-1px_0_#ececec] max-md:gap-6 max-[380px]:gap-4">
        <Link href={routes.shop()} aria-current={!category ? "page" : undefined} className={tabClass}>
          All
        </Link>
        {categories.map((c) => (
          <Link key={c.handle} href={routes.collection(c.handle)} aria-current={category?.handle === c.handle ? "page" : undefined} className={tabClass}>
            {c.title}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {category ? (
          <nav aria-label={`${category.title} types`} className="flex flex-wrap gap-2.5">
            <Link href={hrefFor({ sort })} aria-current={!type ? "page" : undefined} className={chipClass}>
              All {category.title.toLowerCase()}
            </Link>
            {category.types.map((t) => (
              <Link key={t.id} href={hrefFor({ type: t.id, sort })} aria-current={type === t.id ? "page" : undefined} className={chipClass}>
                {t.label}
              </Link>
            ))}
          </nav>
        ) : (
          <p className="font-jakarta text-[13px] font-medium text-gray-nav">{list.length} pieces, each made to order</p>
        )}
        <SortSelect value={sort} options={sortOptions.map((o) => ({ ...o, href: hrefFor({ type, sort: o.id }) }))} />
      </div>

      {list.length > 0 ? (
        <ul className="mt-9 grid grid-cols-4 gap-x-[25px] gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-4">
          {list.map((p, i) => (
            <li key={p.slug} data-reveal>
              <ProductCard product={p} eager={i < 8} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 340px" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-24 text-center">
          <p className="font-jakarta text-xl font-bold text-ink">Nothing here yet.</p>
          <Link href={category ? routes.collection(category.handle) : routes.shop()} className={`${redLink} mt-6`}>
            Clear filters
          </Link>
        </div>
      )}
    </section>
  );
}
