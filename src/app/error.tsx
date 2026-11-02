"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { redLink } from "@/components/ui/styles";
import { routes } from "@/lib/routes";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Logo className="pt-9" />
      <main className="my-auto px-6 text-center">
        <h1 className="indent-[0.15em] font-outfit text-[clamp(48px,11vw,150px)] leading-none font-bold tracking-[0.15em] text-black">OOPS</h1>
        <p className="mt-[26px] font-jakarta text-base font-medium text-gray-body">Something went wrong on our side. Please try again.</p>
        <div className="mt-[34px] flex justify-center gap-10">
          <button type="button" onClick={reset} className={`${redLink} cursor-pointer`}>
            Try again
          </button>
          <Link href={routes.home} className={redLink}>
            Home page
          </Link>
        </div>
      </main>
    </div>
  );
}
