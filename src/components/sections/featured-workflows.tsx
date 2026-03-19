"use client";

import Link from "next/link";
import {
  StaggerChildren,
  StaggerItem,
  HoverLift,
} from "@/components/motion";
import type { Workflow } from "@/lib/workflows";

export function FeaturedWorkflows({
  workflows,
}: {
  workflows: Workflow[];
}) {
  const top3 = workflows.slice(0, 3);

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-3">
            Featured Workflows
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
            Production execution pipelines
          </h2>
        </div>
        <Link
          href="/workflows"
          className="hidden md:block text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
        >
          View all &rarr;
        </Link>
      </div>

      <StaggerChildren className="grid md:grid-cols-3 gap-6">
        {top3.map((workflow) => (
          <StaggerItem key={workflow.slug}>
            <HoverLift liftPx={3}>
              <Link
                href={`/workflows/${workflow.slug}`}
                className="block p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-neutral-100 font-mono">
                    {workflow.name}
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/20 shrink-0">
                    Active
                  </span>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                  {workflow.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {workflow.agents.map((agent) => (
                    <span
                      key={agent.name}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent-green)] border border-[var(--border)]"
                    >
                      {agent.name}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-neutral-500">
                  {workflow.skills.length} skills &middot;{" "}
                  {workflow.diagramNodes.length} nodes
                </div>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="md:hidden mt-8 text-center">
        <Link
          href="/workflows"
          className="text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
        >
          View all workflows &rarr;
        </Link>
      </div>
    </section>
  );
}
