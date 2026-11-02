"use client";

import { useState } from "react";
import Photo from "@/components/ui/Photo";

export default function ProductGallery({ images, name, drawing }: { images: string[]; name: string; drawing?: boolean }) {
  const [index, setIndex] = useState(0);
  const fit = drawing ? "object-contain p-6 bg-[#f7f6f2]!" : "object-cover";

  return (
    <div>
      <div className="relative aspect-[719/600] w-[99.9%] overflow-hidden bg-[#f2f2f2] max-lg:w-full">
        <Photo
          key={images[index]}
          src={images[index]}
          alt={`${name}${images.length > 1 ? `, view ${index + 1} of ${images.length}` : ""}`}
          fill
          loading="eager"
          fetchPriority={index === 0 ? "high" : undefined}
          sizes="(max-width: 1024px) 100vw, 720px"
          className={`animate-[fade_.35s_ease] ${fit}`}
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto px-[3.96%] no-scrollbar max-lg:px-5" aria-label="Product views">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show view ${i + 1}`}
                aria-current={i === index}
                className="relative block size-[68px] cursor-pointer overflow-hidden rounded-[6px] opacity-60 transition-opacity hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2 aria-[current=true]:ring-[#b00000]"
              >
                <Photo src={src} alt="" fill loading="eager" sizes="68px" className={drawing ? "object-contain p-1 bg-[#f7f6f2]!" : "object-cover"} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
