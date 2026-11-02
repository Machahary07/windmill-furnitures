"use client";

import { usePathname } from "next/navigation";
import { ease, gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion";

/* Scroll-in reveals for anything marked up with:
     data-reveal          → fades and rises 28px
     data-reveal="split"  → characters rise out of a mask (display headings)
   Until this runs, globals.css keeps [data-reveal] at opacity 0 (with a timed
   CSS fallback), so first paint never flashes content that then disappears.
   Re-runs on every route change; reduced-motion users get static content. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("main [data-reveal]");
        const splits: SplitText[] = [];
        root.classList.add("reveal-ready");
        if (!items.length) return;

        const isSplit = (el: Element) => (el as HTMLElement).dataset.reveal === "split";
        const rising = items.filter((el) => !isSplit(el));
        /* opacity only (not visibility) so unrevealed content stays focusable
           and readable — tabbing to it scrolls it in and triggers the reveal */
        gsap.set(items, { opacity: 0 });
        if (rising.length) gsap.set(rising, { y: 28 });

        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            const plain = batch.filter((el) => !isSplit(el));
            if (plain.length) {
              gsap.to(plain, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: ease.out,
                stagger: 0.08,
                overwrite: true,
                /* drop the transform so sticky/fixed descendants behave normally */
                clearProps: "transform,opacity",
              });
            }

            batch.filter(isSplit).forEach((el, i) => {
              const split = SplitText.create(el, { type: "words,chars", mask: "chars" });
              splits.push(split);
              gsap.set(el, { opacity: 1 });
              gsap.from(split.chars, {
                yPercent: 110,
                duration: 0.8,
                ease: ease.out,
                stagger: 0.022,
                delay: i * 0.08,
                onComplete: () => split.revert(),
              });
            });
          },
        });

        return () => splits.forEach((s) => s.revert());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.classList.add("reveal-ready");
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
