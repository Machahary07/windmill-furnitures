const steps = ["Wood Selection", "Carpentry & Joinery", "Grinding & Sanding", "Polishing"];

const bodyClass = "font-jakarta text-lg leading-[30px] font-normal text-ink max-md:text-base max-md:leading-[26px]";

export default function FurnitureSection() {
  return (
    <section id="furniture">
      <div className="mx-auto max-w-[1440px] px-[2.5%] max-md:px-5">
        <h2 className="text-center font-jakarta text-[55px] leading-none font-bold tracking-[-0.01em] text-black max-md:text-[38px]">
          OUR FURNITURE
        </h2>
        <div className={`mt-[58px] space-y-6 ${bodyClass}`}>
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
      </div>

      {/* Process: first step is dark by default; hovering any step moves the highlight */}
      <ol className="group/steps mt-[63px] grid grid-cols-4 max-md:grid-cols-1">
        {steps.map((step, i) => (
          <li
            key={step}
            tabIndex={0}
            className={`flex h-[800px] flex-col justify-between px-12 pt-[38px] pb-[56px] transition-colors duration-300 outline-none max-lg:h-[560px] max-lg:px-6 max-md:h-[260px] max-md:pb-8 ${
              i > 0 ? "border-l border-ink max-md:border-t max-md:border-l-0" : ""
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
            <h3 className="font-jakarta text-[45px] leading-[1.2] font-medium max-lg:text-[32px]">{step}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}
