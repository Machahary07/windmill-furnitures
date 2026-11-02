"use client";

import { useState } from "react";
import type { EnquiryStatus } from "@/lib/admin/data";
import { EnquiryPill, field, ghostButton } from "./ui";
import { toast } from "./toast";

const options: { id: EnquiryStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "replied", label: "Replied" },
  { id: "closed", label: "Closed" },
];

/* TODO(backend): server action → update the enquiry */
export default function EnquiryStatusControl({ status: initial }: { status: EnquiryStatus }) {
  const [status, setStatus] = useState(initial);
  const [next, setNext] = useState(initial);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <EnquiryPill status={status} />
      <label htmlFor="enquiry-status" className="sr-only">
        Status
      </label>
      <select id="enquiry-status" value={next} onChange={(e) => setNext(e.target.value as EnquiryStatus)} className={`${field} h-9 max-w-[130px] cursor-pointer`}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={next === status}
        onClick={() => {
          setStatus(next);
          toast(`Marked ${next} — preview only`);
        }}
        className={`${ghostButton} h-9 disabled:cursor-default disabled:opacity-40`}
      >
        Update
      </button>
    </div>
  );
}
