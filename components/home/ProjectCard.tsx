"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  role: string;
  href: string;
  accent?: string;
  impact?: string;
  impactLabel?: string;
  tags?: string[];
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
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <motion.article
        className="dls-card overflow-hidden group cursor-pointer"
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col tablet:flex-row">
          <div
            className="w-full tablet:w-[280px] desktop:w-[340px] h-[200px] tablet:h-auto shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)` }}
          >
            <div className="w-full h-full flex items-center justify-center min-h-[200px] tablet:min-h-[260px]">
              <span className="text-[48px] font-medium opacity-10" style={{ color: accent }}>
                {title.charAt(0)}
              </span>
            </div>
          </div>

          <div className="flex-1 p-[24px] tablet:p-[32px] flex flex-col justify-center">
            <h3 className="text-[24px] leading-[32px] font-medium text-[rgba(0,0,0,0.9)] mb-[8px]">
              {title}
            </h3>
            <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] mb-[20px] max-w-[400px]">
              {subtitle}
            </p>

            {impact && (
              <div className="mb-[20px]">
                <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] mb-[4px]">Impact:</p>
                <p className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.9)]">
                  {impact}
                  {impactLabel && (
                    <span className="text-[14px] leading-[20px] font-normal text-[rgba(0,0,0,0.5)] ml-[8px]">
                      {impactLabel}
                    </span>
                  )}
                </p>
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-[8px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-full text-[12px] leading-[16px] font-medium text-[rgba(0,0,0,0.5)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
