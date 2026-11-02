import { NextResponse } from "next/server";
import { getProductByCode } from "@/lib/products";
import { routes } from "@/lib/routes";

/* Short product links printed on tags, invoices and drawings:
   /p/WM-SE-01 → 308 → /products/library-easy-chair (case-insensitive) */
export async function GET(request: Request, ctx: RouteContext<"/p/[code]">) {
  const { code } = await ctx.params;
  const product = getProductByCode(code);
  const target = product ? routes.product(product.slug) : routes.search(code);
  return NextResponse.redirect(new URL(target, request.url), product ? 308 : 307);
}
