import CsvButton from "@/components/admin/CsvButton";
import { AdminHeader, card, shortDate, tableRow, td, th } from "@/components/admin/ui";
import { subscribers } from "@/lib/admin/data";

export const metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <>
      <AdminHeader
        title="Newsletter"
        description={`${subscribers.length} subscribers from the footer form and checkout.`}
        actions={<CsvButton filename="windmill-newsletter.csv" rows={[["Email", "Source", "Joined"], ...subscribers.map((s) => [s.email, s.source, shortDate(s.joinedAt)])]} />}
      />
      <div className={card}>
        <table className="w-full">
          <thead>
            <tr>
              <th className={th}>Email</th>
              <th className={`${th} max-sm:hidden`}>Signed up from</th>
              <th className={th}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.email} className={tableRow}>
                <td className={`${td} font-semibold break-all`}>{s.email}</td>
                <td className={`${td} text-gray-body max-sm:hidden`}>{s.source}</td>
                <td className={`${td} whitespace-nowrap text-gray-nav`}>{shortDate(s.joinedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
