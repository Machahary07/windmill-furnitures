"use client";

import { useState, type FormEvent } from "react";
import { SelectField, TextField } from "@/components/forms/Field";
import { primaryButton } from "@/components/ui/styles";
import { indianStates } from "@/lib/site";
import type { Address } from "@/lib/store/account";

export type AddressInput = Omit<Address, "id">;
export type AddressErrors = Partial<Record<keyof AddressInput, string>>;

const PINCODE = /^[1-9]\d{5}$/;
const PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function readAddress(data: FormData): AddressInput {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  return {
    name: get("name"),
    phone: get("phone"),
    line1: get("line1"),
    line2: get("line2") || undefined,
    city: get("city"),
    state: get("state"),
    pincode: get("pincode"),
  };
}

export function validateAddress(a: AddressInput): AddressErrors {
  const errors: AddressErrors = {};
  if (a.name.length < 2) errors.name = "Enter the recipient’s name.";
  if (!PHONE.test(a.phone.replace(/\s/g, ""))) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (a.line1.length < 4) errors.line1 = "Enter the street address.";
  if (a.city.length < 2) errors.city = "Enter the city.";
  if (!(indianStates as readonly string[]).includes(a.state)) errors.state = "Choose a state.";
  if (!PINCODE.test(a.pincode)) errors.pincode = "Enter a 6-digit PIN code.";
  return errors;
}

/* Address fields without a <form>, so checkout can embed them in a larger form */
export function AddressFields({ value, errors = {} }: { value?: Partial<AddressInput>; errors?: AddressErrors }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-[22px] max-sm:grid-cols-1">
      <TextField label="Full name" name="name" autoComplete="name" defaultValue={value?.name} error={errors.name} />
      <TextField label="Mobile number" name="phone" type="tel" autoComplete="tel" placeholder="+91" defaultValue={value?.phone} error={errors.phone} />
      <TextField
        label="Address"
        name="line1"
        autoComplete="address-line1"
        placeholder="House, street, area"
        defaultValue={value?.line1}
        error={errors.line1}
        className="col-span-2 max-sm:col-span-1"
      />
      <TextField label="Apartment, landmark (optional)" name="line2" autoComplete="address-line2" defaultValue={value?.line2} className="col-span-2 max-sm:col-span-1" />
      <TextField label="City" name="city" autoComplete="address-level2" defaultValue={value?.city} error={errors.city} />
      <TextField label="PIN code" name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} defaultValue={value?.pincode} error={errors.pincode} />
      <SelectField
        label="State"
        name="state"
        autoComplete="address-level1"
        options={indianStates}
        placeholder="Select state"
        defaultValue={value?.state ?? ""}
        error={errors.state}
      />
    </div>
  );
}

export default function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<AddressInput>;
  onSave: (a: AddressInput) => void;
  onCancel?: () => void;
}) {
  const [errors, setErrors] = useState<AddressErrors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = readAddress(new FormData(e.currentTarget));
    const found = validateAddress(address);
    setErrors(found);
    if (!Object.keys(found).length) onSave(address);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <AddressFields value={initial} errors={errors} />
      <div className="mt-7 flex items-center gap-6">
        <button type="submit" className={primaryButton}>
          Save address
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cursor-pointer font-jakarta text-[13px] font-medium text-gray-nav underline underline-offset-4 hover:text-ink">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
