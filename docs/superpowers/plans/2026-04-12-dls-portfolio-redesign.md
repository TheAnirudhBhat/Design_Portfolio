# DLS Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the dawave portfolio with slice DLS 2.0 visual system — DLS-native on mobile (360px), web portfolio on desktop (1280px+), responsive tablet transition.

**Architecture:** Next.js App Router with Tailwind CSS v4 remapped to DLS tokens. Framer Motion for subtle transitions. Lenis for smooth scroll. Mobile-first responsive design. All current Three.js/GSAP/custom interaction code removed.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4 (DLS tokens), Framer Motion, Lenis, MDX

**Spec:** `docs/superpowers/specs/2026-04-10-dls-portfolio-redesign.md`

---

## File Map

### Delete
- `components/canvas/NoiseBackground.tsx`
- `components/canvas/shaders/noise.vert`
- `components/canvas/shaders/noise.frag`
- `components/ui/CustomCursor.tsx`
- `components/ui/MagneticButton.tsx`
- `components/ui/CountUp.tsx`
- `components/ui/TextReveal.tsx`
- `lib/animations.ts`
- `types/glsl.d.ts`

### Create
- `components/ui/ScrollReveal.tsx` — Framer Motion scroll-triggered fade+lift
- `components/layout/BottomNav.tsx` — DLS floating dock nav (mobile only)
- `components/layout/GestureNav.tsx` — DLS gesture indicator bar (mobile only)

### Rewrite (full replacement)
- `app/globals.css` — DLS token CSS custom properties
- `tailwind.config.ts` — DLS token mapping
- `app/layout.tsx` — remove Three.js canvas, update font to Rubik
- `app/page.tsx` — DLS home page composition
- `components/layout/Nav.tsx` — responsive DLS nav
- `components/home/Hero.tsx` — DLS-styled hero
- `components/home/ProjectCard.tsx` — DLS card styling
- `components/home/SelectedWork.tsx` — DLS card grid
- `components/home/Footer.tsx` — DLS footer
- `components/home/Contact.tsx` — DLS contact section
- `components/home/Impact.tsx` — DLS metrics section
- `app/about/page.tsx` — DLS about page
- `app/work/[slug]/page.tsx` — DLS case study page
- `app/playground/page.tsx` — DLS playground page
- `components/work/CaseStudyLayout.tsx` — DLS case study layout

### Modify
- `package.json` — remove deps, add Rubik font
- `next.config.ts` — remove GLSL webpack loader
- `components/layout/SmoothScroll.tsx` — remove GSAP, keep Lenis
- `components/layout/PageTransition.tsx` — simplify to Framer Motion only

### Keep As-Is
- `lib/mdx.ts`
- `content/projects/*.mdx`
- `postcss.config.mjs`
- `tsconfig.json`
- `eslint.config.mjs`

---

### Task 1: Clean Up — Remove Three.js, GSAP, and Heavy Deps

**Files:**
- Delete: `components/canvas/NoiseBackground.tsx`, `components/canvas/shaders/noise.vert`, `components/canvas/shaders/noise.frag`, `components/ui/CustomCursor.tsx`, `components/ui/MagneticButton.tsx`, `components/ui/CountUp.tsx`, `components/ui/TextReveal.tsx`, `lib/animations.ts`, `types/glsl.d.ts`
- Modify: `package.json`, `next.config.ts`

- [ ] **Step 1: Delete removed files**

```bash
cd /Users/anirudhbhat/dawave-portfolio
rm -f components/canvas/NoiseBackground.tsx
rm -rf components/canvas/shaders
rmdir components/canvas 2>/dev/null || true
rm -f components/ui/CustomCursor.tsx
rm -f components/ui/MagneticButton.tsx
rm -f components/ui/CountUp.tsx
rm -f components/ui/TextReveal.tsx
rm -f lib/animations.ts
rm -f types/glsl.d.ts
```

- [ ] **Step 2: Remove heavy packages**

```bash
cd /Users/anirudhbhat/dawave-portfolio
npm uninstall three @react-three/fiber @types/three gsap @gsap/react @liquidglass/react
```

- [ ] **Step 3: Simplify next.config.ts — remove GLSL loader**

Replace entire file with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
```

- [ ] **Step 4: Verify the app still builds**

```bash
cd /Users/anirudhbhat/dawave-portfolio
npm run build 2>&1 | head -30
```

Expected: Build errors about missing imports in files that reference deleted components. That's fine — we'll rewrite those files in subsequent tasks.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Three.js, GSAP, and heavy interaction deps

Drop NoiseBackground, CustomCursor, MagneticButton, CountUp, TextReveal.
Remove three, @react-three/fiber, gsap, @gsap/react, @liquidglass/react.
Simplify next.config.ts (no GLSL loader)."
```

