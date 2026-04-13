# Portfolio Redesign — DLS 2.0 Visual System

**Date:** 2026-04-10
**Author:** Anirudh Bhat (with Claude)
**Status:** Approved
**Purpose:** Rebuild the dawave portfolio website using slice DLS 2.0 design language. DLS-native on mobile, web portfolio on desktop. Dummy content — visual system only.

---

## Problem

Current portfolio uses a dark ocean theme (Three.js, GSAP, custom shaders) that's impressive but disconnected from Anirudh's actual design work at slice. Rebuilding it with DLS 2.0 makes a stronger statement: "I designed this system, and I built my own site with it."

## Design Philosophy

- **Phone (360px):** Feels like a slice app — DLS components literally
- **Tablet (768px):** Transitional — DLS tokens, 2-column layouts
- **Desktop (1280px+):** Web portfolio — DLS tokens but composed as a proper portfolio site
- **Content is dummy** — focus entirely on visual system, layout, responsiveness
- **Motion is restrained** — DLS-native: subtle transitions, clean fades, no ocean/3D/custom cursor

## Tech Stack

### Keep
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS v4
- Lenis smooth scroll
- Framer Motion (page transitions + scroll reveals)
- MDX for case studies (dummy content)

### Drop
- Three.js / @react-three/fiber / GLSL shaders
- GSAP + ScrollTrigger
- CustomCursor component
- MagneticButton component
- NoiseBackground (ocean)

### Add
- nanobanana Claude skill for generating hero art, case study covers, section graphics
- DLS token system in Tailwind config

## Tailwind Config — DLS Token Mapping

```js
// Remapped to slice DLS 2.0
theme: {
  colors: {
    brand: '#D30AD7',
    'brand-dark': '#A808AB',
    bg: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      tertiary: '#EBEBEB',
    },
    text: {
      primary: 'rgba(0,0,0,0.9)',
      secondary: 'rgba(0,0,0,0.7)',
      tertiary: 'rgba(0,0,0,0.5)',
      disabled: 'rgba(0,0,0,0.3)',
    },
    'on-color': {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
      tertiary: 'rgba(255,255,255,0.5)',
    },
    outline: {
      bold: 'rgba(0,0,0,0.15)',
      subtle: 'rgba(0,0,0,0.05)',
    },
    positive: '#00A63E',
    negative: '#E63741',
    warning: '#FF9800',
    info: '#2196F3',
  },
  fontFamily: {
    sans: ['Rubik', 'sans-serif'],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
  },
  spacing: {
    '3xs': '2px',
    '2xs': '4px',
    'xs': '8px',
    's': '12px',
    'm': '16px',
    'l': '24px',
    'xl': '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
  },
  borderRadius: {
    none: '0',
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    full: '9999px',
  },
  boxShadow: {
    card: '0 2px 32px rgba(0,0,0,0.05)',
    elevated: '0 4px 12px rgba(0,0,0,0.12)',
    high: '0 8px 24px rgba(0,0,0,0.16)',
  },
  fontSize: {
    // DLS type scale
    'display': ['48px', { lineHeight: '56px', fontWeight: '500', letterSpacing: '-0.48px' }],
    'h1': ['32px', { lineHeight: '40px', fontWeight: '500' }],
    'h2': ['24px', { lineHeight: '32px', fontWeight: '500', letterSpacing: '0.48px' }],
    'h3': ['20px', { lineHeight: '24px', fontWeight: '500' }],
    'h4': ['16px', { lineHeight: '20px', fontWeight: '500' }],
    'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
    'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
    'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
    'metadata': ['10px', { lineHeight: '12px', fontWeight: '400' }],
  },
}
```

## Pages & Sections

### 1. Home (/)

#### Phone (360px) — DLS Native
```
┌─────────────────────────┐
│ App bar/L0              │  "dawave" + avatar
│─────────────────────────│
│ L0 card/Large           │  Hero: name, tagline, CTA
│                         │
│ L0 card/Medium          │  Featured project #1
│ L0 card/Medium          │  Featured project #2
│                         │
│ Section header (List)   │  "impact"
│ List item/Standard      │  Metric row (4+ years, 3 products...)
│ List item/Standard      │  Metric row
│─────────────────────────│
│ Section header (List)   │  "get in touch"
│ List item/Standard      │  Email link
│ List item/Standard      │  LinkedIn link
│─────────────────────────│
│ Bottom nav              │  home / work / about / play
└─────────────────────────┘
```

