"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { button, ghostButton } from "./ui";
import { toast } from "./toast";

/* Edit forms in the UI preview: fields are real inputs, Save confirms but
   stores nothing. The sticky bar appears once something changes.
   TODO(backend): submit to a server action that writes to Payload. */

const DirtyContext = createContext<() => void>(() => {});
/** for widgets that change the form without a native input event */
export const useMarkDirty = () => useContext(DirtyContext);

export default function PreviewForm({
  children,
  saveLabel = "Save changes",
  savedMessage = "Saved — preview only, nothing is stored yet",
  className = "pb-24",
}: {
  children: ReactNode;
  saveLabel?: string;
  savedMessage?: string;
  /** bottom room so the sticky save bar never covers the last field */
  className?: string;
}) {
  const [dirty, setDirty] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <form
      key={formKey}
      onChange={() => setDirty(true)}
      onSubmit={(e) => {
        e.preventDefault();
        setDirty(false);
        toast(savedMessage);
      }}
      className={className}
    >
      <DirtyContext value={() => setDirty(true)}>{children}</DirtyContext>
      <div
        inert={!dirty}
        className={`fixed right-0 bottom-0 left-0 z-30 border-t border-[#ececec] bg-white/95 transition-transform duration-300 ease-out min-[1100px]:left-[248px] ${dirty ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-8 py-3 max-md:px-4">
          <p className="font-jakarta text-[13px] font-semibold text-ink">Unsaved changes</p>
          <div className="flex gap-2">
            <button
              type="button"
              className={ghostButton}
              onClick={() => {
                setDirty(false);
                setFormKey((k) => k + 1);
              }}
            >
              Discard
            </button>
            <button type="submit" className={button}>
              {saveLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
