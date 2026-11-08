import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Syne } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { rating, salon, schedule } from "@/data/site";
import "./globals.css";

// Association « Fashion Forward » (UI/UX Pro Max) : Syne pour les titres, Manrope pour le texte.
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const description =
  "Barbershop au 39 rue Molière, Lyon 6e (Brotteaux). Coupes, tapers, barbe, locks et tresses, dès 10 €. Ouvert du mardi au samedi. Note 4,9/5 sur Planity, réservation en ligne 24h/24.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Curtis Barber — Barbershop Lyon 6e",
  description,
  keywords: ["barbershop Lyon", "barber Lyon 6", "coiffeur homme Lyon 6e", "dégradé", "taper", "locks Lyon", "tresses", "Brotteaux"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Curtis Barber",
    title: "Curtis Barber — Barbershop Lyon 6e",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Curtis Barber — Barbershop Lyon 6e",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
};

const dayIds = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** 13.5 → "13:30" */
const pad = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${siteUrl}/#salon`,
  name: salon.name,
  description,
  url: siteUrl,
  telephone: salon.phoneE164,
  image: `${siteUrl}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: salon.street,
    postalCode: salon.postalCode,
    addressLocality: salon.city,
    addressRegion: "Auvergne-Rhône-Alpes",
    addressCountry: "FR",
  },
  hasMap: salon.mapsUrl,
  priceRange: "10 € – 200 €",
  openingHoursSpecification: schedule.flatMap((d) =>
    d.slots.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayIds[d.day]}`,
      opens: pad(opens),
      closes: pad(closes),
    })),
  ),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: rating.value.replace(",", "."),
    reviewCount: rating.count,
    bestRating: 5,
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: salon.planityUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${syne.variable} ${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
