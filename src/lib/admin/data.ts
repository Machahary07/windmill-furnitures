import { computeTotals, type Totals } from "@/lib/money";
import { cardImage, products, upholstery, woodTypes } from "@/lib/products";
import type { Order } from "@/lib/store/account";
import { statusOrder, type OrderStatus } from "./status";

export { statusOrder, type OrderStatus };

/* SAMPLE DATA for the admin UI preview — deterministic (no Math.random or
   Date.now) so server and client always agree. TODO(backend): every export
   here becomes a Payload query; the screens only use these functions. */

export const TODAY = "2026-11-02";
const day = 86_400_000;
const daysAgo = (n: number, hour = 11) => new Date(Date.parse(`${TODAY}T00:00:00+05:30`) - n * day + hour * 3_600_000).toISOString();

export type AdminOrder = Omit<Order, "totals"> & {
  totals: Totals;
  invoiceNo: string;
  timeline: { status: OrderStatus; at: string }[];
  staffNotes?: string;
};

const people = [
  { name: "Aditi Rao", email: "aditi.rao@gmail.com", phone: "98110 24519", city: "New Delhi", state: "Delhi", pincode: "110016", line1: "C-14, Hauz Khas" },
  { name: "Rohan Mehta", email: "rohan.mehta@outlook.com", phone: "98201 77310", city: "Mumbai", state: "Maharashtra", pincode: "400050", line1: "7 Pali Hill, Bandra West" },
  { name: "Kavya Iyer", email: "kavya.iyer@gmail.com", phone: "98450 11873", city: "Bengaluru", state: "Karnataka", pincode: "560038", line1: "112, 12th Main, Indiranagar" },
  { name: "Arjun Malhotra", email: "arjun@malhotraarchitects.in", phone: "98100 55621", city: "Gurugram", state: "Haryana", pincode: "122002", line1: "DLF Phase 4, Tower B-1102" },
  { name: "Meera Kapoor", email: "meera.kapoor@yahoo.com", phone: "98731 40922", city: "New Delhi", state: "Delhi", pincode: "110003", line1: "18 Lodhi Estate" },
  { name: "Siddharth Bose", email: "sid.bose@gmail.com", phone: "98300 61248", city: "Kolkata", state: "West Bengal", pincode: "700019", line1: "4/2 Ballygunge Place" },
  { name: "Ananya Singh", email: "ananya.singh@gmail.com", phone: "99580 33014", city: "Noida", state: "Uttar Pradesh", pincode: "201301", line1: "A-77, Sector 15" },
  { name: "Vikram Nair", email: "vikram.nair@icloud.com", phone: "98950 72246", city: "Kochi", state: "Kerala", pincode: "682020", line1: "Marine Drive, Skyline Apt 6C" },
  { name: "Ishita Chawla", email: "ishita.chawla@gmail.com", phone: "98184 90375", city: "New Delhi", state: "Delhi", pincode: "110024", line1: "B-9, Defence Colony" },
  { name: "Karan Shah", email: "karan@shahhospitality.com", phone: "98250 18853", city: "Ahmedabad", state: "Gujarat", pincode: "380054", line1: "Sindhu Bhavan Road, Unit 4" },
  { name: "Nandini Reddy", email: "nandini.reddy@gmail.com", phone: "98490 66137", city: "Hyderabad", state: "Telangana", pincode: "500034", line1: "Road No. 10, Banjara Hills" },
  { name: "Dev Khanna", email: "dev.khanna@gmail.com", phone: "98115 30482", city: "Chandigarh", state: "Chandigarh", pincode: "160009", line1: "House 221, Sector 9" },
];

const methods = ["upi", "card", "netbanking", "upi", "emi", "card"];
const statusFor = (age: number): OrderStatus => (age < 5 ? "confirmed" : age < 26 ? "in-production" : age < 40 ? "dispatched" : "delivered");
/* lead times used to back-fill each order's timeline */
const stepAfter: Record<OrderStatus, number> = { confirmed: 0, "in-production": 2, dispatched: 24, delivered: 31 };

const ages = [0, 1, 2, 4, 6, 8, 9, 12, 15, 17, 20, 23, 27, 29, 33, 36, 41, 45, 52, 58, 64, 71, 80, 96];

