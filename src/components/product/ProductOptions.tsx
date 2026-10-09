"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Swatch } from "@/lib/products";

const labelClass = "font-jakarta text-[10px] font-medium tracking-[0.2em] text-[#555]";

function SwatchPicker({
  legend,
  options,
  value,
  onChange,
  size,
}: {
  legend: string;
  options: Swatch[];
  value: string;
  onChange: (id: string) => void;
  size: "lg" | "sm";
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className={`mt-[26px] flex flex-wrap ${size === "lg" ? "gap-[25px]" : "gap-3"}`}>
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <label
              key={o.id}
              className={`relative cursor-pointer overflow-hidden rounded-[6px] outline-offset-[1px] has-focus-visible:outline-2 has-focus-visible:outline-ink ${
                size === "lg" ? "size-[100px]" : "size-[75px]"
              } ${selected ? "ring-[3px] ring-[#b00000]" : ""}`}
            >
              <input
                type="radio"
                name={legend}
                value={o.id}
                checked={selected}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              <Image src={o.image} alt="" fill sizes={size === "lg" ? "100px" : "75px"} className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent pt-3 pb-1.5 text-center font-jakarta text-[11.5px] font-medium text-white">
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ProductOptions({ woods, fabrics }: { woods: Swatch[]; fabrics: Swatch[] }) {
  const [wood, setWood] = useState(woods[0].id);
  const [fabric, setFabric] = useState(fabrics[0].id);

  return (
    <div className="mt-[30px] space-y-[22px]">
      <SwatchPicker legend="Select Wood Type" options={woods} value={wood} onChange={setWood} size="lg" />
      <SwatchPicker legend="Select Upholstery" options={fabrics} value={fabric} onChange={setFabric} size="sm" />

      {/* no cart backend yet — both actions lead to the build-in-progress page */}
      <div className="flex items-center gap-6 pt-[13px] max-sm:flex-col max-sm:items-stretch">
        <Link
          href="/soon"
          className="flex h-[43px] flex-1 items-center max-sm:flex-none justify-center bg-[#1b1b1b] font-jakarta text-[10px] font-semibold tracking-[0.3em] text-white transition-colors hover:bg-black"
        >
          ADD TO CART
        </Link>
        <Link
          href="/soon"
          className="px-6 text-center font-jakarta text-[10px] font-medium tracking-[0.2em] text-[#555] underline underline-offset-4"
        >
          ADD TO WISHLIST
        </Link>
      </div>
    </div>
  );
}
