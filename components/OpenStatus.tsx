"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";

/** Voyant ouvert / fermé, recalculé chaque minute (heure de Paris, pause du midi comprise). */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const tone = state === null ? "text-sand" : state.open ? "text-open" : "text-closed";

  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-ink-soft ${className}`}>
      <span aria-hidden="true" className={`size-2 shrink-0 rounded-full bg-current ${tone} ${state?.open ? "cb-dot-open" : ""}`} />
      {/* Réserve la place avant l'hydratation pour éviter tout décalage. */}
      <span className={state ? "" : "invisible"}>{state?.label ?? "Fermé · ouvre à 10h"}</span>
    </span>
  );
}
