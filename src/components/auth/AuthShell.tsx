import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { routes } from "@/lib/routes";
import loginArt from "../../../public/images/login-art.jpg";

/* Split layout from the original login screen: form panel + artwork panel */
export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left: form panel */}
      <section className="flex w-[50.6%] flex-col items-center px-12 pt-9 pb-7 max-[860px]:w-full max-[860px]:px-6 max-[860px]:pt-7 max-[860px]:pb-6">
        <Logo />

        <main className="my-auto w-full max-w-[544px] py-10 text-center">
          <h1 className="font-jakarta text-[54px] font-bold tracking-[-0.01em] text-ink max-[860px]:text-[38px]">{title}</h1>
          <p className="mt-3.5 font-jakarta text-lg font-medium text-gray-nav">{subtitle}</p>
          {children}
        </main>

        <footer className="flex gap-[52px]">
          <Link href={routes.faq} className="text-sm font-medium text-footer hover:text-ink">
            Help
          </Link>
          <Link href={routes.terms} className="text-sm font-medium text-footer hover:text-ink">
            Terms
          </Link>
          <Link href={routes.privacy} className="text-sm font-medium text-footer hover:text-ink">
            Privacy
          </Link>
        </footer>
      </section>

      {/* Right: artwork panel */}
      <section aria-label="Courtyard architecture photograph" className="relative w-[49.4%] bg-[#f2f1ec] max-[860px]:hidden">
        <Image src={loginArt} alt="" fill loading="eager" fetchPriority="high" quality={85} sizes="50vw" placeholder="blur" className="object-cover" />
      </section>
    </div>
  );
}
