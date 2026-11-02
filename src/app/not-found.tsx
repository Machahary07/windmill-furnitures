import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { redLink } from "@/components/ui/styles";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Page not found" };

/* Same composition as the old SOON placeholder */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Logo className="pt-9" />

      <main className="my-auto px-6 text-center">
        <h1 className="indent-[0.15em] font-outfit text-[clamp(48px,11vw,150px)] leading-none font-bold tracking-[0.15em] text-black">404</h1>
        <p className="mt-[26px] font-jakarta text-base font-medium text-gray-body">This page has wandered off the workshop floor.</p>
        <div className="mt-[34px] flex flex-wrap justify-center gap-10">
          <Link href={routes.home} className={redLink}>
            Home page
          </Link>
          <Link href={routes.shop()} className={redLink}>
            Shop
          </Link>
          <Link href={routes.search()} className={redLink}>
            Search
          </Link>
        </div>
      </main>

      <footer className="pb-7 font-jakarta text-[13px] font-medium text-gray-nav">Windmill — handcrafted in New Delhi</footer>
    </div>
  );
}
