"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  metric: string;
  tags: string;
  slug: string;
  coverImage: string;
  index: number;
}

const gradients: Record<string, string> = {
  lens: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  epfo: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "upi-onboarding":
    "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2332 100%)",
  xtra: "linear-gradient(135deg, #1b1b2f 0%, #162447 50%, #1f4068 100%)",
};

export default function ProjectCard({
  title,
  metric,
  tags,
  slug,
  coverImage,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={cardRef}
      href={`/work/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-dw-surface transition-all duration-500 ease-out hover:-translate-y-1"
      style={{
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-end p-6"
            style={{ background: gradients[slug] || gradients.lens }}
          >
            <span className="text-sm font-light tracking-wider text-white/20">
              {title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dw-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium text-dw-text">{title}</h3>
          <span className="shrink-0 text-sm font-medium text-dw-accent">
            {metric}
          </span>
        </div>
        <p className="mt-2 text-xs font-light tracking-wider text-dw-muted">
          {tags}
        </p>
      </div>

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,214,10,0.1), 0 8px 40px rgba(0,0,0,0.3)",
        }}
      />
    </Link>
  );
}
