"use client";

import Link from "next/link";
import { StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";

const pillars = [
  {
    title: "Build Logs",
    description: "Raw development sessions. The wrong turns, the 2am debugging, the two-line fix that took a week.",
    href: "/blog?pillar=build-log",
  },
  {
    title: "Pattern Library",
    description: "Reusable architectural patterns extracted from real projects. Copy, adapt, ship.",
    href: "/blog?pillar=pattern-library",
  },
  {
    title: "Cost Breakdowns",
    description: "Actual costs — API bills, infrastructure spend, time investment. The numbers nobody shares.",
    href: "/blog?pillar=cost-breakdown",
  },
  {
    title: "Tool Autopsies",
    description: "Deep dives into tools and frameworks. What they promise vs. what they deliver.",
    href: "/blog?pillar=tool-autopsy",
  },
  {
    title: "Reference Stacks",
    description: "Complete technology stacks for specific use cases, tested in production.",
    href: "/blog?pillar=reference-stack",
  },
];

export function ContentPillars() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-neutral-100 mb-10">
        Content Pillars
      </h2>
      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <StaggerItem key={p.title}>
            <HoverLift>
              <Link
                href={p.href}
                className="block p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-blue)] transition-colors h-full"
              >
                <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {p.description}
                </p>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
