"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { getImageProps } from "next/image";
import manifest from "@/lib/media-manifest.json";
import { PHOTO_QUALITY } from "./ui/Photo";

gsap.registerPlugin(SplitText, useGSAP);

/* CSS backgrounds bypass next/image, so ask it for the srcset and take the
   smallest optimized (AVIF/WebP) candidate that covers the frame at this
   screen's pixel density, instead of downloading the full-size master. */
function backgroundUrl(src: string, frame: HTMLElement) {
  const meta = (manifest as Record<string, { w: number; h: number }>)[src];
  if (!meta) return src;
  const cover = Math.max(frame.offsetWidth / meta.w, frame.offsetHeight / meta.h);
  const needed = meta.w * cover * Math.min(window.devicePixelRatio || 1, 2);
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: "100vw", quality: PHOTO_QUALITY });
  const candidates = (props.srcSet ?? "").split(", ").map((entry) => {
    const [url, w] = entry.split(" ");
    return { url, w: parseInt(w, 10) };
  });
  return (candidates.find((c) => c.w >= needed) ?? candidates.at(-1))?.url ?? src;
}

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

      const urls = slides.map((s) => backgroundUrl(s.image, layers[0]));

      /* preload all slide images so crossfades never pop in blank */
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
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

        crossfadeTo(urls[i]);

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

      /* only cycle while the hero is on screen and the tab is visible —
         no crossfades or text tweens burning frames in the background */
      let onScreen = true;
      const startAutoplay = () => {
        clearInterval(autoplayTimer);
        if (!onScreen || document.hidden) return;
        autoplayTimer = setInterval(() => {
          goTo((current + 1) % slides.length);
        }, AUTOPLAY_MS);
      };
      const observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        startAutoplay();
      });
      observer.observe(root.current!);
      const onVisibility = () => startAutoplay();
      document.addEventListener("visibilitychange", onVisibility);

      goToRef.current = goTo;
      restartRef.current = startAutoplay;

      /* split only after fonts load so char metrics are correct */
      document.fonts.ready.then(
        contextSafe!(() => {
          if (disposed) return;
          layers[0].style.backgroundImage = `url("${urls[0]}")`;
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
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
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
          className="relative aspect-[880/575] w-full overflow-hidden bg-[#d9d9d9] max-[900px]:aspect-[4/5] max-[900px]:max-h-[68vh] after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:bg-white/[0.38]"
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
        className="carousel-indicator absolute right-[1.74%] z-[2] flex flex-col items-end gap-[27px] max-[900px]:static max-[900px]:mt-4 max-[900px]:flex-row max-[900px]:items-center max-[900px]:justify-center max-[900px]:gap-3"
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
            /* on phones the 2px line sits in a 24px tap target */
            className={`block h-0.5 cursor-pointer bg-clip-content transition-[width,background-color] duration-350 ease-in-out max-[900px]:h-6 max-[900px]:py-[11px] ${
              i === activeDot ? "w-[50px] bg-ink" : "w-[26px] bg-ink/[0.18]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
