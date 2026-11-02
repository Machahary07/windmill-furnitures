"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ease, gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion";

/* Scroll-in reveals for anything marked up with:
     data-reveal          → fades and rises 28px
     data-reveal="split"  → characters rise out of a mask (display headings)
     data-reveal="lines"  → paragraphs rise line by line out of masks, each
                            line tilted so its left end clears first. On a
                            text block each child reveals on its own trigger:
                            <p>s by line, anything else (h2, ul) with the rise.
                            A <p>, or a block of only inline content, is
                            split as a whole.
   Text is split only when it scrolls in (final width, fonts loaded) and
   reverted as soon as it lands, so later resizes never see stale lines.
   Until this runs, globals.css keeps [data-reveal] at opacity 0 (with a timed
   CSS fallback), so first paint never flashes content that then disappears.
   Re-runs on every route change, including query-only ones (catalog filters
   and sort reorder the grid, which would leave triggers at stale positions).
   Reads search params, so the layout renders it inside <Suspense>.
   Reduced-motion users get static content. */
export default function ScrollReveal() {
  const pathname = usePathname();
  const query = useSearchParams().toString();

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lined = new Set<HTMLElement>();
        const items = gsap.utils.toArray<HTMLElement>("main [data-reveal]").flatMap((el) => {
          if (el.dataset.reveal !== "lines") return [el];
          const kids = [...el.children] as HTMLElement[];
          if (el.tagName === "P" || kids.every((k) => getComputedStyle(k).display.startsWith("inline"))) {
            lined.add(el);
            return [el];
          }
          kids.forEach((k) => k.tagName === "P" && lined.add(k));
          return kids;
        });
        const splits: SplitText[] = [];
        root.classList.add("reveal-ready");
        if (!items.length) return;

        const isSplit = (el: Element) => (el as HTMLElement).dataset.reveal === "split";
        const isLined = (el: Element) => lined.has(el as HTMLElement);
        const rising = items.filter((el) => !isSplit(el) && !isLined(el));
        /* opacity only (not visibility) so unrevealed content stays focusable
           and readable — tabbing to it scrolls it in and triggers the reveal */
        gsap.set(items, { opacity: 0 });
        if (rising.length) gsap.set(rising, { y: 28 });

        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            const plain = batch.filter((el) => !isSplit(el) && !isLined(el));
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

            batch.filter(isLined).forEach((el, i) => {
              gsap.set(el, { opacity: 1 });
              splits.push(
                SplitText.create(el, {
                  type: "lines",
                  mask: "lines",
                  /* re-split (keeping progress) if a font or the width changes mid-reveal */
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.lines, {
                      yPercent: 110,
                      rotation: 3,
                      transformOrigin: "0% 0%",
                      duration: 1,
                      ease: ease.out,
                      /* long paragraphs (narrow screens) still land within ~2s */
                      stagger: Math.min(0.1, 1 / self.lines.length),
                      delay: i * 0.12,
                      onComplete: () => self.revert(),
                    }),
                }),
              );
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
    { dependencies: [pathname, query], revertOnUpdate: true },
  );

  return null;
}
