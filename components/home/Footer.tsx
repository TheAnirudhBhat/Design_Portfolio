"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const socialLinks = [
  { name: "Dribbble", href: "https://dribbble.com/DaW4ve" },
  { name: "LinkedIn", href: "https://linkedin.com/in/daw4ve" },
  { name: "Medium", href: "https://medium.com/@daw4ve" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.05)] mt-[40px]">
      <div className="max-w-[960px] mx-auto px-[24px] py-[48px]">
        <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-[24px] mb-[16px]">
          <span className="flex items-center gap-[6px]">
            <span className="text-[20px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.9)]">da</span>
            <span className="text-[20px] font-medium tracking-[-0.02em] text-[#D30AD7]">w4ve</span>
          </span>
          <div className="flex items-center gap-[24px]">
            <a
              href="mailto:hello@dawave.in"
              className="inline-flex items-center justify-center px-[20px] py-[10px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="flex gap-[24px] mb-[64px]">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)] transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-[clamp(24px,4vw,40px)] font-medium leading-[1.2] text-[rgba(0,0,0,0.9)]">
            Designing for a billion Indians,{" "}
            <em className="font-normal italic text-[rgba(0,0,0,0.4)]">one screen at a time.</em>
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
