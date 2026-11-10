/**
 * Toutes les données éditables du site Curtis Barber.
 *
 * Source : fiche Planity du salon (relevée le 8 novembre 2026).
 * Photos : fichiers dans /public/images, référencés ci-dessous.
 */

export const salon = {
  name: "Curtis Barber",
  tagline: "Barbershop · Lyon 6e · Brotteaux",
  street: "39 rue Molière",
  postalCode: "69006",
  city: "Lyon",
  district: "Quartier Brotteaux, Lyon 6e",
  phoneDisplay: "09 83 22 21 50",
  phoneE164: "+33983222150",
  planityUrl: "https://www.planity.com/curtis-barber-69006-lyon",
  /** Remplacer par l'URL du compte Instagram du salon. */
  instagramUrl: "https://www.instagram.com",
  mapsUrl: "https://maps.google.com/?q=39+rue+Moliere+69006+Lyon",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=39%20rue%20Moli%C3%A8re%2C%2069006%20Lyon&z=16&output=embed",
  copyrightYear: 2026,
} as const;

export const rating = {
  value: "4,9",
  count: 54,
  criteria: [
    { label: "Accueil", value: 4.9 },
    { label: "Propreté", value: 4.9 },
    { label: "Cadre & ambiance", value: 4.9 },
    { label: "Qualité de la prestation", value: 4.9 },
  ],
} as const;

/** Règles affichées sur Planity. */
export const policies = [
  "Réservation en ligne 24h/24",
  "Paiement sur place",
  "Confirmation immédiate",
  "Au-delà de 10 min de retard, le rendez-vous peut être annulé",
];

/**
 * Horaires (fuseau Europe/Paris). Jours : 0 = dimanche … 6 = samedi.
 * Chaque créneau est [ouverture, fermeture] en heures décimales.
 */
export const schedule: { day: number; label: string; slots: [number, number][] }[] = [
  { day: 1, label: "Lundi", slots: [] },
  { day: 2, label: "Mardi", slots: [[10, 19]] },
  { day: 3, label: "Mercredi", slots: [[10, 19]] },
  { day: 4, label: "Jeudi", slots: [[10, 19]] },
  { day: 5, label: "Vendredi", slots: [[10, 13.5], [14.5, 19]] },
  { day: 6, label: "Samedi", slots: [[10, 13.5], [14.5, 19]] },
  { day: 0, label: "Dimanche", slots: [] },
];

export const topBannerItems = [
  "Réservation en ligne 24h/24",
  "39 rue Molière · Lyon 6e",
  "Mardi → samedi · 10h – 19h",
  "Paiement sur place",
  "Coupes · barbe · locks · tresses",
];

export const heroWords = ["le taper", "le dégradé", "les locks", "les tresses", "la barbe", "les vanilles"];

export const marqueeWords = ["Taper", "Dégradé", "Locks", "Barrel twist", "Fulani", "Contours", "Retwist", "Barbe"];

export type Service = {
  name: string;
  description?: string;
  duration: string;
  /** Prix affiché (ex. "23 €" ou "100 – 150 €"). */
  price: string;
  /** Prix minimum, pour le « dès … » de la catégorie et le chatbot. */
  from: number;
};

export type ServiceCategory = {
  id: string;
  label: string;
  /** Mots-clés reconnus par le chatbot. */
  keywords: string[];
  services: Service[];
};

const s = (name: string, duration: string, price: string, from: number, description?: string): Service => ({
  name,
  duration,
  price,
  from,
  description,
});

