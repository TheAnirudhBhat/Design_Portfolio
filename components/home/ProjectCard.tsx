"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  role: string;
  href: string;
  accent?: string;
  impact?: string;
  impactLabel?: string;
  tags?: string[];
  image?: string;
  size?: "large" | "default";
}

export default function ProjectCard({
  title,
  subtitle,
  role,
  href,
  accent = "#D30AD7",
  impact,
  impactLabel,
  tags = [],
  image,
  size = "default",
}: ProjectCardProps) {
  const isLarge = size === "large";
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "-15%"]);

  return (
    <Link href={href} className="block" data-cursor="View Case Study">
      <motion.article
        ref={cardRef}
        className="group cursor-pointer relative overflow-hidden rounded-[20px] bg-[#0A0A0F]"
        style={{ height: isLarge ? "480px" : "380px" }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Background image with parallax + hover scale */}
        <div className="absolute inset-0 overflow-hidden">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-[120%] object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
              style={{ y: imageY }}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }}
            />
          )}
        </div>

        {/* Gradient overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none grain-texture" />

        {/* Content pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-[28px] tablet:p-[36px]">
          {/* Tags — slide up on hover */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-[6px] mb-[16px] translate-y-[8px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-[10px] py-[3px] rounded-full text-[11px] leading-[16px] font-medium text-white/70 border border-white/15 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-medium text-white mb-[6px] ${
              isLarge
                ? "text-[32px] leading-[40px]"
                : "text-[24px] leading-[32px]"
            }`}
          >
            {title}
          </h3>

          {/* Subtitle — visible, slides up slightly on hover */}
          <p className="text-[14px] leading-[20px] text-white/50 max-w-[440px] mb-[16px] group-hover:text-white/70 transition-colors duration-300">
            {subtitle}
          </p>

          {/* Impact metric */}
          {impact && (
            <div className="flex items-baseline gap-[8px]">
              <span
                className="text-[28px] leading-[32px] font-medium"
                style={{ color: accent }}
              >
                {impact}
              </span>
              {impactLabel && (
                <span className="text-[13px] leading-[16px] text-white/40">
                  {impactLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: accent }}
        />
      </motion.article>
    </Link>
  );
}