---

### Task 2: DLS Token System — Tailwind Config + Global CSS

**Files:**
- Rewrite: `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Rewrite tailwind.config.ts with DLS tokens**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D30AD7",
          dark: "#A808AB",
        },
        surface: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5",
          tertiary: "#EBEBEB",
          card: "#FFFFFF",
        },
        text: {
          primary: "rgba(0,0,0,0.9)",
          secondary: "rgba(0,0,0,0.7)",
          tertiary: "rgba(0,0,0,0.5)",
          disabled: "rgba(0,0,0,0.3)",
        },
        "on-color": {
          primary: "#FFFFFF",
          secondary: "rgba(255,255,255,0.7)",
          tertiary: "rgba(255,255,255,0.5)",
        },
        outline: {
          bold: "rgba(0,0,0,0.15)",
          subtle: "rgba(0,0,0,0.05)",
        },
        positive: "#00A63E",
        negative: "#E63741",
        warning: "#FF9800",
        info: "#2196F3",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      spacing: {
        "3xs": "2px",
        "2xs": "4px",
        xs: "8px",
        s: "12px",
        m: "16px",
        l: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "64px",
      },
      borderRadius: {
        xs: "4px",
        s: "8px",
        m: "16px",
        l: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 32px rgba(0,0,0,0.05)",
        elevated: "0 4px 12px rgba(0,0,0,0.12)",
        high: "0 8px 24px rgba(0,0,0,0.16)",
        "nav-active": "0 0 16px rgba(0,0,0,0.12)",
      },
      fontSize: {
        display: [
          "48px",
          { lineHeight: "56px", fontWeight: "500", letterSpacing: "-0.48px" },
        ],
        h1: ["32px", { lineHeight: "40px", fontWeight: "500" }],
        h2: [
          "24px",
          { lineHeight: "32px", fontWeight: "500", letterSpacing: "0.48px" },
        ],
        h3: ["20px", { lineHeight: "24px", fontWeight: "500" }],
        h4: ["16px", { lineHeight: "20px", fontWeight: "500" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0.28px",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0.24px",
          },
        ],
        metadata: ["10px", { lineHeight: "12px", fontWeight: "400" }],
      },
      screens: {
        phone: "360px",
        tablet: "768px",
        desktop: "1280px",
        wide: "1536px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

- [ ] **Step 2: Rewrite app/globals.css with DLS foundation**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Rubik", sans-serif;

  /* DLS Colors */
  --color-brand: #D30AD7;
  --color-brand-dark: #A808AB;
  --color-surface-primary: #FFFFFF;
  --color-surface-secondary: #F5F5F5;
  --color-surface-tertiary: #EBEBEB;
  --color-text-primary: rgba(0,0,0,0.9);
  --color-text-secondary: rgba(0,0,0,0.7);
  --color-text-tertiary: rgba(0,0,0,0.5);
  --color-text-disabled: rgba(0,0,0,0.3);
  --color-on-color-primary: #FFFFFF;
  --color-outline-bold: rgba(0,0,0,0.15);
  --color-outline-subtle: rgba(0,0,0,0.05);
  --color-positive: #00A63E;
  --color-negative: #E63741;

  /* DLS Spacing */
  --spacing-3xs: 2px;
  --spacing-2xs: 4px;
  --spacing-xs: 8px;
  --spacing-s: 12px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 40px;
  --spacing-3xl: 48px;
  --spacing-4xl: 64px;

  /* DLS Radii */
  --radius-xs: 4px;
  --radius-s: 8px;
  --radius-m: 16px;
  --radius-l: 24px;

  /* DLS Shadows */
  --shadow-card: 0 2px 32px rgba(0,0,0,0.05);
  --shadow-elevated: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-high: 0 8px 24px rgba(0,0,0,0.16);
}

/* Base reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
}

/* Selection */
::selection {
  background: rgba(211, 10, 215, 0.15);
  color: var(--color-text-primary);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--color-surface-secondary);
}
::-webkit-scrollbar-thumb {
  background: var(--color-text-disabled);
  border-radius: var(--radius-full);
}

/* DLS utility classes */
.dls-card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-outline-subtle);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-card);
}

.dls-divider-big {
  height: 8px;
  background: var(--color-surface-secondary);
  width: 100%;
}

.dls-divider {
  height: 1px;
  background: var(--color-outline-subtle);
  width: 100%;
}

/* Prose overrides for case studies */
.prose {
  --tw-prose-body: var(--color-text-primary);
  --tw-prose-headings: var(--color-text-primary);
  --tw-prose-links: var(--color-brand);
  --tw-prose-bold: var(--color-text-primary);
  --tw-prose-counters: var(--color-text-tertiary);
  --tw-prose-bullets: var(--color-text-tertiary);
  --tw-prose-quotes: var(--color-text-secondary);
  --tw-prose-code: var(--color-brand);
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add DLS 2.0 token system to Tailwind config + globals

Rubik font, brand purple, DLS spacing/radii/shadows/type scale.
CSS custom properties for runtime access. DLS utility classes."
```

