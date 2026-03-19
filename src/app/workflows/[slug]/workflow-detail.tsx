"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";
import { WorkflowDiagram } from "../workflow-diagram";
import { WorkflowStatsCard } from "../workflow-stats";
import type { Workflow } from "@/lib/workflows";

export function WorkflowDetail({ workflow }: { workflow: Workflow }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
        <Link href="/workflows" className="hover:text-neutral-300 transition-colors">
          Workflows
        </Link>
        <span>/</span>
        <span className="text-neutral-300">{workflow.name}</span>
      </nav>

      <RevealOnScroll>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 font-mono">
            {workflow.name}
          </h1>
          <span className="text-xs font-mono px-3 py-1 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/20 shrink-0 mt-2">
            Active
          </span>
        </div>

        {/* Summary */}
        <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-3xl">
          {workflow.summary}
        </p>
      </RevealOnScroll>

      {/* Diagram — fixed height top section */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-10">
          <WorkflowDiagram
            nodes={workflow.diagramNodes}
            edges={workflow.diagramEdges}
          />
        </div>
      </RevealOnScroll>

      {/* Stats card */}
      <RevealOnScroll delay={0.2}>
        <div className="mb-10">
          <WorkflowStatsCard workflow={workflow} />
        </div>
      </RevealOnScroll>

      {/* Agents and Skills side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <RevealOnScroll delay={0.3}>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-6 h-full">
            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
              Agents Involved
            </h2>
            <div className="space-y-3">
              {workflow.agents.map((agent) => (
                <Link
                  key={agent.name}
                  href={agent.href}
                  className="flex items-center justify-between p-3 rounded-md bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-green)]/30 transition-colors group"
                >
                  <div>
                    <span className="text-sm font-mono font-bold text-[var(--accent-green)] group-hover:text-[var(--accent-green)] transition-colors">
                      {agent.name}
                    </span>
                    <p className="text-xs text-neutral-500 mt-0.5">{agent.role}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-neutral-600 group-hover:text-neutral-400 transition-colors"
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-6 h-full">
            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
              Skills Used
            </h2>
            <div className="space-y-3">
              {workflow.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-md bg-[var(--surface)] border border-[var(--border)]"
                >
                  <span className="text-sm font-mono text-neutral-300">
                    {skill.name}
                  </span>
                  <p className="text-xs text-neutral-500 mt-0.5">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Back link */}
      <div className="pt-6 border-t border-[var(--border)]">
        <Link
          href="/workflows"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors font-mono"
        >
          &larr; All Workflows
        </Link>
      </div>
    </div>
  );
}
