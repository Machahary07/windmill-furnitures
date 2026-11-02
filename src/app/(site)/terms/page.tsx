import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/ui/InfoPage";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Sale" };

/* TODO(client): draft wording — have it reviewed by a lawyer before launch */
export default function TermsPage() {
  return (
    <InfoPage title="TERMS." current={routes.terms} updated="November 2026" intro={`These terms apply to orders placed with ${site.legalName} through this website.`}>
      <h2>1. Orders</h2>
      <p>
        An order is accepted when you receive our order confirmation by email. Because each piece is made to order, we may contact you to confirm details before production
        begins.
      </p>

      <h2>2. Prices &amp; payment</h2>
      <p>
        Prices are shown in Indian Rupees and include GST. Delivery charges are shown at checkout. Payment is taken in full at the time of ordering through our payment
        partner. Specifications and prices may change or production may be discontinued without notice; this does not affect orders already confirmed.
      </p>

      <h2>3. Natural materials</h2>
      <p>
        Our furniture is made by hand from natural wood, cane and fabric. The grain, colour and overall appearance of each piece will vary, and there may be slight
        individual differences in shape and size. These are not defects.
      </p>

      <h2>4. Delivery</h2>
      <p>
        Lead times are estimates. We will keep you informed of progress and agree a delivery date with you. See <Link href={routes.shipping}>shipping &amp; returns</Link>.
      </p>

      <h2>5. Cancellations, returns &amp; warranty</h2>
      <p>
        Cancellations, returns and our one-year workmanship warranty are described on our <Link href={routes.shipping}>shipping &amp; returns</Link> page.
      </p>

      <h2>6. Bespoke commissions</h2>
      <p>Commissions are governed by the drawing and quotation you approve, which may set out separate payment stages.</p>

      <h2>7. Contact</h2>
      <p>
        {site.legalName}, {site.address.slice(1).join(", ")} · <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </InfoPage>
  );
}