---

### Task 3: Utility Components — ScrollReveal, BottomNav, GestureNav

**Files:**
- Create: `components/ui/ScrollReveal.tsx`, `components/layout/BottomNav.tsx`, `components/layout/GestureNav.tsx`

- [ ] **Step 1: Create ScrollReveal component**

```tsx
// components/ui/ScrollReveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 12,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create GestureNav component**

```tsx
// components/layout/GestureNav.tsx
"use client";

export default function GestureNav() {
  return (
    <div className="flex justify-center py-xs w-full tablet:hidden">
      <div className="w-[128px] h-[4px] rounded-full bg-text-disabled" />
    </div>
  );
}
```

- [ ] **Step 3: Create BottomNav component**

```tsx
// components/layout/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pods = [
  { name: "Home", href: "/", icon: "⌂" },
  { name: "Work", href: "/work", icon: "◈" },
  { name: "About", href: "/about", icon: "○" },
  { name: "Play", href: "/playground", icon: "△" },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 tablet:hidden">
      {/* Gradient fade */}
      <div className="bg-gradient-to-b from-transparent to-white pt-l">
        {/* Nav items */}
        <div className="flex items-center justify-center gap-l px-l pb-xs">
          {pods.map((pod) => (
            <Link
              key={pod.href}
              href={pod.href}
              className={`
                flex items-center justify-center rounded-full transition-all duration-200
                ${
                  isActive(pod.href)
                    ? "size-[64px] bg-white shadow-nav-active"
                    : "size-[40px] bg-black/10"
                }
              `}
            >
              <span
                className={`
                  ${isActive(pod.href) ? "text-[32px]" : "text-[20px]"}
                  leading-none
                `}
              >
                {pod.icon}
              </span>
            </Link>
          ))}
        </div>
        {/* Gesture nav */}
        <div className="flex justify-center py-xs">
          <div className="w-[128px] h-[4px] rounded-full bg-text-disabled" />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/ScrollReveal.tsx components/layout/BottomNav.tsx components/layout/GestureNav.tsx
git commit -m "feat: add DLS utility components — ScrollReveal, BottomNav, GestureNav

