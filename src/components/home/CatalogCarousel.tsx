"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { listProducts } from "@/lib/products";
import { routes } from "@/lib/routes";
import { redLink } from "@/components/ui/styles";

const CARD_STEP = 293; // 268px card + 25px gap

/* photographed pieces only; drawings live in the full shop */
const catalog = listProducts().filter((p) => !p.drawing);

export default function CatalogCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });

  useEffect(() => {
    const el = track.current!;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setProgress({ start: scrollLeft / scrollWidth, size: clientWidth / scrollWidth });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });

  return (
    <section id="catalog" className="mx-auto max-w-[1440px] pt-[42px] pb-[80px]">
      <div className="flex items-end justify-between gap-6 px-[3.96%] max-md:px-5">
        <h2 data-reveal="split" className="font-jakarta text-[52px] leading-none font-light text-black max-md:text-[38px]">
          CATALOG
        </h2>
        <Link href={routes.shop()} className={redLink}>
          View all furniture
        </Link>
      </div>

      <ul
        ref={track}
        className="mt-[60px] flex snap-x snap-mandatory gap-[25px] overflow-x-auto scroll-smooth px-[3.4%] scroll-px-[3.4%] max-md:scroll-px-5 [scrollbar-width:none] max-md:px-5 [&::-webkit-scrollbar]:hidden"
      >
        {catalog.map((p) => (
          <li key={p.slug} data-reveal className="w-[268px] shrink-0 snap-start">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      <div className="mt-[30px] flex items-center justify-between px-[3.68%] max-md:px-5">
        <div className="relative h-1 w-[175px] overflow-hidden rounded-full bg-[#eeeeee]" aria-hidden="true">
          <span
            className="absolute inset-y-0 rounded-full bg-black transition-[left] duration-150"
            style={{ left: `${progress.start * 100}%`, width: `${progress.size * 100}%` }}
          />
        </div>
        <div className="flex gap-4">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? "Previous products" : "Next products"}
              className="grid size-6 cursor-pointer place-items-center rounded-full border border-[#c00000] text-[#c00000]"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir < 0 ? "M6.5 1.5 3 5l3.5 3.5" : "M3.5 1.5 7 5 3.5 8.5"} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
