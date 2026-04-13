"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CharacterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "-15%"]);

  return (
    <section id="about" ref={ref} className="py-[80px] tablet:py-[120px] px-[24px]">
      <div className="max-w-[800px] mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-[1fr_1.2fr] gap-[40px] tablet:gap-[56px] items-start">
          {/* Image */}
          <ScrollReveal>
            <div className="relative w-full h-[280px] tablet:h-[360px] rounded-[20px] overflow-hidden">
              <motion.img
                src="/images/character-hero.jpg"
                alt="Design workspace"
                className="w-full h-[120%] object-cover"
                style={{ y: imageY }}
              />
              <div className="absolute inset-0 grain-texture opacity-[0.04]" />
            </div>
          </ScrollReveal>

          {/* Bio text */}
          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[20px]">
                About
              </h2>
              <p className="text-[16px] leading-[26px] text-[rgba(0,0,0,0.6)] mb-[16px]">
                I&apos;m a product designer with 4+ years in fintech, currently at slice designing UPI payments, savings, and credit products for young India.
              </p>
              <p className="text-[16px] leading-[26px] text-[rgba(0,0,0,0.6)] mb-[24px]">
                I believe great financial products should feel invisible — simple enough that anyone can use them, powerful enough that they change lives. I obsess over conversion funnels, interaction details, and making complex flows feel effortless.
              </p>
              <div className="flex gap-[8px]">
                <span className="px-[12px] py-[5px] rounded-full text-[12px] font-medium text-[rgba(0,0,0,0.5)] border border-[rgba(0,0,0,0.08)]">
                  Bengaluru, IN
                </span>
                <span className="px-[12px] py-[5px] rounded-full text-[12px] font-medium text-[#00A63E] border border-[#00A63E]/20 flex items-center gap-[5px]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00A63E] animate-pulse" />
                  Open to projects
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
