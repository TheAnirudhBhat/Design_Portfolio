"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "Figma", note: "daily driver" },
  { name: "ProtoPie", note: "interactions" },
  { name: "Spline", note: "3D" },
  { name: "Blender", note: "rendering" },
  { name: "GSAP", note: "animation" },
  { name: "Three.js", note: "WebGL" },
  { name: "n8n", note: "automation" },
  { name: "Claude Code", note: "building" },
];

const timeline = [
  { period: "2024 — now", role: "Product Designer", company: "slice" },
  { period: "2021 — 2024", role: "Product Designer", company: "Mobikwik" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero heading — word by word
      const heading = el.querySelector(".about-heading");
      if (heading) {
        const text = heading.textContent || "";
        heading.innerHTML = text
          .split(" ")
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
          )
          .join('<span class="inline-block">&nbsp;</span>');

        gsap.fromTo(
          heading.querySelectorAll("span > span"),
          { y: "110%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.2,
          }
        );
      }

      // Stagger in the detail blocks
      gsap.fromTo(
        el.querySelectorAll(".fade-up"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.6,
        }
      );

      // Tools — stagger from left
      gsap.fromTo(
        el.querySelectorAll(".tool-item"),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el.querySelector(".tools-section"),
            start: "top 85%",
            once: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative z-10 min-h-screen bg-dw-bg">
      {/* Subtle top gradient for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(4,20,50,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-52 pb-32">
        {/* ─── HERO HEADING ─── */}
        <h1
          className="about-heading max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white"
        >
          I design for clarity, trust, and flow.
        </h1>

        {/* ─── BIO GRID ─── */}
        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_1.2fr]">
          {/* Left column — short punchy lines */}
          <div className="space-y-8">
            <p className="fade-up text-lg leading-relaxed text-dw-text/80">
              I think in systems, not screens. Every interaction is part of a
              larger flow — and every flow should reduce friction, not add it.
            </p>

            <p className="fade-up text-lg leading-relaxed text-dw-text/80">
              Over the past 4+ years, I&apos;ve designed payment experiences,
              investing journeys, and personal finance tools used by millions.
            </p>

            <p className="fade-up text-base leading-relaxed text-dw-muted">
              Currently at slice, previously at Mobikwik.
              <br />
              Based between Gurgaon and Bangalore.
            </p>
          </div>

          {/* Right column — experience timeline */}
          <div className="space-y-10">
            <div className="fade-up">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-dw-muted/40">
                Experience
              </p>
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div
                    key={item.period}
                    className="fade-up group flex items-baseline justify-between border-b border-white/5 pb-4"
                  >
                    <div>
                      <p className="text-base font-medium text-dw-text">
                        {item.role}
                      </p>
                      <p className="mt-0.5 text-sm text-dw-accent">
                        {item.company}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums tracking-wider text-dw-muted/50">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach blurb */}
            <div className="fade-up rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-dw-muted/40">
                How I work
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dw-muted">
                I combine product thinking with interaction design — moving
                between research, prototyping, and high-fidelity execution.
                I care about the details that ship, not just the ones that
                look good in a deck.
              </p>
            </div>
          </div>
        </div>

        {/* ─── TOOLS ─── */}
        <div className="tools-section mt-32">
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.4em] text-dw-muted/40">
            Tools & Technologies
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="tool-item group flex items-baseline gap-2"
              >
                <span className="text-base font-medium text-dw-text transition-colors duration-300 group-hover:text-dw-accent">
                  {tool.name}
                </span>
                <span className="text-[11px] text-dw-muted/40">
                  {tool.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SEPARATOR LINE ─── */}
        <div className="mt-32 h-px w-12 bg-white/10" />

        {/* ─── CLOSING ─── */}
        <p className="fade-up mt-8 max-w-md text-sm leading-relaxed text-dw-muted/60">
          If you&apos;re working on something interesting in fintech, payments,
          or consumer products — I&apos;d love to hear about it.
        </p>
      </div>
    </div>
  );
}
