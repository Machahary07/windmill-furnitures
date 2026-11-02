/* Bordered numbered columns in the style of the home "Process" band
   (rule + number on top, title and copy below), without the hover fill.
   Phones: a swipeable row. Tablets: two columns. Desktop: one row of equal
   columns — never a sideways scroll on a large screen. */
export default function NumberedSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="flex snap-x snap-mandatory overflow-x-auto border-y border-ink [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:border-b-0 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          className={`flex min-h-[300px] w-[78vw] shrink-0 snap-start flex-col justify-between gap-10 border-ink px-8 pt-[30px] pb-10 max-lg:px-5 md:w-auto md:border-b md:even:border-l lg:not-first:border-l ${
            i > 0 ? "max-md:border-l" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span aria-hidden="true" className="h-px w-[30px] bg-current" />
            <span className="font-jakarta text-[25px] font-medium">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="font-jakarta text-[28px] leading-[1.2] font-medium text-ink max-lg:text-2xl">{step.title}</h3>
            <p className="mt-4 font-jakarta text-sm leading-6 text-gray-body">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
