import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import About from "@/components/home/CharacterSection";
import Experience from "@/components/home/Experience";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
