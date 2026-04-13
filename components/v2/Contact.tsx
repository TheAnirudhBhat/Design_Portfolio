"use client";

import { useRef, useCallback, useState, useEffect } from "react";

const reasons = [
  "Full-time opportunity",
  "Freelance project",
  "Design consultation",
  "Just saying hi",
  "Other",
];

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [face, setFace] = useState<"front" | "back">("front");
  const [animating, setAnimating] = useState(false);
  useEffect(() => setMounted(true), []);

  const now = mounted ? new Date() : new Date("2026-04-13T00:00:00");
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const boardingId = mounted ? `DW-${Date.now().toString(36).slice(-5).toUpperCase()}` : "DW-00000";

  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHovered = useRef(false);
  const current = useRef({ rx: 0, ry: 0, sx: 50, sy: 50, s: 0.96 });
  const target = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const tiltActive = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    const el = cardRef.current;
    const shine = shineRef.current;
    if (!el || !shine) return;
    const c = current.current;
    const t = target.current;
    const ease = isHovered.current ? 0.06 : 0.03;
    c.rx = lerp(c.rx, t.rx, ease);
    c.ry = lerp(c.ry, t.ry, ease);
    c.sx = lerp(c.sx, t.sx, ease);
    c.sy = lerp(c.sy, t.sy, ease);
    c.s = lerp(c.s, isHovered.current ? 1.02 : 0.96, isHovered.current ? 0.06 : 0.03);
    el.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale(${c.s})`;
    if (isHovered.current) {
      shine.style.background = `
        radial-gradient(ellipse 120% 120% at ${c.sx}% ${c.sy}%, rgba(255,255,255,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 150% 150% at ${c.sx}% ${c.sy}%, rgba(211,10,215,0.04) 0%, transparent 70%)
      `;
    }
    const settled = !isHovered.current && Math.abs(c.rx) < 0.05 && Math.abs(c.ry) < 0.05 && Math.abs(c.s - 0.96) < 0.002;
    if (settled) {
      tiltActive.current = false;
      el.style.transform = "";
      el.classList.remove("v2-bp--active");
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (!tiltActive.current) {
      tiltActive.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  function handleEnter() {
    if (face === "back" || animating) return;
    isHovered.current = true;
    cardRef.current?.classList.add("v2-bp--active");
    startLoop();
  }
  function handleMove(e: React.MouseEvent) {
    if (face === "back" || animating) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.current.rx = (y - 0.5) * -18;
    target.current.ry = (x - 0.5) * 18;
    target.current.sx = x * 100;
    target.current.sy = y * 100;
  }
  function handleLeave() {
    if (face === "back" || animating) return;
    isHovered.current = false;
    target.current = { rx: 0, ry: 0, sx: 50, sy: 50 };
  }

  // Flip: rAF-driven 0→180 with content swap at 90deg midpoint + height animation
  function flipTo(newFace: "front" | "back") {
    if (animating) return;
    setAnimating(true);
    isHovered.current = false;
    cancelAnimationFrame(rafRef.current);
    tiltActive.current = false;
    const el = cardRef.current!;
    if (!el) return;
    el.classList.add("v2-bp--active");

    // Capture starting height
    const startHeight = el.offsetHeight;
    el.style.height = `${startHeight}px`;
    el.style.overflow = "hidden";

    const dir = newFace === "back" ? 1 : -1;
    const halfDuration = 350; // ms for each half
    const start = performance.now();
    let phase: "out" | "in" | "done" = "out";

    function easeIn(t: number) { return t * t; }
    function easeOut(t: number) { return 1 - (1 - t) * (1 - t); }

    function frame(now: number) {
      const elapsed = now - start;

      if (phase === "out") {
        // Phase 1: rotate 0 → 90deg, scale down to 0.8 so it doesn't clip
        const t = Math.min(elapsed / halfDuration, 1);
        const angle = dir * easeIn(t) * 90;
        const scale = 0.96 - 0.16 * t; // 0.96 → 0.80
        el.style.transform = `perspective(800px) rotateY(${angle}deg) scale(${scale})`;

        if (t >= 1) {
          // At 90deg edge — swap content
          el.style.visibility = "hidden";
          const frontEl = el.querySelector('[data-face="front"]') as HTMLElement;
          const backEl = el.querySelector('[data-face="back"]') as HTMLElement;
          if (frontEl && backEl) {
            if (newFace === "back") {
              frontEl.style.display = "none";
              backEl.style.display = "block";
            } else {
              frontEl.style.display = "flex";
              backEl.style.display = "none";
            }
          }
          setFace(newFace);

          // Measure new height
          el.style.height = "auto";
          const endHeight = el.offsetHeight;
          el.style.height = `${startHeight}px`;
          requestAnimationFrame(() => {
            el.style.transition = "height 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)";
            el.style.height = `${endHeight}px`;
          });

          // Start phase 2 next frame
          phase = "in";
          const inStart = performance.now();

          function frameIn(now2: number) {
            const elapsed2 = now2 - inStart;
            const t2 = Math.min(elapsed2 / halfDuration, 1);
            // Rotate from -90 back to 0 (reverse direction)
            const angle2 = -dir * (1 - easeOut(t2)) * 90;
            const scale2 = 0.80 + 0.16 * easeOut(t2); // 0.80 → 0.96
            el.style.transform = `perspective(800px) rotateY(${angle2}deg) scale(${scale2})`;

            // Show card again after first frame
            if (elapsed2 > 16) el.style.visibility = "";

            if (t2 < 1) {
              requestAnimationFrame(frameIn);
            } else {
              el.style.transform = "";
              el.style.height = "";
              el.style.overflow = "";
              el.style.transition = "";
              el.style.visibility = "";
              el.classList.remove("v2-bp--active");
              setAnimating(false);
            }
          }
          requestAnimationFrame(frameIn);
          return; // don't continue outer loop
        }
      }

      if (phase === "out") {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  return (
    <section className="v2-contact" id="contact">
      <h2 className="v2-section-title v2-contact-title">Get in Touch</h2>

      <div
        className="v2-bp"
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="v2-bp-shine" ref={shineRef} />

          {/* ===== FRONT: Boarding Pass (always in DOM) ===== */}
          <div className="v2-bp-inner" data-face="front" style={{ display: face === "front" ? "flex" : "none" }}>
            <div className="v2-bp-main">
              <div className="v2-bp-header">
                <div className="v2-bp-logo">da<span>w4ve</span></div>
                <span className="v2-bp-class">DESIGN CLASS</span>
              </div>
              <div className="v2-bp-route">
                <div className="v2-bp-field">
                  <span className="v2-bp-label">Passenger</span>
                  <span className="v2-bp-value v2-bp-value--lg">Anirudh Bhat</span>
                </div>
                <div className="v2-bp-field">
                  <span className="v2-bp-label">From</span>
                  <span className="v2-bp-value v2-bp-value--lg">BLR</span>
                  <span className="v2-bp-sub">Bengaluru</span>
                </div>
                <div className="v2-bp-route-arrow">→</div>
                <div className="v2-bp-field">
                  <span className="v2-bp-label">To</span>
                  <span className="v2-bp-value v2-bp-value--lg">YOU</span>
                  <span className="v2-bp-sub">Anywhere</span>
                </div>
              </div>
              <div className="v2-bp-details">
                <div className="v2-bp-field"><span className="v2-bp-label">Service</span><span className="v2-bp-value">Product Design</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Experience</span><span className="v2-bp-value">4+ Years</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Status</span><span className="v2-bp-value v2-bp-value--green"><span className="v2-status-dot" /> Available</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Date</span><span className="v2-bp-value">{dateStr}</span></div>
              </div>
              {/* Barcode — visible on mobile where stub is hidden */}
              <div className="v2-bp-barcode-mobile">
                {[3,1.5,3,1.5,3,3,1.5,3,1.5,1.5,3,1.5,3,3,1.5,1.5,3,3,1.5,3,1.5,1.5,3,3,1.5,3,1.5,3].map((w, i) => (
                  <span key={i} style={{ width: `${w}px` }} />
                ))}
              </div>
              <div className="v2-bp-actions">
                <button onClick={() => flipTo("back")} className="v2-bp-cta">Board now — say hello</button>
              </div>
            </div>
            <div className="v2-bp-perf" />
            <div className="v2-bp-stub">
              <div className="v2-bp-stub-logo">da<span>w4ve</span></div>
              <div className="v2-bp-stub-fields">
                <div className="v2-bp-field"><span className="v2-bp-label">Passenger</span><span className="v2-bp-value">A. Bhat</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Route</span><span className="v2-bp-value">BLR → YOU</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Seat</span><span className="v2-bp-value">1A</span></div>
                <div className="v2-bp-field"><span className="v2-bp-label">Boarding</span><span className="v2-bp-value">{boardingId}</span></div>
              </div>
              <div className="v2-bp-barcode">
                {[3,1.5,3,1.5,3,3,1.5,3,1.5,1.5,3,1.5,3,3,1.5,1.5,3,3,1.5,3,1.5,1.5,3,3,1.5,3,1.5,3].map((w, i) => (
                  <span key={i} style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* ===== BACK: Contact Form (always in DOM) ===== */}
          <div className="v2-bp-form-wrap" data-face="back" style={{ display: face === "back" ? "block" : "none" }}>
            <div className="v2-bp-form-header">
              <div className="v2-bp-form-intro">
                <h3 className="v2-bp-form-title">Ready to<br className="v2-mobile-br" /> board?</h3>
                <p className="v2-bp-form-sub">Fill this out and I&apos;ll get back within 24 hours.</p>
              </div>
              <div className="v2-bp-logo">da<span>w4ve</span></div>
            </div>
            <form
              className="v2-bp-form"
              onSubmit={(e) => {
                e.preventDefault();
                const textarea = e.currentTarget.querySelector("textarea");
                if (textarea && !textarea.value.trim()) {
                  textarea.classList.add("v2-bp-input--error");
                  return;
                }
                const fd = new FormData(e.currentTarget);
                const subject = "Hello from your portfolio";
                const message = fd.get("message");
                window.location.href = `mailto:hello@dawave.in?subject=${encodeURIComponent(String(subject))}&body=${encodeURIComponent(String(message))}`;
              }}
            >
              <div className="v2-bp-form-field">
                <label className="v2-bp-label">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What's on your mind?"
                  className="v2-bp-input v2-bp-textarea"
                  onChange={(e) => {
                    e.target.setCustomValidity("");
                    e.target.classList.remove("v2-bp-input--error");
                  }}
                />
                <span className="v2-bp-error">Please write a message</span>
              </div>
              <div className="v2-bp-form-actions">
                <button type="button" onClick={() => flipTo("front")} className="v2-bp-form-back">← Back</button>
                <button type="submit" className="v2-bp-cta v2-bp-cta--form">Send message →</button>
              </div>
            </form>
          </div>
      </div>
    </section>
  );
}
