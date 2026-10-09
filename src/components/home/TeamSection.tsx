import Image from "next/image";
import placeholder from "../../../public/images/team-placeholder.jpg";

type Member = { name: string; role: string };

/* TODO: replace with real names, roles and photos */
const leads: Member[] = Array.from({ length: 3 }, () => ({ name: "Lorem ipsum", role: "Lorem ipsum" }));
const members: Member[] = Array.from({ length: 12 }, () => ({ name: "Lorem ipsum", role: "Lorem ipsum" }));

export default function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-[1440px] px-[4.1%] pb-[94px] max-md:px-5">
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

      <div className="mt-[22px] flex max-lg:flex-col max-lg:gap-12">
        {/* leads */}
        <ul className="w-[364px] shrink-0 space-y-[34px] border-r border-[#e6e6e6] pt-[4px] pb-[18px] max-lg:w-full max-lg:border-r-0 max-lg:grid max-lg:grid-cols-3 max-lg:space-y-0 max-lg:gap-6 max-sm:grid-cols-1">
          {leads.map((m, i) => (
            <li key={i} className="flex gap-4">
              <Image src={placeholder} alt="" className="h-[173px] w-[157px] object-cover" />
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
            <li key={i}>
              <Image src={placeholder} alt="" className="h-[121px] w-[106px] object-cover" />
              <p className="mt-2.5 font-jakarta text-[11px] leading-tight font-bold text-ink">{m.name}</p>
              <p className="font-jakarta text-[11px] leading-tight text-gray-nav">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
