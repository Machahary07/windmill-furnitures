"use client";

import { useState } from "react";
import type { Category } from "@/lib/products";
import { Field, field } from "./ui";

/* Category + type selects; the type list follows the chosen category */
export default function CategoryTypeFields({ categories, category, type }: { categories: Pick<Category, "handle" | "title" | "types">[]; category?: string; type?: string }) {
  const [handle, setHandle] = useState(category ?? categories[0].handle);
  const types = categories.find((c) => c.handle === handle)?.types ?? [];
  return (
    <div className="space-y-4">
      <Field label="Category" htmlFor="category">
        <select id="category" name="category" value={handle} onChange={(e) => setHandle(e.target.value as Category["handle"])} className={`${field} cursor-pointer`}>
          {categories.map((c) => (
            <option key={c.handle} value={c.handle}>
              {c.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Type" htmlFor="type">
        <select key={handle} id="type" name="type" defaultValue={handle === category ? type : types[0]?.id} className={`${field} cursor-pointer`}>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
