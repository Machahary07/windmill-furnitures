"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { subscribe, type FormState } from "@/app/actions";

export default function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { status: "idle" });
  /* submit manually so React doesn't reset the fields (it does for `action`,
     which stays as the no-JS fallback) — a failed validation keeps the input */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  if (state.status === "ok") {
    return <p className="mt-5 font-jakarta text-sm font-semibold text-ink" role="status">{state.message}</p>;
  }

  return (
    <form action={action} onSubmit={onSubmit} className="mt-5" noValidate>
      <div className="flex border-b border-ink">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.values?.email}
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "newsletter-error" : undefined}
          className="h-10 min-w-0 flex-1 bg-transparent font-jakarta text-sm font-medium text-ink outline-none placeholder:text-faint"
        />
        <button type="submit" disabled={pending} className="cursor-pointer font-jakarta text-[10px] font-semibold tracking-[0.3em] text-ink uppercase disabled:opacity-50">
          {pending ? "…" : "Join"}
        </button>
      </div>
      {state.errors?.email && (
        <p id="newsletter-error" className="mt-2 font-jakarta text-[12px] text-red">
          {state.errors.email}
        </p>
      )}
    </form>
  );
}
