import type { Metadata } from "next";
import Link from "next/link";
import { salon } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales — Curtis Barber",
  alternates: { canonical: "/mentions-legales" },
};

const h2 = "mt-10 mb-3 font-display text-3xl font-extrabold tracking-[-0.04em]";

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-[760px] px-4 py-16 sm:px-7">
      <Link href="/" className="cb-link inline-flex min-h-11 items-center font-bold text-violet no-underline">
        ← Retour au site
      </Link>
      <h1 className="mt-6 font-display text-[clamp(48px,8vw,88px)] font-extrabold tracking-[-0.04em] leading-[0.9]">
        Mentions <span className="font-italic-serif text-violet">légales</span>
      </h1>

      <h2 className={h2}>Éditeur du site</h2>
      <p className="text-ink-soft">
        {salon.name} — [Forme juridique, capital]
        <br />
        {salon.street}, {salon.postalCode} {salon.city}
        <br />
        Téléphone : {salon.phoneDisplay}
        <br />
        SIRET : [À compléter]
        <br />
        Directeur de la publication : [À compléter]
      </p>

      <h2 className={h2}>Hébergement</h2>
      <p className="text-ink-soft">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>

      <h2 className={h2}>Conception</h2>
      <p className="text-ink-soft">Site réalisé par Codeo by M.</p>

      <h2 className={h2}>Données personnelles</h2>
      <p className="text-ink-soft">
        Ce site ne collecte aucune donnée personnelle et ne dépose pas de cookie de mesure d&apos;audience. Les
        réservations sont gérées par Planity, et la carte par Google Maps, selon leurs propres politiques de
        confidentialité.
      </p>
    </main>
  );
}
