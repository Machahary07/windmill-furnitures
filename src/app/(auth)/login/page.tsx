import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import LoginForm from "@/components/LoginForm";
import { routes, safeNext } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default async function Login({ searchParams }: PageProps<"/login">) {
  const next = safeNext((await searchParams).next);
  return (
    <AuthShell title="Welcome back!" subtitle="Enter your credentials to access your account">
      <OAuthButtons />
      <LoginForm next={next} />
      <p className="mt-[22px] font-jakarta text-xs font-medium text-gray-nav">
        Don&apos;t have an account?{" "}
        <Link href={routes.register(next === routes.account ? undefined : next)} className="text-base font-bold text-ink">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
