import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/ui/InfoPage";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering, customising, delivering and caring for Windmill furniture.",
};

const groups: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: "Ordering",
    items: [
      {
        q: "Is everything made to order?",
        a: "Yes. Every piece is built in our Aya Nagar workshop after you order it, in the wood and upholstery you choose. That is why prices and lead times are per piece rather than per stock item.",
      },
      {
        q: "Can I change the size or design of a catalog piece?",
        a: (
          <>
            Often, yes. Use “Commission a variation” on any product page, or start a <Link href={routes.bespoke()}>bespoke enquiry</Link> and our studio will draw it for you.
          </>
        ),
      },
      {
        q: `I need ${site.bulkOrderQty} or more pieces.`,
        a: (
          <>
            For orders of {site.bulkOrderQty} or more items, please <Link href={routes.contact("bulk")}>contact us</Link> so we can plan production and confirm pricing.
          </>
        ),
      },
      {
        q: "How do I pay?",
        a: "By UPI, debit or credit card, net banking or EMI at checkout. All prices include GST, and a GST invoice is available from your account.",
      },
      {
        q: "Can I share a piece in a particular wood with someone?",
        a: "Yes — on any product page, choose a wood and upholstery and use “Copy link to this configuration”. The link opens the product with your choices selected.",
      },
    ],
  },
  {
    title: "Materials",
    items: [
      {
        q: "Which woods do you use?",
        a: (
          <>
            Teak, white ash, walnut and steam beech, as well as reclaimed timber. Read about each on our <Link href={routes.about}>About page</Link>.
          </>
        ),
      },
      {
        q: "Can I see wood and fabric samples?",
        a: (
          <>
            Yes. Visit the workshop, or <Link href={routes.contact("general")}>ask us</Link> to send swatches.
          </>
        ),
      },
      {
        q: "Will my piece look exactly like the photographs?",
        a: "The grain, colour and overall appearance of each piece will vary — that is the nature of natural wood, and part of its character.",
      },
    ],
  },
  {
    title: "Delivery & after care",
    items: [
      {
        q: "How long will delivery take?",
        a: (
          <>
            6–8 weeks for photographed designs and 10–12 weeks for pieces made from drawings. See <Link href={routes.shipping}>shipping &amp; returns</Link>.
          </>
        ),
      },
      {
        q: "Can I visit the workshop?",
        a: (
          <>
            We would love that. {site.hours}, by appointment — <Link href={routes.contact("visit")}>book a visit</Link>.
          </>
        ),
      },
      {
        q: "Do you repair or refinish older pieces?",
        a: "Yes — we re-polish, re-cane and re-upholster Windmill furniture, whatever its age.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <InfoPage title="FAQ." current={routes.faq} intro="Answers to the questions we are asked most. Can’t find yours? Write to the studio.">
      {groups.map((g) => (
        <section key={g.title}>
          <h2>{g.title}</h2>
          <div className="divide-y divide-[#ececec] border-y border-[#ececec]">
            {g.items.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-xl font-light text-gray-nav transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-5">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </InfoPage>
  );
}
