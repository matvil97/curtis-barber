"use client";

import { useEffect, useState } from "react";

/** Mot qui change toutes les 2,2s (typographie cinétique). Figé si mouvement réduit. */
export function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className={`inline-block [perspective:600px] ${className}`}>
        <span key={i} className="cb-word">
          {words[i]}
        </span>
      </span>
    </>
  );
}
