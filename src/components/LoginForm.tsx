"use client";

import { useState, type FormEvent } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { account } from "@/lib/store/account";
import { formButton, input as inputClass, label as labelClass } from "@/components/ui/styles";

function PasswordInput({ id, autoComplete }: { id: string; autoComplete: string }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name="password"
        autoComplete={autoComplete}
        placeholder="••••••••"
        minLength={8}
        required
        className={`${inputClass} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="#b9b9b9" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="#b9b9b9" strokeWidth="1.5" />
          {showPassword && <line x1="3" y1="3" x2="21" y2="21" stroke="#b9b9b9" strokeWidth="1.5" />}
        </svg>
      </button>
    </div>
  );
}

/* DEMO: accepts any email + 8-character password and starts a local session.
   TODO(backend): call Payload auth (login / create user) and handle errors. */
export default function LoginForm({ mode = "login", next }: { mode?: "login" | "register"; next: Route }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPending(true);
    account.signIn(String(data.get("email")), data.get("name") ? String(data.get("name")) : undefined);
    router.push(next);
  };

  return (
    <form onSubmit={onSubmit} className="text-left">
      {mode === "register" && (
        <>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input type="text" id="name" name="name" autoComplete="name" placeholder="Your name" required className={`${inputClass} mb-[22px]`} />
        </>
      )}

      <label htmlFor="email" className={labelClass}>
        Email address
      </label>
      <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />

      <div className="mt-[22px] flex items-baseline justify-between">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        {mode === "login" && (
          <Link href={routes.forgotPassword} className="text-[13px] font-medium text-gray-nav hover:text-ink">
            Forgot your password?
          </Link>
        )}
      </div>
      <PasswordInput id="password" autoComplete={mode === "login" ? "current-password" : "new-password"} />
      {mode === "register" && <p className="mt-1.5 font-jakarta text-[12px] text-gray-nav">At least 8 characters.</p>}

      <button type="submit" disabled={pending} className={`${formButton} mx-auto mt-[34px] w-[72%]!`}>
        {mode === "login" ? "Sign in to your account" : "Create your account"}
      </button>
    </form>
  );
}
