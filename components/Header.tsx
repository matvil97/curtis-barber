import { navLinks, salon } from "@/data/site";
import { BarberPole } from "./BarberPole";
import { OpenStatus } from "./OpenStatus";
import { PillLink } from "./ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-paper/80 backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-7">
        <a
          href="#accueil"
          className="inline-flex min-h-11 items-center gap-3 text-ink no-underline"
          aria-label="Curtis Barber, retour en haut de page"
        >
          <BarberPole />
          <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.03em] sm:text-[24px]">
            Curtis
            <span className="font-italic-serif text-[22px] text-violet sm:text-[24px]"> barber</span>
          </span>
        </a>

        <nav aria-label="Navigation principale" className="flex items-center gap-5 text-[15px] font-semibold lg:gap-8">
          <ul className="m-0 hidden list-none gap-7 p-0 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="cb-link inline-flex min-h-11 items-center text-ink-soft no-underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Masqué sur tablette (720–1024px) pour laisser la place aux liens. */}
          <span className="md:hidden lg:block">
            <OpenStatus />
          </span>
          {/* Sous 720px, la barre fixe du bas prend le relais. */}
          <span className="hidden md:block">
            <PillLink href={salon.planityUrl} variant="ink" size="md">
              Réserver
            </PillLink>
          </span>
        </nav>
      </div>
    </header>
  );
}