ScrollReveal: Framer Motion fade+lift on scroll.
BottomNav: DLS floating dock nav, mobile only.
GestureNav: 128x4px indicator bar, mobile only."
```

---

### Task 4: Layout Shell — Nav, SmoothScroll, PageTransition, Root Layout

**Files:**
- Rewrite: `components/layout/Nav.tsx`, `app/layout.tsx`
- Modify: `components/layout/SmoothScroll.tsx`, `components/layout/PageTransition.tsx`

- [ ] **Step 1: Rewrite Nav.tsx — responsive DLS navigation**

```tsx
// components/layout/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Playground", href: "/playground" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="hidden tablet:block sticky top-0 z-50 bg-surface-primary/80 backdrop-blur-md border-b border-outline-subtle">
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-[64px] px-l desktop:px-3xl">
        {/* Logo */}
        <Link
          href="/"
          className="font-medium text-h4 text-text-primary tracking-wide"
        >
          dawave
        </Link>

        {/* Links */}
        <div className="flex items-center gap-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-xs"
            >
              <span
                className={`text-body-sm font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {link.name}
              </span>
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand rounded-full"
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Simplify SmoothScroll.tsx — remove GSAP**

```tsx
// components/layout/SmoothScroll.tsx
"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 3: Simplify PageTransition.tsx**

```tsx
// components/layout/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Rewrite app/layout.tsx — Rubik font, no Three.js**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import BottomNav from "@/components/layout/BottomNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "dawave — Product Designer",
  description: "Senior Product Designer at slice. Designing UPI payments and banking products for young India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-surface-primary text-text-primary">
        <SmoothScroll>
          <Nav />
          <PageTransition>
            <main className="min-h-screen pb-[140px] tablet:pb-0">
              {children}
            </main>
          </PageTransition>
          <BottomNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx components/layout/SmoothScroll.tsx components/layout/PageTransition.tsx app/layout.tsx
git commit -m "feat: DLS layout shell — responsive nav, simplified scroll + transitions

Desktop: sticky top nav with brand underline indicator.
Mobile: hidden (BottomNav handles it).
Removed GSAP from SmoothScroll, simplified PageTransition.
Root layout: Rubik font, no Three.js canvas."
```

---

### Task 5: Home Page — Hero

**Files:**
- Rewrite: `components/home/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
// components/home/Hero.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section className="px-l pt-m tablet:pt-3xl desktop:pt-4xl">
      {/* Mobile: DLS L0 card style */}
      <div className="tablet:hidden">
        <div className="dls-card p-l">
          <ScrollReveal>
            <p className="text-body-sm font-medium text-text-tertiary tracking-wide mb-l">
              Senior Product Designer
            </p>
            <h1 className="text-display text-text-primary mb-m">
              Anirudh Bhat
            </h1>
            <p className="text-body text-text-secondary mb-l">
              Designing UPI payments and banking products for young India at slice.
            </p>
            <div className="flex gap-xs">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-m py-xs bg-brand rounded-full text-body-sm font-medium text-on-color-primary"
              >
                View work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-m py-xs border border-outline-bold rounded-full text-body-sm font-medium text-text-primary"
              >
                Get in touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Tablet + Desktop: web hero */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="py-4xl">
            <p className="text-body-sm font-medium text-text-tertiary tracking-wide mb-l">
              Senior Product Designer · slice
            </p>
            <h1 className="text-[clamp(48px,6vw,80px)] font-medium leading-[1.1] tracking-tight text-text-primary mb-xl">
              Designing payments<br />
              for young India
            </h1>
            <p className="text-h3 text-text-secondary max-w-[560px] mb-xl">
              I design UPI payments, banking, and credit products used by millions. Currently at slice.
            </p>
            <div className="flex gap-s">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-l py-s bg-brand rounded-full text-body-sm font-medium text-on-color-primary hover:bg-brand-dark transition-colors duration-150"
              >
                View work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-l py-s border border-outline-bold rounded-full text-body-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors duration-150"
              >
                Get in touch
              </a>
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
git commit -m "feat: DLS hero — card style on mobile, full-width on desktop"
```

---

### Task 6: Home Page — ProjectCard + SelectedWork

**Files:**
- Rewrite: `components/home/ProjectCard.tsx`, `components/home/SelectedWork.tsx`

- [ ] **Step 1: Rewrite ProjectCard.tsx**

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
}

export default function ProjectCard({
  title,
  subtitle,
  role,
  href,
  accent = "var(--color-brand)",
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <motion.article
        className="dls-card overflow-hidden group cursor-pointer"
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Cover area */}
        <div
          className="h-[180px] tablet:h-[220px] desktop:h-[260px] w-full"
          style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }}
        >
          {/* nanobanana-generated cover will go here */}
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-h1 opacity-10" style={{ color: accent }}>
              {title.charAt(0)}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-l">
          <p className="text-body-sm font-medium text-text-tertiary mb-2xs">
            {role}
          </p>
          <h3 className="text-h3 text-text-primary mb-xs">{title}</h3>
          <p className="text-body-sm text-text-secondary">{subtitle}</p>
        </div>
      </motion.article>
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite SelectedWork.tsx**

