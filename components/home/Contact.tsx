"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="px-[24px] pt-[16px] tablet:pt-[48px]">
      {/* Mobile: DLS list items */}
      <div className="tablet:hidden">
        <div className="py-[12px] bg-[#F5F5F5] -mx-[24px] px-[24px]">
          <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)] tracking-[0.28px]">
            Get in touch
          </span>
        </div>
        <a href="mailto:hello@dawave.in" className="flex items-center gap-[12px] py-[16px] border-b border-[rgba(0,0,0,0.05)]">
          <div className="size-[40px] rounded-full bg-[rgba(211,10,215,0.1)] flex items-center justify-center">
            <span className="text-[#D30AD7] text-[16px]">✉</span>
          </div>
          <div className="flex-1">
            <p className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">Email</p>
            <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)]">hello@dawave.in</p>
          </div>
        </a>
        <a href="https://linkedin.com" className="flex items-center gap-[12px] py-[16px] border-b border-[rgba(0,0,0,0.05)]">
          <div className="size-[40px] rounded-full bg-[rgba(33,150,243,0.1)] flex items-center justify-center">
            <span className="text-[#2196F3] text-[16px]">in</span>
          </div>
          <div className="flex-1">
            <p className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">LinkedIn</p>
            <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)]">linkedin.com/in/anirudh</p>
          </div>
        </a>
      </div>

      {/* Desktop */}
      <div className="hidden tablet:block max-w-[1280px] mx-auto py-[64px]">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[16px]">Let&apos;s work together</h2>
            <p className="text-[20px] leading-[24px] font-medium text-[rgba(0,0,0,0.7)] mb-[32px]">
              Always open to interesting projects and conversations.
            </p>
            <a
              href="mailto:hello@dawave.in"
              className="inline-flex items-center justify-center px-[32px] py-[16px] bg-[#D30AD7] rounded-full text-[16px] leading-[20px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
            >
              Say hello
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
