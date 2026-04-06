"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const content = contentRef.current;
    if (!content) return;

    // Simple, fluid fade + subtle lift — like a wave receding and returning
    const tl = gsap.timeline();

    tl.to(content, {
      opacity: 0,
      y: -20,
      duration: 0.25,
      ease: "power2.in",
    }).fromTo(
      content,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [pathname]);

  return <div ref={contentRef}>{children}</div>;
}
