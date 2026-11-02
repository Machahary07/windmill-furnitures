"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";

export default function SortSelect({ value, options }: { value: string; options: { id: string; label: string; href: Route }[] }) {
  const router = useRouter();
  return (
    <label className="flex items-center gap-3 font-jakarta text-[13px] font-medium text-gray-nav">
      Sort
      <select
        value={value}
        onChange={(e) => {
          const next = options.find((o) => o.id === e.target.value);
          if (next) router.push(next.href, { scroll: false });
        }}
        className="cursor-pointer border-b border-ink bg-transparent py-1 pr-1 font-semibold text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
