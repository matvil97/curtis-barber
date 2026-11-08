import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "violet" | "ink" | "outline" | "white";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  violet: "bg-violet text-white shadow-[0_10px_30px_-10px_rgb(109_40_217/0.7)] hover:shadow-[0_14px_36px_-8px_rgb(139_92_246/0.8)]",
  ink: "bg-ink text-white",
  outline: "border-[1.5px] border-ink/15 bg-white/60 text-ink hover:border-ink hover:bg-ink hover:text-white",
  white: "bg-white text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[15px] gap-2",
  lg: "px-7 py-[18px] text-[16px] gap-3",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

/** Bouton pilule (lien) : monte de 2px au survol, la flèche glisse. */
export function PillLink({
  href,
  variant = "violet",
  size = "lg",
  arrow = true,
  icon,
  className = "",
  children,
  ...rest
}: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={`cb-btn inline-flex min-h-11 items-center justify-center rounded-full font-bold whitespace-nowrap no-underline ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon}
      {children}
      {arrow && <ArrowRight size={size === "lg" ? 18 : 16} />}
    </a>
  );
}
