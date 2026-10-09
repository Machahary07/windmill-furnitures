import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      <main>
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

          <div className="relative z-[1] mx-[var(--grid-margin)] grid grid-cols-4 pt-[18px] pb-[22px] max-[900px]:mx-5 max-[900px]:grid-cols-1">
            <div className="px-7 max-[900px]:px-0 max-[900px]:pb-6">
              <h3 className="mb-2.5 font-jakarta text-base font-bold">Architecture</h3>
              <p className="max-w-[250px] font-jakarta text-sm leading-[1.55] font-medium text-gray-body">
                The interior of the apartments in the color of Siena. Combinations give warmth to
                such strict materials.
              </p>
            </div>
            <div className="px-7 max-[900px]:hidden" />
            <div className="px-7 max-[900px]:hidden" />
            <div className="px-7 max-[900px]:hidden" />
          </div>
        </section>

        <AboutSection />
        <TeamSection />
        <FurnitureSection />
        <CatalogCarousel />
      </main>
    </>
  );
}
