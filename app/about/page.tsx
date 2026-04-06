"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  "Figma",
  "ProtoPie",
  "Spline",
  "Blender",
  "GSAP",
  "Three.js",
  "n8n",
  "Claude Code",
];

export default function AboutPage() {
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = toolsRef.current;
    if (!el) return;

    gsap.from(el.querySelectorAll(".tool-tag"), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <TextReveal
        as="h1"
        className="text-4xl font-bold tracking-tight md:text-6xl"
      >
        I design for clarity, trust, and flow.
      </TextReveal>

      <div className="mt-12 space-y-6">
        <TextReveal
          as="p"
          className="text-lg font-light leading-relaxed text-dw-muted"
          delay={0.2}
        >
          I think in systems, not screens. Every interaction is part of a larger flow — and every flow should reduce friction, not add it.
        </TextReveal>

        <TextReveal
          as="p"
          className="text-lg font-light leading-relaxed text-dw-muted"
          delay={0.4}
        >
          Over the past 4 years, I have designed payment experiences, investing journeys, and personal finance tools used by millions. I combine product thinking with interaction design to ship work that moves real metrics.
        </TextReveal>

        <TextReveal
          as="p"
          className="text-lg font-light leading-relaxed text-dw-muted"
          delay={0.6}
        >
          Currently at slice, previously at Mobikwik. Based between Gurgaon and Bangalore.
        </TextReveal>
      </div>

      <div ref={toolsRef} className="mt-20">
        <p className="mb-6 text-xs font-light uppercase tracking-[0.3em] text-dw-muted/50">
          Tools & Technologies
        </p>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="tool-tag rounded-full border border-white/10 px-4 py-2 text-sm text-dw-muted transition-colors duration-300 hover:border-dw-accent/30 hover:text-dw-text"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
