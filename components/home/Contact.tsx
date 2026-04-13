"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const now = new Date();
const dateStr = now.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const timeStr = now.toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function Contact() {
  return (
    <section id="contact" className="py-[80px] tablet:py-[120px] px-[24px]">
      <div className="max-w-[480px] mx-auto">
        <ScrollReveal>
          {/* Receipt card */}
          <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[20px] p-[32px] tablet:p-[40px] shadow-[0_2px_32px_rgba(0,0,0,0.04)]">
            {/* Receipt header */}
            <div className="text-center mb-[28px]">
              <div className="flex items-center justify-center gap-[6px] mb-[12px]">
                <span className="text-[18px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.9)]">da</span>
                <span className="text-[18px] font-medium tracking-[-0.02em] text-[#D30AD7]">w4ve</span>
              </div>
              <p className="text-[12px] text-[rgba(0,0,0,0.3)] tracking-[0.04em]">
                {dateStr} · {timeStr}
              </p>
            </div>

            {/* Dashed divider */}
            <div className="border-t border-dashed border-[rgba(0,0,0,0.1)] mb-[24px]" />

            {/* Items */}
            <div className="space-y-[16px] mb-[24px]">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[rgba(0,0,0,0.5)]">Service</span>
                <span className="text-[13px] font-medium text-[rgba(0,0,0,0.9)]">Product Design</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[rgba(0,0,0,0.5)]">Experience</span>
                <span className="text-[13px] font-medium text-[rgba(0,0,0,0.9)]">4+ years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[rgba(0,0,0,0.5)]">Availability</span>
                <span className="text-[13px] font-medium text-[#00A63E] flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#00A63E] animate-pulse" />
                  Open to projects
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[rgba(0,0,0,0.5)]">Location</span>
                <span className="text-[13px] font-medium text-[rgba(0,0,0,0.9)]">Bengaluru, IN</span>
              </div>
            </div>

            {/* Dashed divider */}
            <div className="border-t border-dashed border-[rgba(0,0,0,0.1)] mb-[24px]" />

            {/* Total / CTA */}
            <div className="flex justify-between items-center mb-[28px]">
              <span className="text-[14px] font-medium text-[rgba(0,0,0,0.9)]">Total</span>
              <span className="text-[14px] font-medium text-[rgba(0,0,0,0.9)]">Let&apos;s talk</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-[10px]">
              <a
                href="mailto:hello@dawave.in"
                data-cursor="Email"
                className="flex items-center justify-center py-[13px] bg-[#D30AD7] rounded-full text-[14px] font-medium text-white hover:bg-[#A808AB] transition-colors duration-150"
              >
                hello@dawave.in
              </a>
              <div className="flex gap-[10px]">
                <a
                  href="https://linkedin.com/in/daw4ve"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LinkedIn"
                  className="flex-1 flex items-center justify-center py-[11px] border border-[rgba(0,0,0,0.1)] rounded-full text-[13px] font-medium text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.03)] transition-colors duration-150"
                >
                  LinkedIn
                </a>
                <a
                  href="https://dribbble.com/DaW4ve"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Dribbble"
                  className="flex-1 flex items-center justify-center py-[11px] border border-[rgba(0,0,0,0.1)] rounded-full text-[13px] font-medium text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.03)] transition-colors duration-150"
                >
                  Dribbble
                </a>
              </div>
            </div>

            {/* Receipt footer */}
            <div className="mt-[28px] text-center">
              <div className="border-t border-dashed border-[rgba(0,0,0,0.1)] mb-[16px]" />
              <p className="text-[11px] text-[rgba(0,0,0,0.25)] tracking-[0.04em]">
                Thank you for visiting — have a great day!
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
