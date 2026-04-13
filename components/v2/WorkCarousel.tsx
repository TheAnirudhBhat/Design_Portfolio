"use client";

import { useRef, useState, useCallback, useEffect } from "react";

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
    href: "/work/lens",
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
    href: "/work/upi-onboarding",
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
    href: "/work/epfo",
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
    href: "/work/xtra",
  },
];

export default function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = projects.length;

  const go = useCallback(
    (i: number) => {
      const next = ((i % count) + count) % count;
      setCurrent(next);
      if (!trackRef.current) return;
      const slide = trackRef.current.children[next] as HTMLElement;
      if (slide) {
        const track = trackRef.current;
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        const slideW = slide.offsetWidth;
        const tx = -(next * (slideW + gap));
        track.style.transform = `translate3d(${tx}px, 0, 0)`;
      }
    },
    [count]
  );

  useEffect(() => {
    // Delay to ensure layout is ready
    requestAnimationFrame(() => go(0));
  }, [go]);

  // Touch swipe
  const touchStart = useRef({ x: 0, y: 0 });

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = touchStart.current.x - e.changedTouches[0].clientX;
    const dy = touchStart.current.y - e.changedTouches[0].clientY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx > 0 ? current + 1 : current - 1);
    }
  }

  return (
    <section className="v2-work-section">
      <div className="v2-work-head">
        <h2 className="v2-section-title" id="work">
          Selected Work
        </h2>
        <div className="v2-carousel-controls">
          <button
            className="v2-carousel-btn"
            onClick={() => go(current - 1)}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="v2-carousel-btn"
            onClick={() => go(current + 1)}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="v2-carousel">
        <div className="v2-carousel-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="v2-carousel-track" ref={trackRef}>
            {projects.map((p) => (
              <div className="v2-carousel-slide" key={p.id}>
                <div className="v2-bento-card" style={{ background: p.bg }}>
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
        </div>
      </div>
    </section>
  );
}
