"use client";

import { StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";
import { RevealOnScroll } from "@/components/motion";

interface Build {
  name: string;
  category: "agent" | "product" | "tool";
  status: "Production" | "Shipped" | "Active" | "Beta";
  description: string;
  highlights: string[];
}

const builds: Build[] = [
  {
    name: "SOVEREIGN",
    category: "agent",
    status: "Production",
    description: "Master Orchestrator that plans sprints, assigns work across the agent army, and maintains system coherence.",
    highlights: ["Sprint planning", "Cross-agent coordination", "Priority routing"],
  },
  {
    name: "FORGE",
    category: "agent",
    status: "Production",
    description: "Build system powering the BRIEF protocol — the canonical task format that agents use to claim and execute work.",
    highlights: ["203+ tests", "BRIEF protocol v1", "Skill chains"],
  },
  {
    name: "RECON",
    category: "agent",
    status: "Production",
    description: "LLM-driven demand intelligence scanner. Finds opportunities, scores signals, and feeds qualified leads into the pipeline.",
    highlights: ["83 tests", "Multi-source scanning", "Signal scoring"],
  },
  {
    name: "ARAGON",
    category: "agent",
    status: "Production",
    description: "Content engine that harvests topics from real development work, synthesizes posts via AI, and publishes across 25+ platforms.",
    highlights: ["RAG-powered", "Multi-platform publishing", "Auto-scheduling"],
  },
  {
    name: "LORE",
    category: "agent",
    status: "Active",
    description: "Skill librarian that manages the knowledge layer — indexing, retrieving, and composing skills for other agents.",
    highlights: ["Skill registry", "Semantic search", "Composition engine"],
  },
  {
    name: "KIRA",
    category: "agent",
    status: "Active",
    description: "E-commerce migration engine handling platform transitions, URL mapping, and data transformation.",
    highlights: ["Shopify integration", "URL migration toolkit", "Data transforms"],
  },
  {
    name: "DELIVER",
    category: "agent",
    status: "Production",
    description: "Demo wrapping and deployment agent. Takes built projects, packages demos, and deploys to Vercel.",
    highlights: ["Vercel deployment", "Demo packaging", "Preview URLs"],
  },
  {
    name: "HEARTBEAT",
    category: "tool",
    status: "Active",
    description: "Telegram notification bot (@gravkoro_bot) that keeps Craig informed of system state, alerts, and agent activity.",
    highlights: ["Telegram integration", "Real-time alerts", "Status monitoring"],
  },
  {
    name: "Champion Grip",
    category: "product",
    status: "Shipped",
    description: "Lawn bowling grip product distributed globally through Henselite Australia. From Cape Town workshop to international retail.",
    highlights: ["17,500+ units", "Global distribution", "Henselite partnership"],
  },
  {
    name: "Email Agent",
    category: "agent",
    status: "Beta",
    description: "Property management email automation — processes tenant communications, extracts action items, routes responses.",
    highlights: ["Email parsing", "Action extraction", "Auto-routing"],
  },
];

const categoryLabels: Record<Build["category"], string> = {
  agent: "AI Agent",
  product: "Product",
  tool: "Tool",
};

export function BuildsContent() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          What I&apos;ve Built
        </h1>
        <p className="text-lg text-neutral-400 mb-16 max-w-2xl">
          AI agents, automation systems, and products. Each one solves a real
          problem and ships real output.
        </p>
      </RevealOnScroll>

      <StaggerChildren className="grid md:grid-cols-2 gap-6">
        {builds.map((build) => (
          <StaggerItem key={build.name}>
            <HoverLift>
              <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-neutral-100 font-mono">
                    {build.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                      {categoryLabels[build.category]}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--accent-green-glow)] text-[var(--accent-green)] border border-[var(--accent-green)]/20">
                      {build.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
                  {build.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {build.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono px-2 py-1 rounded bg-[var(--surface)] text-neutral-500 border border-[var(--border)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
