"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { mainNav } from "@/lib/site";
import { routes } from "@/lib/routes";
import { cart, useCart } from "@/lib/store/cart";
import { useSession } from "@/lib/store/account";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/store/persistent";
import { dur, ease, gsap, useGSAP, usePresence } from "@/lib/motion";
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./ui/icons";

const isActive = (pathname: string, match: readonly string[]) =>
  match.some((m) => (m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(`${m}/`)));

function Badge({ count }: { count: number }) {
  const hydrated = useHydrated();
  const badge = useRef<HTMLSpanElement>(null);
  const last = useRef<number | null>(null);

  /* pop when the count goes up (not on first load, when it hydrates from storage) */
  useGSAP(() => {
    if (!hydrated) return;
    if (last.current !== null && count > last.current && badge.current) {
      gsap.fromTo(badge.current, { scale: 0.4 }, { scale: 1, duration: dur(0.6), ease: "back.out(3)" });
    }
    last.current = count;
  }, [count, hydrated]);

  if (!count) return null;
  return (
    <span
      ref={badge}
      className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 font-jakarta text-[10px] leading-none font-bold text-white"
    >
      {count}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const { slugs } = useWishlist();
  const session = useSession();
  /* menu remembers which page it was opened on, so navigating closes it */
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const menu = usePresence(menuOpen);
  const menuRef = useRef<HTMLElement>(null);

  /* menu drops in and its links rise one after another; reverses on close */
  useGSAP(
    () => {
      if (!menu.mounted || !menuRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]", menuRef.current);
      if (menuOpen) {
        gsap.fromTo(menuRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: dur(0.55), ease: ease.out, overwrite: true });
        gsap.fromTo(items, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: dur(0.5), ease: ease.out, stagger: 0.05, delay: dur(0.12), overwrite: true });
      } else {
        gsap.to(menuRef.current, { clipPath: "inset(0 0 100% 0)", duration: dur(0.4), ease: ease.in, overwrite: true, onComplete: menu.unmount });
      }
    },
    { dependencies: [menuOpen, menu.mounted] },
  );

  return (
    /* no backdrop-filter here: it would become the containing block for the fixed mobile menu */
    <header className="sticky top-0 z-40 border-b border-[#f1f1f1] bg-white">
      <div className="relative flex h-[58px] items-center justify-between px-7 max-md:px-5">
        <Logo />

        <nav aria-label="Main" className="absolute left-1/2 flex h-full -translate-x-1/2 items-stretch gap-[46px] max-[1180px]:gap-8 max-[1060px]:hidden">
          {mainNav.map((link) => {
            const active = isActive(pathname, link.match);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? /* red underline extends ~25px past the text on each side */
                      "relative flex items-center text-[15px] font-semibold text-ink after:absolute after:-inset-x-[25px] after:-bottom-px after:h-0.5 after:bg-red max-[1180px]:after:-inset-x-3"
                    : "relative flex items-center text-[15px] font-medium text-gray-nav transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-[22px] text-ink max-md:gap-4">
          <Link href={routes.search()} className="flex items-center gap-[26px] font-jakarta text-base font-bold max-[1240px]:gap-0" aria-label="Search">
            <span className="text-search max-[1240px]:hidden">Search</span>
            <SearchIcon className="mt-px block" />
          </Link>
          <Link href={routes.wishlist} aria-label={`Wishlist, ${slugs.length} items`} className="relative max-sm:hidden">
            <HeartIcon />
            <Badge count={slugs.length} />
          </Link>
          <Link href={session ? routes.account : routes.login()} aria-label={session ? "My account" : "Log in"} className="max-sm:hidden">
            <UserIcon />
          </Link>
          <button type="button" onClick={cart.open} aria-label={`Open cart, ${count} items`} className="relative cursor-pointer">
            <CartIcon />
            <Badge count={count} />
          </button>
          <button
            type="button"
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="hidden cursor-pointer max-[1060px]:block"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menu.mounted && (
        <nav ref={menuRef} id="mobile-menu" aria-label="Mobile" inert={!menuOpen} aria-hidden={!menuOpen || undefined} className="fixed inset-x-0 top-[59px] bottom-0 overflow-y-auto bg-white px-5 pt-6 pb-10 min-[1061px]:hidden">
          <ul className="space-y-1">
            {mainNav.map((link) => (
              <li key={link.label} data-menu-item>
                <Link
                  href={link.href}
                  onClick={() => setMenuPath(null)}
                  aria-current={isActive(pathname, link.match) ? "page" : undefined}
                  className="block border-b border-[#f1f1f1] py-4 font-jakarta text-[28px] font-bold text-gray-nav aria-[current=page]:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div data-menu-item className="mt-8 flex flex-col gap-4 font-jakarta text-base font-semibold text-ink">
            <Link href={session ? routes.account : routes.login()} onClick={() => setMenuPath(null)} className="flex items-center gap-3">
              <UserIcon /> {session ? "My account" : "Log in / Register"}
            </Link>
            <Link href={routes.wishlist} onClick={() => setMenuPath(null)} className="flex items-center gap-3">
              <HeartIcon /> Wishlist {slugs.length > 0 && `(${slugs.length})`}
            </Link>
            <Link href={routes.contact()} onClick={() => setMenuPath(null)} className="flex items-center gap-3 text-gray-nav">
              Contact the studio
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
