/* Writes 1200x630 link-preview images (WhatsApp, iMessage, Slack, X…) for
   every product, project and collection into public/og/, small enough for
   WhatsApp's preview limit. Run after changing catalog photos: npm run og
   (Node 22.18+ loads the .ts catalog files directly.)
   - portrait pieces (or a product's portrait catalog card) use the site
     banner layout: scripts/og-frame.png (the banner's text panel) on the
     left, the piece on the right
   - wide photos fill the frame; wide workshop drawings sit whole on white
   public/og/windmill.jpg — the site-wide banner — is designed separately. */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { categories, products } from "../src/lib/products.ts";
import { projects } from "../src/lib/projects.ts";

const W = 1200;
const H = 630;
const PANEL = 470; // photo panel width in the banner layout
const PAPER = "#f7f6f2";
const out = path.resolve("public/og");
const frame = path.resolve("scripts/og-frame.png");

const jobs = [
  ...products.map((p) => ({ dir: "products", slug: p.slug, src: p.card ?? p.images[0], drawing: p.drawing })),
  ...projects.map((p) => ({ dir: "projects", slug: p.slug, src: p.images[0] })),
  ...categories.map((c) => ({ dir: "collections", slug: c.handle, src: c.image })),
];

const fit = (file, width, drawing) =>
  drawing
    ? sharp(file).resize(width, H, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" })
    : sharp(file).resize(width, H, { fit: "cover" });

let bytes = 0;
for (const job of jobs) {
  await mkdir(path.join(out, job.dir), { recursive: true });
  const src = path.resolve("public", `.${job.src}`);
  const dest = path.join(out, job.dir, `${job.slug}.jpg`);
  const { width, height } = await sharp(src).metadata();

  const image =
    width < height * 1.1
      ? sharp({ create: { width: W, height: H, channels: 3, background: PAPER } }).composite([
          { input: frame, left: 0, top: 0 },
          { input: await fit(src, PANEL, job.drawing).toBuffer(), left: W - PANEL, top: 0 },
        ])
      : fit(src, W, job.drawing);

  await image.jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
  bytes += (await stat(dest)).size;
}
console.log(`og-images: ${jobs.length} images, ${Math.round(bytes / jobs.length / 1024)} KB average`);
