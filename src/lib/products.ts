/* Catalog data. Today this is a local module; when the Payload CMS backend
   lands, keep these types and swap the arrays for queries — every page reads
   through the functions at the bottom, never the arrays directly.
   TODO(client): prices, dimensions and descriptions below are placeholders
   (except the Library Easy Chair, from the Figma) — replace with real data. */

export type Swatch = { id: string; label: string; image: string };

export type CategoryHandle = "seating" | "tables" | "storage" | "beds";

export type Category = {
  handle: CategoryHandle;
  title: string;
  blurb: string;
  image: string;
  types: { id: string; label: string }[];
};

export type Product = {
  /** unique, permanent URL key: /products/{slug} */
  slug: string;
  /** unique stock code, also a short link: /p/{code} */
  code: string;
  name: string;
  category: CategoryHandle;
  type: string;
  price: number;
  /** first image is the main photo */
  images: string[];
  /** portrait crop for catalog cards; falls back to images[0] */
  card?: string;
  /** transparent cut-out shown beside the care notes */
  cutout?: string;
  /** images are workshop drawings rather than photographs */
  drawing?: boolean;
  upholstered: boolean;
  description: string;
  dimensions: string;
  materials: string;
  featured?: boolean;
};

export const woodTypes: Swatch[] = [
  { id: "teak", label: "Teak", image: "/images/swatches/teak.jpg" },
  { id: "white-ash", label: "White Ash", image: "/images/swatches/white-ash.jpg" },
  { id: "walnut", label: "Walnut", image: "/images/swatches/walnut.jpg" },
  { id: "steam-beech", label: "Steam Beech", image: "/images/swatches/steam-beech.jpg" },
];

export const upholstery: Swatch[] = Array.from({ length: 7 }, (_, i) => ({
  id: `sw${i + 1}`,
  label: `SW${i + 1}`,
  image: `/images/swatches/sw${i + 1}.jpg`,
}));

export const categories: Category[] = [
  {
    handle: "seating",
    title: "Seating",
    blurb: "Easy chairs, loungers, settees and sofas — framed in solid wood, joined by hand and upholstered to order.",
    image: "/images/collections/seating.jpg",
    types: [
      { id: "chairs", label: "Chairs" },
      { id: "loungers", label: "Loungers & Chaises" },
      { id: "sofas", label: "Sofas & Settees" },
    ],
  },
  {
    handle: "tables",
    title: "Tables",
    blurb: "Dining, centre, side and writing tables, drawn at our studio and built to the size of your room.",
    image: "/images/collections/tables.jpg",
    types: [
      { id: "dining", label: "Dining" },
      { id: "occasional", label: "Centre & Side" },
      { id: "desks", label: "Desks & Consoles" },
    ],
  },
  {
    handle: "storage",
    title: "Storage",
    blurb: "Bookshelves, chests, wardrobes and side units with traditional joinery, louvres and lattice.",
    image: "/images/collections/storage.jpg",
    types: [
      { id: "shelving", label: "Shelving" },
      { id: "cabinets", label: "Cabinets & Chests" },
      { id: "wardrobes", label: "Wardrobes" },
    ],
  },
  {
    handle: "beds",
    title: "Beds",
    blurb: "Beds and day beds in solid wood, with storage, lattice and headboards drawn for each house.",
    image: "/images/collections/beds.jpg",
    types: [
      { id: "beds", label: "Beds" },
      { id: "day-beds", label: "Day Beds" },
    ],
  },
];

