import Image from "next/image";
import { heroWords, minPrice, rating, salon, salonPhotos, serviceCount } from "@/data/site";
import { RotatingWord } from "./RotatingWord";
import { PillLink } from "./ui/Button";
import { PhoneIcon } from "./ui/Icons";

/** Badge rond qui tourne, texte sur un cercle. */
function RotatingBadge() {
  return (
    <div
      aria-hidden="true"
      className="absolute -bottom-6 -left-4 flex size-[120px] items-center justify-center rounded-full bg-ink text-white shadow-[0_20px_40px_-16px_rgb(18_16_20/0.6)] md:-left-10 md:size-[140px]"
    >
      <svg viewBox="0 0 136 136" className="cb-spin absolute inset-[6px] size-[calc(100%-12px)]">
        <defs>
          <path id="cb-circle" d="M68,68 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <text fill="#FFFFFF" fontFamily="var(--font-manrope), sans-serif" fontSize="12" fontWeight="800" letterSpacing="3.4">
          <textPath href="#cb-circle">BARBERSHOP · LYON 6E · RUE MOLIÈRE · </textPath>
        </text>
      </svg>
      <span className="relative font-italic-serif text-[34px] text-violet-200 md:text-[40px]">C.</span>
    </div>
  );
}

const stats = [
  { value: `${rating.value}`, unit: "/5", label: `${rating.count} avis Planity` },
  { value: String(serviceCount), unit: "", label: "prestations" },
  { value: `dès ${minPrice}`, unit: "€", label: "sur la carte" },
];

export function Hero() {
  const photo = salonPhotos[1];
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Lueur violette d'ambiance, comme l'enseigne du salon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.18),transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-4 pt-10 pb-16 sm:px-7 md:pt-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-8">
          <p className="cb-rise eyebrow inline-flex items-center gap-3 text-taupe">
            <span aria-hidden="true" className="h-px w-9 bg-violet" />
            {salon.tagline}
          </p>

          <h1
            id="hero-title"
            className="m-0 font-display text-[clamp(44px,7vw,100px)] leading-[0.92] font-extrabold tracking-[-0.05em]"
          >
            <span className="cb-rise block whitespace-nowrap [animation-delay:80ms]">Le détail</span>{" "}
            <span className="cb-rise text-outline block whitespace-nowrap [animation-delay:180ms]">qui fait</span>{" "}
            <span className="cb-rise font-italic-serif neon-text block text-[1.02em] leading-[1] [animation-delay:280ms]">
              la différence.
            </span>
          </h1>

          <div className="cb-rise flex flex-col gap-7 [animation-delay:420ms]">
            <p className="m-0 max-w-[520px] text-[18px] leading-relaxed text-ink-soft">
              Ici, on maîtrise <RotatingWord words={heroWords} className="font-bold text-violet" />
              <br />
              Coupes, barbe, locks et tresses dans un salon pensé pour qu&apos;on s&apos;y sente bien. Installe-toi, on
              s&apos;occupe du reste.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href={salon.planityUrl}>Prendre rendez-vous</PillLink>
              <PillLink href={`tel:${salon.phoneE164}`} variant="outline" arrow={false} icon={<PhoneIcon />}>
                Appeler
              </PillLink>
            </div>
          </div>

          <dl className="cb-rise m-0 grid max-w-[560px] grid-cols-3 gap-3 [animation-delay:520ms]">
            {stats.map((st) => (
              <div key={st.label} className="rounded-2xl border border-line bg-white/70 p-4">
                <dt className="sr-only">{st.label}</dt>
                <dd className="m-0 flex flex-col">
                  <span className="font-display text-[clamp(18px,2.4vw,26px)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap">
                    {st.value}
                    <span className="text-violet">{st.unit}</span>
                  </span>
                  <span aria-hidden="true" className="mt-1.5 text-[13px] font-semibold text-taupe">
                    {st.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cb-rise relative mx-auto w-full max-w-[440px] [animation-delay:240ms] lg:mr-0">
          <div className="cb-halo arch">
            <div className="cb-halo-ring arch relative aspect-[4/5] overflow-hidden bg-cream">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                preload
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
          <RotatingBadge />
          <div className="cb-float absolute top-8 -right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-14px_rgb(18_16_20/0.35)] md:-right-8">
            <span className="font-display text-[30px] leading-none font-extrabold tracking-[-0.03em]">
              {rating.value}
            </span>
            <span className="flex flex-col text-[12px] leading-tight font-bold">
              <span aria-hidden="true" className="tracking-[2px] text-violet">
                ★★★★★
              </span>
              <span className="sr-only">sur 5, </span>
              {rating.count} avis Planity
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
