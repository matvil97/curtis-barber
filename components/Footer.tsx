import Link from "next/link";
import { navLinks, salon } from "@/data/site";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-paper px-4 pt-16 pb-[120px] sm:px-7 md:pb-14">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-8 text-sm">
          <p className="m-0 max-w-[320px] text-ink-soft">
            {salon.street}, {salon.postalCode} {salon.city}
            <br />
            <a href={`tel:${salon.phoneE164}`} className="cb-link inline-flex min-h-11 items-center font-semibold text-ink no-underline">
              {salon.phoneDisplay}
            </a>
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 p-0">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="cb-link inline-flex min-h-11 items-center font-semibold text-ink no-underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Signature décorative en contour (SVG : s'adapte à la largeur, masquée aux lecteurs d'écran). */}
        <svg aria-hidden="true" viewBox="0 0 1200 190" className="w-full overflow-visible">
          <text
            x="0"
            y="160"
            textLength="1200"
            lengthAdjust="spacingAndGlyphs"
            fill="none"
            stroke="rgb(109 40 217 / 0.45)"
            strokeWidth="1.5"
            fontSize="200"
          >
            <tspan fontFamily="var(--font-syne), sans-serif" fontWeight="800" letterSpacing="-10">
              Curtis{" "}
            </tspan>
            <tspan fontFamily="var(--font-instrument-serif), serif" fontStyle="italic">
              barber
            </tspan>
          </text>
        </svg>
        <div className="flex flex-wrap justify-between gap-3 text-sm text-taupe">
          <p className="m-0">
            © {salon.copyrightYear} {salon.name} · Lyon 6e
          </p>
          <p className="m-0">
            <Link href="/mentions-legales" className="cb-link inline-flex min-h-11 items-center text-taupe no-underline">
              Mentions légales
            </Link>
            {" · "}Site réalisé par Codeo by M
          </p>
        </div>
      </div>
    </footer>
  );
}
