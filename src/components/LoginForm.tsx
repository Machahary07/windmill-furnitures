"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputClass =
  "h-10 w-full rounded-lg border border-border px-3.5 font-jakarta text-[15px] font-medium text-ink outline-none placeholder:text-faint focus:border-ink/40";

const labelClass = "mb-2 block font-jakarta text-[15px] font-semibold text-ink";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  /* no auth backend yet — keep credentials out of the URL and send people
     to the build-in-progress page */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/soon");
  };

  return (
    <form onSubmit={onSubmit} className="text-left">
      <label htmlFor="email" className={labelClass}>
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        className={inputClass}
      />

      <div className="mt-[22px] flex items-baseline justify-between">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <Link href="/soon" className="text-[13px] font-medium text-gray-nav">
          Forgot your password?
        </Link>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
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
            <path
              d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
              stroke="#b9b9b9"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" stroke="#b9b9b9" strokeWidth="1.5" />
            {showPassword && (
              <line x1="3" y1="3" x2="21" y2="21" stroke="#b9b9b9" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <button
        type="submit"
        className="mx-auto mt-[34px] block h-11 w-[72%] cursor-pointer rounded-lg bg-[#141414] font-jakarta text-sm font-semibold text-white"
      >
        Sign in to your account
      </button>
    </form>
  );
}
