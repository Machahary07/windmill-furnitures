"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Photo from "@/components/ui/Photo";
import { LinkIcon } from "@/components/ui/icons";
import { eyebrow, primaryButton } from "@/components/ui/styles";
import { findSwatch, upholstery, woodTypes, type Product, type Swatch } from "@/lib/products";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { cart } from "@/lib/store/cart";
import { QtyStepper } from "@/components/cart/CartLineItem";
import WishlistButton from "./WishlistButton";

function SwatchPicker({
  legend,
  options,
  value,
  onChange,
  size,
}: {
  legend: string;
  options: Swatch[];
  value: string;
  onChange: (id: string) => void;
  size: "lg" | "sm";
}) {
  return (
    <fieldset>
      <legend className={eyebrow}>
        {legend} <span className="tracking-normal text-ink normal-case">— {findSwatch(options, value)?.label}</span>
      </legend>
      <div className={`mt-[26px] flex flex-wrap ${size === "lg" ? "gap-[25px] max-sm:gap-3" : "gap-3"}`}>
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <label
              key={o.id}
              className={`relative cursor-pointer overflow-hidden rounded-[6px] outline-offset-[1px] has-focus-visible:outline-2 has-focus-visible:outline-ink ${
                size === "lg" ? "size-[100px] max-sm:size-[76px]" : "size-[75px] max-sm:size-[60px]"
              } ${selected ? "ring-[3px] ring-[#b00000]" : ""}`}
            >
              <input type="radio" name={legend} value={o.id} checked={selected} onChange={() => onChange(o.id)} className="sr-only" />
              <Photo src={o.image} alt="" fill sizes={size === "lg" ? "100px" : "75px"} className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent pt-3 pb-1.5 text-center font-jakarta text-[11.5px] font-medium text-white">
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* Reads ?wood= & ?upholstery= so a configuration has its own link; must sit
   inside <Suspense> (see ProductPurchase) because it reads search params. */
export function ProductOptionsFromUrl({ product }: { product: Product }) {
  const params = useSearchParams();
  return <ProductOptions product={product} initialWood={params.get("wood")} initialUpholstery={params.get("upholstery")} />;
}

export default function ProductOptions({
  product,
  initialWood,
  initialUpholstery,
}: {
  product: Product;
  initialWood?: string | null;
  initialUpholstery?: string | null;
}) {
  const [wood, setWood] = useState(findSwatch(woodTypes, initialWood)?.id ?? woodTypes[0].id);
  const [fabric, setFabric] = useState(findSwatch(upholstery, initialUpholstery)?.id ?? upholstery[0].id);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);

  const config = { wood, upholstery: product.upholstered ? fabric : undefined };

  /* keep the address bar on the current configuration without a navigation */
  const select = (next: { wood?: string; upholstery?: string }) => {
    const merged = { ...config, ...next };
    if (next.wood) setWood(next.wood);
    if (next.upholstery) setFabric(next.upholstery);
    window.history.replaceState(null, "", routes.product(product.slug, merged));
  };

  const copyLink = async () => {
    const url = new URL(routes.product(product.slug, config), window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  return (
    <div className="mt-[30px] space-y-[22px]">
      <SwatchPicker legend="Select Wood Type" options={woodTypes} value={wood} onChange={(id) => select({ wood: id })} size="lg" />
      {product.upholstered && (
        <SwatchPicker legend="Select Upholstery" options={upholstery} value={fabric} onChange={(id) => select({ upholstery: id })} size="sm" />
      )}

      <div className="flex items-center gap-6 pt-[13px] max-sm:flex-wrap">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label={product.name} />
        <button type="button" onClick={() => cart.add({ slug: product.slug, ...config, qty })} className={`${primaryButton} flex-1 max-sm:w-full max-sm:flex-none`}>
          Add to cart
        </button>
        <WishlistButton slug={product.slug} name={product.name} variant="text" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-jakarta text-[11.5px] text-[#777]">
        <p>
          Made to order in {product.drawing ? "10–12" : "6–8"} weeks.{" "}
          {qty >= site.bulkOrderQty && (
            <>
              For {site.bulkOrderQty} or more,{" "}
              <Link href={routes.contact("bulk")} className="text-ink underline underline-offset-2">
                contact the studio
              </Link>
              .
            </>
          )}
        </p>
        <button type="button" onClick={copyLink} className="flex cursor-pointer items-center gap-1.5 text-ink hover:underline" aria-live="polite">
          <LinkIcon size={14} />
          {copied ? "Link copied" : "Copy link to this configuration"}
        </button>
      </div>
    </div>
  );
}
