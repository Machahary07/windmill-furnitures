import type { StaticImageData } from "next/image";
import theog from "../../public/images/catalog/theog-chair.jpg";
import umtc from "../../public/images/catalog/umtc-lounger.jpg";
import library from "../../public/images/catalog/library-easy-chair.jpg";
import vintage from "../../public/images/catalog/vintage-mid-century.jpg";
import modern from "../../public/images/catalog/modern-mid-century.jpg";
import theogWide from "../../public/images/products/theog-chair-wide.jpg";
import umtcWide from "../../public/images/products/umtc-lounger-wide.jpg";
import vintageWide from "../../public/images/products/vintage-mid-century-wide.jpg";
import modernWide from "../../public/images/products/modern-mid-century-wide.jpg";
import libraryHero from "../../public/images/products/library-easy-chair-hero.jpg";
import libraryCutout from "../../public/images/products/library-easy-chair-cutout.png";
import teak from "../../public/images/swatches/teak.jpg";
import whiteAsh from "../../public/images/swatches/white-ash.jpg";
import walnut from "../../public/images/swatches/walnut.jpg";
import steamBeech from "../../public/images/swatches/steam-beech.jpg";
import sw1 from "../../public/images/swatches/sw1.jpg";
import sw2 from "../../public/images/swatches/sw2.jpg";
import sw3 from "../../public/images/swatches/sw3.jpg";
import sw4 from "../../public/images/swatches/sw4.jpg";
import sw5 from "../../public/images/swatches/sw5.jpg";
import sw6 from "../../public/images/swatches/sw6.jpg";
import sw7 from "../../public/images/swatches/sw7.jpg";

export type Swatch = { id: string; label: string; image: StaticImageData };

export type Product = {
  slug: string;
  name: string;
  price: number;
  /** portrait crop for the home catalog cards */
  card: StaticImageData;
  /** landscape crop for "See also" cards; falls back to card */
  wide?: StaticImageData;
  /** product page main photo; falls back to wide/card */
  hero?: StaticImageData;
  /** transparent cut-out shown beside the notes */
  cutout?: StaticImageData;
  description?: string;
  dimensions?: string;
};

export const woodTypes: Swatch[] = [
  { id: "teak", label: "Teak", image: teak },
  { id: "white-ash", label: "White Ash", image: whiteAsh },
  { id: "walnut", label: "Walnut", image: walnut },
  { id: "steam-beech", label: "Steam Beech", image: steamBeech },
];

export const upholstery: Swatch[] = [sw1, sw2, sw3, sw4, sw5, sw6, sw7].map((image, i) => ({
  id: `sw${i + 1}`,
  label: `SW${i + 1}`,
  image,
}));

export const products: Product[] = [
  { slug: "theog-chair", name: "Theog Chair", price: 1550, card: theog, wide: theogWide },
  { slug: "umtc-lounger", name: "UMTC Lounger", price: 2450, card: umtc, wide: umtcWide },
  {
    slug: "library-easy-chair",
    name: "Library Easy Chair",
    price: 2250,
    card: library,
    hero: libraryHero,
    cutout: libraryCutout,
    description:
      "This semi-upholstered lounge chair was designed for a bedroom of a house designed by our architectural studio. Its deep angled seat and curved arms add to the comfort of the design.",
    dimensions: "25″W x 29½″D x 16½″H",
  },
  { slug: "vintage-mid-century-lounger", name: "Vintage Mid-Century Lounger", price: 2550, card: vintage, wide: vintageWide },
  { slug: "modern-mid-century-lounger", name: "Modern Mid-Century Lounger", price: 3450, card: modern, wide: modernWide },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
