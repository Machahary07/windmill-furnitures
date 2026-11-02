"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { useMarkDirty } from "./PreviewForm";
import { field, ghostButton } from "./ui";

/* Editable list of short labels (product types, delivery states…) */
export default function ChipList({ name, items, placeholder, options }: { name: string; items: string[]; placeholder: string; options?: readonly string[] }) {
  const [list, setList] = useState(items);
  const [draft, setDraft] = useState("");
  const markDirty = useMarkDirty();
  const listId = `${name}-options`;

  const add = () => {
    const v = draft.trim();
    if (v && !list.includes(v) && (!options || options.includes(v))) {
      setList((l) => [...l, v]);
      markDirty();
    }
    setDraft("");
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-1.5">
        {list.map((item) => (
          <li key={item} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#e3e3e3] bg-white pr-1 pl-3 font-jakarta text-[13px] font-semibold text-ink">
            <input type="hidden" name={name} value={item} />
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => {
                setList((l) => l.filter((x) => x !== item));
                markDirty();
              }}
              className="grid size-6 cursor-pointer place-items-center rounded-full text-gray-nav hover:bg-[#f1f1ee] hover:text-ink"
            >
              <CloseIcon size={12} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <label htmlFor={`${name}-add`} className="sr-only">
          {placeholder}
        </label>
        <input
          id={`${name}-add`}
          value={draft}
          list={options ? listId : undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={field}
        />
        {options && (
          <datalist id={listId}>
            {options.filter((o) => !list.includes(o)).map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        )}
        <button type="button" onClick={add} className={ghostButton}>
          Add
        </button>
      </div>
    </div>
  );
}
