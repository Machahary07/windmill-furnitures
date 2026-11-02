import type { Route } from "next";

/* Single source of truth for every URL on the site. Components never build
   paths by hand — they call these, so renaming a route is a one-line change
   and typedRoutes (next.config.ts) checks the literals below at build time. */

type Query = Record<string, string | number | undefined | null>;

function withQuery(path: string, query?: Query): Route {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query ?? {})) if (v != null && v !== "") params.set(k, String(v));
  const qs = params.toString();
  return (qs ? `${path}?${qs}` : path) as Route;
}

export type ProductConfig = { wood?: string; upholstery?: string };

export const routes = {
  home: "/",

  /* shop */
  shop: (query?: { sort?: string }) => withQuery("/shop", query),
  collection: (handle: string, query?: { type?: string; sort?: string }) =>
    withQuery(`/collections/${handle}`, query),
  /** canonical, unique product URL; options make a shareable configuration link */
  product: (slug: string, config?: ProductConfig) => withQuery(`/products/${slug}`, config),
  /** short link printed on tags and invoices: /p/WM-SE-03 → /products/… */
  productCode: (code: string) => `/p/${code}` as Route,
  search: (q?: string) => withQuery("/search", { q }),
  cart: "/cart",
  wishlist: "/wishlist",

  /* checkout */
  checkout: "/checkout",
  payment: "/checkout/payment",
  orderConfirmed: (id: string) => `/checkout/success/${id}` as Route,
  paymentFailed: "/checkout/failed",

  /* studio */
  about: "/about",
  team: "/team",
  bespoke: (ref?: string) => withQuery("/bespoke", { ref }),
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}` as Route,
  contact: (topic?: string) => withQuery("/contact", { topic }),

  /* account */
  login: (next?: string) => withQuery("/login", { next }),
  register: (next?: string) => withQuery("/register", { next }),
  forgotPassword: "/forgot-password",
  account: "/account",
  order: (id: string) => `/account/orders/${id}` as Route,
  invoice: (id: string) => `/account/orders/${id}/invoice` as Route,
  addresses: "/account/addresses",
  settings: "/account/settings",

  /* help & legal */
  care: "/care",
  shipping: "/shipping-returns",
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
} as const satisfies Record<string, Route | ((...args: never[]) => Route)>;

/** only allow same-site relative redirects (e.g. ?next= after login) */
export function safeNext(next: string | string[] | undefined, fallback: Route = routes.account): Route {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? (next as Route) : fallback;
}
