"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { ChevronIcon } from "@/components/ui/icons";
import { TrashIcon, UploadIcon } from "./icons";
import { useMarkDirty } from "./PreviewForm";

type Item = { src: string; local?: boolean };

/* Ordered photo list: first is the main image. Uploads preview from the
   browser only (object URLs). TODO(backend): upload to Payload media (Vercel Blob). */
export default function ImageManager({ name, images, columns = "grid-cols-4 max-sm:grid-cols-2" }: { name: string; images: string[]; columns?: string }) {
  const [items, setItems] = useState<Item[]>(images.map((src) => ({ src })));
  const markDirty = useMarkDirty();
  const input = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  const update = (fn: (list: Item[]) => Item[]) => {
    setItems(fn);
    markDirty();
  };
  const move = (i: number, by: number) =>
    update((list) => {
      const next = [...list];
      [next[i], next[i + by]] = [next[i + by], next[i]];
      return next;
    });

  return (
    <div>
      <ul className={`grid gap-3 ${columns}`}>
        {items.map((item, i) => (
          <li key={item.src} className="group relative aspect-square overflow-hidden rounded-lg border border-[#ececec] bg-[#f6f6f3]">
            <input type="hidden" name={name} value={item.local ? "" : item.src} />
            {item.local ? (
              // eslint-disable-next-line @next/next/no-img-element -- local preview of a not-yet-uploaded file
              <img src={item.src} alt="" className="size-full object-cover" />
            ) : (
              <Photo src={item.src} alt="" fill sizes="200px" className="object-cover" />
            )}
            {i === 0 && <span className="absolute top-2 left-2 rounded bg-white/90 px-1.5 py-0.5 font-jakarta text-[10px] font-bold tracking-[0.1em] text-ink uppercase">Main</span>}
            <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 max-md:opacity-100">
              <span className="flex gap-1">
                <IconButton label="Move earlier" disabled={i === 0} onClick={() => move(i, -1)}>
                  <ChevronIcon dir="left" size={9} />
                </IconButton>
                <IconButton label="Move later" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                  <ChevronIcon dir="right" size={9} />
                </IconButton>
              </span>
              <IconButton label="Remove photo" onClick={() => update((list) => list.filter((_, j) => j !== i))}>
                <TrashIcon size={14} />
              </IconButton>
            </div>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => input.current?.click()}
            className="grid aspect-square w-full cursor-pointer place-items-center rounded-lg border border-dashed border-[#d6d6d6] bg-white text-gray-nav transition-colors hover:border-ink hover:text-ink"
          >
            <span className="flex flex-col items-center gap-2 font-jakarta text-[12px] font-semibold">
              <UploadIcon size={20} />
              Add photos
            </span>
          </button>
          <input
            ref={input}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              const files = [...(e.target.files ?? [])];
              const added = files.map((f) => URL.createObjectURL(f));
              urls.current.push(...added);
              update((list) => [...list, ...added.map((src) => ({ src, local: true }))]);
              e.target.value = "";
            }}
          />
        </li>
      </ul>
    </div>
  );
}

function IconButton({ label, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type="button" aria-label={label} title={label} className="grid size-7 cursor-pointer place-items-center rounded-md bg-white/95 text-ink shadow-sm hover:bg-white disabled:cursor-default disabled:opacity-40" {...rest}>
      {children}
    </button>
  );
}
