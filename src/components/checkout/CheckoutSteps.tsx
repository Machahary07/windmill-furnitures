"use client";

import { usePathname } from "next/navigation";

const steps = [
  { label: "Details", match: (p: string) => p === "/checkout" },
  { label: "Payment", match: (p: string) => p.startsWith("/checkout/payment") || p.startsWith("/checkout/failed") },
  { label: "Confirmed", match: (p: string) => p.startsWith("/checkout/success") },
];

export default function CheckoutSteps() {
  const pathname = usePathname();
  const current = steps.findIndex((s) => s.match(pathname));
  return (
    <ol aria-label="Checkout progress" className="absolute left-1/2 flex h-full -translate-x-1/2 items-stretch gap-[46px] max-md:hidden">
      {steps.map((s, i) => (
        <li
          key={s.label}
          aria-current={i === current ? "step" : undefined}
          className={`relative flex items-center gap-2 text-[15px] ${
            i === current
              ? "font-semibold text-ink after:absolute after:-inset-x-[18px] after:-bottom-px after:h-0.5 after:bg-red"
              : i < current
                ? "font-medium text-ink"
                : "font-medium text-gray-nav"
          }`}
        >
          <span className="font-jakarta text-[12px]">{String(i + 1).padStart(2, "0")}</span>
          {s.label}
        </li>
      ))}
    </ol>
  );
}
