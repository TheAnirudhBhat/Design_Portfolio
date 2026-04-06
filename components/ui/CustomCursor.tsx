"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const circleEl = circleRef.current;
    if (!dot || !circleEl) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const animate = () => {
      const lerp = 0.1;
      circle.current.x += (mouse.current.x - circle.current.x) * lerp;
      circle.current.y += (mouse.current.y - circle.current.y) * lerp;
      circleEl.style.transform = `translate(${circle.current.x - 15}px, ${circle.current.y - 15}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[6px] w-[6px] rounded-full bg-dw-accent"
        style={{ willChange: "transform" }}
      />
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-[30px] w-[30px] rounded-full border border-white/10"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
