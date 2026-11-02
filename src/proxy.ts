import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "@/lib/admin/session";

/* Optimistic admin gate: bounce signed-out visitors to /admin/login before any
   admin page renders. The panel layout checks the cookie again server-side. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const signedIn = request.cookies.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
  const onLogin = pathname === "/admin/login";

  if (!signedIn && !onLogin) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }
  if (signedIn && onLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
