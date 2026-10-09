import { redirect } from "next/navigation";

/* no product listing page yet — open the featured product */
export default function ProductIndex() {
  redirect("/product/library-easy-chair");
}
