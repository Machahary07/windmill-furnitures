import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { routes } from "@/lib/routes";
import { redLink } from "@/components/ui/styles";

const steps = [
  { title: "Wood Selection", image: "/images/craft/dowels.jpg", alt: "Planed timber showing its grain" },
  { title: "Carpentry & Joinery", image: "/images/craft/chisel.jpg", alt: "A carpenter paring a joint with a chisel" },
  { title: "Grinding & Sanding", image: "/images/craft/sawdust.jpg", alt: "Sawdust caught in a beam of light" },
  { title: "Polishing", image: "/images/craft/armrest.jpg", alt: "The polished curve of a finished armrest" },
];

const bodyClass = "font-jakarta text-lg leading-[30px] font-normal text-ink max-md:text-base max-md:leading-[26px]";

export default function FurnitureSection() {
  return (
    <section id="furniture">
      <div className="mx-auto max-w-[1440px] px-[2.5%] max-md:px-5">
        <h2 data-reveal="split" className="text-center font-jakarta text-[55px] leading-none font-bold tracking-[-0.01em] text-black max-md:text-[38px]">
          OUR FURNITURE
        </h2>
        <div data-reveal className={`mt-[58px] space-y-6 ${bodyClass}`}>
          <p>
            Our furniture is customised to meet the high expectation of our clientele, each piece is
            designed and handcrafted at our workshop in Aya Nagar. Preserving and perfecting age-old
            carpentry and craft techniques, each of our unique pieces are built to last a lifetime.
            While other furniture makers offer readymade, assembly-line products, we believe that
            the furniture in your home should reflect your personality, and be designed to meet your
            specific requirements. Our furniture is well-made and durable at affordable prices. A
            testament to this fact is that most of our customers return to order.
          </p>
          <p>
            In every join and finish, we honour the heart and soul of past workmanship&mdash;layer
            upon layer of skilled hands that came before. We add our own quiet care, preserving old
            stories while giving new wood its own enduring voice. What emerges is a living
            continuation of India&rsquo;s craft legacy, carried forward with respect and quiet pride.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-10">
          <Link href={routes.bespoke()} className={redLink}>
            Commission a piece
          </Link>
          <Link href={routes.projects} className={redLink}>
            See our projects
          </Link>
        </div>
      </div>

      {/* Process: first step is dark (and its photo in colour) by default; hovering
          or focusing any step moves the highlight. Phones get a swipeable row. */}
      <ol className="group/steps mt-[63px] grid grid-cols-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:no-scrollbar">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            tabIndex={0}
            className={`group/step flex h-[800px] flex-col justify-between gap-10 px-12 pt-[38px] pb-[56px] transition-colors duration-300 outline-none max-lg:h-[620px] max-lg:px-6 max-md:h-[500px] max-md:w-[78vw] max-md:shrink-0 max-md:snap-start max-md:gap-6 max-md:px-5 max-md:pb-8 ${
              i > 0 ? "border-l border-ink" : ""
            } ${
              i === 0
                ? "bg-[#161c22] text-white group-hover/steps:bg-white group-hover/steps:text-ink hover:bg-[#161c22]! hover:text-white! focus-visible:bg-[#161c22]! focus-visible:text-white!"
                : "bg-white text-ink hover:bg-[#161c22] hover:text-white focus-visible:bg-[#161c22] focus-visible:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span aria-hidden="true" className="h-px w-[30px] bg-current" />
              <span className="font-jakarta text-[25px] font-medium">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Photo
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 768px) 78vw, 25vw"
                className={`object-cover transition-[filter,opacity,scale] duration-500 ease-out max-md:opacity-100! max-md:grayscale-0! ${
                  i === 0
                    ? "group-hover/steps:opacity-70 group-hover/steps:grayscale group-hover/step:scale-[1.03] group-hover/step:opacity-100! group-hover/step:grayscale-0! group-focus-visible/step:opacity-100! group-focus-visible/step:grayscale-0!"
                    : "opacity-70 grayscale group-hover/step:scale-[1.03] group-hover/step:opacity-100 group-hover/step:grayscale-0 group-focus-visible/step:opacity-100 group-focus-visible/step:grayscale-0"
                }`}
              />
            </div>
            {/* always two lines tall so every photo above gets the same height */}
            <h3 className="flex min-h-[2.4em] items-end font-jakarta text-[45px] leading-[1.2] font-medium max-lg:text-[32px] max-md:text-[28px]">{step.title}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}
