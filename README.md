# Windmill Furnitures

Storefront for Windmill Furniture — Next.js 16 (App Router, Turbopack), Tailwind 4, GSAP.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks every <Link href> via typedRoutes)
npm run media    # regenerate src/lib/media-manifest.json after adding images to public/images
```

## Structure

| Path | What lives there |
| --- | --- |
| `src/app/(site)` | Pages with the navbar, footer and cart drawer |
| `src/app/(auth)` | `/login`, `/register`, `/forgot-password` (split artwork layout) |
| `src/app/(checkout)` | `/checkout` → `/checkout/payment` → `/checkout/success/[id]` (or `/checkout/failed`) |
| `src/app/(print)` | Printable GST invoice |
| `src/app/p/[code]` | Short product links: `/p/WM-SE-01` → `/products/library-easy-chair` |
| `src/lib/routes.ts` | **Every URL on the site.** Build links with `routes.*`, never by hand |
| `src/lib/products.ts` | Catalog data and queries (pages only use the query functions) |
| `src/lib/projects.ts`, `team.ts`, `site.ts` | Projects, team, contact details and delivery/GST settings |
| `src/lib/store/*` | Cart, wishlist, account, orders (browser storage — see below) |
| `src/components/ui/styles.ts` | Shared class recipes (headings, buttons, inputs) from the original designs |

## Links

- Products: `/products/{slug}` — permanent and unique. Options are part of the link:
  `/products/theog-chair?wood=walnut&upholstery=sw3` opens that configuration ("Copy link to this configuration").
- Filters are links too: `/collections/seating?type=sofas&sort=price-asc`.
- Old v1 URLs (`/product/...`, `/soon`) redirect (see `next.config.ts`).

## Demo layer — what the backend replaces

There is no backend yet. These are deliberately isolated so Payload CMS + Razorpay can drop in:

- `src/lib/store/account.ts` — sign-in, addresses and orders are stored in the browser (`TODO(backend)`).
- `src/lib/payments.ts` — `startPayment` simulates Razorpay; the steps to replace it are in the file.
- `src/app/actions.ts` — contact, bespoke and newsletter forms validate but don’t send yet.

Search the code for `TODO(client)` for content to confirm (prices, dimensions, contact details,
project write-ups, team, policies) and `TODO(backend)` for integration points.
