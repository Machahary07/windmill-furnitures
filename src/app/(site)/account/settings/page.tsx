"use client";

import { useState, type FormEvent } from "react";
import { TextField } from "@/components/forms/Field";
import { primaryButton, sectionHeading, smallBody } from "@/components/ui/styles";
import { account, useSession } from "@/lib/store/account";

export default function SettingsPage() {
  const session = useSession();
  const [saved, setSaved] = useState(false);

  if (!session) return null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    account.updateProfile({
      name: String(data.get("name")).trim() || session.name,
      email: session.email,
      phone: String(data.get("phone")).trim() || undefined,
    });
    setSaved(true);
  };

  return (
    <div className="max-w-[720px] pb-[110px]">
      <h2 className={sectionHeading}>Profile</h2>
      <form onSubmit={onSubmit} onChange={() => setSaved(false)} className="mt-8 grid grid-cols-2 gap-x-5 gap-y-[22px] max-sm:grid-cols-1">
        <TextField label="Full name" name="name" autoComplete="name" defaultValue={session.name} />
        <TextField label="Mobile number" name="phone" type="tel" autoComplete="tel" defaultValue={session.phone} />
        <TextField
          label="Email address"
          name="email"
          type="email"
          value={session.email}
          readOnly
          hint="Contact the studio to change the email on your account."
          className="col-span-2 max-sm:col-span-1"
        />
        <div className="col-span-2 flex items-center gap-5 max-sm:col-span-1">
          <button type="submit" className={primaryButton}>
            Save changes
          </button>
          {saved && (
            <p role="status" className="font-jakarta text-[13px] font-semibold text-ink">
              Saved.
            </p>
          )}
        </div>
      </form>

      <h2 className={`${sectionHeading} mt-16`}>Password</h2>
      <p className={`${smallBody} mt-3`}>
        To change your password, sign out and use “Forgot your password?” on the sign-in page — we’ll email you a secure link.
      </p>
    </div>
  );
}
