import PreviewForm from "@/components/admin/PreviewForm";
import SwatchList from "@/components/admin/SwatchList";
import { AdminHeader, Card } from "@/components/admin/ui";
import { upholstery, woodTypes } from "@/lib/products";

export const metadata = { title: "Woods & fabrics" };

export default function MaterialsPage() {
  return (
    <>
      <AdminHeader title="Woods & fabrics" description="The options customers choose on every product page. Changes apply across the whole catalog." />
      <PreviewForm>
        <div className="space-y-4">
          <Card title={`Woods (${woodTypes.length})`}>
            <SwatchList name="woods" swatches={woodTypes} addLabel="Add a wood" />
          </Card>
          <Card title={`Upholstery (${upholstery.length})`}>
            <SwatchList name="fabrics" swatches={upholstery} addLabel="Add a fabric" />
          </Card>
        </div>
      </PreviewForm>
    </>
  );
}
