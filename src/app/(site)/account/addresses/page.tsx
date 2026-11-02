"use client";

import { useState } from "react";
import AddressForm from "@/components/account/AddressForm";
import { AddressBlock } from "@/components/account/OrderBits";
import { secondaryButton, sectionHeading, smallBody } from "@/components/ui/styles";
import { account, useAddresses } from "@/lib/store/account";

export default function AddressesPage() {
  const addresses = useAddresses();
  /* "new", an address id, or null when not editing */
  const [editing, setEditing] = useState<string | null>(null);
  const current = addresses.find((a) => a.id === editing);

  return (
    <div className="pb-[110px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className={sectionHeading}>Saved addresses</h2>
        {editing === null && (
          <button type="button" onClick={() => setEditing("new")} className={secondaryButton}>
            Add address
          </button>
        )}
      </div>

      {editing !== null ? (
        <div className="mt-8 max-w-[720px]">
          <AddressForm
            key={editing}
            initial={current}
            onCancel={() => setEditing(null)}
            onSave={(a) => {
              account.saveAddress({ ...a, id: current?.id });
              setEditing(null);
            }}
          />
        </div>
      ) : addresses.length === 0 ? (
        <p className={`${smallBody} mt-6`}>No saved addresses yet. Addresses you use at checkout are saved here automatically.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-3 gap-[25px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {addresses.map((a) => (
            <li key={a.id} className="rounded-xl border border-border p-6">
              <AddressBlock address={a} />
              <div className="mt-5 flex gap-5 font-jakarta text-[13px] font-medium">
                <button type="button" onClick={() => setEditing(a.id)} className="cursor-pointer text-ink underline underline-offset-4">
                  Edit
                </button>
                <button type="button" onClick={() => account.removeAddress(a.id)} className="cursor-pointer text-gray-nav underline underline-offset-4 hover:text-red">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
