"use client";

import { useHydrated } from "@/lib/store/persistent";
import { useWishlist, wishlist } from "@/lib/store/wishlist";
import { HeartIcon } from "@/components/ui/icons";
import { textButton } from "@/components/ui/styles";

export default function WishlistButton({ slug, name, variant = "icon" }: { slug: string; name: string; variant?: "icon" | "text" }) {
  const hydrated = useHydrated();
  const saved = useWishlist().has(slug) && hydrated;

  if (variant === "text") {
    return (
      <button type="button" onClick={() => wishlist.toggle(slug)} aria-pressed={saved} className={`${textButton} px-6 text-center`}>
        {saved ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => wishlist.toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 transition-colors ${saved ? "text-red" : "text-ink hover:text-red"}`}
    >
      <HeartIcon size={18} filled={saved} />
    </button>
  );
}
