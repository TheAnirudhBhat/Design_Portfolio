"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  value: string;
  className?: string;
}

function parseTarget(value: string): { prefix: string; number: number; suffix: string } {
  if (value.includes("→")) {
    return { prefix: "7→", number: 12, suffix: "%" };
  }

  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };

  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const parsed = useRef(parseTarget(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { prefix, number, suffix } = parsed.current;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: number,
      duration: 1.5,
      ease: "power1.out",
      onUpdate: () => {
        const rounded = Number.isInteger(number)
          ? Math.round(obj.val)
          : Math.round(obj.val * 10) / 10;
        setDisplay(`${prefix}${rounded}${suffix}`);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
