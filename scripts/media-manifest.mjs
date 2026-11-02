/* Writes src/lib/media-manifest.json: intrinsic size + average colour for every
   image in public/images, so <Photo> can size string paths and paint a colour
   placeholder without static imports. Run after adding images: npm run media */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
const files = (await readdir(path.join(root, "images"), { recursive: true }))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

const manifest = {};
for (const file of files) {
  const abs = path.join(root, "images", file);
  const { width, height, hasAlpha } = await sharp(abs).metadata();
  const { dominant } = await sharp(abs).stats();
  const hex = [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, "0")).join("");
  /* cut-outs keep a transparent placeholder */
  manifest[`/images/${file.split(path.sep).join("/")}`] = { w: width, h: height, c: hasAlpha ? "transparent" : `#${hex}` };
}

await writeFile("src/lib/media-manifest.json", JSON.stringify(manifest, null, 1) + "\n");
console.log(`media-manifest: ${files.length} images`);