export const serviceCategories: ServiceCategory[] = [
  {
    id: "coupe",
    label: "Coupes",
    keywords: ["coupe", "coupes", "degrade", "taper", "cheveux", "enfant", "zero", "design", "contour"],
    services: [
      s("Coupe simple (Dégradé/taper…)", "35 min", "23 €", 23, "Coupe simple à la tondeuse avec finitions (contours, nuque, tempes)."),
      s("Coupe simple avec restructuration (mi-longs)", "45 min", "25 €", 25, "Travail de longueur aux ciseaux sur mesure, pour un rendu naturel, texturisé et stylé."),
      s("Coupe + barbe", "45 min", "30 €", 30, "Coupe sur mesure (dégradé et/ou structuration) + barbe travaillée avec lignes nettes."),
      s("Coupe transformation", "45 min", "30 €", 30, "Changement de coupe important (long à court ou nouveau style), avec barbe travaillée."),
      s("Coupe + design simple", "40 min", "25 €", 25, "Une coupe + motif, trait ou dessin réalisé à la tondeuse ou à la lame."),
      s("Boule à zéro", "15 min", "15 €", 15),
      s("Contours renforcés", "15 min", "15 €", 15),
      s("Boule à zéro et barbe", "30 min", "20 €", 20),
      s("Coupe enfant 6-14 ans", "35 min", "18 €", 18),
      s("Design simple", "10 min", "10 €", 10),
    ],
  },
  {
    id: "barbe",
    label: "Barbe",
    keywords: ["barbe", "rasage", "serviette"],
    services: [
      s("Barbe classique", "15 min", "15 €", 15, "Taille de barbe avec mise en forme et contour précis."),
      s("Soins barbe", "20 min", "18 €", 18, "Taille, structuration, serviette chaude et contours précis."),
      s("Contours + barbe", "30 min", "20 €", 20),
    ],
  },
  {
    id: "locks",
    label: "Locks",
    keywords: ["locks", "loc", "locs", "dreads", "retwist", "crochet", "decapage", "demelage"],
    services: [
      s("Départ de locks (vanille, tresses ou twists)", "2h 30", "85 €", 85, "Création de vos locks à partir de vos cheveux naturels, selon la méthode de votre choix."),
      s("Départ de locks au crochet (sur devis)", "4h 30", "100 – 150 €", 100, "Locks instantanées au crochet, rendu net et structuré dès la première séance."),
      s("Départ de locks avec extensions", "4h", "150 – 200 €", 150, "Extensions pour obtenir immédiatement longueur et volume."),
      s("Retwist simple", "1h 30", "60 €", 60, "Entretien des racines pour des locks propres et bien définies."),
      s("Retwist avec coiffure sur mesure", "3h", "60 – 120 €", 60, "Retwist accompagné d'un modèle sur mesure (tresses, bantu knots…)."),
      s("Reprise au crochet avec coiffure", "2h 30", "90 €", 90, "Entretien en profondeur au crochet, avec coiffure au choix."),
      s("Reprise au crochet sans coiffure", "2h 30", "80 €", 80, "Entretien en profondeur au crochet pour resserrer et renforcer la structure."),
      s("Décapage locks", "30 min", "60 €", 60, "Nettoyage en profondeur pour purifier le cuir chevelu et alléger les locks."),
      s("Retwist + vanille", "2h", "70 €", 70),
      s("Retwist + chignon pétale", "3h", "90 €", 90),
      s("Retwist + barrel", "2h", "80 €", 80),
      s("Retwist + Fulani", "2h", "60 €", 60),
      s("Rattachement de locks au crochet (sur devis)", "4h 30", "100 – 150 €", 100),
      s("Démêlage cheveux", "30 min", "50 €", 50),
    ],
  },
  {
    id: "tresses",
    label: "Tresses",
    keywords: ["tresse", "tresses", "nattes", "twist", "twists", "barrel", "coils", "cornrow"],
    services: [
      s("Barrel twist", "2h", "65 €", 65, "Twists en relief (ne convient pas pour un départ de locks)."),
      s("Flat twists", "2h", "60 €", 60, "Twists plaquées sur le cuir chevelu pour un rendu élégant."),
      s("Finger coils", "2h", "60 – 70 €", 60, "Boucles définies au doigt ou au peigne, rendu naturel et brillant."),
      s("Nattes collées simples", "1h 30", "50 €", 50, "Tresses plaquées classiques, de 2 à 10."),
      s("Nattes collées avec motifs", "2h", "60 €", 60, "Tresses plaquées avec designs personnalisés."),
      s("Nattes collées simples avec rajouts", "2h 30", "60 – 80 €", 60, "Mèches ajoutées pour plus de longueur et de volume."),
      s("Nattes collées avec motifs + rajouts", "3h", "70 – 90 €", 70, "Coiffure artistique avec mèches, résultat long et volumineux."),
      s("Tresses enfants 6 à 12 ans", "2h", "30 – 50 €", 30),
    ],
  },
  {
    id: "vanilles",
    label: "Vanilles & Fulani",
    keywords: ["vanille", "vanilles", "fulani", "rajout", "rajouts"],
    services: [
      s("Vanilles avec rajouts", "3h", "60 – 80 €", 60, "Le salon peut fournir les mèches."),
      s("Vanille sans rajout", "2h", "50 €", 50),
      s("Fulani nattes", "2h", "50 €", 50, "Nattes collées à l'avant, tresses ou vanilles à l'arrière."),
      s("Fulani avec rajouts", "3h", "60 – 80 €", 60, "Le salon peut fournir les mèches."),
      s("Fulani flat twist", "3h", "65 €", 65),
      s("Fulani barrel twist", "3h", "70 €", 70),
    ],
  },
  {
    id: "femme",
    label: "Femme",
    keywords: ["femme", "knotless", "braids", "boho", "french curls", "soft locks", "protectrice"],
    services: [
      s("Fulani vanilles", "4h", "80 – 120 €", 80),
      s("Fulani braids", "4h 20", "80 – 120 €", 80),
      s("French curls", "4h", "80 – 120 €", 80),
      s("Boho vanilles", "5h", "80 – 130 €", 80),
      s("Boho braids", "5h", "80 – 140 €", 80),
      s("Knotless braids", "5h 30", "90 – 150 €", 90),
      s("Knotless vanilles", "5h", "85 – 145 €", 85),
      s("Cornrow", "3h", "60 – 80 €", 60),
      s("Coiffure protectrice", "2h", "50 €", 50),
      s("Soft locks", "4h 30", "90 – 130 €", 90),
    ],
  },
  {
    id: "couleur",
    label: "Coloration",
    keywords: ["coloration", "couleur", "decoloration", "blond", "teinture"],
    services: [
      s("Coloration tête entière", "30 min", "70 €", 70),
      s("Coloration longueur", "30 min", "50 €", 50),
      s("Décoloration", "3h", "90 – 150 €", 90),
    ],
  },
  {
    id: "shampoing",
    label: "Shampoing",
    keywords: ["shampoing", "shampooing", "lavage"],
    services: [
      s("Shampooing cheveux mi-longs", "15 min", "15 €", 15),
      s("Shampooing cheveux courts", "10 min", "10 €", 10),
    ],
  },
];

