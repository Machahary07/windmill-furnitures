import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/home/AboutSection";
import TeamSection from "@/components/home/TeamSection";
import FurnitureSection from "@/components/home/FurnitureSection";
import CatalogCarousel from "@/components/home/CatalogCarousel";
import { banner } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Windmill Furniture — Handcrafted solid-wood furniture" },
  /* ≤ ~125 characters so link previews show it whole */
  description: "Bespoke solid-wood furniture, handcrafted at our New Delhi workshop since 1991 — chairs, sofas, tables, storage and beds.",
  alternates: { canonical: "/" },
};

/* tells search engines who the studio is (name, place, founding year) */
const organization = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.legalName,
  url: site.url,
  image: new URL(banner.url, site.url).toString(),
  description: site.description,
  email: site.email,
  foundingDate: String(site.founded),
  address: { "@type": "PostalAddress", addressLocality: "Aya Nagar, New Delhi", postalCode: "110047", addressRegion: "Delhi", addressCountry: "IN" },
  openingHours: "Mo-Sa 10:00-18:00",
};

/* 5 fading vertical lines → 4 columns */
const gridLines = ["left-0", "left-1/4", "left-1/2", "left-3/4", "left-full"];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      {/* 58px nav + 1px border + 3px slack */}
      <section className="hero-section relative min-h-[calc(100svh-62px)] overflow-hidden max-[900px]:min-h-0 max-[900px]:pb-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[var(--grid-margin)] bottom-0 z-0 h-[48vh] max-[900px]:inset-x-5 max-[900px]:top-[50vw] max-[900px]:h-auto"
        >
          {gridLines.map((pos) => (
            <span key={pos} className={`grid-line absolute inset-y-0 w-px ${pos}`} />
          ))}
        </div>

        <HeroCarousel />
      </section>

      <CatalogCarousel />
      <AboutSection />
      <TeamSection />
      <FurnitureSection />
    </>
  );
}
