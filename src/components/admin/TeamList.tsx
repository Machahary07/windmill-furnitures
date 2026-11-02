"use client";

import { useState } from "react";
import Photo from "@/components/ui/Photo";
import { ChevronIcon } from "@/components/ui/icons";
import type { Member } from "@/lib/team";
import { PlusIcon, TrashIcon } from "./icons";
import { useMarkDirty } from "./PreviewForm";
import { field, ghostButton } from "./ui";

/* Ordered people list: name + role per row. Order here is the order on the site. */
export default function TeamList({ name, members, placeholderImage }: { name: string; members: Member[]; placeholderImage: string }) {
  const [rows, setRows] = useState(() => members.map((m, i) => ({ ...m, key: `${name}-${i}` })));
  const [added, setAdded] = useState(0);
  const markDirty = useMarkDirty();
  const update = (fn: (r: typeof rows) => typeof rows) => {
    setRows(fn);
    markDirty();
  };
  const move = (i: number, by: number) =>
    update((r) => {
      const next = [...r];
      [next[i], next[i + by]] = [next[i + by], next[i]];
      return next;
    });

  return (
    <div>
      <ul className="divide-y divide-[#f0f0f0]">
        {rows.map((m, i) => (
          <li key={m.key} className="flex items-center gap-3 py-3 first:pt-0 max-sm:flex-wrap">
            <Photo src={m.image} alt="" width={44} height={50} sizes="44px" className="h-[50px] w-11 shrink-0 rounded-md object-cover" />
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 max-sm:grid-cols-1">
              <label className="sr-only" htmlFor={`${m.key}-name`}>
                Name
              </label>
              <input id={`${m.key}-name`} name={`${name}.name`} defaultValue={m.name} placeholder="Name" className={`${field} h-9`} />
              <label className="sr-only" htmlFor={`${m.key}-role`}>
                Role
              </label>
              <input id={`${m.key}-role`} name={`${name}.role`} defaultValue={m.role} placeholder="Role" className={`${field} h-9`} />
            </div>
            <div className="flex shrink-0 gap-1 max-sm:ml-auto">
              <RowButton label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                <ChevronIcon dir="left" size={9} className="rotate-90" />
              </RowButton>
              <RowButton label="Move down" disabled={i === rows.length - 1} onClick={() => move(i, 1)}>
                <ChevronIcon dir="right" size={9} className="rotate-90" />
              </RowButton>
              <RowButton label={`Remove ${m.name || "person"}`} onClick={() => update((r) => r.filter((_, j) => j !== i))}>
                <TrashIcon size={15} />
              </RowButton>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          update((r) => [...r, { name: "", role: "", image: placeholderImage, key: `${name}-new-${added}` }]);
          setAdded((n) => n + 1);
        }}
        className={`${ghostButton} mt-4`}
      >
        <PlusIcon size={15} /> Add person
      </button>
    </div>
  );
}

function RowButton({ label, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type="button" aria-label={label} title={label} className="grid size-9 cursor-pointer place-items-center rounded-lg text-gray-body hover:bg-[#f1f1ee] hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent" {...rest}>
      {children}
    </button>
  );
}
