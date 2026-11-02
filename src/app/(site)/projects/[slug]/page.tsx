import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { body, displayHeading, eyebrow, redLink, sectionHeading, shell } from "@/components/ui/styles";
import { getProduct, type Product } from "@/lib/products";
import { getProject, projects } from "@/lib/projects";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, openGraph: { images: [project.images[0]] } };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const pieces = project.pieces.map(getProduct).filter((p): p is Product => !!p);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [hero, ...gallery] = project.images;

  return (
    <>
      <div className={`${shell} pt-9 max-md:pt-6`}>
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Projects", href: routes.projects }, { label: project.title }]} />
        <div className="mt-[42px] grid grid-cols-[1fr_1.2fr] items-end gap-10 pb-12 max-md:mt-8 max-md:grid-cols-1 max-md:gap-5">
          <div>
            <p className={eyebrow}>
              {project.kind} · {project.location}
            </p>
            <h1 data-reveal="split" className={`${displayHeading} mt-4`}>
              {project.title}
            </h1>
          </div>
          <p data-reveal="lines" className={`${body} text-gray-body`}>{project.summary}</p>
        </div>
      </div>

      <div className="relative mx-auto aspect-[1440/720] max-w-[1440px] overflow-hidden max-md:aspect-[4/3]">
        <Photo src={hero} alt={`${project.title} — main view`} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
      </div>

      <section className={`${shell} grid grid-cols-[1fr_1.4fr] gap-[8%] py-[90px] max-lg:grid-cols-1 max-lg:gap-6 max-md:py-14`}>
        <h2 className={sectionHeading}>The brief</h2>
        <div data-reveal="lines" className={`${body} space-y-6`}>
          {project.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className={shell} aria-label="Gallery">
          <ul className="columns-2 gap-[25px] max-sm:columns-1">
            {gallery.map((src, i) => (
              <li key={src} data-reveal className="mb-[25px] break-inside-avoid">
                <Photo src={src} alt={`${project.title} — view ${i + 2}`} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {pieces.length > 0 && (
        <section className={`${shell} pt-[70px]`}>
          <h2 className={sectionHeading}>Pieces in this project</h2>
          <p className="mt-2 font-jakarta text-base text-gray-nav">Available to order in your choice of wood and upholstery.</p>
          <ul className="mt-9 grid grid-cols-4 gap-[25px] max-lg:grid-cols-2 max-md:gap-4">
            {pieces.map((p) => (
              <li key={p.slug} data-reveal>
                <ProductCard product={p} sizes="(max-width: 1024px) 50vw, 330px" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={`${shell} mt-[90px] flex flex-wrap items-center justify-between gap-6 border-t border-[#ececec] py-12`}>
        <Link href={routes.bespoke(project.title)} className={redLink}>
          Commission something similar
        </Link>
        <Link href={routes.project(next.slug)} className="group text-right">
          <span className={eyebrow}>Next project</span>
          <span className="mt-1 block font-jakarta text-2xl font-bold text-ink group-hover:underline">{next.title} →</span>
        </Link>
      </section>
    </>
  );
}
