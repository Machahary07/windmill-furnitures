"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import type { Swatch } from "@/lib/products";
import { TrashIcon, UploadIcon } from "./icons";
import { useMarkDirty } from "./PreviewForm";
import { field } from "./ui";

type Item = Swatch & { local?: boolean };

/* Swatch grid: photo + customer-facing name. New swatches preview locally.
   TODO(backend): Payload "woods" / "fabrics" collections with media uploads. */
export default function SwatchList({ name, swatches, addLabel }: { name: string; swatches: Swatch[]; addLabel: string }) {
  const [items, setItems] = useState<Item[]>(swatches);
  const markDirty = useMarkDirty();
  const input = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  return (
    <ul className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
      {items.map((s, i) => (
        <li key={s.id} className="group">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-[#ececec] bg-[#f6f6f3]">
            {s.local ? (
              // eslint-disable-next-line @next/next/no-img-element -- local preview of a not-yet-uploaded file
              <img src={s.image} alt="" className="size-full object-cover" />
            ) : (
              <Photo src={s.image} alt="" fill sizes="200px" className="object-cover" />
            )}
            <button
              type="button"
              aria-label={`Remove ${s.label}`}
              onClick={() => {
                setItems((list) => list.filter((_, j) => j !== i));
                markDirty();
              }}
              className="absolute top-2 right-2 grid size-7 cursor-pointer place-items-center rounded-md bg-white/95 text-ink opacity-0 shadow-sm transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 max-md:opacity-100"
            >
              <TrashIcon size={14} />
            </button>
          </div>
          <label htmlFor={`${name}-${s.id}`} className="sr-only">
            Name
          </label>
          <input id={`${name}-${s.id}`} name={`${name}.${s.id}`} defaultValue={s.label} placeholder="Name" className={`${field} mt-2 h-9`} />
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="grid aspect-square w-full cursor-pointer place-items-center rounded-lg border border-dashed border-[#d6d6d6] bg-white text-gray-nav transition-colors hover:border-ink hover:text-ink"
        >
          <span className="flex flex-col items-center gap-2 px-2 text-center font-jakarta text-[12px] font-semibold">
            <UploadIcon size={20} />
            {addLabel}
          </span>
        </button>
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            urls.current.push(url);
            setItems((list) => [...list, { id: `new-${list.length}-${file.name}`, label: "", image: url, local: true }]);
            markDirty();
            e.target.value = "";
          }}
        />
      </li>
    </ul>
  );
}
