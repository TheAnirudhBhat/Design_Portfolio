"use client";

import { useEffect, useState, useCallback } from "react";

const sections = [
  { id: "work", label: "Selected Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const topSection = { id: "_top", label: "Back to top" };

export default function ScrollFab() {
  const [currentTarget, setCurrentTarget] = useState(sections[0]);
  const [isBackToTop, setIsBackToTop] = useState(false);

  const update = useCallback(() => {
    const vh = window.innerHeight;
    const center = window.scrollY + vh / 2;
    let currentIdx = -1;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (center >= top) currentIdx = i;
    }

    // Check if near the very bottom of the page
    const scrollBottom = window.scrollY + vh;
    const docHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollBottom >= docHeight - 150;

    const nextIdx = currentIdx + 1;
    if (nearBottom) {
      setIsBackToTop(true);
      setCurrentTarget(topSection);
    } else if (nextIdx >= sections.length) {
      // Past last section but not at bottom — hide
      setIsBackToTop(false);
      setCurrentTarget(sections[sections.length - 1]);
    } else {
      setIsBackToTop(false);
      setCurrentTarget(sections[nextIdx]);
    }
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (isBackToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(currentTarget.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <a
      href={isBackToTop ? "#" : `#${currentTarget.id}`}
      className="v2-fab"
      onClick={handleClick}
      aria-label={currentTarget.label}
    >
      <span className="v2-fab-label">{currentTarget.label}</span>
      <svg
        className={`v2-fab-icon ${isBackToTop ? "v2-fab-icon--up" : ""}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </a>
  );
}
