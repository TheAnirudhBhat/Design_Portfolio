# Homepage Polish — Fluid, Modern, Minimal

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix visual bugs (clipped cards, empty thumbnails) and elevate the homepage to feel fluid, modern, and minimal.

**Architecture:** All changes are component-level edits — no new pages, no new libraries. We improve what exists: better card visuals, tighter spacing, richer micro-interactions, and a merged impact+footer section to reduce visual noise.

**Tech Stack:** Next.js (App Router), Tailwind CSS, GSAP, Framer Motion (already installed but unused on homepage)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/home/ProjectCard.tsx` | Modify | Fix clipping, add gradient placeholders, hover lift animation |
| `components/home/SelectedWork.tsx` | Modify | Adjust grid gap, add stagger polish |
| `components/home/Identity.tsx` | Modify | Add divider, tighten spacing, refine typography |
| `components/home/Impact.tsx` | Modify | Merge with contact into combined footer section |
| `components/home/Contact.tsx` | Modify | Redesign as compact footer with accent CTA button |
| `components/home/Hero.tsx` | Modify | Add subtle fade-to-bg gradient at bottom for seamless scroll |
| `app/globals.css` | Modify | Add utility classes for new hover/gradient effects |
| `app/page.tsx` | Modify | Remove separate Impact, replace Contact with merged footer |
| `components/home/Footer.tsx` | Create | Combined impact metrics + contact + copyright |

---

### Task 1: Fix ProjectCard — Gradient Placeholders + Hover Polish

**Files:**
- Modify: `components/home/ProjectCard.tsx`

The cards currently show empty dark divs because `coverImage` is `""`. We'll add per-project gradient placeholders and a polished hover state (y-lift + subtle border glow).

- [ ] **Step 1: Replace ProjectCard with fixed version**

Replace the full contents of `components/home/ProjectCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify in browser**

Run: open `http://localhost:3000` and scroll to Selected Work section.
Expected: Cards show gradient backgrounds, titles visible bottom-left, hover lifts card up with glow.

- [ ] **Step 3: Commit**

```bash
git add components/home/ProjectCard.tsx
git commit -m "fix: gradient placeholders + hover polish for project cards"
```

---

### Task 2: Polish SelectedWork Grid

**Files:**
- Modify: `components/home/SelectedWork.tsx`

Increase grid gap for breathing room, refine the stagger animation timing.

- [ ] **Step 1: Update SelectedWork component**

In `components/home/SelectedWork.tsx`, make these changes:

1. Change grid gap from `gap-6` to `gap-5 md:gap-8`
2. Change section padding from `py-32` to `py-24`
3. Change heading margin from `mb-16` to `mb-12`
4. Update GSAP stagger from `0.1` to `0.15` and duration from `0.8` to `1.0`

- [ ] **Step 2: Verify in browser**

Expected: Grid has more breathing room, cards animate in with slightly more staggered entrance.

- [ ] **Step 3: Commit**

```bash
git add components/home/SelectedWork.tsx
git commit -m "style: refine work grid spacing and stagger timing"
```

---

### Task 3: Refine Identity Section

**Files:**
- Modify: `components/home/Identity.tsx`

Add a subtle horizontal divider line at the top to create visual rhythm between hero and identity. Tighten desktop height.

- [ ] **Step 1: Update Identity component**

In `components/home/Identity.tsx`:

1. Add a centered divider line at the top of the section (thin, 48px wide, white/10 opacity)
2. Change desktop height from `md:h-[70vh]` to `md:h-[60vh]`
3. Change section padding from `py-24` to `pt-16 pb-24`
4. Increase mobile text size from `text-sm` to `text-base` and gap from `gap-8` to `gap-6`

The divider markup (first child inside section):

```tsx
<div className="mx-auto mb-16 h-px w-12 bg-white/10" />
```

- [ ] **Step 2: Verify in browser**

Expected: Thin line divider appears between hero and identity. Section feels tighter and more intentional.

- [ ] **Step 3: Commit**

```bash
git add components/home/Identity.tsx
git commit -m "style: add divider + tighten identity section spacing"
```

---

### Task 4: Hero Bottom Fade

**Files:**
- Modify: `components/home/Hero.tsx`

Add a gradient fade at the bottom of the hero so the ocean background blends smoothly into the dark content below.

- [ ] **Step 1: Add fade gradient to Hero**

