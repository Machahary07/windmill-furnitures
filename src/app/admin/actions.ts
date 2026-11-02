"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminRoutes, safeNext } from "@/lib/routes";
import { ADMIN_COOKIE, ADMIN_TOKEN, PREVIEW_PASSWORD } from "@/lib/admin/session";

export type AdminLoginState = { error?: string };

export async function adminLogin(_prev: AdminLoginState, data: FormData): Promise<AdminLoginState> {
  if (data.get("password") !== PREVIEW_PASSWORD) return { error: "That password isn’t right." };
  (await cookies()).set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  const next = safeNext(data.get("next")?.toString(), adminRoutes.home);
  redirect(next.startsWith("/admin") ? next : adminRoutes.home);
}

export async function adminLogout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect(adminRoutes.login());
}
