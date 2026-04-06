"use client";

import TextReveal from "@/components/ui/TextReveal";
import CountUp from "@/components/ui/CountUp";

const metrics = [
  { value: "+18%", label: "First transaction rate" },
  { value: "7→12%", label: "EPFO conversion" },
  { value: "+30%", label: "Retention improvement" },
  { value: "₹150Cr+", label: "AUM managed" },
];

export default function Impact() {
  return (
    <section className="bg-black/30 backdrop-blur-sm py-32">
      <div className="mx-auto max-w-6xl px-6">
        <TextReveal
          as="h2"
          className="text-section font-semibold tracking-tight mb-16"
        >
          Impact
        </TextReveal>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center md:text-left">
              <CountUp
                value={metric.value}
                className="block text-4xl font-bold text-dw-accent md:text-5xl lg:text-6xl"
              />
              <p className="mt-3 text-sm font-light text-dw-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
