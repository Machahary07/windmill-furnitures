"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { adminLogout } from "@/app/admin/actions";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { adminRoutes, routes } from "@/lib/routes";
import { Toaster } from "./toast";
import {
  ChairIcon,
  CustomersIcon,
  DashboardIcon,
  ExternalIcon,
  ImageIcon,
  InboxIcon,
  LayersIcon,
  LogoutIcon,
  MailIcon,
  OrdersIcon,
  SettingsIcon,
  ShieldIcon,
  SwatchIcon,
  TeamIcon,
} from "./icons";

type Item = { label: string; href: Route; icon: (p: { size?: number }) => ReactNode; badge?: number; exact?: boolean };

/* below this width the sidebar becomes a drawer (keep in sync with the min-[1100px] classes) */
const DRAWER_QUERY = "(max-width: 1099px)";
const subscribeMedia = (cb: () => void) => {
  const mq = window.matchMedia(DRAWER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function AdminShell({ children, newOrders, newEnquiries }: { children: ReactNode; newOrders: number; newEnquiries: number }) {
  const pathname = usePathname();
  /* the drawer belongs to the page it was opened on, so navigating closes it */
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const isDrawer = useSyncExternalStore(subscribeMedia, () => window.matchMedia(DRAWER_QUERY).matches, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const groups: { title?: string; items: Item[] }[] = [
    { items: [{ label: "Dashboard", href: adminRoutes.home, icon: DashboardIcon, exact: true }] },
    {
      title: "Sales",
      items: [
        { label: "Orders", href: adminRoutes.orders(), icon: OrdersIcon, badge: newOrders },
        { label: "Customers", href: adminRoutes.customers(), icon: CustomersIcon },
      ],
    },
    {
      title: "Catalog",
      items: [
        { label: "Products", href: adminRoutes.products(), icon: ChairIcon },
        { label: "Categories", href: adminRoutes.categories, icon: LayersIcon },
        { label: "Woods & fabrics", href: adminRoutes.materials, icon: SwatchIcon },
      ],
    },
    {
      title: "Studio",
      items: [
        { label: "Enquiries", href: adminRoutes.enquiries(), icon: InboxIcon, badge: newEnquiries },
        { label: "Newsletter", href: adminRoutes.newsletter, icon: MailIcon },
        { label: "Projects", href: adminRoutes.projects, icon: ImageIcon },
        { label: "Team", href: adminRoutes.team, icon: TeamIcon },
      ],
    },
    {
      title: "Admin",
      items: [
        { label: "Settings", href: adminRoutes.settings, icon: SettingsIcon },
        { label: "Staff", href: adminRoutes.staff, icon: ShieldIcon },
      ],
    },
  ];

  const isActive = (item: Item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <div className="flex min-h-dvh bg-[#fafaf8]">
      <aside
        id="admin-nav"
        inert={isDrawer && !open}
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#ececec] bg-white transition-transform duration-300 ease-out ${
          open ? "translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.12)]" : "max-[1099px]:-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link href={adminRoutes.home} className="flex items-baseline gap-2">
            <span className="font-jakarta text-[22px] font-bold text-logo">Windmill</span>
            <span className="rounded bg-[#f1f1ee] px-1.5 py-0.5 font-jakarta text-[10px] font-bold tracking-[0.12em] text-gray-body uppercase">Admin</span>
          </Link>
          <button type="button" onClick={() => setOpenOn(null)} aria-label="Close menu" className="grid size-9 cursor-pointer place-items-center rounded-lg text-gray-body hover:bg-[#f1f1ee] min-[1100px]:hidden">
            <CloseIcon size={18} />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 pb-4">
          {groups.map((g, gi) => (
            <div key={gi} className={gi ? "mt-5" : "mt-1"}>
              {g.title && <p className="mb-1.5 px-3 font-jakarta text-[10px] font-semibold tracking-[0.16em] text-faint uppercase">{g.title}</p>}
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const active = isActive(item);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="relative flex h-9 items-center gap-3 rounded-lg px-3 font-jakarta text-[13.5px] font-semibold text-gray-body transition-colors hover:bg-[#f6f6f3] hover:text-ink aria-[current=page]:bg-[#f1f1ee] aria-[current=page]:text-ink aria-[current=page]:before:absolute aria-[current=page]:before:inset-y-2 aria-[current=page]:before:-left-3 aria-[current=page]:before:w-0.5 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-red"
                      >
                        <item.icon size={17} />
                        <span className="flex-1">{item.label}</span>
                        {!!item.badge && (
                          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red px-1.5 font-jakarta text-[11px] font-bold text-white">{item.badge}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="space-y-0.5 border-t border-[#f0f0f0] p-3">
          <Link href={routes.home} target="_blank" className="flex h-9 items-center gap-3 rounded-lg px-3 font-jakarta text-[13.5px] font-semibold text-gray-body hover:bg-[#f6f6f3] hover:text-ink">
            <ExternalIcon size={17} /> View site
          </Link>
          <form action={adminLogout}>
            <button type="submit" className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-3 font-jakarta text-[13.5px] font-semibold text-gray-body hover:bg-[#f6f6f3] hover:text-ink">
              <LogoutIcon size={17} /> Log out
            </button>
          </form>
        </div>
      </aside>

      {/* drawer backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpenOn(null)}
        className={`fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 min-[1100px]:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <div className="flex min-w-0 flex-1 flex-col min-[1100px]:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#ececec] bg-white px-8 max-md:px-4">
          <button
            type="button"
            onClick={() => setOpenOn(pathname)}
            aria-label="Open menu"
            aria-controls="admin-nav"
            aria-expanded={open}
            className="-ml-2 grid size-9 cursor-pointer place-items-center rounded-lg text-ink hover:bg-[#f1f1ee] min-[1100px]:hidden"
          >
            <MenuIcon size={20} />
          </button>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#fbf5e6] px-3 py-1 font-jakarta text-[12px] font-semibold text-[#7a5a0e]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#c28a12]" />
            <span className="max-sm:hidden">Preview — sample data, changes aren’t saved</span>
            <span className="sm:hidden">Preview — not saved</span>
          </p>
          <span
            title="Studio Admin"
            className="ml-auto grid size-9 shrink-0 place-items-center rounded-full bg-[#1b1b1b] font-jakarta text-[12px] font-bold text-white"
          >
            SA
          </span>
        </header>

        <main id="admin-content" className="mx-auto w-full max-w-[1200px] px-8 py-8 max-md:px-4 max-md:py-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
