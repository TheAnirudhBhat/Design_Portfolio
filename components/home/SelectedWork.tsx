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
    image: "/images/projects/lens-cover.jpg",
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
    image: "/images/projects/upi-cover.jpg",
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
    image: "/images/projects/epfo-cover.jpg",
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
    image: "/images/projects/xtra-cover.jpg",
    tags: ["Savings", "Banking"],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-[80px] tablet:py-[120px] px-[24px]">
      <div className="max-w-[1080px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[48px] tablet:mb-[64px]">
            Selected Work
          </h2>
        </ScrollReveal>

        {/* Bento grid — first project large, rest in 2-col */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[16px] tablet:gap-[20px]">
          {/* Hero card — spans full width */}
          <div className="tablet:col-span-2">
            <ScrollReveal>
              <ProjectCard {...projects[0]} size="large" />
            </ScrollReveal>
          </div>

          {/* Remaining cards — 2-col grid */}
          {projects.slice(1).map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.05}>
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
