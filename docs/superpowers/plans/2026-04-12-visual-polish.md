# Visual Polish — Saurabh-Inspired DLS Portfolio

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the DLS portfolio to match the editorial quality of saurabhdas.framer.website, adapted with DLS 2.0 tokens and brand purple.

**Architecture:** Rework home page layout — centered editorial hero, brand logos, product impact stats, horizontal case study cards, personality-filled footer. Generate character illustration with nanobanana.

**Tech Stack:** Next.js, Tailwind v4 (DLS tokens), Framer Motion, nanobanana (asset generation)

**Reference:** https://saurabhdas.framer.website/

---

## What Changes

### Hero (components/home/Hero.tsx)
- **Before:** Name + subtitle + two buttons
- **After:** Centered bold value proposition headline ("I design payments that make money feel simple, for young India.") + subtitle (role at slice, years experience) + brand logos strip (slice, MobiKwik) + two buttons

### Character Section (NEW: components/home/CharacterSection.tsx)
- Full-width brand purple (#D30AD7) background
- nanobanana-generated character illustration centered
- Fun, approachable, personality moment

### Impact Section (components/home/Impact.tsx)
- **Before:** Simple metric list on mobile, horizontal row on desktop
- **After:** Large centered heading "Product Impact" + 2-3 big stats (like "4+ years", "10M+ users") with descriptions and "Read case study" links underneath each

### Case Study Cards (components/home/ProjectCard.tsx + SelectedWork.tsx)
- **Before:** Vertical cards with gradient placeholder top, text bottom
- **After:** Horizontal cards — preview image/mockup LEFT, text content RIGHT (title, description, impact stat, tags as pills). Full width, stacked vertically. On mobile, stack image on top, text below.

### Footer (components/home/Footer.tsx)
- **Before:** Minimal links bar
- **After:** Full section — name left + "Get in touch" button right + social links + large italic closing quote at bottom ("Designing for a billion Indians, one screen at a time." or similar)

### Typography Polish
- Hero headline: clamp(32px, 5vw, 56px), Rubik Medium, centered
- Section headings: 32px Rubik Medium, centered
- Stat numbers: 48px+ Rubik Medium, brand purple
- Body: 16px Regular, text-secondary
- Tags: 12px Medium in pills with grey bg

### Spacing Polish
- Max content width: 960px (tighter than 1280, more editorial)
- Generous vertical spacing between sections: 80-120px
- Cards have clear breathing room

---

### Task 1: Hero Redesign — Centered Editorial

**Files:**
- Rewrite: `components/home/Hero.tsx`

- [ ] **Step 1: Rewrite Hero with centered editorial layout**

```tsx
// components/home/Hero.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const brands = ["slice", "MobiKwik"];

export default function Hero() {
  return (
    <section className="pt-[64px] tablet:pt-[120px] pb-[48px] tablet:pb-[80px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] tracking-tight text-[rgba(0,0,0,0.9)] mb-[24px]">
            I design payments that<br className="hidden tablet:block" />
            make money feel simple,<br className="hidden tablet:block" />
            for young India.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.5)] max-w-[480px] mx-auto mb-[32px]">
            Senior Product Designer at slice, shaping UPI payments<br className="hidden tablet:block" />
            and banking products. 4+ years in fintech.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-[12px] justify-center mb-[48px]">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-[24px] py-[12px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white tracking-[0.28px] hover:bg-[#A808AB] transition-colors duration-150"
            >
              View work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-[24px] py-[12px] border border-[rgba(0,0,0,0.15)] rounded-full text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.28px] hover:bg-[#F5F5F5] transition-colors duration-150"
            >
              Get in touch
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col items-center gap-[12px]">
            <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] tracking-[0.24px] uppercase">
              Brands I have worked with
            </p>
            <div className="flex items-center gap-[32px]">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.4)]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: centered editorial hero with value proposition + brand logos"
```

---

### Task 2: Character Illustration Section

**Files:**
- Create: `components/home/CharacterSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Generate character illustration with nanobanana**

Use the nanobanana skill to generate:
- A fun, approachable character illustration of a young Indian designer
- Style: modern, clean, slightly 3D/Pixar-like (similar to Saurabh's style)
- Holding a phone or tablet showing a UPI interface
- Warm, friendly expression
- Save to `public/images/character.png`

- [ ] **Step 2: Create CharacterSection component**

```tsx
// components/home/CharacterSection.tsx
"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CharacterSection() {
  return (
    <section className="px-[24px] mb-[80px] tablet:mb-[120px]">
      <ScrollReveal>
        <div className="max-w-[960px] mx-auto">
          <div className="relative w-full h-[280px] tablet:h-[400px] bg-[#D30AD7] rounded-[16px] overflow-hidden flex items-center justify-center">
            {/* Placeholder until nanobanana generates the image */}
            <div className="text-white/20 text-[120px] font-medium">A</div>
            {/* When image is ready:
            <Image
              src="/images/character.png"
              alt="Anirudh Bhat — Product Designer"
              fill
              className="object-contain"
              priority
            />
            */}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 3: Add to page.tsx**

```tsx
// app/page.tsx
import Hero from "@/components/home/Hero";
import CharacterSection from "@/components/home/CharacterSection";
import SelectedWork from "@/components/home/SelectedWork";
import Impact from "@/components/home/Impact";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CharacterSection />
      <Impact />
      <SelectedWork />
      <Contact />
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/home/CharacterSection.tsx app/page.tsx
git commit -m "feat: brand purple character section + reorder home page"
```

---

### Task 3: Product Impact — Large Stats with Case Study Links

**Files:**
- Rewrite: `components/home/Impact.tsx`

- [ ] **Step 1: Rewrite Impact with editorial stats layout**

```tsx
// components/home/Impact.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  {
    value: "10M+",
    description: "Users across UPI payments, savings, and credit products at slice",
    project: "LENS",
    href: "/work/lens",
  },
  {
    value: "4.5x",
    description: "Faster onboarding completion for first-time UPI users in young India",
    project: "UPI Onboarding",
    href: "/work/upi-onboarding",
  },
];

export default function Impact() {
  return (
    <section className="py-[64px] tablet:py-[100px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[48px] tablet:mb-[64px]">
            Product Impact
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[48px] tablet:gap-[64px]">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.value} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <p className="text-[clamp(48px,8vw,72px)] font-medium leading-[1] text-[#D30AD7] mb-[16px]">
                  {stat.value}
                </p>
                <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] max-w-[300px] mb-[16px]">
                  {stat.description}
                </p>
                <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] mb-[4px]">
                  for {stat.project}
                </p>
                <a
                  href={stat.href}
                  className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] underline underline-offset-2 decoration-[rgba(0,0,0,0.3)] hover:decoration-[rgba(0,0,0,0.9)] transition-colors duration-150"
                >
                  Read case study
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Impact.tsx
git commit -m "feat: editorial product impact section with large stats"
```

---

### Task 4: Horizontal Case Study Cards

**Files:**
- Rewrite: `components/home/ProjectCard.tsx`, `components/home/SelectedWork.tsx`

- [ ] **Step 1: Rewrite ProjectCard as horizontal layout**

```tsx
// components/home/ProjectCard.tsx
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
          {/* Preview image area */}
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

          {/* Content */}
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
```

- [ ] **Step 2: Rewrite SelectedWork**

```tsx
// components/home/SelectedWork.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "LENS",
    subtitle: "Built a schema-driven detail page framework that gave structure to credit card management and reduced cognitive load for users.",
    role: "Product Designer · slice",
    href: "/work/lens",
    accent: "#D30AD7",
    impact: "10M+",
    impactLabel: "users impacted",
    tags: ["Product Design", "Credit"],
  },
  {
    title: "UPI Onboarding",
    subtitle: "Redesigned the first-time UPI setup experience to reduce drop-offs and make payments accessible for young India.",
    role: "Product Designer · slice",
    href: "/work/upi-onboarding",
    accent: "#00A63E",
    impact: "4.5x",
    impactLabel: "faster onboarding",
    tags: ["Consumer Fintech", "Payments"],
  },
  {
    title: "EPFO",
    subtitle: "Simplified provident fund withdrawal flows, cutting complexity for millions of first-time digital users.",
    role: "Product Designer · slice",
    href: "/work/epfo",
    accent: "#2196F3",
    impact: "27%",
    impactLabel: "fewer support tickets",
    tags: ["Platform Design", "Banking"],
  },
  {
    title: "Xtra",
    subtitle: "Designed the savings and fixed deposit experience for users new to financial products.",
    role: "Product Designer · slice",
    href: "/work/xtra",
    accent: "#FF9800",
    tags: ["Savings", "Banking"],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-[64px] tablet:py-[100px] px-[24px]">
      <div className="max-w-[960px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] text-center mb-[48px] tablet:mb-[64px]">
            Selected Work
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-[24px] tablet:gap-[32px]">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.05}>
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/ProjectCard.tsx components/home/SelectedWork.tsx
git commit -m "feat: horizontal case study cards with impact stats + tags"
```

---

### Task 5: Footer with Personality

**Files:**
- Rewrite: `components/home/Footer.tsx`

- [ ] **Step 1: Rewrite Footer**

```tsx
// components/home/Footer.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.05)] mt-[40px]">
      <div className="max-w-[960px] mx-auto px-[24px] py-[48px]">
        {/* Top row */}
        <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-[24px] mb-[16px]">
          <span className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.9)]">
            Anirudh Bhat
          </span>
          <div className="flex items-center gap-[24px]">
            <a
              href="mailto:hello@dawave.in"
              className="inline-flex items-center justify-center px-[20px] py-[10px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-[24px] mb-[64px]">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)] transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Closing quote */}
        <ScrollReveal>
          <p className="text-[clamp(24px,4vw,40px)] font-medium leading-[1.2] text-[rgba(0,0,0,0.9)]">
            Designing for a billion Indians,{" "}
            <em className="font-normal italic text-[rgba(0,0,0,0.4)]">one screen at a time.</em>
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Footer.tsx
git commit -m "feat: personality footer with CTA + closing quote"
```

---

### Task 6: Contact Section Polish

**Files:**
- Rewrite: `components/home/Contact.tsx`

- [ ] **Step 1: Simplify Contact — remove mobile-only section (footer handles CTA now)**

```tsx
// components/home/Contact.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-[64px] tablet:py-[100px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[16px]">
            Let&apos;s work together
          </h2>
          <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.5)] mb-[32px]">
            Always open to interesting projects and conversations.
          </p>
          <a
            href="mailto:hello@dawave.in"
            className="inline-flex items-center justify-center px-[32px] py-[14px] bg-[#D30AD7] rounded-full text-[16px] leading-[20px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
          >
            Say hello
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Contact.tsx
git commit -m "feat: clean centered contact CTA section"
```

---

### Task 7: Nav Polish — Add CTA Button

**Files:**
- Modify: `components/layout/Nav.tsx`

- [ ] **Step 1: Add "Get in touch" button to desktop nav**

Add a CTA button after the nav links, matching Saurabh's pattern. Add to the nav's right side:

```tsx
// After the links div, add:
<a
  href="mailto:hello@dawave.in"
  className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[rgba(0,0,0,0.9)] rounded-full text-[14px] leading-[20px] font-medium text-white hover:bg-[rgba(0,0,0,0.7)] transition-colors duration-150"
>
  Get in touch
</a>
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: add CTA button to desktop nav"
```

---

### Task 8: Build Verify + Screenshot

- [ ] **Step 1: Run build**
- [ ] **Step 2: Start dev server, take screenshots at 360px and 1280px**
- [ ] **Step 3: Fix any issues**
- [ ] **Step 4: Final commit**

---

## Summary

| Task | What |
|------|------|
| 1 | Centered editorial hero |
| 2 | Brand purple character section + nanobanana |
| 3 | Large stat product impact |
| 4 | Horizontal case study cards |
| 5 | Footer with personality |
| 6 | Contact polish |
| 7 | Nav CTA button |
| 8 | Build verify |
