"use client";

import { useRef, useState } from "react";
import { projects } from "@/lib/data/projects";
import CaseStudyModal, { type CaseOrigin } from "./CaseStudyModal";

export default function WorkCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<CaseOrigin | null>(null);
  const [exitingId, setExitingId] = useState<string | null>(null);

  function openCase(e: React.MouseEvent<HTMLAnchorElement>, p: typeof projects[number]) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      accent: p.accent || "#000000",
    });
    setActiveCaseId(p.id);
  }

  function closeCase() {
    if (!activeCaseId) return;
    setExitingId(activeCaseId);
    setActiveCaseId(null);
    setTimeout(() => setExitingId(null), 280);
    setTimeout(() => setOrigin(null), 550);
  }

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
          // --card-bg is kept (drives the colored hover-shadow glow). The
          // card itself uses --v2-bg-card from CSS — accent color only
          // appears in the project image and the hover shadow.
          const cardStyle = { "--card-bg": p.accent } as React.CSSProperties;
          const inner = (
            <>
              <div className="v2-bento-visual">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="v2-bento-body">
                <h3 className="v2-bento-title">{p.title}</h3>
                <p className="v2-bento-sub">{p.sub}</p>
                <p className="v2-bento-desc">{p.subtitle}</p>
                {p.stats?.[0] && (
                  <div className="v2-bento-stats">
                    <div className="v2-bento-stat">
                      <strong>{p.stats[0].value}</strong>
                      <span>{p.stats[0].label}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
          return (
            <div className="v2-carousel-slide" key={p.id}>
              {p.href ? (
                (() => {
                  const isInternal = !p.href.startsWith("http");
                  const isActive = isInternal && (activeCaseId === p.id || exitingId === p.id);
                  return (
                    <a
                      href={p.href}
                      {...(!isInternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={(e) => {
                        if (isInternal) openCase(e, p);
                      }}
                      className="v2-bento-card"
                      style={{
                        ...cardStyle,
                        opacity: isActive ? 0 : 1,
                        pointerEvents: isActive ? "none" : "auto",
                        transition: "opacity 0.18s ease-out",
                      }}
                    >
                      {inner}
                    </a>
                  );
                })()
              ) : (
                <div className="v2-bento-card" style={cardStyle}>
                  {inner}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CaseStudyModal caseId={activeCaseId} origin={origin} onClose={closeCase} />
    </section>
  );
}
