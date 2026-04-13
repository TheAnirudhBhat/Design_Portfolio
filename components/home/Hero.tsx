"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const brands = ["slice", "MobiKwik"];

const headlineLines = [
  "I design payments that",
  "make money feel simple,",
  "for young India.",
];

const wordAnimation = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: 0.3 + i * 0.04,
    },
  }),
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay,
    },
  }),
};

function MeshBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y, opacity }}
    >
      {/* Mesh gradient — layered radial gradients for aurora effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(211,10,215,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 60%, rgba(33,150,243,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 40%, rgba(0,166,62,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 80%, rgba(255,152,0,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated floating blob 1 — magenta */}
      <motion.div
        className="absolute w-[500px] h-[500px] tablet:w-[700px] tablet:h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(211,10,215,0.18) 0%, rgba(211,10,215,0.05) 40%, transparent 70%)",
          top: "-10%",
          right: "-5%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated floating blob 2 — blue */}
      <motion.div
        className="absolute w-[400px] h-[400px] tablet:w-[600px] tablet:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(33,150,243,0.14) 0%, rgba(33,150,243,0.03) 45%, transparent 70%)",
          bottom: "0%",
          left: "-10%",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated floating blob 3 — green, subtle */}
      <motion.div
        className="absolute w-[300px] h-[300px] tablet:w-[450px] tablet:h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,166,62,0.10) 0%, transparent 60%)",
          top: "20%",
          left: "25%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 25, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG noise grain overlay on top of gradients */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" opacity="0.08" />
      </svg>

      {/* Fine grid — Swiss-style structure */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  let wordIndex = 0;

  return (
    <section className="relative min-h-[90vh] tablet:min-h-screen flex flex-col items-center justify-center px-[24px]">
      <MeshBackground />

      <div className="relative max-w-[960px] mx-auto text-center z-10">
        <motion.h1
          className="text-[clamp(32px,5.5vw,64px)] font-medium leading-[1.1] tracking-[-0.02em] text-[rgba(0,0,0,0.9)] mb-[24px]"
          initial="hidden"
          animate="visible"
        >
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.split(" ").map((word, wIdx) => {
                const currentIndex = wordIndex++;
                return (
                  <span
                    key={wIdx}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      variants={wordAnimation}
                      custom={currentIndex}
                    >
                      {word}
                    </motion.span>
                    {wIdx < line.split(" ").length - 1 && (
                      <span className="inline-block w-[0.3em]" />
                    )}
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.45)] max-w-[480px] mx-auto mb-[40px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
        >
          Senior Product Designer at slice, shaping UPI payments
          <br className="hidden tablet:block" />
          and banking products. 4+ years in fintech.
        </motion.p>

        <motion.div
          className="flex gap-[16px] justify-center mb-[64px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.85}
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center px-[28px] py-[13px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white tracking-[0.28px] hover:bg-[#A808AB] hover:shadow-[0_0_24px_rgba(211,10,215,0.3)] transition-all duration-200"
          >
            View work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-[28px] py-[13px] border border-[rgba(0,0,0,0.12)] rounded-full text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.8)] tracking-[0.28px] hover:bg-[rgba(0,0,0,0.03)] hover:border-[rgba(0,0,0,0.2)] transition-all duration-200"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-[12px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
        >
          <p className="text-[11px] leading-[16px] text-[rgba(0,0,0,0.25)] tracking-[0.15em] uppercase">
            Previously at
          </p>
          <div className="flex items-center gap-[32px]">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.35)]"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px]"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.3}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(0,0,0,0.2)]">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-[24px] bg-[rgba(0,0,0,0.12)] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
