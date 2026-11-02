import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductOptions, { ProductOptionsFromUrl } from "@/components/product/ProductOptions";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { eyebrow } from "@/components/ui/styles";
import { formatPrice } from "@/lib/money";
import { getCategory, getProduct, products, relatedProducts } from "@/lib/products";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    /* configuration links (?wood=…) all point search engines at the one product URL */
    alternates: { canonical: routes.product(product.slug) },
    openGraph: { images: [product.images[0]] },
  };
}

const notes = [
  "The grain, color, and overall appearance of each piece will vary.",
  "Please enjoy the unique characteristics, expressions, and aging process of natural wood.",
  "There may be slight individual differences in shape and size.",
  "Although we use well-dried wood, please note that due to the nature of natural wood, slight movement (small misalignment or warping at joints, etc.) may occur.",
  "Specifications and prices may change or production may be discontinued without notice.",
  "For orders of 4 or more items, please contact us.",
];

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const type = category.types.find((t) => t.id === product.type);
  const related = relatedProducts(product);

  const details = [
    { label: "Dimensions", value: product.dimensions },
    { label: "Materials", value: product.materials },
    { label: "Lead time", value: `Made to order, ${product.drawing ? "10–12" : "6–8"} weeks` },
    { label: "Product code", value: product.code },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.description,
    image: product.images.map((src) => new URL(src, site.url).toString()),
    brand: { "@type": "Brand", name: site.legalName },
    offers: {
      "@type": "Offer",
      url: new URL(routes.product(product.slug), site.url).toString(),
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/MadeToOrder",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* main photo + options */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-2 pt-7 max-lg:grid-cols-1">
        <ProductGallery images={product.images} name={product.name} drawing={product.drawing} />

        <div className="pt-[38px] pr-[4.4%] pl-[3.96%] max-lg:px-5 max-lg:pb-12">
          <Breadcrumbs
            items={[
              { label: "Shop", href: routes.shop() },
              { label: category.title, href: routes.collection(category.handle) },
              ...(type ? [{ label: type.label, href: routes.collection(category.handle, { type: type.id }) }] : []),
            ]}
          />
          <div className="mt-6 flex items-baseline justify-between gap-6">
            <h1 className="text-[22px] text-ink">{product.name}</h1>
            <p className="shrink-0 text-lg text-ink">{formatPrice(product.price)}</p>
          </div>
          <p className="mt-[22px] max-w-[580px] font-jakarta text-[11.5px] leading-5 text-[#777]">{product.description}</p>
          <Suspense fallback={<ProductOptions product={product} />}>
            <ProductOptionsFromUrl product={product} />
          </Suspense>
        </div>
      </section>

      {/* cut-out (or details) + care notes */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-2 pt-[70px] pb-[86px] max-lg:grid-cols-1 max-lg:gap-12 max-lg:pt-12">
        <div data-reveal className="flex flex-col items-center px-[4%] max-lg:items-stretch max-lg:px-5">
          {product.cutout && (
            <Photo src={product.cutout} alt={`${product.name}, side view`} sizes="300px" className="mb-[18px] h-[300px] w-auto self-center" />
          )}
          <dl className="w-full max-w-[460px] divide-y divide-[#ececec] border-y border-[#ececec] font-jakarta text-[11.5px] max-lg:max-w-none">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[110px_1fr] gap-6 py-3.5">
                <dt className="text-[10px] font-semibold tracking-[0.15em] text-ink">{d.label}</dt>
                <dd className="leading-5 text-[#777]">{d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[460px] font-jakarta text-[11.5px] leading-5 text-[#777]">
            Need different dimensions, another wood or a matching piece?{" "}
            <Link href={routes.bespoke(product.name)} className="font-semibold text-ink underline underline-offset-2">
              Commission a variation
            </Link>
            .
          </p>
        </div>

        <div data-reveal className="pr-[4.4%] pl-[3.75%] max-lg:px-5">
          <h2 className="text-xl font-extrabold text-ink">Note For Furniture</h2>
          <ul className="mt-[42px] max-w-[560px] space-y-[19px] font-jakarta text-[11.5px] leading-5 text-ink">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="mt-8 font-jakarta text-[11.5px] text-[#777]">
            Read our full{" "}
            <Link href={routes.care} className="text-ink underline underline-offset-2">
              care guide
            </Link>{" "}
            and{" "}
            <Link href={routes.shipping} className="text-ink underline underline-offset-2">
              delivery information
            </Link>
            .
          </p>
        </div>
      </section>

      {/* see also */}
      <section className="border-t border-[#ececec]">
        <div className="mx-auto max-w-[1440px] px-[2.7%] pt-[42px] pb-[70px] max-md:px-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg text-ink">See also</h2>
            <Link href={routes.collection(category.handle)} className={`${eyebrow} hover:text-ink`}>
              All {category.title}
            </Link>
          </div>
          <ul className="mt-[30px] grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {related.map((p) => (
              <li key={p.slug} data-reveal>
                <Link href={routes.product(p.slug)} className="group block">
                  <div className="relative aspect-[322/221] overflow-hidden bg-[#f2f2f2]">
                    <Photo
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 322px"
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${p.drawing ? "bg-[#f7f6f2]! object-contain p-3" : "object-cover"}`}
                    />
                  </div>
                  <p className="mt-[18px] font-jakarta text-[11.5px] text-[#555]">{p.name}</p>
                  <p className="mt-1 font-jakarta text-[11.5px] text-[#999]">{formatPrice(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
