import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { redLink } from "@/components/ui/styles";
import { routes } from "@/lib/routes";
import { leads, members } from "@/lib/team";

export default function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-[1440px] px-[4.1%] pb-[94px] max-md:px-5">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex gap-2">
          <span aria-hidden="true" className="mt-[2px] font-jakarta text-2xl leading-none font-semibold">
            &bull;
          </span>
          <div>
            <h2 className="font-jakarta text-2xl leading-none font-bold text-black">Creative Team</h2>
            <p className="mt-2 text-base text-gray-nav">
              The designers, architects and craftspeople behind every Windmill piece.
            </p>
          </div>
        </div>
        <Link href={routes.team} className={redLink}>
          Meet the team
        </Link>
      </div>

      <div className="mt-[22px] flex max-lg:flex-col max-lg:gap-12">
        {/* leads */}
        <ul className="w-[364px] shrink-0 space-y-[34px] border-r border-[#e6e6e6] pt-[4px] pb-[18px] max-lg:w-full max-lg:border-r-0 max-lg:grid max-lg:grid-cols-3 max-lg:space-y-0 max-lg:gap-6 max-sm:grid-cols-1">
          {leads.map((m, i) => (
            <li key={i} data-reveal className="flex gap-4">
              <Photo src={m.image} alt="" sizes="157px" className="h-[173px] w-[157px] object-cover" />
              <div>
                <p className="font-jakarta text-[23px] leading-none font-bold text-ink">{m.name}</p>
                <p className="mt-1 font-jakarta text-sm text-gray-nav">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* wider team */}
        <ul className="grid flex-1 grid-cols-4 gap-y-[52px] pt-[8px] pl-[76px] max-lg:pl-0 max-sm:grid-cols-2">
          {members.map((m, i) => (
            <li key={i} data-reveal>
              <Photo src={m.image} alt="" sizes="106px" className="h-[121px] w-[106px] object-cover" />
              <p className="mt-2.5 font-jakarta text-[11px] leading-tight font-bold text-ink">{m.name}</p>
              <p className="font-jakarta text-[11px] leading-tight text-gray-nav">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
