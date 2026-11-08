import { Fragment } from "react";
import { marqueeWords } from "@/data/site";

function Words() {
  return (
    <div className="flex shrink-0 items-center gap-8 pl-8 md:gap-10 md:pl-10">
      {marqueeWords.map((word, i) => (
        <Fragment key={word}>
          <span className={i % 2 ? "font-italic-serif text-violet-200" : undefined}>{word}</span>
          <span aria-hidden="true" className="text-[0.5em] text-violet-200">
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/** Grand bandeau de mots qui défile (26s), légèrement incliné. */
export function WordMarquee() {
  return (
    <div className="relative z-10 -my-2 overflow-hidden py-6">
      <div className="-mx-4 -rotate-[1.5deg] overflow-hidden bg-violet py-5 whitespace-nowrap text-white shadow-[0_20px_50px_-20px_rgb(109_40_217/0.7)]">
        <p className="sr-only">{marqueeWords.join(", ")}</p>
        <div
          aria-hidden="true"
          className="cb-marquee font-display text-[40px] leading-none font-extrabold tracking-[-0.04em] md:text-[60px]"
          style={{ "--marquee-duration": "26s" } as React.CSSProperties}
        >
          <Words />
          <Words />
        </div>
      </div>
    </div>
  );
}
