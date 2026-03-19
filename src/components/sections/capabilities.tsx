"use client";

import {
  StaggerChildren,
  StaggerItem,
  HoverLift,
} from "@/components/motion";

const capabilities = [
  {
    title: "Content Pipeline",
    description:
      "Turn development logs into multi-platform content. ARAGON mines real work, generates posts with RAG context, and distributes across 25+ platforms automatically.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 13h12M10 17h8M10 21h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="8" r="4" fill="var(--accent-green)" fillOpacity="0.3" stroke="var(--accent-green)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Demand Intelligence",
    description:
      "RECON scans multiple data sources for demand signals, scores opportunities with LLM analysis, and routes qualified leads into your pipeline. Always-on market awareness.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="var(--accent-green)" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Skill Acquisition",
    description:
      "When agents encounter novel tasks, LORE searches existing patterns, composes new skill chains from primitives, tests in sandbox, and registers proven skills. The system learns.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4v6M16 22v6M4 16h6M22 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="var(--accent-green)" strokeWidth="1.5" />
        <path d="M14 16h4M16 14v4" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Build Automation",
    description:
      "From BRIEF to deployed demo in minutes. FORGE validates, EXECUTOR builds, VERIFY tests, and DELIVER deploys with preview URLs. Every build gets a shareable proof-of-work link.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 24l6-6 4 4 10-10" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function Capabilities() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-3">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
          AI-powered systems that ship real output
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl">
          Every capability is backed by production agents, live data, and
          measurable results. Not demos. Not proofs of concept.
        </p>
      </div>
      <StaggerChildren className="grid md:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <StaggerItem key={cap.title}>
            <HoverLift>
              <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-blue)] transition-colors h-full">
                <div className="text-neutral-400 mb-4">{cap.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-100 mb-2 font-mono">
                  {cap.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
