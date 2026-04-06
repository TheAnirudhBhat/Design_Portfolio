"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
      )
      .join('<span class="inline-block">&nbsp;</span>');

    const spans = el.querySelectorAll(
      "span > span"
    ) as NodeListOf<HTMLSpanElement>;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, delay, stagger]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement & HTMLHeadingElement>}
      className={className}
    />
  );
}
