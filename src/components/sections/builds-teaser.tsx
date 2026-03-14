"use client";

import Link from "next/link";
import { RevealOnScroll, HoverLift } from "@/components/motion";

const featured = [
  { name: "FORGE", desc: "Build system with BRIEF protocol, 203+ tests", status: "Production" },
  { name: "RECON", desc: "LLM-driven demand intelligence scanner", status: "Production" },
  { name: "ARAGON", desc: "AI content engine and publishing pipeline", status: "Production" },
  { name: "Champion Grip", desc: "Lawn bowling grip — 17,500+ units globally", status: "Shipped" },
];

export function BuildsTeaser() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-semibold text-neutral-100">
            What I&apos;ve Built
          </h2>
          <Link
            href="/builds"
            className="text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((item, i) => (
            <RevealOnScroll key={item.name} delay={i * 0.1}>
              <HoverLift>
                <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-neutral-100 font-mono">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/20">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              </HoverLift>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
