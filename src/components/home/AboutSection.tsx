import Image from "next/image";
import aboutStudio from "../../../public/images/about-studio.jpg";
import globe from "../../../public/images/globe.png";

const bodyClass = "font-jakarta text-lg leading-[30px] font-normal text-ink max-md:text-base max-md:leading-[26px]";
const headingClass =
  "font-jakarta text-[55px] leading-none font-bold tracking-[-0.01em] text-black max-md:text-[38px]";

export default function AboutSection() {
  return (
    <>
      <section id="about" className="mx-auto max-w-[1440px] px-[18.3%] pt-[84px] pb-[66px] max-lg:px-8 max-md:px-5 max-md:pt-14">
        <h2 className={headingClass}>ABOUT US.</h2>
        <div className={`mt-[42px] space-y-6 ${bodyClass}`}>
          <p>
            Founded in 1991 by one of India&rsquo;s most iconic architects and urban designers,
            late Mr. Pradeep Sachdeva, Windmill Furniture, has fine-tuned the fastidious focus and
            custom craft that goes behind the business of bespoke furniture. With over 35 years
            creating custom furniture, our reputation precedes us! Across the board, our pieces
            have come to be associated with demonstrable durability, angular elegance and a
            timeless aesthetic.
          </p>
          <p>
            Founding premiere architecture studio Pradeep Sachdeva Design Associates (PSDA) shortly
            after in 1990, his vision for urban living employed the use of design as an effective
            backdrop to daily life. Drawing upon indigenous inspiration and the rediscovery of
            roots, our furniture is informed by the influences around us. Today, both the studio
            and workshop share a space in Aya Nagar while also serving as the perfect incubation
            hub for new ideas at Windmill Furniture.
          </p>
        </div>
      </section>

      {/* tint band starts ~46% down the photo and runs behind the Sustainability heading */}
      <div className="bg-[linear-gradient(to_bottom,transparent_46%,#f3f7f4_46%)]">
        <div className="mx-auto max-w-[1440px] px-[3.54%] max-md:px-5">
          <div className="relative aspect-[1337/564] w-full overflow-hidden max-md:aspect-[4/3]">
            <Image
              src={aboutStudio}
              alt="The Windmill studio and workshop in Aya Nagar, covered in greenery"
              fill
              sizes="(max-width: 1440px) 93vw, 1337px"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <section id="sustainability" className="relative overflow-hidden">
        <div className="bg-[#f3f7f4]">
          <div className="mx-auto max-w-[1440px] px-[3.54%] pt-[66px] pb-[32px] max-md:px-5 max-md:pt-10">
            <h2 className={headingClass}>Sustainability</h2>
          </div>
        </div>
        <div className="relative mx-auto max-w-[1440px] px-[3.54%] pt-[32px] pb-[120px] max-md:px-5 max-md:pb-16">
          <Image
            src={globe}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-[108px] right-[4.2%] w-[275px] max-lg:w-[200px] max-md:hidden"
          />
          <div className={`max-w-[860px] space-y-6 ${bodyClass}`}>
            <p>
              At our workshop in India, we breathe new life into reclaimed wood&mdash;from old
              homes, railway sleepers, and heritage structures&mdash;while thoughtfully integrating
              carefully selected new timber. This balanced approach transforms both into
              heirloom-quality furniture through mindful craftsmanship. Every piece is handcrafted
              with traditional joinery and modern design, celebrating the unique grain, history,
              and character of each wood.
            </p>
            <p>
              In every join and finish, we honour the heart and soul of past
              workmanship&mdash;layer upon layer of skilled hands that came before. We add our own
              quiet care, preserving old stories while giving new wood its own enduring voice. What
              emerges is a living continuation of India&rsquo;s craft legacy, carried forward with
              respect and quiet pride.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
