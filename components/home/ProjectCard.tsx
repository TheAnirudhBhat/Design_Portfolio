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
      className="group relative block overflow-hidden rounded-lg bg-dw-surface transition-shadow duration-400"
      style={{
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
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
          <div className="flex h-full w-full items-center justify-center bg-dw-surface text-dw-muted/30 text-sm">
            {title}
          </div>
        )}
        <div className="absolute inset-0 bg-dw-bg/40 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </div>

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

      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,214,10,0.15), 0 0 30px rgba(255,214,10,0.08)",
        }}
      />
    </Link>
  );
}
