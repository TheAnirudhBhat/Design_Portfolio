"use client";

import { useEffect, useState } from "react";

type Preset = { name: string; main: string; dark: string; on: string };

// Curated to colors with mid-tone luminance (~0.35–0.65) so they read well on
// both #ffffff and #0a0a0f. Pure yellows/limes/butters fail the white-bg test;
// pure deep navys fail the black-bg test — both excluded.
const presets: Preset[] = [
  { name: "Mustard",       main: "#D4A300", dark: "#A88200", on: "#0a0a0f" },
  { name: "Tangerine",     main: "#F97316", dark: "#C2570D", on: "#ffffff" },
  { name: "Crimson",       main: "#DC2626", dark: "#B91C1C", on: "#ffffff" },
  { name: "Hot pink",      main: "#EC4899", dark: "#BE185D", on: "#ffffff" },
  { name: "Slice magenta", main: "#D30AD7", dark: "#A808AB", on: "#ffffff" },
  { name: "Violet",        main: "#8B5CF6", dark: "#7C3AED", on: "#ffffff" },
  { name: "Royal blue",    main: "#2563EB", dark: "#1D4ED8", on: "#ffffff" },
  { name: "Teal",          main: "#14B8A6", dark: "#0F766E", on: "#0a0a0f" },
  { name: "Forest",        main: "#16A34A", dark: "#15803D", on: "#ffffff" },
];

const STORAGE_KEY = "dawave-brand";

function applyBrand(p: { main: string; dark: string; on: string }) {
  const root = document.documentElement;
  root.style.setProperty("--color-brand", p.main);
  root.style.setProperty("--color-brand-dark", p.dark);
  root.style.setProperty("--color-brand-on", p.on);
}

function deriveDark(hex: string) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function deriveOn(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#0a0a0f" : "#ffffff";
}

const PANEL_OPEN_KEY = "dawave-brand-panel-open";

export default function BrandPanel() {
  // Default open so every preset is visible at a glance; persists user's
  // close state across reloads.
  const [open, setOpen] = useState(true);
  const [custom, setCustom] = useState("");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        applyBrand(parsed);
        setActive(parsed.main);
      } catch {}
    }
    const wasClosed = localStorage.getItem(PANEL_OPEN_KEY) === "0";
    if (wasClosed) setOpen(false);
  }, []);

  function togglePanel(next: boolean) {
    setOpen(next);
    localStorage.setItem(PANEL_OPEN_KEY, next ? "1" : "0");
  }

  function pick(p: Preset) {
    applyBrand(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ main: p.main, dark: p.dark, on: p.on }));
    setActive(p.main);
  }

  function applyCustom() {
    const hex = custom.trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    const next = { main: hex, dark: deriveDark(hex), on: deriveOn(hex) };
    applyBrand(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setActive(hex);
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    const root = document.documentElement;
    root.style.removeProperty("--color-brand");
    root.style.removeProperty("--color-brand-dark");
    root.style.removeProperty("--color-brand-on");
    setActive(null);
  }

  return (
    <>
      <button
        className="v2-brand-trigger"
        onClick={() => togglePanel(!open)}
        aria-label="Open brand color panel"
        aria-expanded={open}
      >
        <span className="v2-brand-trigger-dot" />
      </button>

      {open && (
        <div className="v2-brand-panel" role="dialog" aria-label="Brand color">
          <div className="v2-brand-panel-head">
            <strong>Brand color</strong>
            <button
              className="v2-brand-panel-close"
              onClick={() => togglePanel(false)}
              aria-label="Close brand panel"
            >
              ×
            </button>
          </div>

          <div className="v2-brand-swatches">
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                className={`v2-brand-swatch ${active === p.main ? "is-active" : ""}`}
                style={{ background: p.main }}
                onClick={() => pick(p)}
                title={p.name}
                aria-label={p.name}
              >
                <span className="v2-brand-swatch-name">{p.name}</span>
              </button>
            ))}
          </div>

          <label className="v2-brand-custom">
            <input
              type="text"
              placeholder="#hexcode"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyCustom()}
              maxLength={7}
              spellCheck={false}
            />
            <button type="button" onClick={applyCustom}>Apply</button>
          </label>

          <button type="button" className="v2-brand-reset" onClick={reset}>
            Reset to default
          </button>
        </div>
      )}
    </>
  );
}
