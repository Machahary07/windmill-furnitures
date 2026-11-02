import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { AddToCartIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/money";
import { cardImage, type Product } from "@/lib/products";
import { routes } from "@/lib/routes";
import WishlistButton from "./WishlistButton";

/* The home "CATALOG" card: portrait photo, uppercase name, bold price and the
   red cart button (which opens the product to choose wood and upholstery).
   Pass `eager` for cards in the first two rows (where the page's LCP lands). */
export default function ProductCard({
  product,
  sizes = "268px",
  className = "",
  eager = false,
}: {
  product: Product;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const href = routes.product(product.slug);
  return (
    <article className={`group relative overflow-hidden rounded-xl bg-[#efefef] ${className}`}>
      <Link href={href} className="relative block aspect-[268/305] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Photo
          src={cardImage(product)}
          alt=""
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          className={`transition-transform duration-500 group-hover:scale-[1.03] ${product.drawing ? "bg-[#f7f6f2]! object-contain p-5" : "object-cover"}`}
        />
        {product.drawing && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-jakarta text-[10px] font-semibold tracking-[0.12em] text-[#555] uppercase">
            Made from drawing
          </span>
        )}
      </Link>
      <div className="absolute top-3 right-3 z-[2] opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 has-[[aria-pressed=true]]:opacity-100 max-md:opacity-100">
        <WishlistButton slug={product.slug} name={product.name} />
      </div>
      <div className="flex items-center justify-between gap-3 px-[15px] pt-[17px] pb-[19px]">
        <div className="min-w-0">
          <h3 className="truncate font-jakarta text-sm font-medium tracking-[0.06em] text-ink uppercase" title={product.name}>
            <Link href={href} className="after:absolute after:inset-0 after:z-0">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 font-jakarta text-sm font-bold text-ink">{formatPrice(product.price)}</p>
        </div>
        <Link
          href={href}
          aria-label={`Choose options and add ${product.name} to cart`}
          className="relative z-[1] grid size-9 shrink-0 place-items-center rounded-full bg-[#c00000] text-white transition-colors hover:bg-[#a00000]"
        >
          <AddToCartIcon />
        </Link>
      </div>
    </article>
  );
}
