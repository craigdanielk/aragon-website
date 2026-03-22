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
  const labels = {
    operational: "Operational",
    beta: "Beta",
    stub: "Stub",
  };
  return (
    <span className="flex items-center gap-1.5 text-xs font-mono">
      <span
        className={`w-2 h-2 rounded-full ${colors[status]}`}
        aria-hidden="true"
      />
      <span className="text-neutral-400">{labels[status]}</span>
    </span>
  );
}

function AgentIcon({ name, color }: { name: string; color: string }) {
  const letter = name.charAt(0);
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="18" fill={color} fillOpacity="0.12" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="18"
        fontWeight="700"
        fontFamily="monospace"
      >
        {letter}
      </text>
    </svg>
  );
}

export function AgentsContent({ agents }: { agents: Agent[] }) {
  const operational = agents.filter((a) => a.status === "operational");
  const beta = agents.filter((a) => a.status === "beta");
  const stub = agents.filter((a) => a.status === "stub");
  const sorted = [...operational, ...beta, ...stub];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          Agents
        </h1>
        <p className="text-lg text-neutral-400 mb-6 max-w-2xl">
          The {agents.length} AI agents powering the ARAGON system. Each agent has a defined
          role, capabilities, and connections to other agents. Together they form
          a self-coordinating workforce.
        </p>
        <div className="flex gap-6 mb-16 text-sm font-mono text-neutral-500">
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5" />
            {operational.length} operational
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1.5" />
            {beta.length} beta
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-neutral-500 mr-1.5" />
            {stub.length} stub
          </span>
        </div>
      </RevealOnScroll>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((agent) => (
          <StaggerItem key={agent.slug}>
            <HoverLift liftPx={3}>
              <Link
                href={`/agents/${agent.slug}`}
                className="block p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <AgentIcon name={agent.name} color={agent.color} />
                  <StatusDot status={agent.status} />
                </div>

                <h2 className="text-lg font-bold text-neutral-100 font-mono mb-1">
                  {agent.name}
                </h2>
                <p className="text-sm text-neutral-400 mb-3">{agent.role}</p>

                <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                  <span>{agent.capabilities.length} capabilities</span>
                  <span className="text-neutral-700">|</span>
                  <span>{agent.calls.length + agent.called_by.length} connections</span>
                </div>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