const gallery = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.jpg`);

const SOLID = "Solid wood frame, hand-cut joinery, natural oil and wax finish.";
const UPHOLSTERED = "Solid wood frame, hand-cut joinery, foam and fibre cushions in your choice of upholstery.";
const CANED = "Solid wood frame with hand-woven natural cane, loose upholstered cushions.";

export const products: Product[] = [
  /* ---------- seating · chairs ---------- */
  {
    slug: "library-easy-chair",
    code: "WM-SE-01",
    name: "Library Easy Chair",
    category: "seating",
    type: "chairs",
    price: 72000,
    images: ["/images/products/library-easy-chair-hero.jpg", ...gallery("library-easy-chair", 6)],
    card: "/images/catalog/library-easy-chair.jpg",
    cutout: "/images/products/library-easy-chair-cutout.png",
    upholstered: true,
    description:
      "This semi-upholstered lounge chair was designed for a bedroom of a house designed by our architectural studio. Its deep angled seat and curved arms add to the comfort of the design.",
    dimensions: "25″W x 29½″D x 16½″H",
    materials: UPHOLSTERED,
    featured: true,
  },
  {
    slug: "theog-chair",
    code: "WM-SE-02",
    name: "Theog Chair",
    category: "seating",
    type: "chairs",
    price: 38500,
    images: ["/images/products/theog-chair-wide.jpg", ...gallery("theog-chair", 3)],
    card: "/images/catalog/theog-chair.jpg",
    upholstered: true,
    description:
      "A light, open-armed chair with a gently dished back rail. Equally at home at a desk or a dining table.",
    dimensions: "22″W x 21″D x 31″H",
    materials: UPHOLSTERED,
    featured: true,
  },
  {
    slug: "slatted-easy-chair",
    code: "WM-SE-03",
    name: "Slatted Easy Chair",
    category: "seating",
    type: "chairs",
    price: 64000,
    images: gallery("slatted-easy-chair", 1),
    upholstered: true,
    description:
      "The Library Easy Chair’s sibling, with a back of spaced vertical slats that let the frame show through the cushion.",
    dimensions: "25″W x 30″D x 31″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "barrel-cane-chair",
    code: "WM-SE-04",
    name: "Barrel Cane Chair",
    category: "seating",
    type: "chairs",
    price: 42000,
    images: gallery("barrel-cane-chair", 4),
    upholstered: true,
    description:
      "A compact tub chair whose bent top rail wraps round into the arms, with caned side panels and an upholstered seat.",
    dimensions: "21″W x 20″D x 29″H",
    materials: CANED,
  },
  {
    slug: "alpana-chair",
    code: "WM-SE-05",
    name: "Alpana Chair",
    category: "seating",
    type: "chairs",
    price: 46000,
    images: gallery("alpana-chair", 4),
    upholstered: true,
    description:
      "A caned-back terrace chair with flared arms and a deep cushioned seat, made for long afternoons outdoors under cover.",
    dimensions: "24″W x 25″D x 33″H",
    materials: CANED,
  },
  {
    slug: "twisted-chair",
    code: "WM-SE-06",
    name: "Twisted Chair",
    category: "seating",
    type: "chairs",
    price: 52000,
    images: gallery("twisted-chair", 4),
    upholstered: true,
    description:
      "Its back legs turn as they rise to become the arms — a single sweeping line in solid wood around a caned back.",
    dimensions: "24″W x 24″D x 32″H",
    materials: CANED,
  },
  {
    slug: "windmill-dining-chair",
    code: "WM-SE-07",
    name: "Windmill Dining Chair",
    category: "seating",
    type: "chairs",
    price: 24500,
    images: gallery("windmill-dining-chair", 1),
    drawing: true,
    upholstered: true,
    description: "Our house dining chair: a tall slatted back, a padded seat and proportions refined over three decades of orders.",
    dimensions: "18″W x 20″D x 38″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "japhu-chair",
    code: "WM-SE-08",
    name: "Japhu Chair",
    category: "seating",
    type: "chairs",
    price: 34000,
    images: gallery("japhu-chair", 1),
    drawing: true,
    upholstered: true,
    description: "A sturdy armchair with a square frame and a slatted back.",
    dimensions: "23″W x 22″D x 34″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "samode-chair",
    code: "WM-SE-09",
    name: "Samode Chair",
    category: "seating",
    type: "chairs",
    price: 39000,
    images: gallery("samode-chair", 1),
    drawing: true,
    upholstered: true,
    description: "A formal side chair with a curved crest rail and tapering legs.",
    dimensions: "20″W x 21″D x 37″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "rocking-chair",
    code: "WM-SE-10",
    name: "Rocking Chair",
    category: "seating",
    type: "chairs",
    price: 58000,
    images: gallery("rocking-chair", 1),
    drawing: true,
    upholstered: true,
    description: "A spindle-backed rocker with long, slow runners and a loose seat cushion.",
    dimensions: "24″W x 34″D x 42″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "study-armchair",
    code: "WM-SE-11",
    name: "Study Armchair",
    category: "seating",
    type: "chairs",
    price: 32000,
    images: gallery("study-armchair", 1),
    drawing: true,
    upholstered: true,
    description: "A desk chair with low arms that tuck under a writing table, upholstered seat and back.",
    dimensions: "22″W x 21″D x 33″H",
    materials: UPHOLSTERED,
  },

  /* ---------- seating · loungers & sofas ---------- */
  {
    slug: "umtc-lounger",
    code: "WM-SE-12",
    name: "UMTC Lounger",
    category: "seating",
    type: "loungers",
    price: 88000,
    images: ["/images/products/umtc-lounger-wide.jpg", ...gallery("umtc-lounger", 4)],
    card: "/images/catalog/umtc-lounger.jpg",
    upholstered: true,
    description:
      "A fully upholstered wing-back lounger on short tapered legs, shown here in a two-fabric combination.",
    dimensions: "30″W x 34″D x 36″H",
    materials: UPHOLSTERED,
    featured: true,
  },
  {
    slug: "vintage-mid-century-lounger",
    code: "WM-SE-13",
    name: "Vintage Mid-Century Lounger",
    category: "seating",
    type: "sofas",
    price: 118000,
    images: ["/images/products/vintage-mid-century-wide.jpg", ...gallery("vintage-mid-century-lounger", 3)],
    card: "/images/catalog/vintage-mid-century.jpg",
    upholstered: true,
    description:
      "A two-seater with an open wooden frame, floating seat and paddle arms — mid-century lines in Indian hardwood.",
    dimensions: "54″W x 31″D x 30″H",
    materials: UPHOLSTERED,
    featured: true,
  },
  {
    slug: "modern-mid-century-lounger",
    code: "WM-SE-14",
    name: "Modern Mid-Century Lounger",
    category: "seating",
    type: "sofas",
    price: 146000,
    images: ["/images/products/modern-mid-century-wide.jpg", ...gallery("modern-mid-century-lounger", 2)],
    card: "/images/catalog/modern-mid-century.jpg",
    upholstered: true,
    description:
      "A long three-seater with slim arms and loose back cushions, shown in mustard velvet with sage cushions.",
    dimensions: "78″W x 32″D x 30″H",
    materials: UPHOLSTERED,
    featured: true,
  },
  {
    slug: "half-cane-settee",
    code: "WM-SE-15",
    name: "Half-Cane Settee",
    category: "seating",
    type: "sofas",
    price: 96000,
    images: gallery("half-cane-settee", 3),
    upholstered: true,
    description:
      "A two-seater that is half caned and half cushioned — choose which side, or cane the whole back.",
    dimensions: "52″W x 30″D x 31″H",
    materials: CANED,
    featured: true,
  },
  {
    slug: "cane-back-bench",
    code: "WM-SE-16",
    name: "Cane Back Bench",
    category: "seating",
    type: "sofas",
    price: 78000,
    images: gallery("cane-back-bench", 4),
    upholstered: true,
    description: "A straight-armed bench with a caned back in two panels and a single long seat cushion. Fits a hallway or verandah.",
    dimensions: "50″W x 24″D x 32″H",
    materials: CANED,
  },
  {
    slug: "kohima-sofa",
    code: "WM-SE-17",
    name: "Kohima Sofa",
    category: "seating",
    type: "sofas",
    price: 165000,
    images: gallery("kohima-sofa", 2),
    drawing: true,
    upholstered: true,
    description: "A deep, square-armed three-seater with panelled sides, also made as a single seater.",
    dimensions: "84″W x 34″D x 30″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "windward-lounge-sofa",
    code: "WM-SE-18",
    name: "Windward Lounge Sofa",
    category: "seating",
    type: "sofas",
    price: 138000,
    images: gallery("windward-lounge-sofa", 1),
    drawing: true,
    upholstered: true,
    description: "A low lounge sofa with a curved timber back rail and loose seat cushions.",
    dimensions: "76″W x 33″D x 29″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "silverglades-chaise-lounge",
    code: "WM-SE-19",
    name: "Silverglades Chaise Lounge",
    category: "seating",
    type: "loungers",
    price: 112000,
    images: gallery("silverglades-chaise-lounge", 1),
    drawing: true,
    upholstered: true,
    description: "A long chaise with a raised head end and a slim wooden plinth, for reading by a window.",
    dimensions: "68″W x 28″D x 30″H",
    materials: UPHOLSTERED,
  },
  {
    slug: "low-seat-ottoman",
    code: "WM-SE-20",
    name: "Low Seat Ottoman",
    category: "seating",
    type: "loungers",
    price: 28000,
    images: gallery("low-seat-ottoman", 1),
    drawing: true,
    upholstered: true,
    description: "A low, square upholstered seat on a wooden base — footrest, extra seat or side table with a tray.",
    dimensions: "30″W x 30″D x 15″H",
    materials: UPHOLSTERED,
  },

  /* ---------- tables ---------- */
  {
    slug: "six-seater-dining-table",
    code: "WM-TB-01",
    name: "Six-Seater Dining Table",
    category: "tables",
    type: "dining",
    price: 145000,
    images: gallery("six-seater-dining-table", 1),
    drawing: true,
    upholstered: false,
    description: "A plain, generous dining table with a thick solid top and square legs set in from the corners.",
    dimensions: "72″W x 36″D x 30″H",
    materials: SOLID,
  },
  {
    slug: "shanghai-centre-table",
    code: "WM-TB-02",
    name: "Shanghai Centre Table",
    category: "tables",
    type: "occasional",
    price: 68000,
    images: gallery("shanghai-centre-table", 1),
    drawing: true,
    upholstered: false,
    description: "A low centre table with a glass-topped grid of compartments for collections, books or objects.",
    dimensions: "48″W x 30″D x 16″H",
    materials: `${SOLID} Toughened glass top.`,
  },
  {
    slug: "nest-of-tables",
    code: "WM-TB-03",
    name: "Nest of Tables",
    category: "tables",
    type: "occasional",
    price: 42000,
    images: gallery("nest-of-tables", 1),
    drawing: true,
    upholstered: false,
    description: "Three tables that slide one inside the other, each with a slim lipped top.",
    dimensions: "22″W x 16″D x 22″H (largest)",
    materials: SOLID,
  },
  {
    slug: "lamp-side-table",
    code: "WM-TB-04",
    name: "Lamp Side Table",
    category: "tables",
    type: "occasional",
    price: 22000,
    images: gallery("lamp-side-table", 1),
    drawing: true,
    upholstered: false,
    description: "A small square side table with a lower shelf, sized to sit beside an easy chair.",
    dimensions: "18″W x 18″D x 22″H",
    materials: SOLID,
  },
  {
    slug: "long-bedside-table",
    code: "WM-TB-05",
    name: "Long Bedside Table",
    category: "tables",
    type: "occasional",
    price: 36000,
    images: gallery("long-bedside-table", 1),
    drawing: true,
    upholstered: false,
    description: "A low, wide bedside table with a drawer and an open shelf for books.",
    dimensions: "30″W x 16″D x 22″H",
    materials: SOLID,
  },
  {
    slug: "writing-desk",
    code: "WM-TB-06",
    name: "Writing Desk",
    category: "tables",
    type: "desks",
    price: 74000,
    images: gallery("writing-desk", 1),
    drawing: true,
    upholstered: false,
    description: "A slim desk with a row of shallow drawers and a raised back gallery for letters and pens.",
    dimensions: "48″W x 24″D x 30″H",
    materials: SOLID,
  },
  {
    slug: "hall-console",
    code: "WM-TB-07",
    name: "Hall Console",
    category: "tables",
    type: "desks",
    price: 82000,
    images: gallery("hall-console", 1),
    drawing: true,
    upholstered: false,
    description: "A narrow console with turned legs and a low shelf, made for an entrance hall.",
    dimensions: "60″W x 16″D x 32″H",
    materials: SOLID,
  },

  /* ---------- storage ---------- */
  {
    slug: "lattice-bookshelf",
    code: "WM-ST-01",
    name: "Lattice Bookshelf",
    category: "storage",
    type: "shelving",
    price: 124000,
    images: gallery("lattice-bookshelf", 1),
    drawing: true,
    upholstered: false,
    description: "A wall-length bookshelf with diagonal lattice dividers that hold books upright at any height.",
    dimensions: "96″W x 14″D x 42″H",
    materials: SOLID,
  },
  {
    slug: "chest-of-drawers",
    code: "WM-ST-02",
    name: "Chest of Drawers",
    category: "storage",
    type: "cabinets",
    price: 86000,
    images: gallery("chest-of-drawers", 1),
    drawing: true,
    upholstered: false,
    description: "Four deep, dovetailed drawers on a plinth, with turned wooden knobs.",
    dimensions: "40″W x 20″D x 36″H",
    materials: SOLID,
  },
  {
    slug: "dresser-with-mirror",
    code: "WM-ST-03",
    name: "Dresser with Mirror",
    category: "storage",
    type: "cabinets",
    price: 92000,
    images: gallery("dresser-with-mirror", 1),
    drawing: true,
    upholstered: false,
    description: "A dressing unit with a tall framed mirror, a bank of drawers and an open knee space.",
    dimensions: "42″W x 18″D x 72″H",
    materials: `${SOLID} Bevelled mirror.`,
  },
  {
    slug: "louvred-side-unit",
    code: "WM-ST-04",
    name: "Louvred Side Unit",
    category: "storage",
    type: "cabinets",
    price: 98000,
    images: gallery("louvred-side-unit", 1),
    drawing: true,
    upholstered: false,
    description: "A long sideboard with louvred doors that let the cupboard breathe, and drawers above.",
    dimensions: "66″W x 18″D x 32″H",
    materials: SOLID,
  },
  {
    slug: "media-unit",
    code: "WM-ST-05",
    name: "Media Unit",
    category: "storage",
    type: "cabinets",
    price: 108000,
    images: gallery("media-unit", 1),
    drawing: true,
    upholstered: false,
    description: "A low entertainment unit with closed cupboards, cable channels and an open centre shelf.",
    dimensions: "72″W x 20″D x 24″H",
    materials: SOLID,
  },
  {
    slug: "panelled-wardrobe",
    code: "WM-ST-06",
    name: "Panelled Wardrobe",
    category: "storage",
    type: "wardrobes",
    price: 185000,
    images: gallery("panelled-wardrobe", 1),
    drawing: true,
    upholstered: false,
    description: "A free-standing double wardrobe with framed panel doors, hanging space, shelves and drawers.",
    dimensions: "60″W x 24″D x 84″H",
    materials: SOLID,
  },

  /* ---------- beds ---------- */
  {
    slug: "queen-bed",
    code: "WM-BD-01",
    name: "Queen Bed",
    category: "beds",
    type: "beds",
    price: 135000,
    images: gallery("queen-bed", 1),
    drawing: true,
    upholstered: false,
    description: "A queen-size bed with a slatted headboard, solid side rails and a sprung slat base.",
    dimensions: "Mattress 60″ x 78″ · Headboard 40″H",
    materials: SOLID,
  },
  {
    slug: "king-bed",
    code: "WM-BD-02",
    name: "King Bed",
    category: "beds",
    type: "beds",
    price: 168000,
    images: gallery("king-bed", 1),
    drawing: true,
    upholstered: false,
    description: "A king-size bed with a tall panelled headboard and generous corner posts.",
    dimensions: "Mattress 72″ x 78″ · Headboard 46″H",
    materials: SOLID,
  },
  {
    slug: "storage-single-bed",
    code: "WM-BD-03",
    name: "Storage Single Bed",
    category: "beds",
    type: "beds",
    price: 88000,
    images: gallery("storage-single-bed", 1),
    drawing: true,
    upholstered: false,
    description: "A single bed raised on a base of deep drawers — for children’s rooms and guest rooms.",
    dimensions: "Mattress 36″ x 78″",
    materials: SOLID,
  },
  {
    slug: "lattice-day-bed",
    code: "WM-BD-04",
    name: "Lattice Day Bed",
    category: "beds",
    type: "day-beds",
    price: 115000,
    images: gallery("lattice-day-bed", 2),
    drawing: true,
    upholstered: true,
    description: "A day bed with lattice back and sides, deep enough to sleep on and sized for a long mattress cushion.",
    dimensions: "80″W x 36″D x 32″H",
    materials: UPHOLSTERED,
  },
];

/* ---------- queries (keep pages on these, not the arrays) ---------- */

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

export const isSortId = (v: unknown): v is SortId => sortOptions.some((o) => o.id === v);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getProductByCode = (code: string) =>
  products.find((p) => p.code.toLowerCase() === code.toLowerCase());

export const getCategory = (handle: string) => categories.find((c) => c.handle === handle);

export const featuredProducts = () => products.filter((p) => p.featured);

export const cardImage = (p: Product) => p.card ?? p.images[0];

export function listProducts({
  category,
  type,
  sort = "featured",
}: { category?: CategoryHandle; type?: string; sort?: SortId } = {}) {
  const list = products.filter((p) => (!category || p.category === category) && (!type || p.type === type));
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      /* photographed + featured pieces first, then catalogue order */
      return list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!a.drawing) - Number(!!b.drawing));
  }
}

export function searchProducts(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const category = getCategory(p.category)!;
    /* every piece is offered in every wood, so wood names match the whole catalog */
    const haystack = [p.name, p.code, p.description, p.materials, category.title, category.types.find((t) => t.id === p.type)?.label, ...woodTypes.map((w) => w.label)]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function relatedProducts(product: Product, count = 4) {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same.filter((p) => p.type === product.type), ...same.filter((p) => p.type !== product.type), ...others].slice(0, count);
}

export const findSwatch = (list: Swatch[], id: string | null | undefined) => list.find((s) => s.id === id);
