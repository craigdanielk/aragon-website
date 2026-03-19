"use client";

import Link from "next/link";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  HoverLift,
} from "@/components/motion";
import type { Agent } from "@/lib/agents";

function StatusDot({ status }: { status: Agent["status"] }) {
  const colors = {
    operational: "bg-green-500",
    beta: "bg-yellow-500",
    stub: "bg-neutral-500",
  };
  return (
    <span
      className={`w-2 h-2 rounded-full ${colors[status]} ${status === "operational" ? "animate-pulse" : ""}`}
      aria-label={status}
    />
  );
}

export function AgentFleet({ agents }: { agents: Agent[] }) {
  const operational = agents.filter((a) => a.status === "operational");
  const beta = agents.filter((a) => a.status === "beta");
  const stub = agents.filter((a) => a.status === "stub");
  const sorted = [...operational, ...beta, ...stub];

  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-3">
                Agent Fleet
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
                14 agents. One coordinated system.
              </h2>
              <div className="flex gap-5 mt-4 text-xs font-mono text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {operational.length} operational
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  {beta.length} beta
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-500" />
                  {stub.length} stub
                </span>
              </div>
            </div>
            <Link
              href="/agents"
              className="hidden md:block text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sorted.map((agent) => (
            <StaggerItem key={agent.slug}>
              <HoverLift liftPx={3}>
                <Link
                  href={`/agents/${agent.slug}`}
                  className="block p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors h-full"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-mono"
                      style={{
                        backgroundColor: `${agent.color}18`,
                        color: agent.color,
                        border: `1px solid ${agent.color}40`,
                      }}
                    >
                      {agent.name.charAt(0)}
                    </div>
                    <StatusDot status={agent.status} />
                  </div>
                  <p className="text-sm font-bold text-neutral-100 font-mono leading-tight">
                    {agent.name}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                    {agent.role}
                  </p>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/agents"
            className="text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
          >
            View all agents &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
