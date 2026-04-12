"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section className="px-[24px] pt-[16px] tablet:pt-[48px] desktop:pt-[64px]">
      {/* Mobile: DLS L0 card style */}
      <div className="tablet:hidden">
        <div className="dls-card p-[24px]">
          <ScrollReveal>
            <p className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px] mb-[24px]">
              Senior Product Designer
            </p>
            <h1 className="text-[48px] leading-[56px] font-medium tracking-[-0.48px] text-[rgba(0,0,0,0.9)] mb-[16px]">
              Anirudh Bhat
            </h1>
            <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.7)] mb-[24px]">
              Designing UPI payments and banking products for young India at slice.
            </p>
            <div className="flex gap-[8px]">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white tracking-[0.28px]"
              >
                View work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-[16px] py-[8px] border border-[rgba(0,0,0,0.15)] rounded-full text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.28px]"
              >
                Get in touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Tablet + Desktop: web hero */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="py-[64px]">
            <p className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px] mb-[24px]">
              Senior Product Designer · slice
            </p>
            <h1 className="text-[clamp(48px,6vw,80px)] font-medium leading-[1.1] tracking-tight text-[rgba(0,0,0,0.9)] mb-[32px]">
              Designing payments<br />
              for young India
            </h1>
            <p className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.7)] max-w-[560px] mb-[32px]">
              I design UPI payments, banking, and credit products used by millions. Currently at slice.
            </p>
            <div className="flex gap-[12px]">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-[24px] py-[12px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white tracking-[0.28px] hover:bg-[#A808AB] transition-colors duration-150"
              >
                View work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-[24px] py-[12px] border border-[rgba(0,0,0,0.15)] rounded-full text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)] tracking-[0.28px] hover:bg-[#F5F5F5] transition-colors duration-150"
              >
                Get in touch
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
