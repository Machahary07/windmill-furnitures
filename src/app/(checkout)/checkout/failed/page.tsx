import type { Metadata } from "next";
import Link from "next/link";
import { body, displayHeading, primaryButton, redLink, shell } from "@/components/ui/styles";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Payment not completed" };

/* Razorpay's failure / dismiss callback lands here; the cart is untouched */
export default function PaymentFailedPage() {
  return (
    <div className={`${shell} py-24 max-md:py-14`}>
      <h1 className={displayHeading}>NOT QUITE.</h1>
      <p className={`${body} mt-6 max-w-[620px] text-gray-body`}>
        Your payment didn’t go through and you have not been charged. Your cart and delivery details are saved — you can try again or choose another payment method.
      </p>
      <p className="mt-4 max-w-[620px] font-jakarta text-sm leading-6 text-gray-nav">
        If money left your account, it is usually returned by your bank within 5–7 working days. Contact us with the time of the attempt and we’ll help.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-10">
        <Link href={routes.payment} className={primaryButton}>
          Try again
        </Link>
        <Link href={routes.contact("order")} className={redLink}>
          Contact the studio
        </Link>
      </div>
    </div>
  );
}
