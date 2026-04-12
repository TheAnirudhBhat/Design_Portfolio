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
    <section id="work" className="px-[24px] pt-[16px] tablet:pt-[48px]">
      {/* Mobile: DLS section header */}
      <div className="tablet:hidden">
        <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px] mb-0">
          <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">
            Selected work
          </span>
        </div>
      </div>

      {/* Desktop: section label */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto mb-[32px]">
        <ScrollReveal>
          <h2 className="text-[24px] leading-[32px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.48px]">Selected work</h2>
        </ScrollReveal>
      </div>

      {/* Project grid */}
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-[16px] tablet:grid tablet:grid-cols-2 tablet:gap-[24px]">
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
