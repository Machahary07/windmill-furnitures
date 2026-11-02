import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { robots: { index: false } };

/* Distraction-free checkout: logo, step rail, and a way back to the cart */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-[#f1f1f1]">
        <div className="relative flex h-[58px] items-center justify-between px-7 max-md:px-5">
          <Logo />
          <CheckoutSteps />
          <Link href={routes.cart} className="font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">
            Back to cart
          </Link>
        </div>
      </header>
      <main id="content" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-[#ececec] py-6 text-center font-jakarta text-[13px] font-medium text-footer">
        <span className="inline-flex flex-wrap justify-center gap-x-[52px] gap-y-2">
          <Link href={routes.shipping} className="hover:text-ink">
            Shipping &amp; returns
          </Link>
          <Link href={routes.terms} className="hover:text-ink">
            Terms
          </Link>
          <Link href={routes.privacy} className="hover:text-ink">
            Privacy
          </Link>
          <Link href={routes.contact("order")} className="hover:text-ink">
            Help
          </Link>
        </span>
      </footer>
    </>
  );
}
