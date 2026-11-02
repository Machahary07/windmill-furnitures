import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false },
};

export default function ForgotPassword() {
  return (
    <AuthShell title="Forgot password?" subtitle="We’ll email you a link to choose a new one">
      <ForgotPasswordForm />
      <p className="mt-[22px] font-jakarta text-xs font-medium text-gray-nav">
        Remembered it?{" "}
        <Link href={routes.login()} className="text-base font-bold text-ink">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
