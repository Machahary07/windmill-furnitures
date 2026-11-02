"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddressFields, readAddress, validateAddress, type AddressErrors } from "@/components/account/AddressForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { TextAreaField, TextField } from "@/components/forms/Field";
import { primaryButton, redLink, sectionHeading, shell, smallBody } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { account, useAddresses, useCheckoutDraft, useSession, type Address } from "@/lib/store/account";
import { useCart } from "@/lib/store/cart";
import { useHydrated } from "@/lib/store/persistent";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutDetails() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { lines } = useCart();
  const session = useSession();
  const saved = useAddresses();
  const draft = useCheckoutDraft();

  /* which saved address prefilled the form; changing it remounts the fields */
  const [picked, setPicked] = useState<Address | null>(null);
  const [state, setState] = useState<string | undefined>();
  const [errors, setErrors] = useState<AddressErrors & { email?: string }>({});

  if (!hydrated) return <div className={`${shell} min-h-[60vh]`} aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className={`${shell} py-20`}>
        <p className="font-jakarta text-xl font-bold text-ink">Your cart is empty.</p>
        <Link href={routes.shop()} className={`${redLink} mt-6`}>
          Browse the catalog
        </Link>
      </div>
    );
  }

  const address = picked ?? draft?.address ?? saved[0];
  const currentState = state ?? address?.state;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const next = readAddress(data);
    const found: typeof errors = validateAddress(next);
    if (!EMAIL.test(email)) found.email = "Enter a valid email address.";
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    account.saveDraft({
      contact: { email, phone: next.phone, name: next.name },
      address: next,
      notes: String(data.get("notes") ?? "").trim() || undefined,
    });
    if (session && data.get("save") && !saved.some((a) => a.line1 === next.line1 && a.pincode === next.pincode)) account.saveAddress(next);
    router.push(routes.payment);
  };

  return (
    <div className={`${shell} grid grid-cols-[1fr_400px] gap-[70px] pt-12 pb-[110px] max-lg:grid-cols-1 max-lg:gap-12 max-md:pt-8`}>
      <form
        onSubmit={onSubmit}
        onChange={(e) => {
          const t = e.target as EventTarget;
          if (t instanceof HTMLSelectElement && t.name === "state") setState(t.value);
        }}
        noValidate
      >
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={sectionHeading}>Contact</h2>
            {!session && (
              <p className={smallBody}>
                Have an account?{" "}
                <Link href={routes.login(routes.checkout)} className="font-semibold text-ink underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            )}
          </div>
          <div className="mt-6">
            <TextField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              defaultValue={draft?.contact.email ?? session?.email}
              error={errors.email}
              hint="We’ll send your order confirmation and production updates here."
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className={sectionHeading}>Delivery address</h2>
          {saved.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="Saved addresses">
              {saved.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    setPicked(a);
                    setState(a.state);
                  }}
                  aria-pressed={address === a}
                  className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-jakarta text-[13px] font-medium text-gray-body hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
                >
                  {a.name} · {a.city}
                </button>
              ))}
            </div>
          )}
          <div className="mt-6">
            <AddressFields key={picked?.id ?? "draft"} value={address} errors={errors} />
          </div>
          {session && (
            <label className="mt-5 flex cursor-pointer items-center gap-2.5 font-jakarta text-sm text-gray-body">
              <input type="checkbox" name="save" defaultChecked={saved.length === 0} className="size-4 accent-ink" />
              Save this address to my account
            </label>
          )}
        </section>

        <section className="mt-12">
          <h2 className={sectionHeading}>Delivery notes</h2>
          <div className="mt-6">
            <TextAreaField
              label="Anything we should know? (optional)"
              name="notes"
              rows={3}
              defaultValue={draft?.notes}
              placeholder="Floor and lift access, preferred delivery days, a gate code…"
            />
          </div>
        </section>

        <button type="submit" className={`${primaryButton} mt-10 w-full`}>
          Continue to payment
        </button>
      </form>

      <CheckoutSummary lines={lines} state={currentState} />
    </div>
  );
}
