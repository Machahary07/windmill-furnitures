import ChipList from "@/components/admin/ChipList";
import PreviewForm from "@/components/admin/PreviewForm";
import { AdminHeader, Card, Field, area, field } from "@/components/admin/ui";
import { indianStates, site } from "@/lib/site";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <AdminHeader title="Settings" description="Studio details, tax and delivery rules used across the site, checkout and invoices." />
      <PreviewForm saveLabel="Save settings">
        <div className="grid grid-cols-2 items-start gap-4 max-lg:grid-cols-1">
          <Card title="Studio">
            <div className="space-y-4">
              <Field label="Studio email" htmlFor="email" hint="Enquiries and order alerts go here.">
                <input id="email" name="email" type="email" defaultValue={site.email} className={field} />
              </Field>
              <Field label="Address" htmlFor="address" hint="One line per row — printed on invoices and the contact page.">
                <textarea id="address" name="address" defaultValue={site.address.join("\n")} className={`${area} min-h-[110px]`} />
              </Field>
              <Field label="Opening hours" htmlFor="hours">
                <input id="hours" name="hours" defaultValue={site.hours} className={field} />
              </Field>
            </div>
          </Card>

          <div className="space-y-4">
            <Card title="Tax">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <Field label="GSTIN" htmlFor="gstin" hint="Printed on every invoice." className="col-span-2 max-sm:col-span-1">
                  <input id="gstin" name="gstin" defaultValue={site.gstin} placeholder="07ABCDE1234F1Z5" pattern="[0-9A-Z]{15}" className={`${field} uppercase`} />
                </Field>
                <Field label="GST rate (%)" htmlFor="gstRate">
                  <input id="gstRate" name="gstRate" type="number" min={0} max={28} defaultValue={site.gstRate * 100} className={field} />
                </Field>
                <Field label="Home state" htmlFor="gstState" hint="Same state: CGST + SGST. Others: IGST.">
                  <select id="gstState" name="gstState" defaultValue={site.gstState} className={`${field} cursor-pointer`}>
                    {indianStates.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </Card>

            <Card title="Delivery & orders">
              <div className="space-y-5">
                <div>
                  <p className="mb-2.5 font-jakarta text-[13px] font-semibold text-ink">Free delivery to</p>
                  <ChipList name="freeDeliveryStates" items={[...site.freeDeliveryStates]} options={indianStates} placeholder="Add a state" />
                </div>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <Field label="Delivery elsewhere (₹)" htmlFor="deliveryCharge" hint="Flat charge per order.">
                    <input id="deliveryCharge" name="deliveryCharge" type="number" min={0} step={500} defaultValue={site.deliveryCharge} className={field} />
                  </Field>
                  <Field label="Bulk order from" htmlFor="bulkOrderQty" hint="Pieces — larger orders go through the studio.">
                    <input id="bulkOrderQty" name="bulkOrderQty" type="number" min={2} defaultValue={site.bulkOrderQty} className={field} />
                  </Field>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PreviewForm>
    </>
  );
}
