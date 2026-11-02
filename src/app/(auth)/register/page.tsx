import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import LoginForm from "@/components/LoginForm";
import { routes, safeNext } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false },
};

export default async function Register({ searchParams }: PageProps<"/register">) {
  const next = safeNext((await searchParams).next);
  return (
    <AuthShell title="Join Windmill" subtitle="Track orders, save addresses and keep your wishlist">
      <OAuthButtons verb="Sign up" />
      <LoginForm mode="register" next={next} />
      <p className="mt-[22px] font-jakarta text-xs font-medium text-gray-nav">
        Already have an account?{" "}
        <Link href={routes.login(next === routes.account ? undefined : next)} className="text-base font-bold text-ink">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
