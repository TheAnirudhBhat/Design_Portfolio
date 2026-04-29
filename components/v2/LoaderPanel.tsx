"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "blur-fade" | "slide-up" | "scale" | "fade" | "skip";
type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

const variants: { id: Variant; name: string }[] = [
  { id: "blur-fade", name: "Blur fade" },
  { id: "slide-up",  name: "Slide up" },
  { id: "scale",     name: "Scale" },
  { id: "fade",      name: "Fade" },
  { id: "skip",      name: "Skip" },
];

const speeds = [
  { value: 0.5, label: "0.5×" },
  { value: 1,   label: "1×" },
  { value: 1.5, label: "1.5×" },
  { value: 2,   label: "2×" },
];

const positions: { id: Position; label: string }[] = [
  { id: "top-left",     label: "↖" },
  { id: "top-right",    label: "↗" },
  { id: "center",       label: "●" },
  { id: "bottom-left",  label: "↙" },
  { id: "bottom-right", label: "↘" },
];

const STORAGE_KEY = "dawave-loader-config";
const PANEL_OPEN_KEY = "dawave-loader-panel-open";

export default function LoaderPanel() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>("blur-fade");
  const [speed, setSpeed] = useState<number>(1);
  const [position, setPosition] = useState<Position>("center");
  const [paused, setPaused] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const cfg = JSON.parse(raw);
        if (cfg.variant) setVariant(cfg.variant);
        if (cfg.speed) setSpeed(cfg.speed);
        if (cfg.position) setPosition(cfg.position);
      }
    } catch {}
    if (localStorage.getItem(PANEL_OPEN_KEY) === "1") setOpen(true);
  }, []);

  function togglePanel(next: boolean) {
    setOpen(next);
    localStorage.setItem(PANEL_OPEN_KEY, next ? "1" : "0");
  }

  function update(next: Partial<{ variant: Variant; speed: number; position: Position }>) {
    if (next.variant !== undefined) setVariant(next.variant);
    if (next.speed !== undefined) setSpeed(next.speed);
    if (next.position !== undefined) setPosition(next.position);
    const merged = {
      variant: next.variant ?? variant,
      speed: next.speed ?? speed,
      position: next.position ?? position,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }

  function replay() {
    setPaused(false);
    window.dispatchEvent(new Event("loader-replay"));
  }

  function togglePause() {
    const next = !paused;
    setPaused(next);
    window.dispatchEvent(new CustomEvent("loader-pause", { detail: { paused: next } }));
  }

  function savePrefs() {
    const merged = { variant, speed, position };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1500);
  }

  return (
    <>
      <button
        className="v2-loader-trigger"
        onClick={() => togglePanel(!open)}
        aria-label="Open loader debug panel"
        aria-expanded={open}
        title="Loader debug"
      >
        ⏯
      </button>

      {open && (
        <div className="v2-loader-panel" role="dialog" aria-label="Loader debug">
          <div className="v2-brand-panel-head">
            <strong>Loader</strong>
            <button
              className="v2-brand-panel-close"
              onClick={() => togglePanel(false)}
              aria-label="Close loader panel"
            >
              ×
            </button>
          </div>

          <div className="v2-loader-row">
            <span className="v2-loader-row-label">Variant</span>
            <div className="v2-loader-pills">
              {variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`v2-loader-pill ${variant === v.id ? "is-active" : ""}`}
                  onClick={() => update({ variant: v.id })}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div className="v2-loader-row">
            <span className="v2-loader-row-label">Speed</span>
            <div className="v2-loader-pills">
              {speeds.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`v2-loader-pill ${speed === s.value ? "is-active" : ""}`}
                  onClick={() => update({ speed: s.value })}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="v2-loader-row">
            <span className="v2-loader-row-label">Position</span>
            <div className="v2-loader-positions">
              {positions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`v2-loader-pos ${position === p.id ? "is-active" : ""}`}
                  onClick={() => update({ position: p.id })}
                  aria-label={p.id}
                  title={p.id}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="v2-loader-actions">
            <button
              type="button"
              className="v2-loader-action v2-loader-action--secondary"
              onClick={togglePause}
            >
              {paused ? "▶ Resume" : "❚❚ Pause"}
            </button>
            <button
              type="button"
              className="v2-loader-action v2-loader-action--secondary"
              onClick={replay}
            >
              ↻ Replay
            </button>
          </div>

          <button
            type="button"
            className={`v2-loader-save ${saved ? "is-saved" : ""}`}
            onClick={savePrefs}
          >
            {saved ? "✓ Saved" : "Save preferences"}
          </button>
        </div>
      )}
    </>
  );
}
