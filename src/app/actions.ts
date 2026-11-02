"use server";

/* Public form endpoints. They validate input and acknowledge it; delivery is
   not wired yet. TODO(backend): store in Payload and notify the studio via
   Resend. These are reachable by direct POST, so validate everything here. */

export type FormState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** echoed back on error: React resets uncontrolled fields after an action */
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = (data: FormData, name: string, max = 200) => String(data.get(name) ?? "").trim().slice(0, max);

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  const email = field(data, "email");
  if (!EMAIL.test(email)) return { status: "error", errors: { email: "Enter a valid email address." }, values: { email } };
  return { status: "ok", message: "Thank you — you’re on the list." };
}

const topics = ["general", "bespoke", "order", "trade", "visit", "bulk"] as const;

export async function sendEnquiry(_prev: FormState, data: FormData): Promise<FormState> {
  const entry = {
    name: field(data, "name", 120),
    email: field(data, "email", 160),
    phone: field(data, "phone", 30),
    topic: field(data, "topic", 20),
    city: field(data, "city", 80),
    budget: field(data, "budget", 40),
    reference: field(data, "reference", 120),
    message: field(data, "message", 4000),
  };

  const errors: Record<string, string> = {};
  if (entry.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(entry.email)) errors.email = "Enter a valid email address.";
  if (entry.phone && !/^[+\d][\d\s-]{6,}$/.test(entry.phone)) errors.phone = "Enter a valid phone number.";
  if (!(topics as readonly string[]).includes(entry.topic)) errors.topic = "Choose what your message is about.";
  if (entry.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors, values: entry, message: "Please check the highlighted fields." };

  return {
    status: "ok",
    message: `Thank you, ${entry.name.split(" ")[0]}. Your message has reached the studio — we reply within two working days.`,
  };
}
