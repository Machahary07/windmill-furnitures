import { routes } from "./routes";

/* TODO(client): confirm contact details, hours and delivery charges before launch */
export const site = {
  name: "Windmill",
  legalName: "Windmill Furniture",
  founded: 1991,
  /* Absolute base for link previews, canonical URLs and the sitemap (server-side only).
     NEXT_PUBLIC_SITE_URL wins; otherwise Vercel's production domain — wmfurn.vercel.app
     today, the custom domain automatically once one is attached. `||` not `??`, so a
     blank env var falls back too (new URL("") would crash every page). */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://windmillfurnitures.com"),
  description: "Windmill Furnitures — bespoke, handcrafted solid-wood furniture from our workshop in Aya Nagar, New Delhi, since 1991.",
  email: "studio@windmillfurnitures.com",
  address: ["Windmill Furniture Workshop", "Aya Nagar", "New Delhi 110047", "India"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Aya+Nagar+New+Delhi",
  hours: "Monday – Saturday, 10am – 6pm",
  /** deliveries inside these states ship free; elsewhere a flat charge per order */
  freeDeliveryStates: ["Delhi", "Haryana", "Uttar Pradesh"],
  deliveryCharge: 6500,
  /** home state for GST: same-state orders split CGST + SGST, others pay IGST */
  gstState: "Delhi",
  /** printed on invoices once registered details are confirmed */
  gstin: "",
  gstRate: 0.18,
  /** orders of this many pieces or more go through the studio */
  bulkOrderQty: 4,
} as const;

export const mainNav = [
  { label: "Experience", href: routes.home, match: ["/"] },
  { label: "Shop", href: routes.shop(), match: ["/shop", "/collections", "/products", "/search"] },
  { label: "Bespoke", href: routes.bespoke(), match: ["/bespoke"] },
  { label: "Projects", href: routes.projects, match: ["/projects"] },
  { label: "About Us", href: routes.about, match: ["/about", "/team"] },
] as const;

export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "All furniture", href: routes.shop() },
      { label: "Seating", href: routes.collection("seating") },
      { label: "Tables", href: routes.collection("tables") },
      { label: "Storage", href: routes.collection("storage") },
      { label: "Beds", href: routes.collection("beds") },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About us", href: routes.about },
      { label: "Creative team", href: routes.team },
      { label: "Projects", href: routes.projects },
      { label: "Bespoke commissions", href: routes.bespoke() },
      { label: "Contact", href: routes.contact() },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Furniture care", href: routes.care },
      { label: "Shipping & returns", href: routes.shipping },
      { label: "FAQ", href: routes.faq },
      { label: "My account", href: routes.account },
      { label: "Wishlist", href: routes.wishlist },
    ],
  },
] as const;

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
] as const;
