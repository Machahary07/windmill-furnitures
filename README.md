# Windmill Furnitures

Storefront for Windmill Furniture — Next.js 16 (App Router, Turbopack), Tailwind 4, GSAP.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks every <Link href> via typedRoutes)
npm run media    # regenerate src/lib/media-manifest.json after adding images to public/images
npm run og       # regenerate link-preview images in public/og after changing catalog photos
```

## Images

`public/images` holds full-quality masters (JPEG q88, 4:4:4 chroma, up to 2400–2560px, made from the
supplied originals). Pages never send these directly: `next/image` (via `src/components/ui/Photo.tsx`)
serves each visitor an AVIF/WebP resized to their screen at quality 85 — see `images` in `next.config.ts`.
The hero carousel uses the same optimized URLs for its CSS backgrounds. Add new images at full quality
and run `npm run media`.

Fonts are self-hosted variable WOFF2 files in `src/app/fonts` (OFL), loaded with `next/font/local`.

## Link previews (Open Graph)

`public/og/windmill.jpg` is the site-wide 1200×630 banner. Products, projects and collections get their
own preview from `npm run og` (`scripts/og-images.mjs`) — portrait pieces sit in the banner layout
(`scripts/og-frame.png`), wide photos fill the frame. All stay well under WhatsApp's ~300 KB preview
limit. Pages build their `openGraph` with `openGraph()` from `src/lib/seo.ts`: Next replaces a parent's
`openGraph` wholesale, and fills `og:title`/`og:description` from each page's own title and description.

## Admin (UI preview)

`/admin` is the studio panel — dashboard, orders, customers, products, categories, woods & fabrics,
enquiries, newsletter, projects, team, settings and staff. **It is UI only for now:** screens show sample
data (`src/lib/admin/data.ts`), Save confirms but stores nothing, and sign-in is one shared preview
password, `1234` (`src/lib/admin/session.ts`, checked in `src/proxy.ts` and the panel layout). Replace
both with Payload CMS (admin users + collections) before real use — search `TODO(backend)`.

## Structure

| Path | What lives there |
| --- | --- |
| `src/app/(site)` | Pages with the navbar, footer and cart drawer |
| `src/app/(auth)` | `/login`, `/register`, `/forgot-password` (split artwork layout) |
| `src/app/(checkout)` | `/checkout` → `/checkout/payment` → `/checkout/success/[id]` (or `/checkout/failed`) |
| `src/app/(print)` | Printable GST invoice |
| `src/app/p/[code]` | Short product links: `/p/WM-SE-01` → `/products/library-easy-chair` |
| `src/app/admin` | Studio admin (UI preview): `/admin/login`, `(panel)` screens; components in `src/components/admin` |
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
