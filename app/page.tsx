import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Infos } from "@/components/Infos";
import { MobileBar } from "@/components/MobileBar";
import { Reviews } from "@/components/Reviews";
import { Salon } from "@/components/Salon";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { TopBanner } from "@/components/TopBanner";
import { WordMarquee } from "@/components/WordMarquee";

export default function Home() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-50 rounded-full bg-violet px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <TopBanner />
      <Header />
      <main id="contenu">
        <Hero />
        <WordMarquee />
        <Services />
        <Salon />
        <Team />
        <Reviews />
        <Infos />
      </main>
      <Footer />
      <MobileBar />
      <Chatbot />
    </>
  );
}
