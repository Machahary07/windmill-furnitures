import Link from "next/link";
import EnquiryStatusControl from "@/components/admin/EnquiryStatusControl";
import { AdminHeader, Empty, FilterTabs, button, card, dateTime } from "@/components/admin/ui";
import { ChevronIcon } from "@/components/ui/icons";
import { enquiries, enquiryTopics, listEnquiries, type EnquiryStatus } from "@/lib/admin/data";
import { getProduct } from "@/lib/products";
import { adminRoutes, routes } from "@/lib/routes";

export const metadata = { title: "Enquiries" };

const statuses: { id: EnquiryStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "replied", label: "Replied" },
  { id: "closed", label: "Closed" },
];

export default async function EnquiriesPage({ searchParams }: PageProps<"/admin/enquiries">) {
  const sp = await searchParams;
  const status = statuses.some((s) => s.id === sp.status) ? (sp.status as EnquiryStatus) : undefined;
  const list = listEnquiries(status);
  const selected = enquiries.find((e) => e.id === sp.id) ?? (sp.id ? undefined : list[0]);
  const explicit = typeof sp.id === "string";
  const piece = selected?.ref ? getProduct(selected.ref) : undefined;

  return (
    <>
      <AdminHeader title="Enquiries" description="Messages from the contact, bespoke and bulk-order forms." />

      <div className={`${card} grid min-h-[560px] grid-cols-[360px_1fr] overflow-hidden max-lg:grid-cols-1`}>
        {/* list — on small screens hidden while a message is open */}
        <div className={`border-r border-[#f0f0f0] max-lg:border-r-0 ${explicit ? "max-lg:hidden" : ""}`}>
          <div className="border-b border-[#f0f0f0] p-3">
            <FilterTabs
              tabs={[
                { label: "All", href: adminRoutes.enquiries(), active: !status, count: enquiries.length },
                ...statuses.map((s) => ({ label: s.label, href: adminRoutes.enquiries({ status: s.id }), active: status === s.id, count: enquiries.filter((e) => e.status === s.id).length })),
              ]}
            />
          </div>
          {list.length ? (
            <ul className="divide-y divide-[#f0f0f0]">
              {list.map((e) => (
                <li key={e.id}>
                  <Link prefetch={false}
                    href={adminRoutes.enquiries({ status, id: e.id })}
                    aria-current={selected?.id === e.id ? "true" : undefined}
                    className="block px-4 py-3.5 transition-colors hover:bg-[#fafaf8] aria-[current=true]:bg-[#f4f4f1]"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={`truncate font-jakarta text-[13px] text-ink ${e.status === "new" ? "font-bold" : "font-semibold"}`}>{e.name}</span>
                      <span className="shrink-0 font-jakarta text-[11px] text-gray-nav">{dateTime(e.receivedAt)}</span>
                    </span>
                    <span className="mt-1 flex items-center gap-2 font-jakarta text-[12px] text-gray-nav">
                      {e.status === "new" && <span aria-label="Unread" className="size-1.5 rounded-full bg-red" />}
                      {enquiryTopics[e.topic]}
                    </span>
                    <span className="mt-1 line-clamp-2 block font-jakarta text-[13px] leading-5 text-gray-body">{e.message}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="Nothing here">No enquiries with this status.</Empty>
          )}
        </div>

        {/* message */}
        <div className={explicit ? "" : "max-lg:hidden"}>
          {selected ? (
            <article className="p-6 max-md:p-5">
              <Link prefetch={false} href={adminRoutes.enquiries({ status })} className="mb-4 inline-flex items-center gap-2 font-jakarta text-[13px] font-semibold text-gray-nav hover:text-ink lg:hidden">
                <ChevronIcon dir="left" size={9} /> All enquiries
              </Link>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-jakarta text-[12px] font-semibold tracking-[0.08em] text-gray-nav uppercase">
                    {enquiryTopics[selected.topic]} · {selected.id}
                  </p>
                  <h2 className="mt-1 font-jakarta text-xl font-bold text-ink">{selected.name}</h2>
                  <p className="mt-1 font-jakarta text-[13px] text-gray-body">
                    <a href={`mailto:${selected.email}`} className="hover:text-ink">
                      {selected.email}
                    </a>
                    {selected.phone && (
                      <>
                        {" · "}
                        <a href={`tel:${selected.phone.replace(/\s/g, "")}`} className="hover:text-ink">
                          {selected.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <p className="mt-2 font-jakarta text-[12px] text-gray-nav">Received {dateTime(selected.receivedAt)}</p>
              <div className="mt-4">
                <EnquiryStatusControl key={selected.id} status={selected.status} />
              </div>

              {piece && (
                <Link href={routes.product(piece.slug)} target="_blank" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f6f6f3] px-3 py-2 font-jakarta text-[13px] font-semibold text-ink hover:bg-[#efefeb]">
                  About: {piece.name}
                </Link>
              )}

              <p className="mt-6 max-w-[640px] font-jakarta text-[15px] leading-7 whitespace-pre-line text-ink">{selected.message}</p>

              <div className="mt-8 border-t border-[#f0f0f0] pt-6">
                <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: your ${enquiryTopics[selected.topic].toLowerCase()} enquiry`)}`} className={button}>
                  Reply by email
                </a>
              </div>
            </article>
          ) : (
            <Empty title="Select an enquiry">Choose a message from the list.</Empty>
          )}
        </div>
      </div>
    </>
  );
}