export const orders: AdminOrder[] = ages.map((age, i) => {
  const who = people[(i * 5) % people.length];
  const picks = [products[(i * 7) % products.length], ...(i % 3 === 0 ? [products[(i * 11 + 3) % products.length]] : [])];
  const lines = picks.map((p, j) => ({
    slug: p.slug,
    name: p.name,
    code: p.code,
    image: cardImage(p),
    price: p.price,
    qty: (i + j) % 4 === 0 ? 2 : 1,
    wood: woodTypes[(i + j) % woodTypes.length].label,
    upholstery: p.upholstered ? upholstery[(i * 3 + j) % upholstery.length].label : undefined,
  }));
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const status = statusFor(age);
  const createdAt = daysAgo(age, 9 + (i % 9));
  const serial = String(ages.length - i).padStart(4, "0");
  return {
    id: `WM${(731_000 + (ages.length - i) * 37).toString(36).toUpperCase()}`,
    createdAt,
    status,
    contact: { name: who.name, email: who.email, phone: who.phone },
    address: { name: who.name, phone: who.phone, line1: who.line1, city: who.city, state: who.state, pincode: who.pincode },
    notes: i % 4 === 1 ? "Please call before delivery — the lift is small." : undefined,
    lines,
    totals: computeTotals(subtotal, who.state),
    payment: { method: methods[i % methods.length], reference: `pay_P${(9_000_000 + i * 7919).toString(36).toUpperCase()}` },
    invoiceNo: `WM/26-27/${serial}`,
    timeline: statusOrder
      .slice(0, statusOrder.indexOf(status) + 1)
      .map((s) => ({ status: s, at: new Date(Date.parse(createdAt) + stepAfter[s] * day).toISOString() })),
    staffNotes: status === "in-production" && i % 2 ? "Frame glued up; upholstery fabric arriving Thursday." : undefined,
  };
});

export const getAdminOrder = (id: string) => orders.find((o) => o.id === id);

export const listOrders = ({ status, q }: { status?: string; q?: string } = {}) => {
  const needle = q?.trim().toLowerCase();
  return orders.filter(
    (o) =>
      (!status || o.status === status) &&
      (!needle || [o.id, o.contact.name, o.contact.email, o.address.city, ...o.lines.map((l) => l.name)].join(" ").toLowerCase().includes(needle)),
  );
};

/* ---------- customers (derived from orders) ---------- */

export type Customer = (typeof people)[number] & { orders: number; spent: number; lastOrder: string; since: string };

export const customers: Customer[] = people
  .map((p) => {
    const mine = orders.filter((o) => o.contact.email === p.email);
    return {
      ...p,
      orders: mine.length,
      spent: mine.reduce((n, o) => n + o.totals.total, 0),
      lastOrder: mine[0]?.createdAt ?? daysAgo(120),
      since: mine.at(-1)?.createdAt ?? daysAgo(200),
    };
  })
  .sort((a, b) => b.lastOrder.localeCompare(a.lastOrder));

/* ---------- enquiries (contact, bespoke and bulk forms) ---------- */

export type EnquiryStatus = "new" | "replied" | "closed";
export type Enquiry = {
  id: string;
  topic: "bespoke" | "bulk" | "trade" | "general" | "care";
  name: string;
  email: string;
  phone?: string;
  message: string;
  ref?: string;
  receivedAt: string;
  status: EnquiryStatus;
};

export const enquiryTopics: Record<Enquiry["topic"], string> = {
  bespoke: "Bespoke",
  bulk: "Bulk order",
  trade: "Trade & architects",
  general: "General",
  care: "Care & repairs",
};