#### Tablet (768px)
- App bar becomes horizontal nav: "dawave" logo left, links right
- Hero card spans full width, larger type
- Projects in 2-column grid (DLS card styling)
- Metrics in 2-column list
- Footer with contact links

#### Desktop (1280px+)
- Horizontal nav with generous padding
- Hero: full-width section, display-size type (48px+), brand accent CTA
- Projects: 2-3 column grid of DLS-styled cards with hover states
- Impact metrics: horizontal row with CountUp animations
- Contact: clean CTA section with primary button
- Footer: minimal, links row

### 2. About (/about)

#### Phone (360px)
```
┌─────────────────────────┐
│ App bar/Standard        │  ← back + "about"
│─────────────────────────│
│ Top header              │  Photo + name
│ Divider/Big             │
│ Section header (List)   │  "bio"
│ Body text               │  2-3 paragraphs
│ Divider/Big             │
│ Section header (List)   │  "experience"
│ List item/Standard      │  slice — Senior Product Designer
│ List item/Standard      │  MobiKwik — Product Designer
│ Divider/Big             │
│ Section header (List)   │  "tools"
│ List item (icon)        │  Figma, VS Code, etc.
│─────────────────────────│
│ Gesture nav             │
└─────────────────────────┘
```

#### Desktop
- 2-column layout: bio left, experience timeline right
- Tools as a grid of icon cards
- Photo larger, perhaps with brand accent border

### 3. Work/[slug] (/work/lens, etc.)

#### Phone (360px)
```
┌─────────────────────────┐
│ App bar/Standard        │  ← back + "work"
│─────────────────────────│
│ Cover image (full-bleed)│  nanobanana-generated art
│ Top header              │  Project title + subtitle
│ Section header (List)   │  "overview"
│ Body text               │  Description
│ Divider/Big             │
│ Section header (List)   │  "role & details"
│ List item/Standard      │  Role: Product Designer
│ List item/Standard      │  Company: slice
│ List item/Standard      │  Timeline: 2024
│ Divider/Big             │
│ Section header (List)   │  "process"
│ Body text + images      │  Case study content
│─────────────────────────│
│ Button group            │  "Next project" CTA
│ Gesture nav             │
└─────────────────────────┘
```

#### Desktop
- Full-width cover image
- Structured content with generous margins (max-width 720px prose)
- Sidebar with project metadata
- Image gallery sections at full bleed
- Next/prev project navigation

### 4. Playground (/playground)

#### Phone (360px)
```
┌─────────────────────────┐
│ App bar/Standard        │  ← back + "playground"
│─────────────────────────│
│ Section header (List)   │  "experiments"
│ L0 card/Medium          │  Experiment card
│ L0 card/Medium          │  Experiment card
│ L0 card/Medium          │  Experiment card
│─────────────────────────│
│ Gesture nav             │
└─────────────────────────┘
```

#### Desktop
- 3-column grid of experiment cards
- Hover effects (DLS elevation change)

## Responsive Component Mapping

| Mobile (360px) | Tablet (768px) | Desktop (1280px+) |
|----------------|----------------|---------------------|
| App bar/L0 | Horizontal nav | Horizontal nav with generous padding |
| App bar/Standard + back | Horizontal nav + breadcrumb | Same |
| Bottom nav (5 pods) | Hidden — nav is top | Hidden — nav is top |
| Gesture nav (20px) | Hidden | Hidden |
| L0 card/Large | Hero section, wider | Full-width hero with display type |
| L0 card/Medium | Card in 2-col grid | Card in 2-3 col grid |
| Section header (List) | Section label + rule line | Same, wider |
| List item/Standard | Table-like rows | 2-column detail list |
| Button/Primary | Same | Same, possibly larger padding |
| Button group | Sticky footer CTA | Inline CTA in content |
| Divider/Big | Spacer (32px) | Spacer (48-64px) |
| Top header | Larger type hero area | Full hero section |

## Navigation

### Phone
- Bottom nav with 4 items: Home / Work / About / Play
- Maps to DLS Bottom nav component (floating dock style)
- Active state: 64px circle with shadow
- Inactive: 40px circles

### Tablet + Desktop
- Top horizontal nav bar
- Left: "dawave" wordmark in Rubik Medium
- Right: Home, Work, About, Playground links
- Styled with DLS tokens: Rubik 14px Medium, text-secondary, active = text-primary + brand underline
- Sticky on scroll with subtle backdrop blur

