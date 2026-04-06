import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-dw-bg">
        <SelectedWork />
        <Footer />
      </div>
    </>
  );
}
