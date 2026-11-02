"use client";

import type { ReactNode } from "react";
import { toast } from "./toast";

/* One-shot forms (invites): submit confirms and clears, nothing is stored.
   TODO(backend): server action. */
export default function ToastForm({ message, children }: { message: string; children: ReactNode }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        toast(message);
      }}
    >
      {children}
    </form>
  );
}
