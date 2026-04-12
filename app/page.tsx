import Hero from "@/components/home/Hero";
import CharacterSection from "@/components/home/CharacterSection";
import Impact from "@/components/home/Impact";
import SelectedWork from "@/components/home/SelectedWork";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CharacterSection />
      <Impact />
      <SelectedWork />
      <Contact />
      <Footer />
    </>
  );
}
