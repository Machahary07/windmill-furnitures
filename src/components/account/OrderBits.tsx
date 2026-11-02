import type { Order } from "@/lib/store/account";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

export const statusSteps: { id: Order["status"]; label: string }[] = [
  { id: "confirmed", label: "Confirmed" },
  { id: "in-production", label: "In the workshop" },
  { id: "dispatched", label: "Dispatched" },
  { id: "delivered", label: "Delivered" },
];

export function StatusBadge({ status }: { status: Order["status"] }) {
  const label = statusSteps.find((s) => s.id === status)?.label ?? status;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f7f4] px-3 py-1 font-jakarta text-[12px] font-semibold text-ink">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#2f7a4f]" />
      {label}
    </span>
  );
}

/* Four-step progress rail shown on the order page */
export function StatusRail({ status }: { status: Order["status"] }) {
  const current = statusSteps.findIndex((s) => s.id === status);
  return (
    <ol className="grid grid-cols-4 gap-2">
      {statusSteps.map((s, i) => (
        <li key={s.id} aria-current={i === current ? "step" : undefined}>
          <span className={`block h-1 rounded-full ${i <= current ? "bg-ink" : "bg-[#eeeeee]"}`} />
          <span className={`mt-2.5 block font-jakarta text-[12px] font-semibold ${i <= current ? "text-ink" : "text-faint"}`}>{s.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function AddressBlock({ address }: { address: Order["address"] }) {
  return (
    <address className="font-jakarta text-sm leading-6 text-gray-body not-italic">
      <span className="block font-semibold text-ink">{address.name}</span>
      <span className="block">{address.line1}</span>
      {address.line2 && <span className="block">{address.line2}</span>}
      <span className="block">
        {address.city}, {address.state} {address.pincode}
      </span>
      <span className="block">{address.phone}</span>
    </address>
  );
}
