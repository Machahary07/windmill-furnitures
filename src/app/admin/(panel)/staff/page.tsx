import PreviewForm from "@/components/admin/PreviewForm";
import ToastForm from "@/components/admin/ToastForm";
import { AdminHeader, Card, Field, card, dateTime, field, ghostButton, tableRow, td, th } from "@/components/admin/ui";
import { staff, staffRoles, type StaffRole } from "@/lib/admin/data";

export const metadata = { title: "Staff" };

const roleIds = Object.keys(staffRoles) as StaffRole[];

export default function StaffPage() {
  return (
    <>
      <AdminHeader title="Staff" description="Who can sign in to this admin, and what each person can change." />

      <PreviewForm saveLabel="Save roles" className="mb-4">
        <div className={card}>
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Person</th>
                <th className={th}>Role</th>
                <th className={`${th} max-md:hidden`}>Last active</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.email} className={tableRow}>
                  <td className={td}>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="block text-[12px] break-all text-gray-nav">{s.email}</span>
                  </td>
                  <td className={td}>
                    <label htmlFor={`role-${s.email}`} className="sr-only">
                      Role for {s.name}
                    </label>
                    <select id={`role-${s.email}`} name={`role.${s.email}`} defaultValue={s.role} className={`${field} h-9 max-w-[160px] cursor-pointer`}>
                      {roleIds.map((r) => (
                        <option key={r} value={r}>
                          {staffRoles[r].label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={`${td} text-gray-nav max-md:hidden`}>{dateTime(s.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PreviewForm>

      <div className="grid grid-cols-2 gap-4 pb-24 max-lg:grid-cols-1">
        <Card title="Invite someone">
          <ToastForm message="Invite sent — preview only">
            <div className="space-y-4">
              <Field label="Email" htmlFor="invite-email">
                <input id="invite-email" name="email" type="email" required placeholder="name@windmillfurnitures.com" className={field} />
              </Field>
              <Field label="Role" htmlFor="invite-role">
                <select id="invite-role" name="role" defaultValue="orders" className={`${field} cursor-pointer`}>
                  {roleIds.map((r) => (
                    <option key={r} value={r}>
                      {staffRoles[r].label} — {staffRoles[r].detail}
                    </option>
                  ))}
                </select>
              </Field>
              <button type="submit" className={ghostButton}>
                Send invite
              </button>
            </div>
          </ToastForm>
        </Card>
        <Card title="Roles">
          <dl className="space-y-3">
            {roleIds.map((r) => (
              <div key={r}>
                <dt className="font-jakarta text-[13px] font-semibold text-ink">{staffRoles[r].label}</dt>
                <dd className="font-jakarta text-[13px] text-gray-nav">{staffRoles[r].detail}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </>
  );
}
