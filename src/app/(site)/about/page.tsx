import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import NumberedSteps from "@/components/ui/NumberedSteps";
import { body, displayHeading, eyebrow, redLink, sectionHeading, shell } from "@/components/ui/styles";
import { woodTypes } from "@/lib/products";
import { routes } from "@/lib/routes";
import { founder } from "@/lib/team";

export const metadata: Metadata = {
  title: "About Us",
  description: "Founded in 1991 by architect Pradeep Sachdeva, Windmill Furniture designs and handcrafts bespoke solid-wood furniture in Aya Nagar, New Delhi.",
};

const milestones = [
  { year: "1990", text: "Pradeep Sachdeva founds the architecture studio Pradeep Sachdeva Design Associates (PSDA)." },
  { year: "1991", text: "He founds Windmill Furniture to make bespoke furniture with the same care as the buildings." },
  { year: "35+ years", text: "Of bespoke furniture, with most of our customers returning to order again." },
  { year: "Today", text: "Studio and workshop share one campus in Aya Nagar, New Delhi — an incubator for new ideas." },
];

/* TODO(client): confirm wood descriptions with the workshop */
const woodNotes: Record<string, string> = {
  teak: "Golden-brown, oily and stable. Darkens beautifully and is our first choice for outdoor and heirloom pieces.",
  "white-ash": "Pale, straight-grained and springy — used where we want a light, Scandinavian feel.",
  walnut: "Deep chocolate tones and a fine, even grain for formal rooms and dining pieces.",
  "steam-beech": "Steaming gives beech an even honey colour; hard-wearing and ideal for chairs.",
};

