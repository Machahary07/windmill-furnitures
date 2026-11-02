import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { projects } from "@/lib/projects";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const pages = [
    routes.home,
    routes.shop(),
    routes.about,
    routes.team,
    routes.bespoke(),
    routes.projects,
    routes.contact(),
    routes.care,
    routes.shipping,
    routes.faq,
    routes.terms,
    routes.privacy,
  ];

  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: p === routes.home ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: url(routes.collection(c.handle)), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: url(routes.product(p.slug)), changeFrequency: "weekly" as const, priority: 0.9, images: p.images.map(url) })),
    ...projects.map((p) => ({ url: url(routes.project(p.slug)), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
