import PreviewForm from "@/components/admin/PreviewForm";
import TeamList from "@/components/admin/TeamList";
import { AdminHeader, Card, Field, area, field } from "@/components/admin/ui";
import { founder, leads, members } from "@/lib/team";

export const metadata = { title: "Team" };

export default function TeamAdminPage() {
  return (
    <>
      <AdminHeader title="Team" description="Shown on the home page and the Team page, in this order." />
      <PreviewForm>
        <div className="space-y-4">
          <Card title="Founder">
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Name" htmlFor="founder-name">
                <input id="founder-name" name="founder.name" defaultValue={founder.name} className={field} />
              </Field>
              <Field label="Line under the name" htmlFor="founder-role">
                <input id="founder-role" name="founder.role" defaultValue={founder.role} className={field} />
              </Field>
              <Field label="Bio" htmlFor="founder-bio" className="col-span-2 max-sm:col-span-1">
                <textarea id="founder-bio" name="founder.bio" defaultValue={founder.bio} className={area} />
              </Field>
            </div>
          </Card>
          <Card title={`Leads (${leads.length})`}>
            <TeamList name="leads" members={leads} placeholderImage={leads[0].image} />
          </Card>
          <Card title={`Workshop & studio (${members.length})`}>
            <TeamList name="members" members={members} placeholderImage={members[0].image} />
          </Card>
        </div>
      </PreviewForm>
    </>
  );
}
