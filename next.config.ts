import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* every <Link href> and router call is checked against the real route tree */
  typedRoutes: true,

  /* public/images holds full-quality masters; visitors get resized AVIF
     (WebP fallback) at quality 85 — visually lossless, a fraction of the bytes */
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 2678400,
  },

  async redirects() {
    return [
      /* v1 used /product/[slug]; keep old links and shares working */
      { source: "/product", destination: "/shop", permanent: true },
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/collections", destination: "/shop", permanent: true },
      { source: "/soon", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
