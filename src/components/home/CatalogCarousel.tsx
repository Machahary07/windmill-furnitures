"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const CARD_STEP = 293; // 268px card + 25px gap

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
      <h2 className="px-[3.96%] font-jakarta text-[52px] leading-none font-light text-black max-md:px-5 max-md:text-[38px]">
        CATALOG
      </h2>

      <ul
        ref={track}
        className="mt-[60px] flex snap-x snap-mandatory gap-[25px] overflow-x-auto scroll-smooth px-[3.4%] scroll-px-[3.4%] max-md:scroll-px-5 [scrollbar-width:none] max-md:px-5 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <li key={p.slug} className="relative w-[268px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#efefef]">
            <Link href={`/product/${p.slug}`} className="relative block h-[305px]">
              <Image src={p.card} alt={p.name} fill sizes="268px" placeholder="blur" className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
            </Link>
            <div className="flex items-center justify-between gap-3 px-[15px] pt-[17px] pb-[19px]">
              <div className="min-w-0">
                <p className="truncate font-jakarta text-sm font-medium tracking-[0.06em] text-ink uppercase" title={p.name}>
                  {p.name}
                </p>
                <p className="mt-1 font-jakarta text-sm font-bold text-ink">${p.price}</p>
              </div>
              <Link
                href={`/product/${p.slug}`}
                aria-label={`Choose options and add ${p.name} to cart`}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c00000] text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
                  <path d="M11 10.5h5" />
                  <circle cx="9.5" cy="19" r="1.3" />
                  <circle cx="16.5" cy="19" r="1.3" />
                </svg>
              </Link>
            </div>
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
