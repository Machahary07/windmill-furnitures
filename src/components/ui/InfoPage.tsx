import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { eyebrow, shell } from "./styles";
import PageHeader from "./PageHeader";

const helpNav: { label: string; href: Route }[] = [
  { label: "Furniture care", href: routes.care },
  { label: "Shipping & returns", href: routes.shipping },
  { label: "FAQ", href: routes.faq },
  { label: "Terms of sale", href: routes.terms },
  { label: "Privacy policy", href: routes.privacy },
  { label: "Contact", href: routes.contact() },
];

/* Long-form help/legal page: header + sticky help nav + typeset body */
export default function InfoPage({
  title,
  current,
  intro,
  updated,
  children,
}: {
  title: string;
  current: Route;
  intro?: ReactNode;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} intro={intro} crumbs={[{ label: "Home", href: routes.home }, { label: "Help", href: routes.faq }, { label: helpNav.find((n) => n.href === current)?.label ?? title }]} />
      <div className={`${shell} grid grid-cols-[240px_1fr] gap-[6%] pb-[110px] max-lg:grid-cols-1 max-lg:gap-10`}>
        <nav aria-label="Help" className="h-fit lg:sticky lg:top-[90px]">
          <p className={eyebrow}>Help</p>
          <ul className="mt-4 space-y-1 border-l border-[#ececec] max-lg:flex max-lg:flex-wrap max-lg:gap-x-6 max-lg:space-y-0 max-lg:border-l-0">
            {helpNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={n.href === current ? "page" : undefined}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 font-jakarta text-sm font-medium text-gray-nav hover:text-ink aria-[current=page]:border-red aria-[current=page]:text-ink max-lg:ml-0 max-lg:border-l-0 max-lg:pl-0 max-lg:aria-[current=page]:underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article data-reveal className="max-w-[760px] font-jakarta text-base leading-7 text-gray-body [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:pl-1 [&_p+p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
          {updated && <p className="mt-16! border-t border-[#ececec] pt-6 text-[13px] text-gray-nav">Last updated {updated}</p>}
        </article>
      </div>
    </>
  );
}
