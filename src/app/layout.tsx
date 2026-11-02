import type { Metadata, Viewport } from "next";
import { Open_Sans, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit-display",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Windmill — Bespoke handcrafted furniture",
    template: "Windmill — %s",
  },
  description: site.description,
  openGraph: { siteName: site.legalName, type: "website", locale: "en_IN", images: ["/images/hero-1.jpg"] },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${plusJakarta.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;animation:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
