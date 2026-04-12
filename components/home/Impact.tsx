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
    <section className="px-[24px] pt-[16px] tablet:pt-[48px]">
      {/* Mobile: DLS list items */}
      <div className="tablet:hidden">
        <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
          <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">
            Impact
          </span>
        </div>
        <div className="divide-y divide-[rgba(0,0,0,0.05)]">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between py-[16px]">
              <span className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">{m.label}</span>
              <span className="text-[16px] leading-[20px] font-medium text-[#D30AD7]">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal metrics */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-4 gap-[24px] py-[32px] border-t border-b border-[rgba(0,0,0,0.05)]">
            {metrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.05}>
                <div className="text-center">
                  <p className="text-[48px] leading-[56px] font-medium tracking-[-0.48px] text-[#D30AD7] mb-[8px]">{m.value}</p>
                  <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] tracking-[0.28px]">{m.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
