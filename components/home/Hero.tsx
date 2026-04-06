"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        el.querySelector(".hero-title"),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
      )
        .fromTo(
          el.querySelector(".hero-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.4"
        )
        .fromTo(
          el.querySelector(".hero-subtitle"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          el.querySelector(".hero-name"),
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          el.querySelector(".hero-scroll"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col items-center justify-center px-6"
    >
      <h1
        className="hero-title font-black leading-[0.85] tracking-tight text-white uppercase text-center"
        style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
      >
        DaW4ve
      </h1>

      <div className="hero-line mt-6 h-[1px] w-16 bg-white/30 origin-center" />

      <p className="hero-subtitle mt-5 text-base font-light tracking-[0.15em] uppercase text-white/70 md:text-lg">
        product designer
      </p>
      <p className="hero-name mt-2 text-sm font-light tracking-wide text-white/35">
        Anirudh Bhat
      </p>

      <div className="hero-scroll absolute bottom-12 flex flex-col items-center gap-3">
        <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/30">
          scroll
        </span>
        <div className="relative h-10 w-[1px] overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-full bg-white/40"
            style={{
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dw-bg to-transparent" />
    </section>
  );
}
