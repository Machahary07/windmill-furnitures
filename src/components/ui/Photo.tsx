import Image, { type ImageProps } from "next/image";
import manifest from "@/lib/media-manifest.json";

type Meta = { w: number; h: number; c: string };
const media = manifest as Record<string, Meta>;

/* next/image for string paths under /public/images: size and placeholder colour
   come from src/lib/media-manifest.json (regenerate with `npm run media`). */
export default function Photo({ src, alt, fill, style, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  const meta = media[src];
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : (rest.width ?? meta?.w)}
      height={fill ? undefined : (rest.height ?? meta?.h)}
      style={{ backgroundColor: meta?.c, ...style }}
      {...rest}
    />
  );
}
