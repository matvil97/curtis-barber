"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/** Charge le minimum de Framer Motion. Animations toujours actives (y compris sur mobile en mode « réduire les animations »). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="never">{children}</MotionConfig>
    </LazyMotion>
  );
}