In `components/home/Hero.tsx`, add this div as the last child inside the `<section>` (before the closing `</section>` tag, after the `<style jsx>` block):

```tsx
{/* Bottom fade */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dw-bg to-transparent" />
```

- [ ] **Step 2: Verify in browser**

Expected: Bottom of hero fades smoothly into the dark background instead of a hard cut.

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "style: add bottom fade gradient to hero section"
```

---

### Task 5: Create Merged Footer (Impact + Contact)

**Files:**
- Create: `components/home/Footer.tsx`
- Modify: `app/page.tsx`

Merge the Impact metrics and Contact section into one cohesive footer. This reduces the number of distinct sections and feels more modern — impact stats become a quiet flex row above the contact CTA.

- [ ] **Step 1: Create Footer component**

Create `components/home/Footer.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "+18%", label: "First txn rate" },
  { value: "7→12%", label: "EPFO conversion" },
  { value: "+30%", label: "Retention" },
  { value: "₹150Cr+", label: "AUM managed" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".footer-fade");
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative mt-16 border-t border-white/5">
      {/* Impact metrics strip */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="footer-fade">
              <CountUp
                value={metric.value}
                className="block text-2xl font-bold text-dw-accent md:text-3xl"
              />
              <p className="mt-1 text-xs font-light tracking-wider text-dw-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="footer-fade flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-dw-text md:text-3xl">
              Let&apos;s talk
            </h2>
            <MagneticButton
              as="a"
              href="mailto:coolanirudh3@gmail.com"
              className="mt-3 inline-block text-base font-medium text-dw-accent underline underline-offset-4 decoration-dw-accent/30 hover:decoration-dw-accent transition-colors duration-300"
            >
              coolanirudh3@gmail.com
            </MagneticButton>
          </div>

          <div className="footer-fade flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/daw4ve/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dw-muted transition-colors duration-300 hover:text-dw-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://dribbble.com/DaW4ve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dw-muted transition-colors duration-300 hover:text-dw-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.174 10.174 0 004.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.15 10.15 0 006.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248A65.473 65.473 0 007.337 3.1 10.16 10.16 0 001.964 9.915zM9.06 2.4c.668.94 2.278 3.3 3.565 5.885 3.392-1.272 4.83-3.2 4.986-3.42A10.15 10.15 0 0012 1.84c-1.025 0-2.016.152-2.94.56zm9.8 3.58c-.18.227-1.744 2.26-5.263 3.694.236.48.465.97.678 1.46.075.172.15.344.22.515 3.39-.425 6.753.26 7.09.326-.02-2.25-.84-4.32-2.726-5.995z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-fade mt-16 border-t border-white/5 pt-6">
          <p className="text-xs text-dw-muted/40">
            &copy; {new Date().getFullYear()} Anirudh Bhat. Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update page.tsx to use Footer**

Replace `app/page.tsx` contents:

```tsx
import Hero from "@/components/home/Hero";
import Identity from "@/components/home/Identity";
import SelectedWork from "@/components/home/SelectedWork";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <SelectedWork />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Impact metrics appear as a compact strip at top of footer. Contact CTA below. Social links on right. Clean, one unified footer section.

- [ ] **Step 4: Commit**

```bash
git add components/home/Footer.tsx app/page.tsx
git commit -m "feat: merge impact + contact into unified footer"
```

---

### Task 6: Global CSS Polish

**Files:**
- Modify: `app/globals.css`

Add smooth scroll-snap hints and refine selection highlight.

- [ ] **Step 1: Add utility styles**

At the end of `app/globals.css`, add:

```css
/* Smooth hover transitions globally */
a, button {
  transition: color 0.3s ease, opacity 0.3s ease;
}

/* Card gradient overlay utility */
.card-gradient-overlay {
  background: linear-gradient(to top, rgba(10, 10, 15, 0.6), transparent);
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add global transition and card overlay utilities"
```

---

### Task 7: Final Visual QA in Browser

- [ ] **Step 1: Full-page screenshot review**

Take a full-page screenshot and verify:
- Hero fades smoothly into identity section
- Identity has divider line, balanced spacing
- Work cards show gradient backgrounds, no clipping
- Hover states work (lift + glow)
- Footer shows impact metrics + contact in one section
- No layout overflow on any section

- [ ] **Step 2: Fix any visual issues found**

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "polish: final visual QA fixes"
```
