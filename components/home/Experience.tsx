"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const timeline = [
  {
    company: "slice",
    role: "Senior Product Designer",
    period: "Jan 2026 — Present",
    location: "Bengaluru",
    description: "Designing UPI payments, credit, and savings products for young India. Leading 0→1 builds across Payments and Core pods.",
    highlights: ["UPI Payments", "Credit Cards", "Savings (FDs)", "Design System"],
  },
  {
    company: "MobiKwik",
    role: "Lead Product Designer",
    period: "2024 — 2026",
    location: "Gurgaon",
    description: "Led design for investing, lending, and PFM verticals. Shipped LENS, Xtra 2.0, EPFO Dashboard.",
    highlights: ["₹150Cr+ AUM", "12% Conversion", "+30% Retention"],
  },
  {
    company: "MobiKwik",
    role: "Product Designer",
    period: "2022 — 2024",
    location: "Gurgaon",
    description: "Designed UPI onboarding, recharge flows, and first version of the design system. 50+ components, ~80% adoption.",
    highlights: ["+18% First Txn Rate", "Design System", "4.5x Onboarding"],
  },
  {
    company: "Freelance",
    role: "UI/UX Designer",
    period: "2020 — 2022",
    location: "Remote",
    description: "Worked with early-stage startups on product design, branding, and design systems.",
    highlights: ["D2C", "Branding", "Slyricly"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-[80px] tablet:py-[120px] px-[24px]">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[56px]">
            Experience
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] tablet:left-[11px] top-[8px] bottom-[8px] w-[1px] bg-[rgba(0,0,0,0.08)]" />

          <div className="space-y-[48px]">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex gap-[24px] tablet:gap-[32px]">
                  {/* Dot */}
                  <div className="relative shrink-0 mt-[8px]">
                    <div
                      className={`w-[15px] h-[15px] tablet:w-[23px] tablet:h-[23px] rounded-full border-[2px] ${
                        i === 0
                          ? "border-[#D30AD7] bg-[#D30AD7]/10"
                          : "border-[rgba(0,0,0,0.15)] bg-white"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-[8px]">
                    <div className="flex flex-col tablet:flex-row tablet:items-baseline tablet:justify-between gap-[4px] mb-[8px]">
                      <div>
                        <h3 className="text-[18px] leading-[24px] font-medium text-[rgba(0,0,0,0.9)]">
                          {item.role}
                        </h3>
                        <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)]">
                          {item.company} · {item.location}
                        </p>
                      </div>
                      <span className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] tracking-[0.02em] font-medium shrink-0">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[14px] leading-[22px] text-[rgba(0,0,0,0.5)] mb-[12px]">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-[6px]">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-[10px] py-[3px] rounded-full text-[11px] leading-[16px] font-medium text-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.06)]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
