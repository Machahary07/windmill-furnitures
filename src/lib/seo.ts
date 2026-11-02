import type { Metadata } from "next";
import { site } from "./site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;
type ShareImage = { url: string; width: number; height: number; alt: string };

/* Link previews. A page that sets `openGraph` replaces the root's object
   wholesale (Next merges metadata shallowly), so pages build theirs with
   openGraph() instead of from scratch. og:title / og:description are left
   out on purpose: Next fills them from each page's own title and description.
   Images live in public/og — regenerate with `npm run og`. */

export const banner: ShareImage = {
  url: "/og/windmill.jpg",
  width: 1200,
  height: 630,
  alt: "Windmill — furniture made by hand, in solid wood, in New Delhi since 1991",
};

export const shareImage = (kind: "products" | "projects" | "collections", slug: string, alt: string): ShareImage => ({
  url: `/og/${kind}/${slug}.jpg`,
  width: 1200,
  height: 630,
  alt,
});

export const openGraph = (image: ShareImage = banner): OpenGraph => ({
  siteName: site.legalName,
  locale: "en_IN",
  type: "website",
  images: [image],
});
