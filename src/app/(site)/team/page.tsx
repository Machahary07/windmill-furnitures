import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { body, displayHeading, eyebrow, redLink, sectionHeading, shell } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { founder, leads, members } from "@/lib/team";

export const metadata: Metadata = {
  title: "Creative Team",
  description: "The designers, architects and craftspeople behind every Windmill piece.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="CREATIVE TEAM."
        crumbs={[{ label: "Home", href: routes.home }, { label: "About Us", href: routes.about }, { label: "Team" }]}
        intro="The designers, architects and craftspeople behind every Windmill piece — one studio and one workshop, sharing a campus in Aya Nagar."
      />

      <section className="bg-[#f3f7f4]">
        <div className={`${shell} grid grid-cols-[1fr_1.4fr] gap-[8%] py-[80px] max-lg:grid-cols-1 max-lg:gap-8 max-md:py-12`}>
          <div>
            <p className={eyebrow}>{founder.role}</p>
            <h2 data-reveal="split" className={`${displayHeading} mt-4`}>
              {founder.name}
            </h2>
          </div>
          <p data-reveal="lines" className={body}>{founder.bio}</p>
        </div>
      </section>

      <section className={`${shell} pt-[90px] max-md:pt-14`}>
        <h2 className={sectionHeading}>Studio leads</h2>
        <ul className="mt-9 grid grid-cols-3 gap-[25px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {leads.map((m, i) => (
            <li key={i} data-reveal>
              <div className="relative aspect-[157/173] overflow-hidden bg-[#efefef]">
                <Photo src={m.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <p className="mt-5 font-jakarta text-[23px] leading-none font-bold text-ink">{m.name}</p>
              <p className="mt-2 font-jakarta text-sm text-gray-nav">{m.role}</p>
              {m.bio && <p className="mt-3 font-jakarta text-sm leading-6 text-gray-body">{m.bio}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${shell} pt-[90px] pb-[90px] max-md:pt-14`}>
        <h2 className={sectionHeading}>Studio &amp; workshop</h2>
        <ul className="mt-9 grid grid-cols-6 gap-x-[25px] gap-y-[52px] max-lg:grid-cols-4 max-sm:grid-cols-2">
          {members.map((m, i) => (
            <li key={i} data-reveal>
              <div className="relative aspect-[106/121] overflow-hidden bg-[#efefef]">
                <Photo src={m.image} alt="" fill sizes="(max-width: 640px) 50vw, 200px" className="object-cover" />
              </div>
              <p className="mt-2.5 font-jakarta text-[13px] leading-tight font-bold text-ink">{m.name}</p>
              <p className="font-jakarta text-[13px] leading-tight text-gray-nav">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#ececec]">
        <div className={`${shell} grid grid-cols-2 items-center gap-[8%] py-[90px] max-lg:grid-cols-1 max-lg:gap-10 max-md:py-14`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo src="/images/craft/studio.jpg" alt="The Windmill studio buildings among trees in Aya Nagar" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 data-reveal="split" className={displayHeading}>
              Work with us.
            </h2>
            <p data-reveal="lines" className={`${body} mt-6`}>
              We are always glad to hear from carpenters, polishers, upholsterers, designers and architects who care about how things are made.
            </p>
            <Link href={routes.contact("general")} className={`${redLink} mt-8`}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
