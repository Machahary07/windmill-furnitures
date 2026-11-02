"use client";

import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "@/app/admin/actions";
import { button, field, fieldLabel } from "./ui";

export default function AdminLoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<AdminLoginState, FormData>(adminLogin, {});
  return (
    <form action={action} className="mt-6">
      {next && <input type="hidden" name="next" value={next} />}
      <label htmlFor="admin-password" className={fieldLabel}>
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        aria-invalid={!!state.error || undefined}
        aria-describedby={state.error ? "admin-password-error" : undefined}
        className={`${field} aria-invalid:border-red`}
      />
      {state.error && (
        <p id="admin-password-error" role="alert" className="mt-2 font-jakarta text-[13px] font-semibold text-red">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${button} mt-5 w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
