"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  {
    value: "10M+",
    description: "Users across UPI payments, savings, and credit products at slice",
    project: "LENS",
    href: "/work/lens",
  },
  {
    value: "4.5x",
    description: "Faster onboarding completion for first-time UPI users in young India",
    project: "UPI Onboarding",
    href: "/work/upi-onboarding",
  },
];

export default function Impact() {
  return (
    <section className="py-[64px] tablet:py-[100px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[64px] tablet:mb-[64px]">
            Product Impact
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[48px] tablet:gap-[64px]">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.value} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <p className="text-[clamp(48px,8vw,72px)] font-medium leading-[1] text-[#D30AD7] mb-[16px]">
                  {stat.value}
                </p>
                <p className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] max-w-[300px] mb-[16px]">
                  {stat.description}
                </p>
                <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] mb-[4px]">
                  for {stat.project}
                </p>
                <a
                  href={stat.href}
                  className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] underline underline-offset-2 decoration-[rgba(0,0,0,0.3)] hover:decoration-[rgba(0,0,0,0.9)] transition-colors duration-150"
                >
                  Read case study
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