export const enquiries: Enquiry[] = [
  { id: "EQ1048", topic: "bespoke", name: "Tara Menon", email: "tara.menon@gmail.com", phone: "98112 40871", ref: "library-easy-chair", receivedAt: daysAgo(0, 10), status: "new",
    message: "We love the Library Easy Chair but need it about 3 inches lower for a reading nook under a sloping roof. Could you make a pair in walnut with a deep green fabric? Happy to send photos of the room." },
  { id: "EQ1047", topic: "bulk", name: "Prakash Hotels", email: "projects@prakashhotels.in", phone: "98201 90314", receivedAt: daysAgo(1, 15), status: "new",
    message: "We are refurbishing 24 rooms at our Udaipur property and are looking for a desk, chair and luggage bench per room. Could we visit the workshop next week to discuss timelines and finishes?" },
  { id: "EQ1046", topic: "trade", name: "Studio Lintel", email: "hello@studiolintel.com", receivedAt: daysAgo(2, 12), status: "replied",
    message: "We are an architecture practice in Bengaluru and would like your trade price list and lead times for dining tables and sideboards. We have two residences starting in January." },
  { id: "EQ1045", topic: "care", name: "Rahul Gupta", email: "rahul.gupta@gmail.com", phone: "99100 21876", receivedAt: daysAgo(4, 17), status: "new",
    message: "Our teak dining table bought from you in 2014 has a white heat mark from a hot dish. Do you offer refinishing? We are in Vasant Kunj." },
  { id: "EQ1044", topic: "bespoke", name: "Leela Fernandes", email: "leela.f@outlook.com", ref: "kohima-sofa", receivedAt: daysAgo(6, 11), status: "replied",
    message: "Is it possible to make the Kohima sofa as an L-shape? Our living room is 14 by 18 feet. A drawing would help us decide." },
  { id: "EQ1043", topic: "general", name: "Mohit Arora", email: "mohit.arora@gmail.com", receivedAt: daysAgo(9, 9), status: "closed",
    message: "Do you deliver to Jaipur and what would the delivery charge be for a bed and two side tables?" },
  { id: "EQ1042", topic: "bespoke", name: "Anjali Desai", email: "anjali.desai@gmail.com", phone: "98250 66421", receivedAt: daysAgo(12, 16), status: "closed",
    message: "Looking for a long bench with cane seat for an entrance hall, around 6 feet. Something in the spirit of the half-cane settee." },
  { id: "EQ1041", topic: "trade", name: "Form & Field Interiors", email: "studio@formandfield.in", receivedAt: daysAgo(15, 13), status: "replied",
    message: "Requesting samples of white ash and steam beech finishes, and the upholstery swatch book, for a client presentation." },
];

export const listEnquiries = (status?: string) => enquiries.filter((e) => !status || e.status === status);

/* ---------- newsletter ---------- */

const subscriberNames = ["aditi", "rohan.m", "kavya.iyer", "arjun.dsgn", "meera.k", "sid", "ananya", "vikram.n", "ishita", "karan.s", "nandini", "dev.k", "tara.m", "leela", "mohit", "anjali", "pooja.v", "neel", "saanvi", "aarav"];
const domains = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com"];
export const subscribers = subscriberNames.map((n, i) => ({
  email: `${n}@${domains[i % domains.length]}`,
  source: i % 3 === 0 ? "Checkout" : "Footer",
  joinedAt: daysAgo(i * 6 + (i % 4), 8 + (i % 10)),
}));

/* ---------- staff ---------- */

export type StaffRole = "admin" | "orders" | "editor";
export const staffRoles: Record<StaffRole, { label: string; detail: string }> = {
  admin: { label: "Admin", detail: "Everything, including staff and settings" },
  orders: { label: "Orders", detail: "Orders, customers and enquiries" },
  editor: { label: "Editor", detail: "Products, projects, team and materials" },
};
export const staff: { name: string; email: string; role: StaffRole; lastActive: string }[] = [
  { name: "Studio Admin", email: "studio@windmillfurnitures.com", role: "admin", lastActive: daysAgo(0, 9) },
  { name: "Workshop Desk", email: "workshop@windmillfurnitures.com", role: "orders", lastActive: daysAgo(0, 12) },
  { name: "Client Care", email: "care@windmillfurnitures.com", role: "orders", lastActive: daysAgo(2, 16) },
  { name: "Content Editor", email: "editor@windmillfurnitures.com", role: "editor", lastActive: daysAgo(6, 11) },
];

/* ---------- dashboard figures ---------- */

export function dashboardStats() {
  const within = (from: string, to: string) => orders.filter((o) => o.createdAt >= from && o.createdAt < to);
  const last30 = within(daysAgo(30), daysAgo(-1));
  const prev30 = within(daysAgo(60), daysAgo(30));
  const revenue = (list: AdminOrder[]) => list.reduce((n, o) => n + o.totals.total, 0);
  return {
    revenue30: revenue(last30),
    revenuePrev30: revenue(prev30),
    orders30: last30.length,
    ordersPrev30: prev30.length,
    inWorkshop: orders.filter((o) => o.status === "in-production").length,
    toDispatch: orders.filter((o) => o.status === "confirmed").length,
    newEnquiries: enquiries.filter((e) => e.status === "new").length,
    pipeline: statusOrder.map((s) => ({ status: s, count: orders.filter((o) => o.status === s).length })),
    topProducts: Object.values(
      orders.flatMap((o) => o.lines).reduce<Record<string, { name: string; slug: string; image: string; qty: number; revenue: number }>>((acc, l) => {
        acc[l.slug] ??= { name: l.name, slug: l.slug, image: l.image, qty: 0, revenue: 0 };
        acc[l.slug].qty += l.qty;
        acc[l.slug].revenue += l.price * l.qty;
        return acc;
      }, {}),
    )
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5),
  };
}
