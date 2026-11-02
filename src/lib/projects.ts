/* TODO(client): project titles, locations and write-ups are placeholders built
   around the supplied photography — replace with the real project names,
   clients (where they can be credited) and years. */

export type Project = {
  slug: string;
  title: string;
  kind: "Residence" | "Workplace" | "Hospitality";
  location: string;
  summary: string;
  body: string[];
  images: string[];
  /** product slugs shown as "Pieces in this project" */
  pieces: string[];
};

const photos = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/projects/${slug}/${i + 1}.jpg`);

export const projects: Project[] = [
  {
    slug: "library-house",
    title: "The Library House",
    kind: "Residence",
    location: "India",
    summary: "A double-height reading room wrapped in bookshelves, furnished with loungers, rugs and low tables.",
    body: [
      "The house is organised around a two-storey library, with a gallery running round the upper level. We were asked for furniture that would let a family of readers spread out without the room ever feeling crowded.",
      "Low loungers and settees keep sightlines open across the hall, while the bookshelves were drawn bay by bay to the architecture. Every piece is in teak, finished in oil and wax to darken slowly with the shelves around it.",
    ],
    images: photos("library-house", 6),
    pieces: ["modern-mid-century-lounger", "vintage-mid-century-lounger", "lattice-bookshelf", "shanghai-centre-table"],
  },
  {
    slug: "heritage-suites",
    title: "Heritage Suites",
    kind: "Hospitality",
    location: "India",
    summary: "Guest suites and a vaulted lounge, from beds to writing desks.",
    body: [
      "Each suite needed a bed, seating, a writing desk and storage that would sit comfortably against old lime-plastered walls.",
      "We kept the profiles simple and let the timber and cane do the work. The lounge sofas were upholstered in deep blues to answer the painted ceilings.",
    ],
    images: photos("heritage-suites", 6),
    pieces: ["king-bed", "writing-desk", "kohima-sofa", "barrel-cane-chair"],
  },
  {
    slug: "garden-studio-offices",
    title: "Garden Studio Offices",
    kind: "Workplace",
    location: "India",
    summary: "Workstations, meeting booths and breakout lounges for a design studio that wanted to feel like home.",
    body: [
      "The brief was an office that did not feel like one. Workstations were drawn as long shared tables, and the meeting booths were lined in timber and coloured upholstery.",
      "Breakout areas use the same settees and side tables we make for houses, so the studio reads as one continuous, lived-in space.",
    ],
    images: photos("garden-studio-offices", 6),
    pieces: ["half-cane-settee", "nest-of-tables", "study-armchair", "hall-console"],
  },
  {
    slug: "garden-house",
    title: "Garden House",
    kind: "Residence",
    location: "India",
    summary: "Terraces and a living room opening onto a planted courtyard, furnished for indoor–outdoor living.",
    body: [
      "The house steps down through terraces into an overgrown garden. We made caned chairs light enough to carry outside, and low tables that work on stone and on carpet.",
    ],
    images: photos("garden-house", 4),
    pieces: ["alpana-chair", "twisted-chair", "cane-back-bench", "lamp-side-table"],
  },
  {
    slug: "the-dining-hall",
    title: "The Dining Hall",
    kind: "Hospitality",
    location: "India",
    summary: "Long dining tables, dining chairs and sideboards for a large communal dining hall.",
    body: [
      "Chairs built to one pattern in quantity, and tables that join end to end for larger gatherings. Making in volume without losing the hand-finished quality is what our workshop is set up for.",
    ],
    images: photos("the-dining-hall", 4),
    pieces: ["windmill-dining-chair", "six-seater-dining-table", "louvred-side-unit"],
  },
  {
    slug: "stairwell-residence",
    title: "Stairwell Residence",
    kind: "Residence",
    location: "India",
    summary: "A living and dining floor arranged around a floating steel stair and a brick feature wall.",
    body: [
      "Furniture for an open floor where the staircase is the centrepiece. We kept everything low and open-framed so the stair could be seen from every seat.",
    ],
    images: photos("stairwell-residence", 4),
    pieces: ["vintage-mid-century-lounger", "library-easy-chair", "media-unit"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
