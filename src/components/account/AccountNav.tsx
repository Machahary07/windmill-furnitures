"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { account, useSession } from "@/lib/store/account";

const tabs = [
  { label: "Orders", href: routes.account },
  { label: "Addresses", href: routes.addresses },
  { label: "Settings", href: routes.settings },
] as const;

export default function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ececec]">
      <nav aria-label="Account" className="flex gap-9 max-sm:gap-6">
        {tabs.map((t) => {
          const active = t.href === routes.account ? pathname === t.href || pathname.startsWith("/account/orders") : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className="relative pb-3 font-jakarta text-[15px] font-medium text-gray-nav hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-px aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-red"
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      {session && (
        <button
          type="button"
          onClick={() => {
            account.signOut();
            router.push(routes.home);
          }}
          className="mb-3 cursor-pointer font-jakarta text-[13px] font-medium text-gray-nav underline underline-offset-4 hover:text-ink"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
