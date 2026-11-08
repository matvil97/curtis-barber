import { policies, salon } from "@/data/site";
import { HoursTable } from "./HoursTable";
import { OpenStatus } from "./OpenStatus";
import { PillLink } from "./ui/Button";
import { PhoneIcon, PinIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Accent, SectionHeading } from "./ui/SectionHeading";

// Sans couleur de fond : chaque carte choisit la sienne (évite les conflits de classes).
const card = "rounded-[28px] border border-line p-6 sm:p-7";
const label = "m-0 text-xs font-extrabold tracking-[0.16em] text-taupe uppercase";

/** Infos & accès en bento : adresse, horaires, contact, règles, carte. */
export function Infos() {
  return (
    <section id="infos" aria-labelledby="infos-title" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-7 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10">
        <SectionHeading index="05" eyebrow="Infos & accès" id="infos-title">
          Passe <Accent>au salon.</Accent>
        </SectionHeading>
        <OpenStatus className="rounded-full border border-line bg-white px-4 py-2.5 text-[14px]" />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className={`${card} flex flex-col justify-between gap-6 bg-white lg:col-span-4`}>
          <div className="flex flex-col gap-2">
            <h3 className={label}>Adresse</h3>
            <address className="text-[22px] leading-snug font-bold not-italic">
              {salon.street}
              <br />
              {salon.postalCode} {salon.city}
            </address>
            <p className="m-0 text-sm text-taupe">{salon.district}</p>
          </div>
          <PillLink href={salon.mapsUrl} variant="outline" size="md" icon={<PinIcon />} className="self-start">
            Itinéraire
          </PillLink>
        </Reveal>

        <Reveal delay={0.06} className={`${card} bg-cream lg:col-span-4 lg:row-span-2`}>
          <h3 className={`${label} mb-3`}>Horaires</h3>
          <HoursTable />
        </Reveal>

        <Reveal delay={0.12} className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-line bg-sand lg:col-span-4 lg:row-span-2">
          <iframe
            title="Carte Google Maps : Curtis Barber, 39 rue Molière, 69006 Lyon"
            src={salon.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 [filter:grayscale(0.4)_contrast(1.05)]"
          />
        </Reveal>

        <Reveal delay={0.06} className={`${card} flex flex-col justify-between gap-5 border-violet bg-violet text-white lg:col-span-4`}>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-xs font-extrabold tracking-[0.16em] text-violet-soft uppercase">Réserver</h3>
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[15px] font-semibold text-violet-soft">
              {policies.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true">✦</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <PillLink href={salon.planityUrl} variant="white" size="md">
              Planity
            </PillLink>
            <PillLink
              href={`tel:${salon.phoneE164}`}
              variant="outline"
              size="md"
              arrow={false}
              icon={<PhoneIcon size={16} />}
              className="!border-white/40 !bg-transparent !text-white hover:!bg-white hover:!text-ink"
            >
              {salon.phoneDisplay}
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
