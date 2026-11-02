import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/ui/InfoPage";
import { formatPrice } from "@/lib/money";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Lead times, delivery charges and our returns policy for made-to-order furniture.",
};

/* TODO(client): confirm lead times, delivery charges and the returns policy */
export default function ShippingPage() {
  return (
    <InfoPage
      title="SHIPPING & RETURNS."
      current={routes.shipping}
      intro="Every piece is made to order in our workshop, so here is what to expect between placing an order and enjoying it at home."
      updated="November 2026"
    >
      <h2>Lead times</h2>
      <ul>
        <li>
          <strong>Photographed designs:</strong> 6–8 weeks from order.
        </li>
        <li>
          <strong>Pieces made from drawings:</strong> 10–12 weeks from order.
        </li>
        <li>
          <strong>Bespoke commissions:</strong> typically 8–12 weeks from drawing approval.
        </li>
      </ul>
      <p>We will confirm a delivery window when your piece goes into production, and again when it leaves the workshop.</p>

      <h2>Delivery charges</h2>
      <ul>
        <li>Free delivery and placement in {site.freeDeliveryStates.join(", ")} (Delhi NCR and surrounds).</li>
        <li>Elsewhere in India: a flat {formatPrice(site.deliveryCharge)} per order, crated and insured.</li>
        <li>International delivery is available on request — <Link href={routes.contact("order")}>contact us</Link> for a quote.</li>
      </ul>

      <h2>On delivery</h2>
      <p>
        Please check your furniture when it arrives and note any visible damage on the delivery receipt. Let us know within 48 hours with photos and we will arrange a repair
        or replacement.
      </p>

      <h2>Cancellations</h2>
      <p>
        You can cancel for a full refund within 48 hours of ordering, before timber is cut. After production begins, cancellations are not possible because each piece is made
        for you.
      </p>

      <h2>Returns</h2>
      <p>
        Because our furniture is made to order in your chosen wood and upholstery, we cannot accept returns for change of mind. If a piece arrives damaged or with a
        manufacturing defect, we will repair or replace it at no cost.
      </p>

      <h2>Warranty</h2>
      <p>
        All Windmill furniture is guaranteed against defects in workmanship for one year from delivery. Natural movement of wood, wear to upholstery and changes in colour
        from light and age are not defects — see our <Link href={routes.care}>care guide</Link>.
      </p>
    </InfoPage>
  );
}
