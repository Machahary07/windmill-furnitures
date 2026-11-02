import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { body, displayHeading, eyebrow, shell } from "./styles";

export type Crumb = { label: string; href?: Route };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-jakarta text-[12px] font-medium text-gray-nav">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* Text page header in the "ABOUT US." style */
export default function PageHeader({
  title,
  kicker,
  intro,
  crumbs,
  children,
}: {
  title: string;
  kicker?: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className={`${shell} pt-9 pb-[52px] max-md:pt-6 max-md:pb-9`}>
      {crumbs && <Breadcrumbs items={crumbs} />}
      {kicker && <p className={`${eyebrow} mt-[42px] max-md:mt-8`}>{kicker}</p>}
      <h1 data-reveal="split" className={`${displayHeading} ${kicker ? "mt-4" : "mt-[42px] max-md:mt-8"}`}>
        {title}
      </h1>
      {intro && (
        <div data-reveal className={`${body} mt-7 max-w-[760px] text-gray-body`}>
          {intro}
        </div>
      )}
      {children}
    </header>
  );
}
