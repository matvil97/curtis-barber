import { salon } from "@/data/site";
import { PhoneIcon } from "./ui/Icons";

/** Barre d'actions fixe en bas, uniquement sous 720px. */
export function MobileBar() {
  return (
    <div className="fixed right-3 bottom-3 left-3 z-30 flex gap-2 rounded-full border border-line bg-white/90 p-1.5 shadow-[0_12px_30px_-10px_rgb(18_16_20/0.35)] backdrop-blur-[12px] md:hidden">
      <a
        href={`tel:${salon.phoneE164}`}
        aria-label={`Appeler le salon au ${salon.phoneDisplay}`}
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink"
      >
        <PhoneIcon />
      </a>
      <a
        href={salon.planityUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-violet font-bold text-white no-underline"
      >
        Réserver ma coupe
      </a>
    </div>
  );
}
