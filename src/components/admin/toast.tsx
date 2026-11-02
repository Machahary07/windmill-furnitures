"use client";

import { useEffect, useSyncExternalStore } from "react";

/* One-line notices ("Saved", "Status updated"). toast() can be called from
   any client component; <Toaster /> lives once in the admin shell. */

type Toast = { id: number; message: string };
let current: Toast | null = null;
let seq = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(message: string) {
  current = { id: ++seq, message };
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function Toaster() {
  const t = useSyncExternalStore(subscribe, () => current, () => null);

  useEffect(() => {
    if (!t) return;
    const timer = setTimeout(() => {
      if (current?.id === t.id) {
        current = null;
        emit();
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, [t]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {t && (
        <p key={t.id} className="animate-[toast_.25s_ease-out] rounded-lg bg-[#141414] px-4 py-3 font-jakarta text-[13px] font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
          {t.message}
        </p>
      )}
    </div>
  );
}
