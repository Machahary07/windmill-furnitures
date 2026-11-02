import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* every <Link href> and router call is checked against the real route tree */
  typedRoutes: true,

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
