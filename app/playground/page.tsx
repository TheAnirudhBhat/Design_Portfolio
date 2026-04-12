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
      <div className="tablet:hidden h-[108px] flex items-end px-[24px] pb-[16px]">
        <h1 className="text-[24px] leading-[32px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.48px]">Playground</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto px-[24px] desktop:px-[48px] pt-[48px] mb-[32px]">
        <ScrollReveal>
          <h1 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)]">Playground</h1>
          <p className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.7)] mt-[16px]">Experiments, explorations, and side projects.</p>
        </ScrollReveal>
      </div>

      {/* Cards */}
      <div className="px-[24px] tablet:max-w-[1280px] tablet:mx-auto desktop:px-[48px]">
        {/* Mobile: DLS section header */}
        <div className="tablet:hidden">
          <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
            <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">Experiments</span>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] tablet:grid tablet:grid-cols-2 desktop:grid-cols-3 tablet:gap-[24px] mt-[16px] tablet:mt-0">
          {experiments.map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 0.05}>
              <div className="dls-card overflow-hidden">
                <div
                  className="h-[140px] tablet:h-[180px]"
                  style={{ background: `linear-gradient(135deg, ${exp.accent}15, ${exp.accent}05)` }}
                />
                <div className="p-[24px]">
                  <h3 className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] mb-[4px]">{exp.title}</h3>
                  <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)]">{exp.description}</p>
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
