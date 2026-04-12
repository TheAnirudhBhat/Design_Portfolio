"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-[64px] tablet:py-[100px] px-[24px]">
      <div className="max-w-[960px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[40px] font-medium text-[rgba(0,0,0,0.9)] mb-[16px]">
            Let&apos;s work together
          </h2>
          <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.5)] mb-[32px]">
            Always open to interesting projects and conversations.
          </p>
          <a
            href="mailto:hello@dawave.in"
            className="inline-flex items-center justify-center px-[32px] py-[14px] bg-[#D30AD7] rounded-full text-[16px] leading-[20px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
          >
            Say hello
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
