import { rating, reviews, salon, type Review } from "@/data/site";
import { PillLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Accent, SectionHeading } from "./ui/SectionHeading";

function ReviewCard({ review, hidden }: { review: Review; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="ml-4 flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-[26px] border border-line bg-white p-7 whitespace-normal sm:w-[380px]"
    >
      <span aria-hidden="true" className="h-6 font-serif text-[64px] leading-[0.6] text-violet">
        “
      </span>
      <blockquote className="m-0 font-serif text-[22px] leading-[1.3] text-ink">{review.text}</blockquote>
      <p className="m-0 flex items-center justify-between text-sm font-semibold text-taupe">
        <span>Avis Planity</span>
        <span>{review.date}</span>
      </p>
    </li>
  );
}

/** Avis : note détaillée en bento + carrousel continu (pause au survol). */
export function Reviews() {
  return (
    <section aria-labelledby="avis-title" className="overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-7">
        <Reveal className="pb-10">
          <SectionHeading index="04" eyebrow="Avis clients" id="avis-title">
            Ils en parlent <Accent>mieux.</Accent>
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-4 pb-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <div className="flex flex-col justify-between gap-6 rounded-[28px] bg-violet p-7 text-white">
            <p className="m-0 text-sm font-bold tracking-[0.16em] text-violet-soft uppercase">Note Planity</p>
            <p className="m-0 font-display text-[96px] leading-[0.85] font-extrabold tracking-[-0.06em]">
              {rating.value}
              <span className="text-[40px] text-violet-200">/5</span>
            </p>
            <p className="m-0 font-semibold text-violet-soft">{rating.count} clients ont donné leur avis</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {rating.criteria.map((c) => (
              <div key={c.label} className="flex flex-col justify-between gap-5 rounded-[28px] border border-line bg-white p-6">
                <p className="m-0 flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-ink-soft">{c.label}</span>
                  <span className="font-display text-[28px] font-extrabold tracking-[-0.03em]">
                    {c.value.toLocaleString("fr-FR")}
                  </span>
                </p>
                <div
                  role="meter"
                  aria-label={c.label}
                  aria-valuemin={0}
                  aria-valuemax={5}
                  aria-valuenow={c.value}
                  className="h-2 overflow-hidden rounded-full bg-violet-soft"
                >
                  <div className="h-full rounded-full bg-violet" style={{ width: `${(c.value / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="cb-marquee-pausable whitespace-nowrap">
        <ul className="cb-marquee m-0 list-none p-0" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {/* Contenu dupliqué pour une boucle sans couture ; le doublon est masqué aux lecteurs d'écran. */}
          {[...reviews, ...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} hidden={i >= reviews.length} />
          ))}
        </ul>
      </Reveal>

      <div className="flex justify-center px-4 pt-10">
        <PillLink href={salon.planityUrl} variant="outline" size="md">
          Lire tous les avis sur Planity
        </PillLink>
      </div>
    </section>
  );
}
