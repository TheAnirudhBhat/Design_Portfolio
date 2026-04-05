"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "LENS",
    metric: "+18% first txn rate",
    tags: "PFM · Mobikwik · 2023",
    slug: "lens",
    coverImage: "",
  },
  {
    title: "EPFO Dashboard",
    metric: "7→12% conversion",
    tags: "Dashboard · Mobikwik · 2023",
    slug: "epfo",
    coverImage: "",
  },
  {
    title: "UPI Onboarding",
    metric: "+18% conversion",
    tags: "UPI · Mobikwik · 2022",
    slug: "upi-onboarding",
    coverImage: "",
  },
  {
    title: "Xtra Investing",
    metric: "₹150Cr+ AUM",
    tags: "Wealth · Mobikwik · 2024",
    slug: "xtra",
    coverImage: "",
  },
];

export default function SelectedWork() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".project-card");

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      scale: 0.97,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === grid) t.kill();
      });
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <TextReveal as="h2" className="text-section font-semibold tracking-tight mb-16">
        Selected Work
      </TextReveal>

      <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <div key={project.slug} className="project-card">
            <ProjectCard {...project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
