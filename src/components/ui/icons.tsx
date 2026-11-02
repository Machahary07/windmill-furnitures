import type { SVGProps } from "react";

/* Line icons drawn to match the navbar search glyph (1.3–1.5 stroke) */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const SearchIcon = ({ size = 19, ...p }: IconProps) => (
  <svg {...base(size, p)} viewBox="0 0 19 19" strokeWidth={1.3}>
    <circle cx="8.2" cy="8.2" r="6.7" />
    <line x1="13.1" y1="13.1" x2="17.8" y2="17.8" />
  </svg>
);

export const CartIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="16.5" cy="19" r="1.3" />
  </svg>
);

/** red catalog-card button glyph (cart with a dash) */
export const AddToCartIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)} strokeWidth={2}>
    <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
    <path d="M11 10.5h5" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="16.5" cy="19" r="1.3" />
  </svg>
);

export const UserIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </svg>
);

export const HeartIcon = ({ size = 20, filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(size, p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
  </svg>
);

export const MenuIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const ChevronIcon = ({ size = 10, dir = "right", ...p }: IconProps & { dir?: "left" | "right" | "down" }) => (
  <svg {...base(size, p)} viewBox="0 0 10 10" strokeWidth={1.8}>
    <path d={dir === "left" ? "M6.5 1.5 3 5l3.5 3.5" : dir === "down" ? "M1.5 3.5 5 7l3.5-3.5" : "M3.5 1.5 7 5 3.5 8.5"} />
  </svg>
);

export const LinkIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);
