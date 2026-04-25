"use client";

import Sidebar from "@/components/v2/Sidebar";
import Marquee from "@/components/v2/Marquee";
import Hero from "@/components/v2/Hero";
import WorkCarousel from "@/components/v2/WorkCarousel";
import Experience from "@/components/v2/Experience";
import Contact from "@/components/v2/Contact";
import Footer from "@/components/v2/Footer";
import ScrollFab from "@/components/v2/ScrollFab";
import LoaderScreen from "@/components/v2/LoaderScreen";
import "./v2.css";

export default function Home() {
  return (
    <>
      <div className="v2-layout">
        <LoaderScreen />
        <Sidebar />
        <main className="v2-main">
          <div className="v2-hero-wrapper">
            <Marquee />
            <Hero />
          </div>
          <WorkCarousel />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
      {/* FAB sits OUTSIDE v2-layout so position:fixed always refs the viewport,
          avoiding any containing-block surprise from ancestors on mobile. */}
      <ScrollFab />
    </>
  );
}
