import type { Metadata } from "next";
import InfoPage from "@/components/ui/InfoPage";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

/* TODO(client): draft wording — review against the DPDP Act 2023 before launch */
export default function PrivacyPage() {
  return (
    <InfoPage title="PRIVACY." current={routes.privacy} updated="November 2026" intro="We collect only what we need to make and deliver your furniture, and we never sell your data.">
      <h2>What we collect</h2>
      <ul>
        <li>Your name, email, phone number and delivery address when you order, enquire or create an account.</li>
        <li>Your order history, so you can view orders and download invoices.</li>
        <li>Payment confirmations from our payment partner. We never see or store your full card details.</li>
        <li>Your cart and wishlist, stored in your browser so they are there when you return.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To make, deliver and support your order, and to issue GST invoices.</li>
        <li>To reply to your enquiries and plan workshop visits.</li>
        <li>To send our occasional newsletter, only if you have subscribed. Every email has an unsubscribe link.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        Only with the service providers who help us run the business — our payment partner, delivery partners and email provider — and only as far as they need it. We may
        disclose information where required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the personal data we hold about you at any time by writing to <a href={`mailto:${site.email}`}>{site.email}</a>. We keep order
        records for as long as tax law requires.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.slice(1).join(", ")}.
      </p>
    </InfoPage>
  );
}
