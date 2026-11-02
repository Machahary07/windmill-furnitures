import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center bg-[#fafaf8] px-5 py-10">
      <div className="w-full max-w-[380px]">
        <p className="text-center font-jakarta text-[26px] font-bold text-logo">Windmill</p>
        <div className="mt-8 rounded-2xl border border-[#ececec] bg-white p-8 max-sm:p-6">
          <h1 className="font-jakarta text-xl font-bold text-ink">Studio admin</h1>
          <p className="mt-1.5 font-jakarta text-[13px] text-gray-nav">Sign in to manage orders, products and enquiries.</p>
          <AdminLoginForm next={typeof next === "string" ? next : undefined} />
        </div>
      </div>
    </main>
  );
}
