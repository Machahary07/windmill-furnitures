import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { eyebrow, shell } from "@/components/ui/styles";
import { projects } from "@/lib/projects";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Projects",
  description: "Houses, hotels and workplaces furnished by Windmill — bespoke furniture drawn and made for each space.",
};

export default function ProjectsPage() {
  const [lead, ...rest] = projects;
  return (
    <>
      <PageHeader
        title="PROJECTS."
        crumbs={[{ label: "Home", href: routes.home }, { label: "Projects" }]}
        intro="Houses, hotels and workplaces we have furnished — each with pieces drawn for the rooms they stand in."
      />

      <section className={`${shell} pb-[100px]`}>
        <Link href={routes.project(lead.slug)} data-reveal className="group grid grid-cols-[1.6fr_1fr] items-end gap-[5%] max-lg:grid-cols-1 max-lg:gap-6">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Photo src={lead.images[0]} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </div>
          <div className="pb-2">
            <p className={eyebrow}>
              {lead.kind} · {lead.location}
            </p>
            <h2 className="mt-4 font-jakarta text-[40px] leading-[1.1] font-bold text-ink group-hover:underline max-md:text-[30px]">{lead.title}</h2>
            <p className="mt-4 font-jakarta text-base leading-7 text-gray-body">{lead.summary}</p>
          </div>
        </Link>

        <ul className="mt-[90px] grid grid-cols-2 gap-x-[25px] gap-y-16 max-md:mt-16 max-md:grid-cols-1">
          {rest.map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={routes.project(p.slug)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo src={p.images[0]} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
                <p className={`${eyebrow} mt-6`}>
                  {p.kind} · {p.location}
                </p>
                <h2 className="mt-3 font-jakarta text-[26px] font-bold text-ink group-hover:underline">{p.title}</h2>
                <p className="mt-2 max-w-[560px] font-jakarta text-[15px] leading-6 text-gray-body">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
