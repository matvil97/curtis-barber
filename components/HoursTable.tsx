"use client";

import { useEffect, useState } from "react";
import { schedule } from "@/data/site";
import { formatSlots, parisNow } from "@/lib/hours";

/** Tableau des horaires, avec le jour courant (heure de Paris) mis en avant. */
export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  // S'abonne à l'horloge : le jour surligné change aussi à minuit.
  useEffect(() => {
    const update = () => setToday(parisNow().day);
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <table className="w-full border-collapse text-[15px]">
      <caption className="sr-only">Horaires d&apos;ouverture</caption>
      <tbody>
        {schedule.map((d) => {
          const isToday = d.day === today;
          return (
            <tr key={d.day} className={isToday ? "bg-white font-bold" : undefined} aria-current={isToday ? "date" : undefined}>
              <th scope="row" className="rounded-l-xl py-2 pr-3 pl-3 text-left font-semibold">
                {d.label}
                {isToday && <span className="ml-2 rounded-full bg-violet px-2 py-0.5 text-[11px] font-bold text-white uppercase">Aujourd&apos;hui</span>}
              </th>
              <td className={`rounded-r-xl py-2 pr-3 text-right whitespace-nowrap ${d.slots.length ? "" : "text-taupe"}`}>
                {d.slots.length
                  ? d.slots.map((slot) => (
                      <span key={slot[0]} className="block">
                        {formatSlots([slot])}
                      </span>
                    ))
                  : "Fermé"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
