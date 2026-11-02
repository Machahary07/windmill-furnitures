import type { Order } from "@/lib/store/account";

/* Kept out of data.ts so client components can import it without pulling
   the sample data (and the catalog) into the browser bundle. */
export type OrderStatus = Order["status"];
export const statusOrder: OrderStatus[] = ["confirmed", "in-production", "dispatched", "delivered"];
