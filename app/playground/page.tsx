"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const experiments = [
  { title: "Visual Explorations", tag: "UI", href: "https://dribbble.com/DaW4ve" },
  { title: "Motion Studies", tag: "Motion", href: "https://dribbble.com/DaW4ve" },
  { title: "3D Experiments", tag: "3D", href: "https://dribbble.com/DaW4ve" },
];

export default function PlaygroundPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    gsap.from(el.querySelectorAll(".playground-card"), {
      y: 40,
      opacity: 0,
      scale: 0.97,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-44 pb-24">
      <TextReveal
        as="h1"
        className="text-4xl font-bold tracking-tight md:text-6xl"
      >
        Playground
      </TextReveal>
      <TextReveal
        as="p"
        className="mt-4 text-lg font-light text-dw-muted"
        delay={0.2}
      >
        Visual experiments, motion studies, and things I build for fun.
      </TextReveal>

      <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-3">
        {experiments.map((exp) => (
          <a
            key={exp.title}
            href={exp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="playground-card group relative flex aspect-square flex-col justify-end overflow-hidden rounded-lg bg-dw-surface p-6 transition-shadow duration-400 hover:shadow-[0_0_30px_rgba(255,214,10,0.08)]"
          >
            <span className="mb-2 text-xs font-light uppercase tracking-[0.2em] text-dw-accent">
              {exp.tag}
            </span>
            <h3 className="text-lg font-medium text-dw-text">
              {exp.title}
            </h3>
            <span className="mt-2 text-sm text-dw-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View on Dribbble &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