```tsx
// components/home/SelectedWork.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "LENS",
    subtitle: "Reimagining credit card management for slice users",
    role: "Product Designer · slice",
    href: "/work/lens",
    accent: "#D30AD7",
  },
  {
    title: "EPFO",
    subtitle: "Simplifying provident fund withdrawals for millions",
    role: "Product Designer · slice",
    href: "/work/epfo",
    accent: "#2196F3",
  },
  {
    title: "UPI Onboarding",
    subtitle: "Making first UPI payments frictionless for young India",
    role: "Product Designer · slice",
    href: "/work/upi-onboarding",
    accent: "#00A63E",
  },
  {
    title: "Xtra",
    subtitle: "Designing the savings experience for first-time investors",
    role: "Product Designer · slice",
    href: "/work/xtra",
    accent: "#FF9800",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="px-l pt-m tablet:pt-3xl">
      {/* Mobile: DLS section header */}
      <div className="tablet:hidden">
        <div className="py-s bg-surface-secondary -mx-l px-l mb-0">
          <span className="text-body-sm font-medium text-text-tertiary">
            Selected work
          </span>
        </div>
      </div>

      {/* Desktop: section label */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto mb-xl">
        <ScrollReveal>
          <h2 className="text-h2 text-text-primary">Selected work</h2>
        </ScrollReveal>
      </div>

      {/* Project grid */}
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-m tablet:grid tablet:grid-cols-2 tablet:gap-l">
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
git commit -m "feat: DLS project cards + selected work grid

Cards: DLS card styling with hover elevation.
Mobile: vertical stack. Desktop: 2-col grid.
Dummy data for 4 projects with accent colors."
```

---

### Task 7: Home Page — Impact, Contact, Footer + Page Composition

**Files:**
- Rewrite: `components/home/Impact.tsx`, `components/home/Contact.tsx`, `components/home/Footer.tsx`, `app/page.tsx`
- Delete (absorbed into other components): `components/home/Identity.tsx`

- [ ] **Step 1: Rewrite Impact.tsx**

