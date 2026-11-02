import Link from "next/link";
import Form from "next/form";
import CsvButton from "@/components/admin/CsvButton";
import { AdminHeader, Empty, card, field, ghostButton, shortDate, tableRow, td, th } from "@/components/admin/ui";
import { customers } from "@/lib/admin/data";
import { formatPrice } from "@/lib/money";
import { adminRoutes } from "@/lib/routes";

export const metadata = { title: "Customers" };

export default async function CustomersPage({ searchParams }: PageProps<"/admin/customers">) {
  const { q } = await searchParams;
  const needle = typeof q === "string" ? q.trim().toLowerCase() : "";
  const list = needle ? customers.filter((c) => [c.name, c.email, c.city, c.state, c.phone].join(" ").toLowerCase().includes(needle)) : customers;

  return (
    <>
      <AdminHeader
        title="Customers"
        description={`${customers.length} people have ordered from the site.`}
        actions={
          <CsvButton
            filename="windmill-customers.csv"
            rows={[["Name", "Email", "Phone", "City", "State", "Orders", "Spent (INR)", "Last order"], ...customers.map((c) => [c.name, c.email, c.phone, c.city, c.state, c.orders, c.spent, shortDate(c.lastOrder)])]}
          />
        }
      />

      <div className={card}>
        <Form action={adminRoutes.customers()} role="search" className="flex gap-2 border-b border-[#f0f0f0] p-3">
          <label htmlFor="customer-search" className="sr-only">
            Search customers
          </label>
          <input id="customer-search" name="q" defaultValue={typeof q === "string" ? q : undefined} placeholder="Name, email, phone or city" className={`${field} max-w-[340px]`} />
          <button type="submit" className={ghostButton}>
            Search
          </button>
        </Form>

        {list.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Customer</th>
                <th className={`${th} max-md:hidden`}>Location</th>
                <th className={`${th} text-right max-sm:hidden`}>Orders</th>
                <th className={`${th} text-right`}>Spent</th>
                <th className={`${th} max-lg:hidden`}>Last order</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.email} className={`${tableRow} relative`}>
                  <td className={td}>
                    <Link prefetch={false} href={adminRoutes.orders({ q: c.email })} className="font-semibold after:absolute after:inset-0 hover:underline">
                      {c.name}
                    </Link>
                    <span className="block text-[12px] break-all text-gray-nav">{c.email}</span>
                  </td>
                  <td className={`${td} text-gray-body max-md:hidden`}>
                    {c.city}, {c.state}
                  </td>
                  <td className={`${td} text-right max-sm:hidden`}>{c.orders}</td>
                  <td className={`${td} text-right font-semibold whitespace-nowrap`}>{formatPrice(c.spent)}</td>
                  <td className={`${td} text-gray-nav max-lg:hidden`}>{shortDate(c.lastOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty title="No customers match">Try a name, email or city.</Empty>
        )}
      </div>
    </>
  );
}
