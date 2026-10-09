import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductOptions from "@/components/product/ProductOptions";
import { getProduct, products, upholstery, woodTypes } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.description } : {};
}

const notes = [
  "The grain, color, and overall appearance of each piece will vary.",
  "Please enjoy the unique characteristics, expressions, and aging process of natural wood.",
  "There may be slight individual differences in shape and size.",
  "Although we use well-dried wood, please note that due to the nature of natural wood, slight movement (small misalignment or warping at joints, etc.) may occur.",
  "Specifications and prices may change or production may be discontinued without notice.",
  "For orders of 4 or more items, please contact us.",
];

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const hero = product.hero ?? product.wide ?? product.card;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Navbar active="Product" />
      <main className="font-sans">
        {/* main photo + options */}
        <section className="mx-auto grid max-w-[1440px] grid-cols-2 pt-7 max-lg:grid-cols-1">
          <div className="relative aspect-[719/600] w-[99.9%] bg-[#f2f2f2] max-lg:w-full">
            <Image
              src={hero}
              alt={product.name}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 720px"
              placeholder="blur"
              className="object-cover"
            />
          </div>

          <div className="pt-[38px] pr-[4.4%] pl-[3.96%] max-lg:px-5 max-lg:pb-12">
            <div className="flex items-baseline justify-between gap-6">
              <h1 className="text-[22px] text-ink">{product.name}</h1>
              <p className="text-lg text-ink">${product.price}</p>
            </div>
            {product.description && (
              <p className="mt-[22px] max-w-[580px] font-jakarta text-[11.5px] leading-5 text-[#777]">
                {product.description}
              </p>
            )}
            <ProductOptions woods={woodTypes} fabrics={upholstery} />
          </div>
        </section>

        {/* cut-out + care notes */}
        <section className="mx-auto grid max-w-[1440px] grid-cols-2 pt-[70px] pb-[86px] max-lg:grid-cols-1 max-lg:gap-12 max-lg:pt-12">
          <div className="flex flex-col items-center">
            {product.cutout && (
              <Image
                src={product.cutout}
                alt={`${product.name}, side view`}
                sizes="300px"
                className="h-[300px] w-auto"
              />
            )}
            {product.dimensions && (
              <p className="mt-[18px] flex gap-7 font-jakarta text-[11.5px]">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-ink">Dimensions</span>
                <span className="text-[#777]">{product.dimensions}</span>
              </p>
            )}
          </div>

          <div className="pr-[4.4%] pl-[3.75%] max-lg:px-5">
            <h2 className="text-xl font-extrabold text-ink">Note For Furniture</h2>
            <ul className="mt-[42px] max-w-[560px] space-y-[19px] font-jakarta text-[11.5px] leading-5 text-ink">
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* see also */}
        <section className="border-t border-[#ececec]">
          <div className="mx-auto max-w-[1440px] px-[2.7%] pt-[42px] pb-[70px] max-md:px-5">
            <h2 className="text-lg text-ink">See also</h2>
            <ul className="mt-[30px] grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="relative aspect-[322/221] overflow-hidden bg-[#f2f2f2]">
                      <Image
                        src={p.wide ?? p.card}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 322px"
                        placeholder="blur"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-[18px] font-jakarta text-[11.5px] text-[#555]">{p.name}</p>
                    <p className="mt-1 font-jakarta text-[11.5px] text-[#999]">${p.price}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
