"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const signals = [
  { text: "Product Designer", x: "10%", y: "20%", speed: 0.8 },
  { text: "Payments · Investing · Trust", x: "55%", y: "35%", speed: 1.2 },
  { text: "Bangalore / Gurgaon", x: "25%", y: "60%", speed: 0.6 },
  { text: "Systems thinker", x: "65%", y: "75%", speed: 1.0 },
];

export default function Identity() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const desktopItems = el.querySelectorAll(".signal-desktop");
      const mobileItems = el.querySelectorAll(".signal-mobile");

      // Desktop: fade in + parallax
      desktopItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.to(item, {
          y: () => signals[i].speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Mobile: simple stagger fade in
      gsap.fromTo(
        mobileItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Recalculate positions after client-side navigation
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:h-[60vh]"
    >
      <div className="mx-auto mb-16 h-px w-12 bg-white/10" />

      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-6 md:hidden">
        {signals.map((signal, i) => (
          <div key={i} className="signal-mobile text-center text-dw-muted">
            <p className="text-base font-light tracking-wider">{signal.text}</p>
          </div>
        ))}
      </div>

      {/* Desktop: scattered with parallax */}
      <div className="hidden md:block h-full">
        {signals.map((signal, i) => (
          <div
            key={i}
            className="signal-desktop absolute text-dw-muted"
            style={{ left: signal.x, top: signal.y }}
          >
            <p className="text-base font-light tracking-wider">{signal.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
