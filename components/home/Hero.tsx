"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const brands = ["slice", "MobiKwik"];

export default function Hero() {
  return (
    <section className="pt-[64px] tablet:pt-[120px] pb-[48px] tablet:pb-[80px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] tracking-tight text-[rgba(0,0,0,0.9)] mb-[24px]">
            I design payments that<br className="hidden tablet:block" />
            make money feel simple,<br className="hidden tablet:block" />
            for young India.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.5)] max-w-[480px] mx-auto mb-[32px]">
            Senior Product Designer at slice, shaping UPI payments<br className="hidden tablet:block" />
            and banking products. 4+ years in fintech.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-[12px] justify-center mb-[48px]">
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
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col items-center gap-[12px]">
            <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] tracking-[0.24px] uppercase">
              Brands I have worked with
            </p>
            <div className="flex items-center gap-[32px]">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.4)]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
