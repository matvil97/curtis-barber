"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Délai en secondes (pour décaler les éléments d'une même section). */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Apparition au scroll : fondu + translateY(28px). */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
