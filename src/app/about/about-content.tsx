"use client";

import { RevealOnScroll } from "@/components/motion";

const agents = [
  { name: "SOVEREIGN", role: "Master Orchestrator — sprint planning and system coordination" },
  { name: "FORGE", role: "Build system — BRIEF protocol, 203+ tests, production-grade" },
  { name: "RECON", role: "Demand intelligence — LLM-driven market scanner" },
  { name: "ARAGON", role: "Content pipeline — harvests, synthesizes, publishes across 25+ platforms" },
  { name: "LORE", role: "Skill librarian — knowledge management and retrieval" },
  { name: "KIRA", role: "E-commerce migration engine" },
  { name: "DELIVER", role: "Demo wrapping and Vercel deployment" },
  { name: "HEARTBEAT", role: "Telegram notification bot" },
];

export function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-8">
          About
        </h1>
      </RevealOnScroll>

      <div className="space-y-16">
        <RevealOnScroll delay={0.1}>
          <section className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
            <p className="text-lg text-neutral-300">
              I&apos;m Craig — a front-end developer based in Cape Town, building
              an autonomous AI agent army as an independent venture under Aweku Labs.
            </p>
            <p>
              By day I work as a Front End Associate Developer. By night (and most
              weekends) I build AI systems that work autonomously — agents that plan
              sprints, scan markets, generate content, deploy code, and coordinate
              with each other through a unified RAG memory layer.
            </p>
            <p>
              The goal is straightforward: exit salary dependency through the first
              independent client delivery powered entirely by this agent army.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <section>
            <h2 className="text-3xl font-semibold text-neutral-100 mb-6">
              The Agent Army
            </h2>
            <p className="text-base text-neutral-400 mb-8">
              A coordinated fleet of AI agents, each owning a specific domain.
              They communicate through RAG, execute BRIEFs, and ship real code.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]"
                >
                  <h3 className="text-lg font-semibold text-neutral-100 font-mono text-[var(--accent-green)]">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">{agent.role}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <section>
            <h2 className="text-3xl font-semibold text-neutral-100 mb-6">
              Champion Grip
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
              <p>
                Before the agent army, there was Champion Grip — a lawn bowling
                grip product that grew from a local idea to global distribution.
                Over 17,500 units shipped worldwide through a partnership with
                Henselite Australia, the sport&apos;s leading equipment manufacturer.
              </p>
              <p>
                Champion Grip proved that a single-person operation can build,
                manufacture, and distribute a physical product globally. The same
                first-principles thinking now drives the agent army — start small,
                ship fast, iterate on what works.
              </p>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <section>
            <h2 className="text-3xl font-semibold text-neutral-100 mb-6">
              This Site
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
              <p>
                A.R.A.G.O.N. stands for Automated RAG Orchestrated Narratives. It&apos;s
                both the content engine that generates posts from real development
                sessions and the site you&apos;re reading now.
              </p>
              <p>
                Every post on this site comes from actual work — debugging sessions,
                architectural decisions, cost analyses, tool evaluations. No guru
                energy. No hype. Just what worked, what didn&apos;t, and the specific
                numbers.
              </p>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <section className="border-t border-[var(--border)] pt-10">
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
              Get in touch
            </h2>
            <div className="flex flex-wrap gap-6 text-base">
              <a
                href="mailto:craigdanielk@gmail.com"
                className="text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
              >
                craigdanielk@gmail.com
              </a>
              <a
                href="https://github.com/craigdanielk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
