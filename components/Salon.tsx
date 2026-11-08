import Image from "next/image";
import { salon, salonPhotos } from "@/data/site";
import { PillLink } from "./ui/Button";
import { InstagramIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Accent, SectionHeading } from "./ui/SectionHeading";

/** Le salon : les photos dans des arches, comme le mur de miroirs. */
export function Salon() {
  return (
    <section id="salon" aria-labelledby="salon-title" className="relative overflow-hidden bg-cream py-20 text-ink md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.14),transparent)]"
      />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 px-4 sm:px-7">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" eyebrow="Le salon" id="salon-title">
            Entre, <Accent>installe-toi.</Accent>
          </SectionHeading>
          <p className="m-0 max-w-[420px] text-[17px] leading-relaxed text-ink-soft">
            Miroirs en arche, fauteuils noirs, canapé bouclé et l&apos;enseigne violette au mur : un lieu moderne et
            chaleureux, au cœur des Brotteaux.
          </p>
        </Reveal>

        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-3">
          {salonPhotos.map((photo, i) => (
            <Reveal as="li" key={photo.src} delay={i * 0.1} className={i === 1 ? "sm:translate-y-10" : undefined}>
              <figure className="cb-zoom m-0 flex flex-col gap-4">
                <div className="cb-halo arch">
                  <div className="cb-halo-ring arch relative aspect-[3/4] overflow-hidden bg-sand">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 92vw, 30vw" className="object-cover" />
                  </div>
                </div>
                <figcaption className="flex items-center justify-between text-sm font-semibold text-ink-soft">
                  <span>{photo.caption}</span>
                  <span aria-hidden="true" className="font-display text-violet">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="flex justify-center pt-6 sm:pt-12">
          <PillLink href={salon.instagramUrl} variant="ink" size="md" arrow={false} icon={<InstagramIcon />}>
            Voir les coupes sur Instagram
          </PillLink>
        </div>
      </div>
    </section>
  );
}
