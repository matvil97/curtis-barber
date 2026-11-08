import { salon, team } from "@/data/site";
import { ArrowUpRight } from "./ui/Icons";
import { PhotoSlot } from "./ui/PhotoSlot";
import { Reveal } from "./ui/Reveal";
import { Accent, SectionHeading } from "./ui/SectionHeading";

export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-7 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-12">
        <SectionHeading index="03" eyebrow="L'équipe" id="equipe-title">
          Quatre paires <Accent>de mains.</Accent>
        </SectionHeading>
        <p className="m-0 max-w-[380px] text-[17px] text-ink-soft">
          Sur Planity, tu peux choisir avec qui prendre rendez-vous. Chacun a sa patte.
        </p>
      </Reveal>

      <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:gap-6 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal as="li" key={member.name} delay={i * 0.08} className="cb-member">
            <a
              href={salon.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 text-ink no-underline"
            >
              <div className="arch overflow-hidden border border-line bg-white transition-shadow duration-300 group-hover:shadow-[0_0_0_2px_rgb(139_92_246/0.9),0_0_30px_rgb(139_92_246/0.35)]">
                <PhotoSlot
                  src={member.image}
                  alt={`Portrait de ${member.name}`}
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="cb-photo aspect-[3/4] bg-violet-soft"
                  placeholderClassName="cb-ph"
                  placeholder={
                    <svg aria-hidden="true" viewBox="0 0 100 120" className="absolute inset-0 size-full">
                      <text
                        x="50"
                        y="92"
                        textAnchor="middle"
                        fill="#DDD6FE"
                        fontFamily="var(--font-syne), sans-serif"
                        fontWeight="800"
                        fontSize="86"
                      >
                        {member.name[0]}
                      </text>
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5 px-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="m-0 font-display text-[22px] leading-none font-extrabold tracking-[-0.03em] md:text-[26px]">
                    {member.name}
                  </h3>
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-violet">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <p className="m-0 text-sm font-semibold text-taupe">
                  <span className="sr-only">Réserver avec </span>
                  {member.planityName} sur Planity
                </p>
                <span aria-hidden="true" className="cb-line block h-0.5 w-7 bg-violet" />
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
