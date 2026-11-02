import Link from "next/link";
import { PlusIcon } from "@/components/admin/icons";
import { AdminHeader, button, card } from "@/components/admin/ui";
import Photo from "@/components/ui/Photo";
import { projects } from "@/lib/projects";
import { adminRoutes } from "@/lib/routes";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <AdminHeader
        title="Projects"
        description="Homes, workplaces and hotels furnished by the studio."
        actions={
          <Link href={adminRoutes.project("new")} className={button}>
            <PlusIcon size={16} /> New project
          </Link>
        }
      />
      <ul className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={adminRoutes.project(p.slug)} className={`${card} group block overflow-hidden transition-colors hover:border-[#d6d6d6]`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f6f3]">
                <Photo src={p.images[0]} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-4">
                <p className="font-jakarta text-[15px] font-bold text-ink">{p.title}</p>
                <p className="mt-0.5 font-jakarta text-[12px] text-gray-nav">
                  {p.kind} · {p.images.length} photos · {p.pieces.length} pieces
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
