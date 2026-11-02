import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ChevronIcon } from "@/components/ui/icons";
import type { EnquiryStatus } from "@/lib/admin/data";
import type { OrderStatus } from "@/lib/admin/status";

/* Admin class recipes — same type and palette as the storefront (Jakarta,
   ink, the red accent), tightened for dense screens. */

export const card = "rounded-xl border border-[#ececec] bg-white";
export const button =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#141414] px-4 font-jakarta text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50";
export const ghostButton =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e3e3e3] bg-white px-4 font-jakarta text-[13px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink";
export const field =
  "h-10 w-full rounded-lg border border-[#e3e3e3] bg-white px-3 font-jakarta text-sm font-medium text-ink outline-none placeholder:text-faint focus:border-ink/50";
export const area =
  "min-h-[120px] w-full rounded-lg border border-[#e3e3e3] bg-white px-3 py-2.5 font-jakarta text-sm leading-6 font-medium text-ink outline-none placeholder:text-faint focus:border-ink/50";
export const fieldLabel = "mb-1.5 block font-jakarta text-[13px] font-semibold text-ink";
export const hint = "mt-1.5 font-jakarta text-[12px] leading-5 text-gray-nav";
export const th = "px-4 py-3 text-left font-jakarta text-[11px] font-semibold tracking-[0.08em] whitespace-nowrap text-gray-nav uppercase";
export const td = "px-4 py-3.5 font-jakarta text-[13px] text-ink";
export const tableRow = "border-t border-[#f0f0f0] transition-colors hover:bg-[#fafaf8]";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const timeFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
export const shortDate = (iso: string) => dateFormat.format(new Date(iso));
export const dateTime = (iso: string) => timeFormat.format(new Date(iso));

export function AdminHeader({ title, description, actions, back }: { title: string; description?: ReactNode; actions?: ReactNode; back?: { href: Route; label: string } }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {back && (
          <Link href={back.href} className="mb-3 inline-flex items-center gap-2 font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink">
            <ChevronIcon dir="left" size={9} /> {back.label}
          </Link>
        )}
        <h1 className="font-jakarta text-[28px] leading-tight font-bold tracking-[-0.01em] text-ink max-md:text-2xl">{title}</h1>
        {description && <p className="mt-1.5 font-jakarta text-sm text-gray-nav">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </header>
  );
}

export function Card({ title, actions, children, className = "", padded = true }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string; padded?: boolean }) {
  return (
    <section className={`${card} ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-4 border-b border-[#f0f0f0] px-5 py-4">
          <h2 className="font-jakarta text-[15px] font-bold text-ink">{title}</h2>
          {actions}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function Field({ label, hint: help, htmlFor, children, className = "" }: { label: string; hint?: ReactNode; htmlFor?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
      </label>
      {children}
      {help && <p className={hint}>{help}</p>}
    </div>
  );
}

/** on/off switch built on a real checkbox (works in plain <form>s) */
export function Toggle({ name, label, defaultChecked, detail }: { name: string; label: string; defaultChecked?: boolean; detail?: string }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block font-jakarta text-[13px] font-semibold text-ink">{label}</span>
        {detail && <span className="mt-0.5 block font-jakarta text-[12px] text-gray-nav">{detail}</span>}
      </span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="relative mt-0.5 h-[22px] w-[38px] shrink-0 rounded-full bg-[#dcdcdc] transition-colors peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4"
      />
    </label>
  );
}

const orderStatus: Record<OrderStatus, { label: string; dot: string; bg: string }> = {
  confirmed: { label: "Confirmed", dot: "bg-[#c28a12]", bg: "bg-[#fbf5e6]" },
  "in-production": { label: "In the workshop", dot: "bg-[#2f6fb5]", bg: "bg-[#ecf3fb]" },
  dispatched: { label: "Dispatched", dot: "bg-[#7a4fb5]", bg: "bg-[#f3eefa]" },
  delivered: { label: "Delivered", dot: "bg-[#2f7a4f]", bg: "bg-[#eef6f1]" },
};
export const orderStatusLabel = (s: OrderStatus) => orderStatus[s].label;

const enquiryStatus: Record<EnquiryStatus, { label: string; dot: string; bg: string }> = {
  new: { label: "New", dot: "bg-red", bg: "bg-[#fbeeec]" },
  replied: { label: "Replied", dot: "bg-[#2f6fb5]", bg: "bg-[#ecf3fb]" },
  closed: { label: "Closed", dot: "bg-[#9a9a9a]", bg: "bg-[#f3f3f3]" },
};

function Pill({ label, dot, bg }: { label: string; dot: string; bg: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-jakarta text-[12px] font-semibold whitespace-nowrap text-ink ${bg}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
export const OrderPill = ({ status }: { status: OrderStatus }) => <Pill {...orderStatus[status]} />;
export const EnquiryPill = ({ status }: { status: EnquiryStatus }) => <Pill {...enquiryStatus[status]} />;

/** filter tabs that are plain links (?status=…), so they work without JS */
export function FilterTabs({ tabs }: { tabs: { label: string; href: Route; active: boolean; count?: number }[] }) {
  return (
    <nav aria-label="Filter" className="no-scrollbar flex gap-1 overflow-x-auto">
      {tabs.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          aria-current={t.active ? "page" : undefined}
          className="inline-flex h-9 items-center gap-2 rounded-lg px-3 font-jakarta text-[13px] font-semibold whitespace-nowrap text-gray-nav transition-colors hover:text-ink aria-[current=page]:bg-[#f1f1ee] aria-[current=page]:text-ink"
        >
          {t.label}
          {t.count != null && <span className="font-medium text-faint">{t.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="font-jakarta text-[15px] font-bold text-ink">{title}</p>
      {children && <p className="mt-1.5 font-jakarta text-[13px] text-gray-nav">{children}</p>}
    </div>
  );
}
