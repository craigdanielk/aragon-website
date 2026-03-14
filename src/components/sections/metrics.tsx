"use client";

import { RevealOnScroll } from "@/components/motion";

const metrics = [
  { value: "10+", label: "AI Agents Built" },
  { value: "203+", label: "Tests Passing" },
  { value: "17.5K+", label: "Units Shipped" },
  { value: "25+", label: "Platforms" },
];

export function MetricsStrip() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <RevealOnScroll key={m.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[var(--accent-green)] font-mono">
                  {m.value}
                </p>
                <p className="text-sm text-neutral-500 mt-1">{m.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
