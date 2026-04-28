"use client";

import { useRef } from "react";
import { projects } from "@/lib/data/projects";

export default function WorkCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: number) {
    const vp = viewportRef.current;
    if (!vp) return;
    const slide = vp.querySelector(".v2-carousel-slide") as HTMLElement;
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(vp).gap) || 16;
    vp.scrollBy({ left: (slide.offsetWidth + gap) * dir, behavior: "smooth" });
  }

  return (
    <section className="v2-work-section">
      <div className="v2-work-head">
        <h2 className="v2-section-title" id="work">Selected Work</h2>
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
        {projects.map((p) => {
          const cardStyle = { background: p.accent, "--card-bg": p.accent } as React.CSSProperties;
          const inner = (
            <>
              <div className="v2-bento-visual">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="v2-bento-body">
                <h3 className="v2-bento-title">{p.title}</h3>
                <p className="v2-bento-sub">{p.sub}</p>
                <p className="v2-bento-desc">{p.subtitle}</p>
                <div className="v2-bento-stats">
                  {p.stats?.map((s) => (
                    <span key={s.label}><strong>{s.value}</strong> {s.label}</span>
                  ))}
                </div>
                {p.href && <span className="v2-bento-cta">Read case study →</span>}
              </div>
            </>
          );
          return (
            <div className="v2-carousel-slide" key={p.id}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-bento-card"
                  style={cardStyle}
                >
                  {inner}
                </a>
              ) : (
                <div className="v2-bento-card" style={cardStyle}>
                  {inner}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
