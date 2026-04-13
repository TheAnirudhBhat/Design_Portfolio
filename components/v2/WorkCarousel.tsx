"use client";

import { useRef } from "react";

const projects = [
  {
    id: "lens",
    title: "LENS",
    sub: "slice · 2024–2025",
    desc: "Built a schema-driven detail page framework that gave structure to credit card management and reduced cognitive load for users.",
    stats: [
      { value: "10M+", label: "users impacted" },
      { value: "↓40%", label: "support queries" },
    ],
    image: "/images/projects/lens-cover.jpg",
    bg: "#D30AD7",
  },
  {
    id: "upi",
    title: "UPI Onboarding",
    sub: "slice · 2025–Present",
    desc: "Redesigned the first-time UPI setup experience to reduce drop-offs and make payments accessible for young India.",
    stats: [
      { value: "4.5x", label: "faster onboarding" },
      { value: "+18%", label: "first txn rate" },
    ],
    image: "/images/projects/upi-cover.jpg",
    bg: "#00A63E",
  },
  {
    id: "epfo",
    title: "EPFO",
    sub: "MobiKwik · 2024",
    desc: "Simplified provident fund withdrawal flows, cutting complexity for millions of first-time digital users.",
    stats: [
      { value: "27%", label: "fewer support tickets" },
      { value: "12%", label: "conversion lift" },
    ],
    image: "/images/projects/epfo-cover.jpg",
    bg: "#2196F3",
  },
  {
    id: "xtra",
    title: "Xtra",
    sub: "MobiKwik · 2023–2024",
    desc: "Designed the savings and fixed deposit experience for users new to financial products.",
    stats: [
      { value: "₹150Cr+", label: "AUM" },
      { value: "+30%", label: "retention" },
    ],
    image: "/images/projects/xtra-cover.jpg",
    bg: "#FF9800",
  },
];

export default function WorkCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: number) {
    const vp = viewportRef.current;
    if (!vp) return;
    const slide = vp.querySelector(".v2-carousel-slide") as HTMLElement;
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(vp).gap) || 16;
    const scrollAmount = (slide.offsetWidth + gap) * dir;
    vp.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <section className="v2-work-section">
      <div className="v2-work-head">
        <h2 className="v2-section-title" id="work">
          Selected Work
        </h2>
        <div className="v2-carousel-controls">
          <button className="v2-carousel-btn" onClick={() => scrollByCard(-1)} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="v2-carousel-btn" onClick={() => scrollByCard(1)} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="v2-carousel-viewport" ref={viewportRef}>
        {projects.map((p) => (
          <div className="v2-carousel-slide" key={p.id}>
            <div className="v2-bento-card" style={{ background: p.bg, "--card-bg": p.bg } as React.CSSProperties}>
              <div className="v2-bento-visual">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="v2-bento-body">
                <h3 className="v2-bento-title">{p.title}</h3>
                <p className="v2-bento-sub">{p.sub}</p>
                <p className="v2-bento-desc">{p.desc}</p>
                <div className="v2-bento-stats">
                  {p.stats.map((s) => (
                    <span key={s.label}>
                      <strong>{s.value}</strong> {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
