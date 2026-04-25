"use client";

import { useState, useEffect } from "react";
import { socialLinks } from "@/lib/data/projects";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

function ThemeIcon({ theme }: { theme: "light" | "dark" }) {
  return theme === "light" ? <MoonIcon /> : <SunIcon />;
}

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("dawave-theme") as "light" | "dark" | null;

    // Manual override wins
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    // No manual override — follow system, in realtime
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const sys = mq.matches ? "dark" : "light";
      setTheme(sys);
      document.documentElement.setAttribute("data-theme", sys);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("dawave-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="v2-mobile-controls">
        <button className="v2-theme-toggle v2-mobile-theme" onClick={toggleTheme} aria-label="Toggle theme">
          <ThemeIcon theme={theme} />
        </button>
        <button className="v2-burger" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`v2-burger-bar ${menuOpen ? "v2-burger-bar--open-1" : ""}`} />
          <span className={`v2-burger-bar ${menuOpen ? "v2-burger-bar--open-2" : ""}`} />
          <span className={`v2-burger-bar ${menuOpen ? "v2-burger-bar--open-3" : ""}`} />
        </button>
      </div>

      {menuOpen && <div className="v2-nav-backdrop" onClick={() => setMenuOpen(false)} />}

      <aside className="v2-sidebar">
        <div className="v2-sidebar-top">
          <h1 className="v2-sidebar-name">
            <span className="v2-name-first">Anirudh</span>{" "}
            <span className="v2-name-last">Bhat</span>
          </h1>
          <p className="v2-sidebar-role">Product Designer in Bengaluru 🇮🇳</p>
          <span className="v2-status-pill">
            <span className="v2-status-dot" />
            Open to projects
          </span>
        </div>

        <nav className={`v2-sidebar-nav ${menuOpen ? "v2-sidebar-nav--open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}>
              {link.label}
            </a>
          ))}
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}<ArrowIcon />
            </a>
          ))}
          <button className="v2-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <ThemeIcon theme={theme} />
          </button>
        </nav>
      </aside>
    </>
  );
}
