"use client";

import { computeTotals, type Totals } from "@/lib/money";
import { cardImage } from "@/lib/products";
import { persistentStore, useStore } from "./persistent";
import type { ResolvedLine } from "./cart";

/* DEMO ACCOUNT LAYER — no backend yet.
   Sessions, addresses and orders live in this browser only so every page can
   be clicked through end to end. TODO(backend): replace these functions with
   Payload auth + collections and Razorpay order creation; the components only
   use the hooks and actions exported here. */

export type User = { name: string; email: string; phone?: string };

export type Address = {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type Contact = { email: string; phone: string; name: string };

export type OrderLine = {
  slug: string;
  name: string;
  code: string;
  image: string;
  price: number;
  qty: number;
  wood: string;
  upholstery?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "confirmed" | "in-production" | "dispatched" | "delivered";
  contact: Contact;
  address: Omit<Address, "id">;
  notes?: string;
  lines: OrderLine[];
  totals: Totals;
  payment: { method: string; reference: string };
};

export type CheckoutDraft = { contact: Contact; address: Omit<Address, "id">; notes?: string };

const sessionStore = persistentStore<User | null>("wm:session", null);
const addressStore = persistentStore<Address[]>("wm:addresses", []);
const orderStore = persistentStore<Order[]>("wm:orders", []);
const draftStore = persistentStore<CheckoutDraft | null>("wm:checkout", null);

export const useSession = () => useStore(sessionStore);
export const useAddresses = () => useStore(addressStore);
export const useOrders = () => useStore(orderStore);
export const useCheckoutDraft = () => useStore(draftStore);

const nameFromEmail = (email: string) => {
  const local = email.split("@")[0].replace(/[._-]+/g, " ");
  return local.replace(/\b\w/g, (c) => c.toUpperCase());
};

const randomId = (prefix: string, length: number) =>
  prefix + Array.from(crypto.getRandomValues(new Uint8Array(length)), (b) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[b % 32]).join("");

export const account = {
  signIn(email: string, name?: string) {
    sessionStore.set((prev) => ({ ...prev, email, name: name || (prev?.email === email ? prev.name : nameFromEmail(email)) }));
  },
  signOut() {
    sessionStore.set(null);
  },
  updateProfile(user: User) {
    sessionStore.set(user);
  },
  saveAddress(address: Omit<Address, "id"> & { id?: string }) {
    addressStore.set((list) =>
      address.id && list.some((a) => a.id === address.id)
        ? list.map((a) => (a.id === address.id ? { ...a, ...address, id: a.id } : a))
        : [...list, { ...address, id: randomId("ad_", 8) }],
    );
  },
  removeAddress(id: string) {
    addressStore.set((list) => list.filter((a) => a.id !== id));
  },
  saveDraft(draft: CheckoutDraft) {
    draftStore.set(draft);
  },
  /** demo stand-in for: create Razorpay order → open checkout → verify signature on the server */
  placeOrder(draft: CheckoutDraft, lines: ResolvedLine[], method: string): Order {
    const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
    const order: Order = {
      id: randomId("WM", 6),
      createdAt: new Date().toISOString(),
      status: "confirmed",
      contact: draft.contact,
      address: draft.address,
      notes: draft.notes,
      lines: lines.map((l) => ({
        slug: l.slug,
        name: l.product.name,
        code: l.product.code,
        image: cardImage(l.product),
        price: l.product.price,
        qty: l.qty,
        wood: l.woodLabel,
        upholstery: l.upholsteryLabel,
      })),
      totals: computeTotals(subtotal, draft.address.state),
      payment: { method, reference: randomId("pay_", 14) },
    };
    orderStore.set((list) => [order, ...list]);
    if (!sessionStore.get()) sessionStore.set({ email: draft.contact.email, name: draft.contact.name, phone: draft.contact.phone });
    return order;
  },
};

export const getOrder = (id: string) => orderStore.get().find((o) => o.id === id);
