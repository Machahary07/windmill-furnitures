"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

const slides = [
  { word: "LEGACY", image: "/images/hero-1.jpg" },
  { word: "CRAFTED", image: "/images/hero-2.jpg" },
  { word: "BESPOKE", image: "/images/hero-3.jpg" },
  { word: "WINDMILL", image: "/images/hero-1.jpg" },
];

const AUTOPLAY_MS = 2000;

export default function HeroCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const goToRef = useRef<(i: number) => void>(() => {});
  const restartRef = useRef<() => void>(() => {});
  const [activeDot, setActiveDot] = useState(0);

  useGSAP(
    (_context, contextSafe) => {
      const title = titleRef.current!;
      const layers = layerRefs.current as HTMLDivElement[];

      let current = 0;
      let activeLayer = 0;
      let split: SplitText | null = null;
      let animating = false;
      let autoplayTimer: ReturnType<typeof setInterval> | undefined;
      let disposed = false;

      /* preload all slide images so crossfades never pop in blank */
      slides.forEach((s) => {
        const img = new Image();
        img.src = s.image;
      });

      const crossfadeTo = (src: string) => {
        const incoming = layers[1 - activeLayer];
        const outgoing = layers[activeLayer];
        incoming.style.backgroundImage = `url("${src}")`;
        /* incoming must paint above outgoing or it fades in invisibly */
        gsap.set(incoming, { zIndex: 2 });
        gsap.set(outgoing, { zIndex: 1 });
        gsap.fromTo(
          incoming,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            onComplete() {
              gsap.set(outgoing, { opacity: 0 });
            },
          },
        );
        activeLayer = 1 - activeLayer;
      };

      /* replace letter-spacing with per-char margins: tracking inside the
         char boxes plus a trailing space skews text-align centering, so we
         zero it and space the mask wrappers explicitly instead */
      const splitTitle = () => {
        split = SplitText.create(title, { type: "chars", mask: "chars" });
        title.style.letterSpacing = "0";
        const boxes = split.masks?.length ? split.masks : split.chars;
        gsap.set(boxes, { marginRight: "0.15em" });
        gsap.set(boxes[boxes.length - 1], { marginRight: 0 });
      };

      const goTo = (i: number) => {
        if (animating || i === current || !split) return;
        animating = true;
        current = i;
        setActiveDot(i);

        crossfadeTo(slides[i].image);

        gsap.to(split.chars, {
          yPercent: -110,
          duration: 0.45,
          stagger: { each: 0.035 },
          ease: "power2.in",
          onComplete() {
            split!.revert();
            title.textContent = slides[i].word;
            splitTitle();
            gsap.fromTo(
              split!.chars,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 0.8,
                stagger: { each: 0.05 },
                ease: "power4.out",
                onComplete() {
                  animating = false;
                },
              },
            );
          },
        });
      };

      const startAutoplay = () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => {
          goTo((current + 1) % slides.length);
        }, AUTOPLAY_MS);
      };

      goToRef.current = goTo;
      restartRef.current = startAutoplay;

      /* split only after fonts load so char metrics are correct */
      document.fonts.ready.then(
        contextSafe!(() => {
          if (disposed) return;
          layers[0].style.backgroundImage = `url("${slides[0].image}")`;
          gsap.to(layers[0], { opacity: 1, duration: 0.8, ease: "power2.out" });
          splitTitle();
          gsap.from(split!.chars, {
            yPercent: 110,
            duration: 0.9,
            stagger: { each: 0.06 },
            ease: "power4.out",
          });
          startAutoplay();
        }),
      );

      return () => {
        disposed = true;
        clearInterval(autoplayTimer);
        split?.revert();
        title.textContent = slides[0].word;
        title.style.letterSpacing = "";
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="relative z-[1] mx-auto mt-[var(--media-top)] w-[var(--media-w)] max-[900px]:mt-8 max-[900px]:w-[88%]">
        <div
          role="img"
          aria-label="Windmill architecture photograph"
          className="relative aspect-[880/575] w-full overflow-hidden bg-[#d9d9d9] after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:bg-white/[0.38]"
        >
          {[0, 1].map((n) => (
            <div
              key={n}
              ref={(el) => {
                layerRefs.current[n] = el;
              }}
              className="absolute inset-0 bg-cover bg-center opacity-0"
            />
          ))}
        </div>
        <h1
          ref={titleRef}
          className="hero-title pointer-events-none absolute left-1/2 top-1/2 z-[4] w-max -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-outfit leading-none font-bold text-black"
        >
          {slides[0].word}
        </h1>
      </div>

      <div
        role="tablist"
        aria-label="Slides"
        className="carousel-indicator absolute right-[1.74%] z-[2] flex flex-col items-end gap-[27px] max-[900px]:hidden"
      >
        {slides.map((s, i) => (
          <button
            key={s.word}
            type="button"
            role="tab"
            aria-selected={i === activeDot}
            aria-label={`Slide ${i + 1}: ${s.word}`}
            onClick={() => {
              goToRef.current(i);
              restartRef.current();
            }}
            className={`block h-0.5 cursor-pointer transition-[width,background-color] duration-350 ease-in-out ${
              i === activeDot ? "w-[50px] bg-ink" : "w-[26px] bg-ink/[0.18]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
