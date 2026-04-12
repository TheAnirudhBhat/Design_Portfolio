"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  role: string;
  href: string;
  accent?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  role,
  href,
  accent = "#D30AD7",
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <motion.article
        className="dls-card overflow-hidden group cursor-pointer"
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="h-[180px] tablet:h-[220px] desktop:h-[260px] w-full"
          style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[32px] font-medium opacity-10" style={{ color: accent }}>
              {title.charAt(0)}
            </span>
          </div>
        </div>
        <div className="p-[24px]">
          <p className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px] mb-[4px]">
            {role}
          </p>
          <h3 className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.9)] mb-[8px]">{title}</h3>
          <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)]">{subtitle}</p>
        </div>
      </motion.article>
    </Link>
  );
}
