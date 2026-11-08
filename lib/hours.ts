import { schedule } from "@/data/site";

/** Jour (0-6) et heure décimale actuels à Paris, quel que soit le fuseau du visiteur. */
export function parisNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, time: Number(get("hour")) + Number(get("minute")) / 60 };
}

/** 13.5 → "13h30", 10 → "10h" */
export function formatHour(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return mm ? `${hh}h${String(mm).padStart(2, "0")}` : `${hh}h`;
}

export function formatSlots(slots: [number, number][]) {
  return slots.length ? slots.map(([a, b]) => `${formatHour(a)} – ${formatHour(b)}`).join(" · ") : "Fermé";
}

const slotsFor = (day: number) => schedule.find((d) => d.day === day)?.slots ?? [];
const labelFor = (day: number) => schedule.find((d) => d.day === day)?.label.toLowerCase() ?? "";

export type OpenState = { open: boolean; label: string; closesSoon?: boolean };

export function getOpenState(date = new Date()): OpenState {
  const { day, time } = parisNow(date);
  const today = slotsFor(day);

  const current = today.find(([a, b]) => time >= a && time < b);
  if (current) {
    const left = current[1] - time;
    return left <= 0.5
      ? { open: true, closesSoon: true, label: `Ouvert · ferme à ${formatHour(current[1])}` }
      : { open: true, label: "Ouvert maintenant" };
  }

  // Prochain créneau aujourd'hui (avant l'ouverture ou pendant la pause).
  const later = today.find(([a]) => a > time);
  if (later) return { open: false, label: `Fermé · rouvre à ${formatHour(later[0])}` };

  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7;
    const slots = slotsFor(next);
    if (slots.length) {
      const when = offset === 1 ? "demain" : labelFor(next);
      return { open: false, label: `Fermé · ouvre ${when} à ${formatHour(slots[0][0])}` };
    }
  }
  return { open: false, label: "Fermé" };
}
