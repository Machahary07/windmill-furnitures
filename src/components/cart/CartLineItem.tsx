"use client";

import { useRef } from "react";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { formatPrice } from "@/lib/money";
import { cardImage } from "@/lib/products";
import { routes } from "@/lib/routes";
import { dur, ease, gsap } from "@/lib/motion";
import { cart, MAX_QTY, type ResolvedLine } from "@/lib/store/cart";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const btn = "grid size-7 cursor-pointer place-items-center text-base text-ink disabled:cursor-not-allowed disabled:text-faint";
  return (
    <div className="inline-flex items-center rounded-full border border-border" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        −
      </button>
      <span className="w-6 text-center font-jakarta text-[13px] font-semibold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

/* One cart row — used in the drawer (compact) and on /cart */
export default function CartLineItem({ line, onNavigate, large = false }: { line: ResolvedLine; onNavigate?: () => void; large?: boolean }) {
  const href = routes.product(line.slug, { wood: line.wood, upholstery: line.upholstery });
  const row = useRef<HTMLLIElement>(null);

  /* collapse the row smoothly, then drop it from the cart */
  const remove = () => {
    if (!row.current) return cart.remove(line.key);
    gsap.to(row.current, {
      autoAlpha: 0,
      x: 24,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: dur(0.38),
      ease: ease.in,
      onComplete: () => cart.remove(line.key),
    });
  };

  return (
    <li ref={row} data-cart-row className="flex gap-4 overflow-hidden py-5">
      <Link href={href} onClick={onNavigate} className={`relative shrink-0 overflow-hidden rounded-md bg-[#f2f2f2] ${large ? "h-[132px] w-[116px]" : "h-[92px] w-[80px]"}`}>
        <Photo src={cardImage(line.product)} alt={line.product.name} fill sizes="116px" className={line.product.drawing ? "object-contain p-1.5" : "object-cover"} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link href={href} onClick={onNavigate} className="font-jakarta text-sm font-semibold tracking-[0.04em] text-ink uppercase hover:underline">
            {line.product.name}
          </Link>
          <p className="shrink-0 font-jakarta text-sm font-bold text-ink">{formatPrice(line.lineTotal)}</p>
        </div>
        <p className="mt-1 font-jakarta text-[12px] text-gray-nav">
          {line.woodLabel}
          {line.upholsteryLabel && ` · Upholstery ${line.upholsteryLabel}`}
          {line.qty > 1 && ` · ${formatPrice(line.product.price)} each`}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QtyStepper value={line.qty} onChange={(n) => (n <= 0 ? remove() : cart.setQty(line.key, n))} label={line.product.name} />
          <button type="button" onClick={remove} className="cursor-pointer font-jakarta text-[12px] text-gray-nav underline underline-offset-2 hover:text-ink">
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
