"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "+18%", label: "First txn rate" },
  { value: "7→12%", label: "EPFO conversion" },
  { value: "+30%", label: "Retention" },
  { value: "₹150Cr+", label: "AUM managed" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".footer-fade");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative mt-16 border-t border-white/5">
      {/* Impact metrics strip */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="footer-fade">
              <CountUp
                value={metric.value}
                className="block text-2xl font-bold text-dw-accent md:text-3xl"
              />
              <p className="mt-1 text-xs font-light tracking-wider text-dw-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="footer-fade flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-dw-text md:text-3xl">
              Let&apos;s talk
            </h2>
            <MagneticButton
              as="a"
              href="mailto:coolanirudh3@gmail.com"
              className="mt-3 inline-block text-base font-medium text-dw-accent underline underline-offset-4 decoration-dw-accent/30 hover:decoration-dw-accent transition-colors duration-300"
            >
              coolanirudh3@gmail.com
            </MagneticButton>
          </div>

          <div className="footer-fade flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/daw4ve/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dw-muted transition-colors duration-300 hover:text-dw-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://dribbble.com/DaW4ve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dw-muted transition-colors duration-300 hover:text-dw-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.174 10.174 0 004.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.15 10.15 0 006.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248A65.473 65.473 0 007.337 3.1 10.16 10.16 0 001.964 9.915zM9.06 2.4c.668.94 2.278 3.3 3.565 5.885 3.392-1.272 4.83-3.2 4.986-3.42A10.15 10.15 0 0012 1.84c-1.025 0-2.016.152-2.94.56zm9.8 3.58c-.18.227-1.744 2.26-5.263 3.694.236.48.465.97.678 1.46.075.172.15.344.22.515 3.39-.425 6.753.26 7.09.326-.02-2.25-.84-4.32-2.726-5.995z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-fade mt-16 border-t border-white/5 pt-6">
          <p className="text-xs text-dw-muted/40">
            &copy; {new Date().getFullYear()} Anirudh Bhat. Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