export const serviceCount = serviceCategories.reduce((n, c) => n + c.services.length, 0);
export const minPrice = Math.min(...serviceCategories.flatMap((c) => c.services.map((x) => x.from)));

export type TeamMember = { name: string; planityName: string; image?: string };

/** Noms tels qu'affichés sur Planity (rubrique « Collaborateurs »). */
export const team: TeamMember[] = [
  { name: "Curtis", planityName: "Curtis Barber" },
  { name: "Joben", planityName: "Jobencuts" },
  { name: "Joao", planityName: "Joao Alves" },
  { name: "Tina", planityName: "TinaDtyss" },
];

/** `src` vide = encart « Photo à venir ». Ex. : "/images/salon-postes.jpg". */
export const salonPhotos: { src: string; alt: string; caption: string; hint: string }[] = [
  { src: "", alt: "Les postes de coupe : fauteuils noirs face aux miroirs en arche éclairés", caption: "Les postes", hint: "Les fauteuils et les miroirs en arche" },
  { src: "", alt: "L'espace d'attente : canapé crème sous l'enseigne néon violette Curtis Barber", caption: "L'accueil", hint: "Le canapé sous l'enseigne néon" },
  { src: "", alt: "Le coin salon avec fauteuil bouclé et enseigne lumineuse", caption: "Le salon", hint: "Le coin salon et l'enseigne lumineuse" },
];

export type Review = { text: string; date: string };

/** Avis clients publiés sur Planity (texte d'origine). */
export const reviews: Review[] = [
  {
    text: "Mon salon préféré, rien à redire sur les coiffures, de + ils sont tous au top ! 20 sur 20",
    date: "30/10/2026",
  },
  {
    text: "Très satisfait de ma coupe chez Curtis Barber ! Taper parfaitement réalisé, bien propre et soigné. Travail sérieux et précis, je recommande à 100 % !",
    date: "07/10/2026",
  },
  {
    text: "J'ai rien à dire c'est Carré Au top franchement super l'accueil et l'équipent le services de qualité je recommande fortement",
    date: "16/09/2026",
  },
  { text: "Parfait, merci beaucoup", date: "11/10/2026" },
];

export const navLinks = [
  { href: "#prestations", label: "Prestations" },
  { href: "#salon", label: "Le salon" },
  { href: "#equipe", label: "L'équipe" },
  { href: "#infos", label: "Accès" },
];
