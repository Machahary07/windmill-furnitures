import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/ui/InfoPage";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Furniture Care",
  description: "How to look after solid wood, cane and upholstered furniture from Windmill.",
};

export default function CarePage() {
  return (
    <InfoPage
      title="CARE."
      current={routes.care}
      intro="Solid wood is a living material. With a little care, your furniture will last for generations and grow more beautiful as it ages."
    >
      <h2>Note for furniture</h2>
      <ul>
        <li>The grain, color, and overall appearance of each piece will vary.</li>
        <li>Please enjoy the unique characteristics, expressions, and aging process of natural wood.</li>
        <li>There may be slight individual differences in shape and size.</li>
        <li>
          Although we use well-dried wood, please note that due to the nature of natural wood, slight movement (small misalignment or warping at joints, etc.) may occur.
        </li>
      </ul>

      <h2>Everyday care</h2>
      <ul>
        <li>Dust with a soft, dry cloth, following the direction of the grain.</li>
        <li>Wipe spills immediately with a slightly damp cloth and dry straight away.</li>
        <li>Use coasters, mats and trivets under glasses, hot dishes and plant pots.</li>
        <li>Avoid silicone sprays and harsh household cleaners — they build up and dull the finish.</li>
      </ul>

      <h2>Placement &amp; climate</h2>
      <p>
        Wood moves with the seasons, swelling slightly in the monsoon and shrinking in dry winter months. Keep furniture away from direct sunlight, radiators, heaters and
        air-conditioning vents, and avoid placing it against damp walls. Small seasonal gaps at joints are normal and usually close again.
      </p>

      <h2>Cane</h2>
      <p>
        Cane is strong but dislikes extreme dryness. Wipe occasionally with a lightly damp cloth and let it dry naturally. Avoid kneeling or standing on caned seats and
        backs.
      </p>

      <h2>Upholstery</h2>
      <ul>
        <li>Vacuum cushions gently with a soft brush attachment.</li>
        <li>Plump and turn loose cushions regularly so they wear evenly.</li>
        <li>Blot spills — don’t rub — and test any cleaner on a hidden area first. We recommend professional cleaning for stains.</li>
      </ul>

      <h2>Refinishing &amp; repairs</h2>
      <p>
        After years of use, a piece may benefit from a fresh finish. Our workshop can re-polish, re-cane and re-upholster Windmill furniture.{" "}
        <Link href={routes.contact("order")}>Get in touch</Link> with your order number or a photo.
      </p>
    </InfoPage>
  );
}
