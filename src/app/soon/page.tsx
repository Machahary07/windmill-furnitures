import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Coming Soon",
};

const linkClass =
  "inline-block border-b-2 border-red pb-[3px] font-jakarta text-[15px] font-bold text-ink";

export default function Soon() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Logo className="pt-9" />

      <main className="my-auto px-6 text-center">
        <h1 className="indent-[0.15em] font-outfit text-[clamp(48px,11vw,150px)] leading-none font-bold tracking-[0.15em] text-black">
          SOON
        </h1>
        <p className="mt-[26px] font-jakarta text-base font-medium text-gray-body">
          This part of the site is still being built. Check back shortly.
        </p>
        <div className="mt-[34px] flex justify-center gap-10">
          <Link href="/" className={linkClass}>
            Home page
          </Link>
          <Link href="/login" className={linkClass}>
            Log in
          </Link>
        </div>
      </main>

      <footer className="pb-7 font-jakarta text-[13px] font-medium text-gray-nav">
        Windmill — build in progress
      </footer>
    </div>
  );
}
