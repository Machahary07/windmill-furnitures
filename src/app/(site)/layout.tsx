import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollReveal from "@/components/ScrollReveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#content" className="sr-only z-50 bg-ink px-4 py-2 font-jakarta text-sm text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <Suspense fallback={null}>
        <ScrollReveal />
      </Suspense>
    </>
  );
}
