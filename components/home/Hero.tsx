"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(el.querySelector(".hero-title"), {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        el.querySelector(".hero-subtitle"),
        { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .from(
        el.querySelector(".hero-name"),
        { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        el.querySelector(".hero-scroll"),
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col items-center justify-center px-6"
    >
      <h1 className="hero-title text-hero font-bold leading-[0.9] tracking-tighter text-dw-text">
        dawave
      </h1>
      <p className="hero-subtitle mt-4 text-lg font-light tracking-wide text-dw-muted md:text-xl">
        product designer
      </p>
      <p className="hero-name mt-2 text-sm font-light text-dw-muted/60">
        Anirudh Bhat
      </p>

      <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-xs font-light uppercase tracking-[0.3em] text-dw-muted/50">
          scroll
        </span>
        <div className="h-8 w-[1px] animate-pulse bg-text-secondary/30" />
      </div>
    </section>
  );
}
