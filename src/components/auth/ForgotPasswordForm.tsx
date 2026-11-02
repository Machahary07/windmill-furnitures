"use client";

import { useState, type FormEvent } from "react";
import { formButton, input, label } from "@/components/ui/styles";

/* TODO(backend): call Payload's forgot-password endpoint (sends the email) */
export default function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentTo(String(new FormData(e.currentTarget).get("email")));
  };

  if (sentTo) {
    return (
      <div role="status" className="mt-[42px] rounded-xl bg-[#f3f7f4] px-8 py-8 font-jakarta">
        <p className="text-lg font-bold text-ink">Check your inbox</p>
        <p className="mt-2 text-[15px] leading-6 text-gray-body">
          If an account exists for <strong className="text-ink">{sentTo}</strong>, a reset link is on its way. It expires in one hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-[42px] text-left">
      <label htmlFor="email" className={label}>
        Email address
      </label>
      <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" required className={input} />
      <button type="submit" className={`${formButton} mx-auto mt-[34px] w-[72%]!`}>
        Send reset link
      </button>
    </form>
  );
}
