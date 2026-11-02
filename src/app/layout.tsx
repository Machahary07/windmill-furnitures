import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { openGraph } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/* Self-hosted variable fonts (OFL, from Fontsource) in ./fonts. Loading them
   locally keeps the build off the network — next/font/google failed on Vercel
   when Google served font URLs with query strings. */
const openSans = localFont({
  variable: "--font-open-sans",
  src: "./fonts/open-sans-latin-wght-normal.woff2",
  weight: "300 800",
});

const plusJakarta = localFont({
  variable: "--font-plus-jakarta",
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
});

/* only the extended-Latin glyphs prices need (₹ lives here); scoped by
   unicode-range so it downloads only when such a character is on the page */
const plusJakartaExt = localFont({
  variable: "--font-plus-jakarta-ext",
  src: "./fonts/plus-jakarta-sans-latin-ext-wght-normal.woff2",
  weight: "200 800",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1EFF, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
});

const outfit = localFont({
  variable: "--font-outfit-display",
  src: "./fonts/outfit-latin-wght-normal.woff2",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Windmill Furniture — Handcrafted solid-wood furniture, New Delhi",
    template: "%s — Windmill Furniture",
  },
  description: site.description,
  applicationName: site.legalName,
  creator: site.legalName,
  publisher: site.legalName,
  openGraph: openGraph(),
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${plusJakarta.variable} ${plusJakartaExt.variable} ${outfit.variable} h-full antialiased`}
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
