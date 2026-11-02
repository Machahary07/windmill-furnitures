"use client";

import { useState } from "react";
import type { AdminOrder } from "@/lib/admin/data";
import { statusOrder, type OrderStatus } from "@/lib/admin/status";
import { button, dateTime, field, orderStatusLabel, OrderPill } from "./ui";
import { toast } from "./toast";

/* Status rail + history + "move to" control. Local only in the preview.
   TODO(backend): server action → update the order, email the customer. */
export default function OrderStatusControl({ order }: { order: Pick<AdminOrder, "status" | "timeline"> }) {
  const [timeline, setTimeline] = useState(order.timeline);
  const status = timeline.at(-1)!.status;
  const current = statusOrder.indexOf(status);
  const [next, setNext] = useState<OrderStatus>(statusOrder[Math.min(current + 1, statusOrder.length - 1)]);

  const update = () => {
    if (next === status) return;
    const at = new Date().toISOString();
    /* moving forward fills in skipped steps; moving back trims the history */
    const target = statusOrder.indexOf(next);
    setTimeline((t) => (target > current ? [...t, ...statusOrder.slice(current + 1, target + 1).map((s) => ({ status: s, at }))] : t.slice(0, target + 1)));
    setNext(statusOrder[Math.min(target + 1, statusOrder.length - 1)]);
    toast(`Marked ${orderStatusLabel(next).toLowerCase()} — the customer would be emailed`);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <OrderPill status={status} />
        <span className="font-jakarta text-[12px] font-semibold text-gray-nav">
          Step {current + 1} of {statusOrder.length}
        </span>
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label="Progress">
        {statusOrder.map((s, i) => (
          <li key={s} aria-current={i === current ? "step" : undefined} className={`h-1 rounded-full ${i <= current ? "bg-ink" : "bg-[#ececec]"}`}>
            <span className="sr-only">{orderStatusLabel(s)}</span>
          </li>
        ))}
      </ol>

      <ol className="mt-5 space-y-3 border-l border-[#ececec] pl-4">
        {[...timeline].reverse().map((t) => (
          <li key={t.status} className="relative">
            <span aria-hidden="true" className="absolute top-1.5 -left-[20.5px] size-2 rounded-full bg-ink ring-4 ring-white" />
            <span className="block font-jakarta text-[13px] font-semibold text-ink">{orderStatusLabel(t.status)}</span>
            <span className="block font-jakarta text-[12px] text-gray-nav">{dateTime(t.at)}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex gap-2 border-t border-[#f0f0f0] pt-5">
        <label htmlFor="next-status" className="sr-only">
          Move order to
        </label>
        <select id="next-status" value={next} onChange={(e) => setNext(e.target.value as OrderStatus)} className={`${field} cursor-pointer`}>
          {statusOrder.map((s) => (
            <option key={s} value={s} disabled={s === status}>
              {orderStatusLabel(s)}
            </option>
          ))}
        </select>
        <button type="button" onClick={update} disabled={next === status} className={button}>
          Update
        </button>
      </div>
    </div>
  );
}