```tsx
// components/home/Impact.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const metrics = [
  { value: "4+", label: "Years in fintech" },
  { value: "3", label: "Products shipped" },
  { value: "10M+", label: "Users impacted" },
  { value: "50+", label: "Screens designed" },
];

export default function Impact() {
  return (
    <section className="px-l pt-m tablet:pt-3xl">
      {/* Mobile: DLS list items */}
      <div className="tablet:hidden">
        <div className="py-s bg-surface-secondary -mx-l px-l">
          <span className="text-body-sm font-medium text-text-tertiary">
            Impact
          </span>
        </div>
        <div className="divide-y divide-outline-subtle">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between py-m">
              <span className="text-h4 text-text-primary">{m.label}</span>
              <span className="text-h4 text-brand">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal metrics */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-4 gap-l py-xl border-t border-b border-outline-subtle">
            {metrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.05}>
                <div className="text-center">
                  <p className="text-display text-brand mb-xs">{m.value}</p>
                  <p className="text-body-sm text-text-tertiary">{m.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite Contact.tsx**

```tsx
// components/home/Contact.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="px-l pt-m tablet:pt-3xl">
      {/* Mobile: DLS list items */}
      <div className="tablet:hidden">
        <div className="py-s bg-surface-secondary -mx-l px-l">
          <span className="text-body-sm font-medium text-text-tertiary">
            Get in touch
          </span>
        </div>
        <a href="mailto:hello@dawave.in" className="flex items-center gap-s py-m border-b border-outline-subtle">
          <div className="size-[40px] rounded-full bg-brand/10 flex items-center justify-center">
            <span className="text-brand text-body">✉</span>
          </div>
          <div className="flex-1">
            <p className="text-h4 text-text-primary">Email</p>
            <p className="text-caption text-text-tertiary">hello@dawave.in</p>
          </div>
        </a>
        <a href="https://linkedin.com" className="flex items-center gap-s py-m border-b border-outline-subtle">
          <div className="size-[40px] rounded-full bg-info/10 flex items-center justify-center">
            <span className="text-info text-body">in</span>
          </div>
          <div className="flex-1">
            <p className="text-h4 text-text-primary">LinkedIn</p>
            <p className="text-caption text-text-tertiary">linkedin.com/in/anirudh</p>
          </div>
        </a>
      </div>

      {/* Desktop */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto py-4xl">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-h1 text-text-primary mb-m">Let's work together</h2>
            <p className="text-h3 text-text-secondary mb-xl">
              Always open to interesting projects and conversations.
            </p>
            <a
              href="mailto:hello@dawave.in"
              className="inline-flex items-center justify-center px-xl py-m bg-brand rounded-full text-h4 font-medium text-on-color-primary hover:bg-brand-dark transition-colors duration-150"
            >
              Say hello
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite Footer.tsx**

```tsx
// components/home/Footer.tsx
"use client";

import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Playground", href: "/playground" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="hidden tablet:block border-t border-outline-subtle mt-4xl">
      <div className="max-w-[1280px] mx-auto px-l desktop:px-3xl py-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-xl">
            <span className="text-h4 font-medium text-text-primary">dawave</span>
            <div className="flex gap-l">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-l">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <p className="text-caption text-text-disabled mt-l">
          Built with slice DLS 2.0 · Designed & coded by Anirudh Bhat
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Delete Identity.tsx and rewrite app/page.tsx**

```bash
rm -f components/home/Identity.tsx
```

```tsx
// app/page.tsx
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import Impact from "@/components/home/Impact";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Impact />
      <Contact />
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: DLS home page — impact metrics, contact, footer

Mobile: DLS list items + section headers.
Desktop: horizontal metrics, centered CTA, minimal footer.
Removed Identity.tsx (merged into Hero)."
```

---

### Task 8: About Page

**Files:**
- Rewrite: `app/about/page.tsx`

- [ ] **Step 1: Rewrite about page**

```tsx
// app/about/page.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GestureNav from "@/components/layout/GestureNav";

const experience = [
  { company: "slice", role: "Senior Product Designer", period: "2022 — Present" },
  { company: "MobiKwik", role: "Product Designer", period: "2020 — 2022" },
  { company: "Freelance", role: "UI/UX Designer", period: "2018 — 2020" },
];

const tools = [
  "Figma", "VS Code", "Claude Code", "Framer", "Principle", "Jira", "Mixpanel", "Notion",
];

export default function AboutPage() {
  return (
    <div>
      {/* Mobile app bar */}
      <div className="tablet:hidden">
        <div className="h-[108px] flex items-end px-l pb-m">
          <h1 className="text-h2 text-text-primary">About</h1>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto px-l desktop:px-3xl pt-3xl">
        <ScrollReveal>
          <h1 className="text-[clamp(32px,4vw,48px)] font-medium leading-tight text-text-primary mb-xl">
            Designing products that<br />make money feel simple
          </h1>
        </ScrollReveal>
      </div>

      {/* Bio section */}
      <div className="px-l tablet:max-w-[1280px] tablet:mx-auto desktop:px-3xl">
        {/* Mobile: DLS section */}
        <div className="tablet:hidden">
          <div className="dls-divider-big -mx-l" />
          <div className="py-s bg-surface-secondary -mx-l px-l">
            <span className="text-body-sm font-medium text-text-tertiary">Bio</span>
          </div>
          <div className="py-m">
            <p className="text-body text-text-secondary mb-m">
              I'm a product designer with 4+ years of experience in fintech. Currently at slice, I design UPI payments, savings, and credit products for young India.
            </p>
            <p className="text-body text-text-secondary">
              I believe great financial products should feel invisible — simple enough that anyone can use them, powerful enough that they change lives.
            </p>
          </div>
        </div>

        {/* Desktop: 2 column */}
        <div className="hidden tablet:grid tablet:grid-cols-[1fr_1px_1fr] tablet:gap-xl tablet:pt-xl">
          <ScrollReveal>
            <div>
              <p className="text-h3 text-text-secondary mb-m leading-relaxed">
                I'm a product designer with 4+ years of experience in fintech. Currently at slice, I design UPI payments, savings, and credit products for young India.
              </p>
              <p className="text-body text-text-secondary leading-relaxed">
                I believe great financial products should feel invisible — simple enough that anyone can use them, powerful enough that they change lives.
              </p>
            </div>
          </ScrollReveal>

          <div className="bg-outline-subtle" />

          <div>
            {/* Experience */}
            <ScrollReveal delay={0.1}>
              <h3 className="text-body-sm font-medium text-text-tertiary mb-l">Experience</h3>
              <div className="space-y-l mb-xl">
                {experience.map((exp) => (
                  <div key={exp.company}>
                    <p className="text-h4 text-text-primary">{exp.company}</p>
                    <p className="text-body-sm text-text-secondary">{exp.role}</p>
                    <p className="text-caption text-text-tertiary">{exp.period}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tools */}
            <ScrollReveal delay={0.15}>
              <h3 className="text-body-sm font-medium text-text-tertiary mb-l">Tools</h3>
              <div className="flex flex-wrap gap-xs">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-s py-2xs bg-surface-secondary rounded-s text-body-sm text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Mobile: Experience list */}
      <div className="tablet:hidden px-l">
        <div className="dls-divider-big -mx-l" />
        <div className="py-s bg-surface-secondary -mx-l px-l">
          <span className="text-body-sm font-medium text-text-tertiary">Experience</span>
        </div>
        {experience.map((exp, i) => (
          <div key={exp.company} className={`py-m ${i < experience.length - 1 ? "border-b border-outline-subtle" : ""}`}>
            <div className="flex items-center gap-s">
              <div className="size-[40px] rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-brand text-body-sm font-medium">{exp.company.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="text-h4 text-text-primary">{exp.company}</p>
                <p className="text-caption text-text-tertiary">{exp.role} · {exp.period}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="dls-divider-big -mx-l" />
        <div className="py-s bg-surface-secondary -mx-l px-l">
          <span className="text-body-sm font-medium text-text-tertiary">Tools</span>
        </div>
        <div className="flex flex-wrap gap-xs py-m">
          {tools.map((tool) => (
            <span key={tool} className="px-s py-2xs bg-surface-secondary rounded-s text-body-sm text-text-secondary">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <GestureNav />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: DLS about page — DLS list items on mobile, 2-col on desktop

Mobile: section headers, list items with avatars, tool chips.
Desktop: 2-column editorial layout with divider."
```

---

### Task 9: Work Detail Page + Case Study Layout

**Files:**
- Rewrite: `app/work/[slug]/page.tsx`, `components/work/CaseStudyLayout.tsx`

- [ ] **Step 1: Rewrite CaseStudyLayout.tsx**

```tsx
// components/work/CaseStudyLayout.tsx
import GestureNav from "@/components/layout/GestureNav";
import Link from "next/link";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  role: string;
  company: string;
  timeline: string;
  metric?: string;
  tags?: string[];
  children: React.ReactNode;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  role,
  company,
  timeline,
  metric,
  tags,
  children,
}: CaseStudyLayoutProps) {
  const details = [
    { label: "Role", value: role },
    { label: "Company", value: company },
    { label: "Timeline", value: timeline },
    ...(metric ? [{ label: "Impact", value: metric }] : []),
  ];

  return (
    <article>
      {/* Mobile app bar */}
      <div className="tablet:hidden h-[108px] flex items-end px-l pb-m">
        <Link href="/" className="text-h4 text-text-tertiary mr-xs">←</Link>
        <h1 className="text-h4 text-text-primary">Work</h1>
      </div>

      {/* Cover placeholder */}
      <div className="w-full h-[200px] tablet:h-[360px] desktop:h-[480px] bg-gradient-to-br from-brand/5 to-brand/15" />

      {/* Header */}
      <div className="px-l tablet:max-w-[720px] tablet:mx-auto desktop:max-w-[800px]">
        <div className="py-l tablet:py-xl">
          <h1 className="text-h1 tablet:text-[clamp(32px,4vw,48px)] text-text-primary mb-xs">{title}</h1>
          <p className="text-body text-text-secondary">{subtitle}</p>
        </div>

        {/* Details — mobile: list items, desktop: inline */}
        <div className="tablet:hidden">
          <div className="dls-divider" />
          {details.map((d, i) => (
            <div key={d.label} className={`flex justify-between py-m ${i < details.length - 1 ? "border-b border-outline-subtle" : ""}`}>
              <span className="text-body-sm text-text-tertiary">{d.label}</span>
              <span className="text-body-sm font-medium text-text-primary">{d.value}</span>
            </div>
          ))}
        </div>
        <div className="hidden tablet:flex tablet:gap-xl tablet:py-l tablet:border-y tablet:border-outline-subtle">
          {details.map((d) => (
            <div key={d.label}>
              <p className="text-caption text-text-tertiary mb-2xs">{d.label}</p>
              <p className="text-body-sm font-medium text-text-primary">{d.value}</p>
            </div>
          ))}
        </div>

        {/* MDX content */}
        <div className="prose prose-lg max-w-none py-xl">
          {children}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-xs pb-xl">
            {tags.map((tag) => (
              <span key={tag} className="px-s py-2xs bg-surface-secondary rounded-s text-caption text-text-tertiary">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="tablet:hidden px-l py-s border-t border-outline-subtle">
        <Link
          href="/"
          className="w-full flex items-center justify-center py-s bg-brand rounded-full text-body-sm font-medium text-on-color-primary"
        >
          Back to home
        </Link>
      </div>

      <GestureNav />
    </article>
  );
}
```

- [ ] **Step 2: Rewrite work/[slug]/page.tsx**

```tsx
// app/work/[slug]/page.tsx
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CaseStudyLayout from "@/components/work/CaseStudyLayout";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return (
    <CaseStudyLayout
      title={project.frontmatter.title}
      subtitle={project.frontmatter.subtitle}
      role={project.frontmatter.role}
      company={project.frontmatter.company}
      timeline={project.frontmatter.timeline}
      metric={project.frontmatter.metric}
      tags={project.frontmatter.tags}
    >
      <MDXRemote source={project.content} />
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/work/CaseStudyLayout.tsx app/work/\[slug\]/page.tsx
git commit -m "feat: DLS case study layout — mobile list items, desktop prose

Mobile: DLS app bar, detail list items, full-width CTA.
Desktop: centered prose, inline metadata, generous margins."
```

---

### Task 10: Playground Page

**Files:**
- Rewrite: `app/playground/page.tsx`

- [ ] **Step 1: Rewrite playground page**

```tsx
// app/playground/page.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import GestureNav from "@/components/layout/GestureNav";

const experiments = [
  { title: "Motion Studies", description: "Exploring micro-interactions for fintech flows", accent: "#D30AD7" },
  { title: "Type Explorations", description: "Playing with Rubik at extreme scales", accent: "#2196F3" },
  { title: "Color Systems", description: "Generative color palette experiments", accent: "#00A63E" },
  { title: "Layout Grids", description: "Adaptive grid systems for card-based UIs", accent: "#FF9800" },
];

export default function PlaygroundPage() {
  return (
    <div>
      {/* Mobile app bar */}
      <div className="tablet:hidden h-[108px] flex items-end px-l pb-m">
        <h1 className="text-h2 text-text-primary">Playground</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto px-l desktop:px-3xl pt-3xl mb-xl">
        <ScrollReveal>
          <h1 className="text-h1 text-text-primary">Playground</h1>
          <p className="text-h3 text-text-secondary mt-m">Experiments, explorations, and side projects.</p>
        </ScrollReveal>
      </div>

      {/* Cards */}
      <div className="px-l tablet:max-w-[1280px] tablet:mx-auto desktop:px-3xl">
        {/* Mobile: DLS section header */}
        <div className="tablet:hidden">
          <div className="py-s bg-surface-secondary -mx-l px-l">
            <span className="text-body-sm font-medium text-text-tertiary">Experiments</span>
          </div>
        </div>

        <div className="flex flex-col gap-m tablet:grid tablet:grid-cols-2 desktop:grid-cols-3 tablet:gap-l mt-m tablet:mt-0">
          {experiments.map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 0.05}>
              <div className="dls-card overflow-hidden">
                <div
                  className="h-[140px] tablet:h-[180px]"
                  style={{ background: `linear-gradient(135deg, ${exp.accent}15, ${exp.accent}05)` }}
                />
                <div className="p-l">
                  <h3 className="text-h4 text-text-primary mb-2xs">{exp.title}</h3>
                  <p className="text-body-sm text-text-secondary">{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <GestureNav />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/playground/page.tsx
git commit -m "feat: DLS playground page — experiment cards

Mobile: vertical stack with DLS section header.
Desktop: 2-3 column grid with DLS cards."
```

---

### Task 11: Final Polish — Verify Build, Responsive Check

**Files:**
- No new files — verification only

- [ ] **Step 1: Run build and fix any errors**

```bash
cd /Users/anirudhbhat/dawave-portfolio
npm run build
```

Fix any TypeScript or import errors that surface. Common issues:
- Old imports referencing deleted components
- Missing type exports from `lib/mdx.ts`
- Tailwind class names not resolving (check config)

- [ ] **Step 2: Run dev server and visual check**

```bash
npm run dev
```

Open in browser at `localhost:3000`. Check:
- Home page at 360px, 768px, 1280px
- About page at all breakpoints
- A case study page at all breakpoints
- Playground at all breakpoints
- Navigation works (bottom nav on mobile, top nav on tablet+)
- Page transitions work (fade + lift)
- Smooth scroll works

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "fix: resolve build errors and polish responsive behavior"
```

---

## Summary

| Task | What | Files Changed |
|------|------|--------------|
| 1 | Clean up — remove heavy deps | Delete 9 files, modify 2 |
| 2 | DLS token system | Rewrite 2 (tailwind + globals) |
| 3 | Utility components | Create 3 |
| 4 | Layout shell | Rewrite/modify 4 |
| 5 | Hero | Rewrite 1 |
| 6 | ProjectCard + SelectedWork | Rewrite 2 |
| 7 | Impact + Contact + Footer + page.tsx | Rewrite 4, delete 1 |
| 8 | About page | Rewrite 1 |
| 9 | Work detail + CaseStudy layout | Rewrite 2 |
| 10 | Playground | Rewrite 1 |
| 11 | Build verify + responsive polish | Fix any issues |

**Total: 11 tasks, ~25 files touched, estimated 11 commits.**
