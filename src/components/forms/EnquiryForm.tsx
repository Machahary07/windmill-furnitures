"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { sendEnquiry, type FormState } from "@/app/actions";
import { primaryButton } from "@/components/ui/styles";
import { SelectField, TextAreaField, TextField } from "./Field";

const topicOptions = [
  { value: "general", label: "General question" },
  { value: "bespoke", label: "Bespoke commission" },
  { value: "order", label: "An existing order" },
  { value: "bulk", label: "Order of 4 or more pieces" },
  { value: "trade", label: "Architects & trade" },
  { value: "visit", label: "Visit the workshop" },
];

const budgets = ["Under ₹1 lakh", "₹1 – 3 lakh", "₹3 – 10 lakh", "Over ₹10 lakh", "Not sure yet"];

/* Shared by /contact and /bespoke. `variant="bespoke"` adds city, budget and
   a reference to the piece the enquiry started from. */
export default function EnquiryForm({
  variant = "contact",
  defaultTopic = "general",
  reference,
}: {
  variant?: "contact" | "bespoke";
  defaultTopic?: string;
  reference?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendEnquiry, { status: "idle" });
  /* submit manually so React doesn't reset the fields (it does for `action`,
     which stays as the no-JS fallback) — a failed validation keeps the input */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };
  const err = state.errors ?? {};
  const v = state.values ?? {};

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-xl bg-[#f3f7f4] px-8 py-10">
        <p className="font-jakarta text-2xl font-bold text-ink">Message sent.</p>
        <p className="mt-3 font-jakarta text-base leading-7 text-gray-body">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-5 gap-y-[22px] max-sm:grid-cols-1">
      <TextField label="Full name" name="name" autoComplete="name" required defaultValue={v.name} error={err.name} />
      <TextField label="Email address" name="email" type="email" autoComplete="email" required placeholder="you@example.com" defaultValue={v.email} error={err.email} />
      <TextField label="Phone (optional)" name="phone" type="tel" autoComplete="tel" placeholder="+91" defaultValue={v.phone} error={err.phone} />
      {variant === "bespoke" ? (
        <>
          <input type="hidden" name="topic" value="bespoke" />
          <TextField label="City" name="city" autoComplete="address-level2" defaultValue={v.city} />
          <SelectField label="Approximate budget" name="budget" options={budgets} placeholder="Select a range" defaultValue={v.budget ?? ""} />
          <TextField label="Starting point (optional)" name="reference" defaultValue={v.reference ?? reference} placeholder="A piece from the catalog, a room, a drawing…" />
        </>
      ) : (
        <SelectField label="What is it about?" name="topic" options={topicOptions} defaultValue={v.topic ?? defaultTopic} error={err.topic} />
      )}
      <TextAreaField
        label={variant === "bespoke" ? "Tell us about the piece" : "Message"}
        name="message"
        required
        rows={6}
        defaultValue={v.message}
        className="col-span-2 max-sm:col-span-1"
        placeholder={variant === "bespoke" ? "The room, the sizes you have in mind, the woods you like, how it will be used…" : undefined}
        error={err.message}
      />
      <div className="col-span-2 flex flex-wrap items-center gap-5 max-sm:col-span-1">
        <button type="submit" disabled={pending} className={`${primaryButton} min-w-[220px] max-sm:w-full`}>
          {pending ? "Sending…" : variant === "bespoke" ? "Send enquiry" : "Send message"}
        </button>
        {state.status === "error" && state.message && (
          <p role="alert" className="font-jakarta text-[13px] font-medium text-red">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
