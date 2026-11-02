import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/home/AboutSection";
import TeamSection from "@/components/home/TeamSection";
import FurnitureSection from "@/components/home/FurnitureSection";
import CatalogCarousel from "@/components/home/CatalogCarousel";

export const metadata: Metadata = {
  title: "Experience",
};

/* 5 fading vertical lines → 4 columns */
const gridLines = ["left-0", "left-1/4", "left-1/2", "left-3/4", "left-full"];

export default function Home() {
  return (
    <>
      {/* 58px nav + 1px border + 3px slack */}
      <section className="hero-section relative min-h-[calc(100vh-62px)] overflow-hidden">
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
