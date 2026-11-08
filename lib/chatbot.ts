import { policies, rating, salon, schedule, serviceCategories, serviceCount, team, type Service } from "@/data/site";
import { formatSlots, getOpenState } from "./hours";

/**
 * Assistant de démonstration : réponses à base de mots-clés, calculées
 * à partir de data/site.ts. Aucune IA ni service externe.
 */

export type BotLink = { label: string; href: string };
export type BotReply = { text: string; links?: BotLink[]; services?: Service[] };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9€ ]/g, " ");

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

const book: BotLink = { label: "Réserver sur Planity", href: salon.planityUrl };
const call: BotLink = { label: `Appeler le ${salon.phoneDisplay}`, href: `tel:${salon.phoneE164}` };

export const quickReplies = ["Vos horaires ?", "Prix d'une coupe", "Vous faites les locks ?", "Où êtes-vous ?", "Réserver"];

export const greeting: BotReply = {
  text: "Salut ! Je suis l'assistant de Curtis Barber. Pose-moi une question sur les horaires, les prix, les prestations ou l'accès au salon.",
};

/** Cherche des prestations dont le nom contient les mots de la question. */
function findServices(q: string): Service[] {
  const words = q.split(" ").filter((w) => w.length > 3);
  if (!words.length) return [];
  return serviceCategories
    .flatMap((c) => c.services)
    .filter((sv) => {
      const name = normalize(sv.name);
      return words.some((w) => name.includes(w));
    })
    .slice(0, 5);
}

export function answer(input: string): BotReply {
  const q = normalize(input);

  if (!q.trim()) return greeting;

  if (has(q, ["bonjour", "salut", "hello", "yo ", "coucou", "bonsoir"]) && q.split(" ").length <= 3) {
    return { text: "Salut ! Que veux-tu savoir : horaires, prix, prestations, accès ?" };
  }

  const asksDay = schedule.find((d) => q.includes(normalize(d.label)));
  if (asksDay && has(q, ["ouvert", "ferme", "ouvre", "horaire", "heure", "travaill", "dispo", "quand"])) {
    return {
      text: asksDay.slots.length
        ? `Oui, le ${asksDay.label.toLowerCase()} : ${formatSlots(asksDay.slots)}.`
        : `Non, le salon est fermé le ${asksDay.label.toLowerCase()}.`,
      links: [book],
    };
  }

  if (has(q, ["horaire", "heure", "ouvert", "ferme", "ouvre", "quand", "dimanche", "lundi", "samedi", "pause"])) {
    const state = getOpenState();
    const lines = schedule.map((d) => `${d.label} : ${formatSlots(d.slots)}`).join("\n");
    return { text: `${state.label}.\n\n${lines}`, links: [book] };
  }

  if (has(q, ["adresse", "ou etes", "ou se trouve", "c est ou", "ou c est", "ou est", "acces", "venir", "itineraire", "metro", "situe", "plan", "quartier"])) {
    return {
      text: `On est au ${salon.street}, ${salon.postalCode} ${salon.city} (${salon.district}).`,
      links: [{ label: "Itinéraire Google Maps", href: salon.mapsUrl }],
    };
  }

  if (has(q, ["telephone", "appeler", "numero", "contact", "joindre"])) {
    return { text: `Tu peux nous appeler au ${salon.phoneDisplay}.`, links: [call] };
  }

  if (has(q, ["retard", "annul", "en retard"])) {
    return { text: "Par respect pour l'organisation, au-delà de 10 minutes de retard le rendez-vous peut être annulé. Préviens-nous par téléphone si besoin.", links: [call] };
  }

  if (has(q, ["paie", "payer", "carte", "espece", "cb "])) {
    return { text: "Le paiement se fait sur place, au salon." };
  }

  // « Curtis » est exclu : il apparaît dans le nom du salon.
  const memberNames = team.map((m) => normalize(m.name)).filter((n) => n !== "curtis");
  if (has(q, ["equipe", "coiffeur", "coiffeuse", "avec qui", "qui coupe", "qui sont", "qui travaille", ...memberNames])) {
    return {
      text: `L'équipe : ${team.map((m) => m.name).join(", ")}. Sur Planity, tu peux choisir avec qui prendre rendez-vous.`,
      links: [book],
    };
  }

  if (has(q, ["note", "avis", "client"])) {
    return { text: `${rating.value}/5 sur ${rating.count} avis Planity. Accueil, propreté, ambiance et qualité : tout est à 4,9.` };
  }

  // Une catégorie précise (locks, barbe, tresses…) ?
  const category = serviceCategories.find((c) => has(q, c.keywords));
  const wantsPrice = has(q, ["prix", "tarif", "combien", "cout", "€", "euro", "cher"]);

  if (category && !wantsPrice) {
    const matched = findServices(q);
    const list = matched.length ? matched : category.services.slice(0, 5);
    return {
      text: `Oui ! ${category.label} : ${category.services.length} prestations, dès ${Math.min(...category.services.map((x) => x.from))} €. Quelques exemples :`,
      services: list,
      links: [book],
    };
  }

  if (wantsPrice || category) {
    const matched = findServices(q);
    if (matched.length) return { text: "Voici les tarifs correspondants :", services: matched, links: [book] };
    if (category) return { text: `Tarifs ${category.label.toLowerCase()} :`, services: category.services.slice(0, 5), links: [book] };
    return {
      text: `Une coupe simple (dégradé/taper) est à 23 €, une coupe + barbe à 30 €. On a ${serviceCount} prestations en tout : dis-moi laquelle t'intéresse (barbe, locks, tresses…).`,
      links: [{ label: "Voir toutes les prestations", href: "#prestations" }],
    };
  }

  if (has(q, ["reserv", "rdv", "rendez", "dispo", "creneau", "prendre"])) {
    return { text: `La réservation se fait en ligne sur Planity, 24h/24, avec ${policies[2].toLowerCase()}.`, links: [book] };
  }

  const matched = findServices(q);
  if (matched.length) return { text: "J'ai trouvé ces prestations :", services: matched, links: [book] };

  return {
    text: "Je n'ai pas compris, désolé. Je peux répondre sur les horaires, les prix, les prestations, l'adresse ou la réservation. Sinon, le plus simple est d'appeler le salon.",
    links: [call],
  };
}
