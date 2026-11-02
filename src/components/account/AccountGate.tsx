"use client";

import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryButton, secondaryButton, smallBody } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { useSession } from "@/lib/store/account";
import { useHydrated } from "@/lib/store/persistent";

/* Client-side gate for the demo account. TODO(backend): replace with a server
   session check in the account layout (redirect to /login?next=…). */
export default function AccountGate({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const session = useSession();
  const pathname = usePathname() as Route;

  if (!hydrated) return <div className="min-h-[360px]" aria-busy="true" />;

  if (!session) {
    return (
      <div className="max-w-[520px] pb-[110px]">
        <p className="font-jakarta text-xl font-bold text-ink">Please sign in to view your account.</p>
        <p className={`${smallBody} mt-3`}>Orders, saved addresses and invoices are kept in your Windmill account.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={routes.login(pathname)} className={primaryButton}>
            Sign in
          </Link>
          <Link href={routes.register(pathname)} className={secondaryButton}>
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
