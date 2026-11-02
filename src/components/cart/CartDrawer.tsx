"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import { dur, ease, gsap, useGSAP, usePresence } from "@/lib/motion";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { cart, useCart, useCartDrawer } from "@/lib/store/cart";
import { CloseIcon } from "@/components/ui/icons";
import { primaryButton, secondaryButton, smallBody } from "@/components/ui/styles";
import CartLineItem from "./CartLineItem";

export default function CartDrawer() {
  const open = useCartDrawer();
  const { mounted, unmount } = usePresence(open);
  const { lines, count, subtotal } = useCart();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  /* slide in from the right / slide out, then unmount */
  useGSAP(
    () => {
      if (!mounted) return;
      const backdrop = "[data-backdrop]";
      const rows = gsap.utils.toArray<HTMLElement>("[data-cart-row]", root.current);
      if (open) {
        gsap.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: dur(0.4), ease: ease.soft, overwrite: true });
        gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: dur(0.6), ease: ease.out, overwrite: true });
        if (rows.length) gsap.fromTo(rows, { x: 32, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: dur(0.5), ease: ease.out, stagger: 0.06, delay: dur(0.18) });
      } else {
        gsap.to(backdrop, { autoAlpha: 0, duration: dur(0.35), ease: ease.in, overwrite: true });
        gsap.to(panel.current, { xPercent: 100, duration: dur(0.4), ease: ease.in, overwrite: true, onComplete: unmount });
      }
    },
    { dependencies: [open, mounted], scope: root },
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  if (!mounted) return null;

  return (
    /* inert while sliding out: nothing inside is focusable or announced */
    <div ref={root} inert={!open} aria-hidden={!open || undefined} className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <button type="button" data-backdrop aria-label="Close cart" onClick={cart.close} className="absolute inset-0 cursor-default bg-black/30" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-[440px] max-w-full flex-col bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.08)] outline-none"
      >
        <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-[#f1f1f1] px-7">
          <h2 id="cart-title" className="font-jakarta text-lg font-bold text-ink">
            Your cart {count > 0 && <span className="font-medium text-gray-nav">({count})</span>}
          </h2>
          <button type="button" onClick={cart.close} aria-label="Close cart" className="cursor-pointer transition-transform duration-300 hover:rotate-90">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div data-cart-row className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <p className="font-jakarta text-xl font-bold text-ink">Your cart is empty</p>
            <p className={`${smallBody} mt-3`}>Every piece is made to order in our workshop — start with the catalog.</p>
            <Link href={routes.shop()} onClick={cart.close} className={`${primaryButton} mt-8`}>
              Browse furniture
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[#f1f1f1] overflow-y-auto px-7">
              {lines.map((line) => (
                <CartLineItem key={line.key} line={line} onNavigate={cart.close} />
              ))}
            </ul>
            <div data-cart-row className="shrink-0 border-t border-[#ececec] px-7 pt-5 pb-7">
              <div className="flex items-baseline justify-between font-jakarta">
                <span className="text-sm font-semibold text-ink">Subtotal</span>
                <span className="text-lg font-bold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className={`${smallBody} mt-1 text-[12px]`}>
                Prices include GST. Delivery is calculated at checkout.
                {count >= site.bulkOrderQty && " For orders of 4 or more pieces our studio will be in touch about lead times."}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link href={routes.cart} onClick={cart.close} className={secondaryButton}>
                  View cart
                </Link>
                <Link href={routes.checkout} onClick={cart.close} className={primaryButton}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
