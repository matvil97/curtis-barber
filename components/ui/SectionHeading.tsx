import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  children: ReactNode;
  id?: string;
  tone?: "light" | "dark";
};

/** Titre de section : numéro + sur-titre, puis grand titre Syne. */
export function SectionHeading({ index, eyebrow, children, id, tone = "light" }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-violet-200" : "text-taupe"}`}>
        <span className={`font-display text-sm tracking-normal ${tone === "dark" ? "text-white" : "text-violet"}`}>
          {index}
        </span>
        <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-white/40" : "bg-ink/25"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="m-0 font-display text-[clamp(40px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.035em]"
      >
        {children}
      </h2>
    </div>
  );
}

/** Mot mis en valeur en Instrument Serif italique. */
export function Accent({ children, className = "text-violet" }: { children: ReactNode; className?: string }) {
  return <span className={`font-italic-serif ${className}`}>{children}</span>;
}
