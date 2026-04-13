"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  {
    title: "Design",
    skills: ["Product Design", "UX Research", "Interaction Design", "Visual Design", "Design Systems", "Prototyping", "Information Architecture"],
  },
  {
    title: "Tools",
    skills: ["Figma", "ProtoPie", "Framer", "Spline", "Blender", "Adobe CC", "VS Code", "Claude Code"],
  },
  {
    title: "Domain",
    skills: ["UPI Payments", "Credit Cards", "Savings & FDs", "Lending", "KYC / Compliance", "Onboarding Flows", "Retention"],
  },
  {
    title: "Analytics",
    skills: ["Mixpanel", "CleverTap", "MS Clarity", "A/B Testing", "Conversion Optimization", "Funnel Analysis"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-[80px] tablet:py-[120px] px-[24px] bg-[#FAFAFA]">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[48px]">
            Skills & Expertise
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[40px]">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.05}>
              <div>
                <h3 className="text-[12px] leading-[16px] font-medium text-[rgba(0,0,0,0.3)] tracking-[0.1em] uppercase mb-[16px]">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-[6px]">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-[12px] py-[6px] rounded-[10px] text-[13px] leading-[16px] font-medium text-[rgba(0,0,0,0.7)] bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
