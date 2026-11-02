import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "./session";

export async function isAdmin() {
  return (await cookies()).get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
}
