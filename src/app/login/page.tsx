import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";
import loginArt from "../../../public/images/login-art.jpg";

export const metadata: Metadata = {
  title: "Sign in",
};

const oauthClass =
  "flex h-14 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-border bg-white font-jakarta text-[15px] font-semibold text-ink";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left: form panel */}
      <section className="flex w-[50.6%] flex-col items-center px-12 pt-9 pb-7 max-[860px]:w-full max-[860px]:px-6 max-[860px]:pt-7 max-[860px]:pb-6">
        <Logo />

        <main className="my-auto w-full max-w-[544px] text-center">
          <h1 className="font-jakarta text-[54px] font-bold tracking-[-0.01em] text-ink max-[860px]:text-[38px]">
            Welcome back!
          </h1>
          <p className="mt-3.5 font-jakarta text-lg font-medium text-gray-nav">
            Enter your credentials to access your account
          </p>

          <div className="mt-[42px] flex gap-3.5 max-[860px]:flex-col">
            <Link href="/soon" className={oauthClass}>
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>Sign in with Google</span>
            </Link>
            <Link href="/soon" className={oauthClass}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#000000" d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span>Sign in with Apple</span>
            </Link>
          </div>

          <div className="mt-[30px] mb-[26px] flex items-center gap-4 text-[15px] text-gray-nav before:h-px before:flex-1 before:bg-[#ececec] after:h-px after:flex-1 after:bg-[#ececec]">
            <span>or</span>
          </div>

          <LoginForm />

          <p className="mt-[22px] font-jakarta text-xs font-medium text-gray-nav">
            Don&apos;t have an account?{" "}
            <Link href="/soon" className="text-base font-bold text-ink">
              Sign up
            </Link>
          </p>
        </main>

        <footer className="flex gap-[52px]">
          {["Help", "Terms", "Privacy"].map((label) => (
            <Link key={label} href="/soon" className="text-sm font-medium text-footer">
              {label}
            </Link>
          ))}
        </footer>
      </section>

      {/* Right: artwork panel */}
      <section
        aria-label="Courtyard architecture photograph"
        className="relative w-[49.4%] bg-[#f2f1ec] max-[860px]:hidden"
      >
        <Image
          src={loginArt}
          alt=""
          fill
          preload
          sizes="50vw"
          placeholder="blur"
          className="object-cover"
        />
      </section>
    </div>
  );
}
