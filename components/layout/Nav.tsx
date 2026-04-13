"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to the top
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(top.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="hidden tablet:block fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.05)]">
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-[56px] px-[24px] desktop:px-[48px]">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-[6px]"
          data-cursor="Home"
        >
          <span className="text-[18px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.9)]">da</span>
          <span className="text-[18px] font-medium tracking-[-0.02em] text-[#D30AD7]">w4ve</span>
        </button>

        {/* Section tabs */}
        <div className="flex items-center gap-[6px]">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              data-cursor={section.label}
              className="relative px-[14px] py-[6px] rounded-full text-[12px] font-medium tracking-[0.04em] transition-colors duration-200"
              style={{
                color: active === section.id ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.4)",
              }}
            >
              {active === section.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[rgba(0,0,0,0.05)] rounded-full"
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Resume download */}
        <a
          href="/Anirudh_Bhat_Resume_2026.pdf"
          download
          data-cursor="Download"
          className="inline-flex items-center gap-[6px] px-[14px] py-[7px] bg-[rgba(0,0,0,0.9)] rounded-full text-[11px] font-medium text-white tracking-[0.04em] hover:bg-[rgba(0,0,0,0.7)] transition-colors duration-150"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Resume
        </a>
      </nav>
    </header>
  );
}