## Motion System

Replace GSAP + Three.js with DLS-appropriate motion:

### Transitions
- **Page transitions:** Framer Motion fade + 12px upward lift (200ms ease)
- **Scroll reveals:** Framer Motion `whileInView` — fade up, stagger children by 50ms
- **Hover states:** 150ms ease — subtle scale (1.02) + shadow elevation change on cards
- **Active states:** 100ms — scale(0.98) press feedback on buttons

### Smooth Scroll
- Keep Lenis — lightweight, good UX
- Remove GSAP ScrollTrigger dependency

### Easing
- Default: `[0.25, 0.1, 0.25, 1]` (CSS ease equivalent)
- Entrance: `[0, 0, 0.2, 1]` (ease-out)
- Exit: `[0.4, 0, 1, 1]` (ease-in)

## Asset Generation (nanobanana)

Use nanobanana Claude skill to generate:
1. **Hero background graphic** — abstract, brand-purple tinted, minimal
2. **4 case study cover images** — abstract/geometric art per project theme
3. **About page photo treatment** — stylized portrait frame
4. **Playground experiment thumbnails** — 3-4 abstract cards

Style direction: minimal, geometric, brand-purple accented, no photos of real products (dummy content). Think abstract shapes, gradients, subtle patterns.

## File Changes

### Delete
- `components/canvas/NoiseBackground.tsx` + shaders/
- `components/ui/CustomCursor.tsx`
- `components/ui/MagneticButton.tsx`
- `components/ui/CountUp.tsx` (rebuild simpler version or use CSS counter)
- `components/ui/TextReveal.tsx` (replace with Framer Motion variant)
- `lib/animations.ts` (GSAP constants)
- `types/glsl.d.ts`

### Modify
- `app/globals.css` — replace ocean theme with DLS tokens
- `tailwind.config.ts` — DLS token mapping (see above)
- `app/layout.tsx` — remove Three.js canvas, update font to Rubik
- `app/page.tsx` — rebuild with DLS components
- `app/about/page.tsx` — rebuild
- `app/work/[slug]/page.tsx` — rebuild
- `app/playground/page.tsx` — rebuild
- `components/layout/Nav.tsx` — DLS-styled responsive nav
- `components/layout/SmoothScroll.tsx` — keep Lenis, remove GSAP deps
- `components/home/Hero.tsx` — DLS-styled hero
- `components/home/SelectedWork.tsx` — DLS card grid
- `components/home/ProjectCard.tsx` — DLS card styling
- `components/home/Footer.tsx` — DLS-styled footer
- `components/home/Contact.tsx` — DLS button + list items
- `package.json` — remove three, @react-three/fiber, gsap, @gsap/react

### Add
- `components/ui/ScrollReveal.tsx` — Framer Motion wrapper
- `components/layout/BottomNav.tsx` — DLS bottom nav (mobile only)
- `components/layout/GestureNav.tsx` — DLS gesture indicator (mobile only)

### Keep As-Is
- `components/layout/PageTransition.tsx` — update to use Framer Motion
- `components/work/CaseStudyLayout.tsx` — restyle only
- `content/projects/*.mdx` — dummy content, keep structure
- `lib/mdx.ts` — no changes
- `next.config.ts` — remove GLSL loader config

## Packages

### Remove
```
three @react-three/fiber gsap @gsap/react @liquidglass/react
```

### Keep
```
next react react-dom typescript tailwindcss @tailwindcss/postcss @tailwindcss/typography
lenis framer-motion next-mdx-remote gray-matter
```

## Breakpoint Strategy

```css
/* Phone first (default) */
/* → Tablet */
@media (min-width: 768px) { }
/* → Desktop */
@media (min-width: 1280px) { }
/* → Wide */
@media (min-width: 1536px) { }
```

Mobile-first: all base styles are phone/DLS-native. Breakpoints add/override for larger viewports.

## Success Criteria

- Phone viewport (360px) is visually indistinguishable from a slice app screen
- Desktop viewport is a clean, professional portfolio — no one would say "this looks like a mobile app stretched"
- All colors, fonts, spacing, radii use DLS tokens via Tailwind — zero hardcoded values
- Page transitions are smooth and restrained
- All 4 pages work across all 3 breakpoints
- nanobanana-generated assets are cohesive with brand palette
- Lighthouse performance > 90 (no heavy 3D/shader overhead)
