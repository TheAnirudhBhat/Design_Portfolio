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
        <div className="h-[108px] flex items-end px-[24px] pb-[16px]">
          <h1 className="text-[24px] leading-[32px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.48px]">About</h1>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto px-[24px] desktop:px-[48px] pt-[48px]">
        <ScrollReveal>
          <h1 className="text-[clamp(32px,4vw,48px)] font-medium leading-tight text-[rgba(0,0,0,0.9)] mb-[32px]">
            Designing products that<br />make money feel simple
          </h1>
        </ScrollReveal>
      </div>

      {/* Content */}
      <div className="px-[24px] tablet:max-w-[1280px] tablet:mx-auto desktop:px-[48px]">
        {/* Mobile: DLS sections */}
        <div className="tablet:hidden">
          <div className="h-[8px] bg-[#F5F5F5] -mx-[24px]" />
          <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
            <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">Bio</span>
          </div>
          <div className="py-[16px]">
            <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.7)] mb-[16px]">
              I'm a product designer with 4+ years of experience in fintech. Currently at slice, I design UPI payments, savings, and credit products for young India.
            </p>
            <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.7)]">
              I believe great financial products should feel invisible — simple enough that anyone can use them, powerful enough that they change lives.
            </p>
          </div>

          <div className="h-[8px] bg-[#F5F5F5] -mx-[24px]" />
          <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
            <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">Experience</span>
          </div>
          {experience.map((exp, i) => (
            <div key={exp.company} className={`py-[16px] ${i < experience.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : ""}`}>
              <div className="flex items-center gap-[12px]">
                <div className="size-[40px] rounded-full bg-[rgba(211,10,215,0.1)] flex items-center justify-center">
                  <span className="text-[#D30AD7] text-[14px] leading-[20px] font-medium">{exp.company.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">{exp.company}</p>
                  <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)]">{exp.role} · {exp.period}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="h-[8px] bg-[#F5F5F5] -mx-[24px]" />
          <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
            <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">Tools</span>
          </div>
          <div className="flex flex-wrap gap-[8px] py-[16px]">
            {tools.map((tool) => (
              <span key={tool} className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-[8px] text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)]">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: 2 column */}
        <div className="hidden tablet:grid tablet:grid-cols-[1fr_1px_1fr] tablet:gap-[32px] tablet:pt-[32px]">
          <ScrollReveal>
            <div>
              <p className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.7)] mb-[16px]" style={{ lineHeight: "1.6" }}>
                I'm a product designer with 4+ years of experience in fintech. Currently at slice, I design UPI payments, savings, and credit products for young India.
              </p>
              <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.7)]" style={{ lineHeight: "1.6" }}>
                I believe great financial products should feel invisible — simple enough that anyone can use them, powerful enough that they change lives.
              </p>
            </div>
          </ScrollReveal>

          <div className="bg-[rgba(0,0,0,0.05)]" />

          <div>
            <ScrollReveal delay={0.1}>
              <h3 className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px] mb-[24px]">Experience</h3>
              <div className="space-y-[24px] mb-[32px]">
                {experience.map((exp) => (
                  <div key={exp.company}>
                    <p className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">{exp.company}</p>
                    <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)]">{exp.role}</p>
                    <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)]">{exp.period}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px] mb-[24px]">Tools</h3>
              <div className="flex flex-wrap gap-[8px]">
                {tools.map((tool) => (
                  <span key={tool} className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-[8px] text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)]">
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <GestureNav />
    </div>
  );
}
