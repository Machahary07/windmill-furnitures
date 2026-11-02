import type { Metadata } from "next";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { eyebrow, redLink, shell } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the Windmill studio or book a visit to our workshop in Aya Nagar, New Delhi.",
};

const topics = ["general", "bespoke", "order", "bulk", "trade", "visit"];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const defaultTopic = typeof topic === "string" && topics.includes(topic) ? topic : "general";

  return (
    <>
      <PageHeader
        title="CONTACT."
        crumbs={[{ label: "Home", href: routes.home }, { label: "Contact" }]}
        intro="Questions about a piece, an order, or a project of your own — write to us, or come and see the workshop."
      />

      <section className={`${shell} grid grid-cols-[1fr_1.5fr] gap-[8%] pb-[100px] max-lg:grid-cols-1 max-lg:gap-14`}>
        <div data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo src="/images/craft/studio-steps.jpg" alt="Painted steps leading up to the Windmill studio" fill loading="eager" sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <dl className="mt-10 space-y-7 font-jakarta text-[15px] leading-6">
            <div>
              <dt className={eyebrow}>Workshop &amp; studio</dt>
              <dd className="mt-2 text-ink">
                <address className="not-italic">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className={`${redLink} mt-4 text-[13px]`}>
                  Open in Maps
                </a>
              </dd>
            </div>
            <div>
              <dt className={eyebrow}>Hours</dt>
              <dd className="mt-2 text-ink">{site.hours}</dd>
              <dd className="mt-1 text-[13px] text-gray-nav">Visits by appointment — choose “Visit the workshop” in the form.</dd>
            </div>
            <div>
              <dt className={eyebrow}>Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal>
          <h2 className="mb-9 font-jakarta text-2xl font-bold text-ink">Send us a message</h2>
          <EnquiryForm defaultTopic={defaultTopic} />
        </div>
      </section>
    </>
  );
}
