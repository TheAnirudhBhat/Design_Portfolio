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
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const tl = gsap.timeline();

    tl.set(overlay, { scaleX: 0, transformOrigin: "left center" })
      .to(overlay, {
        scaleX: 1,
        duration: 0.4,
        ease: "power3.inOut",
      })
      .set(content, { opacity: 0 })
      .to(overlay, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.4,
        ease: "power3.inOut",
      })
      .to(
        content,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[100] origin-left scale-x-0 bg-accent/10 backdrop-blur-sm"
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
