"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CharacterSection() {
  return (
    <section className="px-[24px] tablet:px-[48px] mb-[80px] tablet:mb-[120px]">
      <ScrollReveal>
        <div className="max-w-[960px] mx-auto w-full">
          <div className="relative w-full h-[280px] tablet:h-[400px] bg-[#D30AD7] rounded-[16px] overflow-hidden flex items-center justify-center">
            <div className="text-white/20 text-[120px] font-medium">A</div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
