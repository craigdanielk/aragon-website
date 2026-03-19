"use client";

import Link from "next/link";
import { RevealOnScroll, StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";
import { WorkflowDiagram } from "./workflow-diagram";
import { WorkflowStatsCompact } from "./workflow-stats";
import type { Workflow } from "@/lib/workflows";

export function WorkflowsContent({ workflows }: { workflows: Workflow[] }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          Workflows
        </h1>
        <p className="text-lg text-neutral-400 mb-16 max-w-2xl">
          Live execution pipelines powering the agent army. Each workflow
          coordinates multiple agents and skills to produce real output. Stats
          are sourced from production data.
        </p>
      </RevealOnScroll>

      <StaggerChildren className="grid gap-6">
        {workflows.map((workflow) => (
          <StaggerItem key={workflow.slug}>
            <HoverLift liftPx={3}>
              <Link
                href={`/workflows/${workflow.slug}`}
                className="block p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors"
              >
                {/* Diagram thumbnail */}
                <div className="mb-4 pb-4 border-b border-[var(--border)]">
                  <WorkflowDiagram
                    nodes={workflow.diagramNodes}
                    edges={workflow.diagramEdges}
                    compact
                  />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl font-bold text-neutral-100 font-mono">
                    {workflow.name}
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/20 shrink-0">
                    Active
                  </span>
                </div>

                {/* Summary */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                  {workflow.summary}
                </p>

                {/* Agent badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {workflow.agents.map((agent) => (
                    <span
                      key={agent.name}
                      className="text-xs font-mono px-2 py-1 rounded bg-[var(--surface)] text-[var(--accent-green)] border border-[var(--border)]"
                    >
                      {agent.name}
                    </span>
                  ))}
                </div>

                {/* Compact stats */}
                <WorkflowStatsCompact workflow={workflow} />
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
