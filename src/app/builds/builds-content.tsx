"use client";

import { useState } from "react";
import { StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";
import { RevealOnScroll } from "@/components/motion";
import {
  portfolioRepos,
  categoryLabels,
  categoryColors,
  type PortfolioRepo,
} from "@/lib/portfolio";

type FilterCategory = PortfolioRepo["category"] | "all";

export function BuildsContent() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filters: { value: FilterCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "ai-infrastructure", label: "AI Infrastructure" },
    { value: "automation", label: "Automation" },
    { value: "web-platform", label: "Web Platform" },
    { value: "tooling", label: "Tooling" },
  ];

  const filtered =
    activeFilter === "all"
      ? portfolioRepos
      : portfolioRepos.filter((r) => r.category === activeFilter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          What I&apos;ve Built
        </h1>
        <p className="text-lg text-neutral-400 mb-10 max-w-2xl">
          AI agents, automation systems, and infrastructure. Each one solves a
          real problem and ships real output. {portfolioRepos.length} portfolio
          projects across the stack.
        </p>
      </RevealOnScroll>

      {/* Category filters */}
      <RevealOnScroll delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-sm font-mono px-3 py-1.5 rounded-md border transition-colors ${
                activeFilter === f.value
                  ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]"
                  : "bg-[var(--surface)] text-neutral-400 border-[var(--border)] hover:text-neutral-200 hover:border-neutral-600"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {portfolioRepos.filter((r) =>
                    f.value === "all" ? true : r.category === f.value
                  ).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <StaggerChildren className="grid md:grid-cols-2 gap-6" key={activeFilter}>
        {filtered.map((repo) => (
          <StaggerItem key={repo.name}>
            <HoverLift>
              <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 gap-3">
                  <h2 className="text-xl font-bold text-neutral-100 font-mono leading-tight">
                    {repo.name}
                  </h2>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded border whitespace-nowrap ${
                      categoryColors[repo.category]
                    }`}
                  >
                    {categoryLabels[repo.category]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
                  {repo.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono px-2 py-1 rounded bg-[var(--surface)] text-neutral-500 border border-[var(--border)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                  <a
                    href={repo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neutral-500 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source
                  </a>
                  {repo.url && (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-500 hover:text-[var(--accent-green)] transition-colors flex items-center gap-1.5"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Summary stats */}
      <RevealOnScroll delay={0.2}>
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                "ai-infrastructure",
                "automation",
                "web-platform",
                "tooling",
              ] as const
            ).map((cat) => {
              const count = portfolioRepos.filter(
                (r) => r.category === cat
              ).length;
              return (
                <div key={cat} className="text-center">
                  <div className="text-2xl font-bold text-neutral-100 font-mono">
                    {count}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-1">
                    {categoryLabels[cat]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