const craft = [
  { src: "/images/craft/chisel.jpg", alt: "A carpenter’s hand paring a joint with a chisel", span: "col-span-2 row-span-2" },
  { src: "/images/craft/carving.jpg", alt: "Hands carving a lattice pattern, in black and white", span: "" },
  { src: "/images/craft/sawdust.jpg", alt: "Sawdust caught in a beam of light over a timber post", span: "" },
  { src: "/images/craft/dowels.jpg", alt: "Wooden dowels resting on a planed board", span: "" },
  { src: "/images/craft/cane.jpg", alt: "Detail of hand-woven cane meeting a teak frame", span: "" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="ABOUT US."
        crumbs={[{ label: "Home", href: routes.home }, { label: "About Us" }]}
        intro="Windmill Furniture has spent more than three decades fine-tuning the fastidious focus and custom craft that goes into bespoke furniture — pieces associated with demonstrable durability, angular elegance and a timeless aesthetic."
      />

      <div className="bg-[linear-gradient(to_bottom,transparent_60%,#f3f7f4_60%)]">
        <div className={shell}>
          <div className="relative aspect-[1337/564] overflow-hidden max-md:aspect-[4/3]">
            <Photo src="/images/about-studio.jpg" alt="The Windmill studio and workshop in Aya Nagar, covered in greenery" fill loading="eager" fetchPriority="high" sizes="(max-width: 1440px) 93vw, 1337px" className="object-cover" />
          </div>
        </div>
      </div>

      {/* founder */}
      <section className="bg-[#f3f7f4]">
        <div className={`${shell} grid grid-cols-[1fr_1.4fr] gap-[8%] pt-[80px] pb-[96px] max-lg:grid-cols-1 max-lg:gap-10 max-md:pt-12 max-md:pb-16`}>
          <div>
            <p className={eyebrow}>The founder</p>
            <h2 data-reveal="split" className={`${displayHeading} mt-4`}>
              {founder.name}
            </h2>
            <p className="mt-3 font-jakarta text-base text-gray-nav">Architect · Urban designer · {founder.role}</p>
          </div>
          <div data-reveal className={`${body} space-y-6`}>
            <p>
              Founded in 1991 by one of India&rsquo;s most iconic architects and urban designers, the late Mr. Pradeep Sachdeva, Windmill Furniture has fine-tuned the
              fastidious focus and custom craft that goes behind the business of bespoke furniture.
            </p>
            <p>
              His vision for urban living employed design as an effective backdrop to daily life. Drawing upon indigenous inspiration and the rediscovery of roots, our furniture is
              informed by the influences around us — and that belief still shapes every piece we draw.
            </p>
          </div>
        </div>
      </section>

      {/* milestones */}
      <section className={`${shell} pt-[90px] pb-[80px] max-md:pt-14`}>
        <h2 className={sectionHeading}>Over three decades</h2>
        <ol className="mt-9 grid grid-cols-4 border-t border-ink max-lg:grid-cols-2 max-sm:grid-cols-1">
          {milestones.map((m, i) => (
            <li key={m.year} data-reveal className={`pt-7 pr-8 pb-8 ${i > 0 ? "lg:border-l lg:border-[#e6e6e6] lg:pl-8" : ""}`}>
              <p className="font-outfit text-[44px] leading-none font-bold tracking-[0.04em] text-ink">{m.year}</p>
              <p className="mt-4 font-jakarta text-sm leading-6 text-gray-body">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* craft */}
      <section className={`${shell} pb-[100px]`}>
        <div className="grid grid-cols-[1fr_1.4fr] gap-[8%] max-lg:grid-cols-1 max-lg:gap-8">
          <h2 data-reveal="split" className={displayHeading}>
            Made by hand.
          </h2>
          <p className={body}>
            Preserving and perfecting age-old carpentry and craft techniques, each piece is designed and handcrafted at our workshop in Aya Nagar. In every join and finish we
            honour the heart and soul of past workmanship — layer upon layer of skilled hands that came before.
          </p>
        </div>
        <ul className="mt-14 grid auto-rows-[220px] grid-cols-4 gap-4 max-md:grid-cols-2 max-md:auto-rows-[160px]">
          {craft.map((c) => (
            <li key={c.src} data-reveal className={`relative overflow-hidden ${c.span}`}>
              <Photo src={c.src} alt={c.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      {/* process */}
      <section className="pb-[100px]">
        <div className={shell}>
          <h2 className={`${sectionHeading} mb-9`}>From log to living room</h2>
        </div>
        <NumberedSteps
          steps={[
            { title: "Wood Selection", text: "Reclaimed timber from old homes, railway sleepers and heritage structures, balanced with carefully selected new wood." },
            { title: "Carpentry & Joinery", text: "Traditional joinery, cut and fitted by hand by our carpenters." },
            { title: "Grinding & Sanding", text: "Every surface is worked smooth by hand so the grain reads clearly." },
            { title: "Polishing", text: "Hand-applied finishes that protect the wood and deepen with age." },
          ]}
        />
      </section>

      {/* woods */}
      <section id="woods" className={`${shell} pb-[100px]`}>
        <h2 className={sectionHeading}>Our woods</h2>
        <p className={`${body} mt-4 max-w-[760px] text-gray-body`}>Four timbers make up most of our work. Every product page lets you choose between them.</p>
        <ul className="mt-10 grid grid-cols-4 gap-[25px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {woodTypes.map((w) => (
            <li key={w.id} data-reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Photo src={w.image} alt={`${w.label} sample`} fill sizes="(max-width: 1024px) 50vw, 330px" className="object-cover" />
              </div>
              <h3 className="mt-5 font-jakarta text-lg font-bold text-ink">{w.label}</h3>
              <p className="mt-2 font-jakarta text-sm leading-6 text-gray-body">{woodNotes[w.id]}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* sustainability */}
      <section className="bg-[#f3f7f4]">
        <div className={`${shell} grid grid-cols-[1fr_1.4fr] gap-[8%] py-[90px] max-lg:grid-cols-1 max-lg:gap-8 max-md:py-14`}>
          <h2 data-reveal="split" className={displayHeading}>
            Sustainability
          </h2>
          <div data-reveal className={`${body} space-y-6`}>
            <p>
              At our workshop in India, we breathe new life into reclaimed wood&mdash;from old homes, railway sleepers, and heritage structures&mdash;while thoughtfully integrating
              carefully selected new timber. This balanced approach transforms both into heirloom-quality furniture through mindful craftsmanship.
            </p>
            <p>
              What emerges is a living continuation of India&rsquo;s craft legacy, carried forward with respect and quiet pride.
            </p>
          </div>
        </div>
      </section>

      {/* next */}
      <section className={`${shell} grid grid-cols-3 gap-[25px] py-[90px] max-md:grid-cols-1`}>
        {[
          { title: "The team", text: "Designers, architects and craftspeople.", href: routes.team, image: "/images/craft/studio-steps.jpg" },
          { title: "Projects", text: "Houses, hotels and workplaces we have furnished.", href: routes.projects, image: "/images/projects/library-house/1.jpg" },
          { title: "Bespoke", text: "Commission a piece drawn for your room.", href: routes.bespoke(), image: "/images/sketches/bookshelf-view.jpg" },
        ].map((card) => (
          <Link key={card.title} href={card.href} data-reveal className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#efefef]">
              <Photo src={card.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <h3 className="mt-5 font-jakarta text-2xl font-bold text-ink">{card.title}</h3>
            <p className="mt-1 font-jakarta text-sm text-gray-nav">{card.text}</p>
            <span className={`${redLink} mt-4 text-[13px]`}>Explore</span>
          </Link>
        ))}
      </section>
    </>
  );
}
