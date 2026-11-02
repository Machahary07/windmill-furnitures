import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import NumberedSteps from "@/components/ui/NumberedSteps";
import { body, displayHeading, eyebrow, redLink, sectionHeading, shell } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bespoke Commissions",
  description: "Furniture drawn for your room and handcrafted in our New Delhi workshop — from a single chair to a whole house.",
};

const sketches = [
  { src: "/images/sketches/bookshelf-view.jpg", alt: "Perspective sketch of a study wall lined with bookshelves" },
  { src: "/images/sketches/day-bed.jpg", alt: "Coloured sketch of a lattice day bed with dimensions" },
  { src: "/images/sketches/kohima-sofa.jpg", alt: "Sketch of a three-seater sofa with panelled sides" },
  { src: "/images/sketches/centre-table.jpg", alt: "Sketch of a centre table with drawers" },
  { src: "/images/sketches/rocking-chair.jpg", alt: "Two rocking chair studies in red and blue" },
  { src: "/images/sketches/guest-room.jpg", alt: "Interior sketch of a guest room with shelving" },
  { src: "/images/sketches/workstation.jpg", alt: "Sketch of an L-shaped workstation" },
  { src: "/images/sketches/wardrobe.jpg", alt: "Sketch of a panelled wardrobe" },
];

/* TODO(client): confirm lead times and delivery coverage */
const steps = [
  { title: "Conversation", text: "Tell us about the room, how the piece will be used, and anything you already love. Photos and floor plans help." },
  { title: "Drawing", text: "Our studio draws the piece to scale, with dimensions, woods and finishes, and a quotation." },
  { title: "Samples", text: "Choose timber and upholstery from samples at the workshop or sent to you. We revise the drawing until it is right." },
  { title: "Making", text: "The piece is built by hand in Aya Nagar. Typical lead time is 8–12 weeks from approval." },
  { title: "Delivery", text: "Delivered and placed by our own team in Delhi NCR; carefully crated for the rest of India." },
];

export default async function BespokePage({ searchParams }: PageProps<"/bespoke">) {
  const { ref } = await searchParams;
  const reference = typeof ref === "string" ? ref.slice(0, 120) : undefined;

  return (
    <>
      <PageHeader
        title="BESPOKE."
        kicker="Commissions"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Bespoke" }]}
        intro="While other furniture makers offer readymade, assembly-line products, we believe the furniture in your home should reflect your personality and be designed to meet your specific requirements. Most of what we make begins as a drawing for one particular room."
      >
        <div className="mt-9 flex flex-wrap gap-10">
          <a href="#enquire" className={redLink}>
            Start an enquiry
          </a>
          <Link href={routes.projects} className={redLink}>
            See finished projects
          </Link>
        </div>
      </PageHeader>

      <section className={shell} aria-label="Drawings from the studio">
        <ul className="grid auto-rows-[230px] grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:auto-rows-[170px]">
          {sketches.map((s, i) => (
            <li key={s.src} data-reveal className={`relative overflow-hidden rounded-xl bg-[#f7f6f2] ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Photo src={s.src} alt={s.alt} fill loading={i < 3 ? "eager" : undefined} sizes="(max-width: 1024px) 50vw, 25vw" className="bg-[#f7f6f2]! object-contain p-3" />
            </li>
          ))}
        </ul>
        <p className="mt-4 font-jakarta text-[12px] text-gray-nav">Workshop drawings from past commissions.</p>
      </section>

      <section className="pt-[100px] pb-[100px] max-md:pt-16">
        <div className={shell}>
          <h2 className={`${sectionHeading} mb-9`}>How a commission works</h2>
        </div>
        <NumberedSteps steps={steps} />
      </section>

      <section id="enquire" className="bg-[#f3f7f4]">
        <div className={`${shell} grid grid-cols-[1fr_1.5fr] gap-[8%] py-[90px] max-lg:grid-cols-1 max-lg:gap-12 max-md:py-14`}>
          <div>
            <h2 data-reveal="split" className={displayHeading}>
              Start an enquiry.
            </h2>
            <p data-reveal="lines" className={`${body} mt-6`}>Share as much or as little as you have — a sketch, a photo, a size. We reply within two working days.</p>
            <dl className="mt-10 space-y-6 font-jakarta text-sm leading-6">
              <div>
                <dt className={eyebrow}>Larger orders</dt>
                <dd className="mt-1.5 text-gray-body">Orders of {site.bulkOrderQty} or more pieces, hotels and offices are quoted as projects.</dd>
              </div>
              <div>
                <dt className={eyebrow}>Visit the workshop</dt>
                <dd className="mt-1.5 text-gray-body">
                  {site.address.slice(1, 3).join(", ")} · {site.hours}. Please{" "}
                  <Link href={routes.contact("visit")} className="text-ink underline underline-offset-2">
                    book a visit
                  </Link>{" "}
                  first.
                </dd>
              </div>
              <div>
                <dt className={eyebrow}>Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-2">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <EnquiryForm variant="bespoke" reference={reference} />
        </div>
      </section>
    </>
  );
}
