"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/mdx";

interface CaseStudyLayoutProps {
  frontmatter: ProjectFrontmatter;
  children: React.ReactNode;
}

export default function CaseStudyLayout({
  frontmatter,
  children,
}: CaseStudyLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(el.querySelector(".cs-title"), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        el.querySelector(".cs-subtitle"),
        { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        el.querySelectorAll(".cs-meta > *"),
        { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
        "-=0.3"
      );
  }, []);

  return (
    <article className="pt-24">
      <div ref={heroRef} className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-dw-muted transition-colors hover:text-dw-accent"
        >
          <span>&larr;</span> Back
        </Link>

        <h1 className="cs-title text-4xl font-bold tracking-tight md:text-6xl">
          {frontmatter.title}
        </h1>
        <p className="cs-subtitle mt-4 text-lg text-dw-muted md:text-xl">
          {frontmatter.subtitle}
        </p>

        <div className="cs-meta mt-8 flex flex-wrap gap-6 text-sm text-dw-muted">
          <div>
            <span className="text-dw-muted/50">Role</span>
            <p className="mt-1 text-dw-text">{frontmatter.role}</p>
          </div>
          <div>
            <span className="text-dw-muted/50">Company</span>
            <p className="mt-1 text-dw-text">{frontmatter.company}</p>
          </div>
          <div>
            <span className="text-dw-muted/50">Timeline</span>
            <p className="mt-1 text-dw-text">{frontmatter.timeline}</p>
          </div>
          <div>
            <span className="text-dw-muted/50">Impact</span>
            <p className="mt-1 font-medium text-dw-accent">
              {frontmatter.metric}
            </p>
          </div>
        </div>
      </div>

      {frontmatter.coverImage && (
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-dw-muted prose-p:font-light prose-p:leading-relaxed prose-strong:text-dw-text prose-a:text-dw-accent prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-dw-surface px-3 py-1 text-xs text-dw-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
