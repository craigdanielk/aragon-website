import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agentic Workflow Architecture",
  description:
    "North Star autonomous agent orchestration — templatised workflow templates and dynamic capability routing. How A.R.A.G.O.N. routes work through 72 nodes and 99 edges.",
  openGraph: {
    title: "Agentic Workflow Architecture | A.R.A.G.O.N.",
    description:
      "North Star autonomous agent orchestration — templatised workflow templates and dynamic capability routing.",
    type: "article",
  },
  keywords: [
    "agentic workflow",
    "AI orchestration",
    "workflow templates",
    "capability routing",
    "multi-agent system",
    "LangGraph",
    "autonomous agents",
    "hyperautomation",
  ],
};

// JSON-LD Schema.org TechArticle markup for GEO optimization.
// Content is sourced from hardcoded trusted strings, not user input.
function TechArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Agentic Workflow Architecture",
    description:
      "North Star autonomous agent orchestration — templatised workflow templates and dynamic capability routing",
    author: {
      "@type": "Organization",
      name: "A.R.A.G.O.N.",
      url: "https://aragon-website-livid.vercel.app",
    },
    datePublished: "2026-03-24",
    dateModified: "2026-03-24",
    keywords:
      "agentic workflow, AI orchestration, workflow templates, capability routing, multi-agent system",
    url: "https://aragon-website-livid.vercel.app/architecture",
    about: [
      {
        "@type": "DefinedTerm",
        name: "Templatised Routing",
        description:
          "YAML-defined workflow templates checked first by PRISM for deterministic dispatch across 72 nodes and 99 edges.",
      },
      {
        "@type": "DefinedTerm",
        name: "Magentic Mode",
        description:
          "Dynamic capability routing fallback using COMPASS classification, LORE skill check, and PRISM routing.",
      },
      {
        "@type": "DefinedTerm",
        name: "Self-Learning Loop",
        description:
          "Successful magentic routes are promoted to templatised workflows, creating a self-improving system.",
      },
    ],
    citation: [
      {
        "@type": "WebPage",
        name: "LangGraph: Multi-Agent Workflows",
        url: "https://www.langchain.com/langgraph",
      },
      {
        "@type": "WebPage",
        name: "Anthropic: Tool Use with Claude",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
      },
      {
        "@type": "Report",
        name: "McKinsey: The State of AI in 2025",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
      {
        "@type": "Report",
        name: "Gartner: Hyperautomation Strategic Technology Trend",
        url: "https://www.gartner.com/en/information-technology/glossary/hyperautomation",
      },
      {
        "@type": "Report",
        name: "Deloitte: Autonomous Enterprise",
        url: "https://www2.deloitte.com/us/en/insights/topics/digital-transformation/autonomous-enterprise.html",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold text-neutral-100 mb-4 mt-16 first:mt-0">
      {children}
    </h2>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <TechArticleSchema />

      <header className="mb-12">
        <p className="text-xs font-mono text-neutral-600 mb-3 uppercase tracking-wider">
          Technical Reference
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
          Agentic Workflow Architecture
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          How A.R.A.G.O.N. routes work through two complementary dispatch
          patterns: templatised workflows for known patterns and dynamic
          capability routing for novel work. Together they form a self-improving
          orchestration layer.
        </p>

        {/* Table of contents */}
        <nav className="mt-8 p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <p className="text-xs font-mono text-neutral-500 mb-3">On this page</p>
          <ol className="space-y-1.5 text-sm">
            <li>
              <a href="#templatised-routes" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                1. Templatised Routes
              </a>
            </li>
            <li>
              <a href="#magentic-mode" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                2. Magentic Mode
              </a>
            </li>
            <li>
              <a href="#why-both" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                3. Why Both
              </a>
            </li>
            <li>
              <a href="#battlefield" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                4. Battlefield Visualization
              </a>
            </li>
          </ol>
        </nav>
      </header>

      {/* Section 1: Templatised Routes */}
      <section className="mb-16">
        <SectionAnchor id="templatised-routes">1. Templatised Routes</SectionAnchor>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Every BRIEF that enters the queue is first checked against YAML-defined
          workflow templates. PRISM, the routing agent, reads the BRIEF payload
          and attempts to match it against a known workflow pattern before falling
          back to dynamic routing. This is the fast path: deterministic,
          predictable, and logged.
        </p>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          Three Core Routes
        </h3>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <p className="font-mono text-sm text-[var(--accent-green)] mb-1">
              prism-routing
            </p>
            <p className="text-sm text-neutral-400">
              The default dispatch workflow. COMPASS classifies the BRIEF,
              PRISM matches it against the capability matrix, and the work is
              dispatched to the best-fit agent. Handles 70% of all BRIEFs.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <p className="font-mono text-sm text-[var(--accent-green)] mb-1">
              gap-resolution
            </p>
            <p className="text-sm text-neutral-400">
              Triggered when the system identifies missing capabilities or
              skills. Analyses the gap, generates a resolution BRIEF, and
              dispatches it to the agent with the closest skill match.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <p className="font-mono text-sm text-[var(--accent-green)] mb-1">
              build-validation
            </p>
            <p className="text-sm text-neutral-400">
              Post-build verification workflow. Runs Lighthouse checks,
              HTTP 200 validation, and artifact registration before any BRIEF
              can be marked as COMPLETED.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          Workflow Matrix
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-4">
          The full workflow graph spans <strong className="text-neutral-200">72 nodes</strong> and{" "}
          <strong className="text-neutral-200">99 edges</strong>, encoded in YAML
          and validated against{" "}
          <code className="text-xs bg-neutral-900 px-1.5 py-0.5 rounded font-mono">
            workflow-v1.schema.yaml
          </code>
          . Each node is an agent, skill, or decision gate. Each edge is a
          dependency, data flow, or control-flow transition.
        </p>

        <div className="p-4 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/50 mb-6">
          <p className="text-sm text-neutral-500 font-mono mb-2">
            Architecture precedents
          </p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <ExternalLink href="https://www.langchain.com/langgraph">
                LangGraph state machines
              </ExternalLink>{" "}
              — our workflow templates are conceptually similar to LangGraph&apos;s
              state graphs, but defined declaratively in YAML rather than
              programmatically in Python.
            </li>
            <li>
              <ExternalLink href="https://docs.anthropic.com/en/docs/build-with-claude/tool-use">
                Anthropic tool use patterns
              </ExternalLink>{" "}
              — each agent&apos;s tool invocations follow the structured tool-use
              protocol, with schema-validated inputs and outputs.
            </li>
            <li>
              <ExternalLink href="https://n8n.io/workflows/">
                n8n workflow patterns
              </ExternalLink>{" "}
              — our YAML workflow definitions share design DNA with n8n&apos;s
              node-based orchestration, adapted for agentic dispatch.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Magentic Mode */}
      <section className="mb-16">
        <SectionAnchor id="magentic-mode">2. Magentic Mode</SectionAnchor>
        <p className="text-neutral-400 leading-relaxed mb-6">
          When no template matches, the system falls back to dynamic capability
          routing. We call this &quot;magentic mode&quot; because the BRIEF is attracted
          to the agent with the strongest capability match, like a magnet finding
          its pole.
        </p>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          The Routing Chain
        </h3>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {[
            {
              step: "1",
              agent: "COMPASS",
              action: "Classify",
              detail: "Reads the BRIEF payload and classifies intent, complexity, and domain",
            },
            {
              step: "2",
              agent: "LORE",
              action: "Skill Check",
              detail: "Queries the RAG knowledge graph for matching skills and prior art",
            },
            {
              step: "3",
              agent: "PRISM",
              action: "Route",
              detail: "Scores agent candidates and selects the best fit based on capability overlap",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex-1 p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
            >
              <p className="text-xs font-mono text-neutral-600 mb-1">
                Step {s.step}
              </p>
              <p className="font-semibold text-neutral-200 text-sm">
                {s.agent}: {s.action}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{s.detail}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          Dispatch Payload
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-4">
          The magentic routing chain returns a structured dispatch object:
        </p>
        <pre className="bg-neutral-900 border border-[var(--border)] rounded-lg p-4 text-sm font-mono text-neutral-300 overflow-x-auto mb-6">
{`{
  "agent": "FORGE",
  "skills": ["web-builder", "github-automation"],
  "tools": ["vercel-deploy", "lighthouse-ci"],
  "workflow_pattern": "website-build",
  "model": "claude-sonnet-4-512k"
}`}
        </pre>

        <div className="p-4 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/50">
          <p className="text-sm text-neutral-500 font-mono mb-2">
            Industry parallels
          </p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <ExternalLink href="https://www.crewai.com/">
                CrewAI delegation patterns
              </ExternalLink>{" "}
              — CrewAI&apos;s agent delegation model informed our capability-scoring
              approach, though we route via a capability matrix rather than
              role-based hierarchies.
            </li>
            <li>
              <ExternalLink href="https://microsoft.github.io/autogen/">
                Microsoft AutoGen
              </ExternalLink>{" "}
              — AutoGen&apos;s multi-agent conversation framework demonstrates the
              same principle: let agents negotiate task ownership dynamically.
            </li>
            <li>
              <ExternalLink href="https://docs.anthropic.com/en/docs/build-with-claude/tool-use">
                Anthropic agentic tool-use
              </ExternalLink>{" "}
              — our dispatch payload schema mirrors the structured output
              pattern from Anthropic&apos;s tool-use documentation.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Why Both */}
      <section className="mb-16">
        <SectionAnchor id="why-both">3. Why Both</SectionAnchor>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Most orchestration systems pick one approach: either rigid templates or
          fully dynamic routing. We run both because they solve different problems
          and, critically, they feed each other.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <h4 className="font-semibold text-neutral-200 mb-2">
              Templates: Known Patterns
            </h4>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li>Fast: no classification overhead</li>
              <li>Deterministic: same input, same route</li>
              <li>Auditable: every step logged against schema</li>
              <li>Covers 70% of production BRIEFs</li>
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <h4 className="font-semibold text-neutral-200 mb-2">
              Magentic: Novel Work
            </h4>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li>Flexible: handles unseen BRIEF types</li>
              <li>Capability-aware: scores agents on skill match</li>
              <li>Self-discovering: finds routes templates miss</li>
              <li>Handles the 30% long tail</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          The Self-Learning Loop
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-4">
          When a magentic route succeeds three times with the same pattern, the
          system promotes it to a template. The BRIEF-to-agent mapping, the skill
          requirements, and the workflow steps are crystallised into a YAML
          definition and added to the template library. What started as a
          dynamic discovery becomes a deterministic fast path.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          This is how the system grows. Not through manual template authoring,
          but through operational experience that hardens into structure.
        </p>

        <div className="p-4 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/50">
          <p className="text-sm text-neutral-500 font-mono mb-2">
            Market context
          </p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <ExternalLink href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai">
                McKinsey&apos;s State of AI research
              </ExternalLink>{" "}
              finds that organisations achieving the highest AI impact combine
              structured workflows with adaptive capabilities — the same
              dual-mode pattern we use in production.
            </li>
            <li>
              <ExternalLink href="https://www.gartner.com/en/information-technology/glossary/hyperautomation">
                Gartner&apos;s hyperautomation framework
              </ExternalLink>{" "}
              predicts that 70% of enterprises will use orchestrated multi-agent
              systems by 2028. Our templatised-plus-magentic approach is one
              implementation of this trend.
            </li>
            <li>
              <ExternalLink href="https://www2.deloitte.com/us/en/insights/topics/digital-transformation/autonomous-enterprise.html">
                Deloitte projects the agentic AI market at $8.5B by 2026
              </ExternalLink>
              , driven by enterprises moving from single-agent automation to
              multi-agent orchestration — exactly the trajectory A.R.A.G.O.N.
              represents.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4: Battlefield Visualization */}
      <section className="mb-16">
        <SectionAnchor id="battlefield">4. Battlefield Visualization</SectionAnchor>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The Battlefield is our operations dashboard. At its center is a 3D
          force-directed graph — built with{" "}
          <code className="text-xs bg-neutral-900 px-1.5 py-0.5 rounded font-mono">
            react-force-graph-3d
          </code>{" "}
          — that renders every agent, workflow, skill, and BRIEF as a node with
          structural edges between them.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-3xl font-bold text-[var(--accent-blue)] mb-1">72</p>
            <p className="text-xs font-mono text-neutral-500">Nodes</p>
            <p className="text-xs text-neutral-600 mt-1">
              Agents, workflows, skills, schemas
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-3xl font-bold text-[var(--accent-green)] mb-1">99</p>
            <p className="text-xs font-mono text-neutral-500">Edges</p>
            <p className="text-xs text-neutral-600 mt-1">
              Dependencies, data flows, transitions
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-3xl font-bold text-[#F06292] mb-1">3</p>
            <p className="text-xs font-mono text-neutral-500">Clusters</p>
            <p className="text-xs text-neutral-600 mt-1">
              Orchestration, build, knowledge
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          Live Edge Activation
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-4">
          When SOVEREIGN dispatches a BRIEF, the structural edges on the graph
          light up in real-time. The edge between SOVEREIGN and the target agent
          pulses. As the agent invokes tools, edges to those skill nodes
          activate. When an artifact is produced, a new yellow node materialises.
          You can watch work flow through the system as it happens.
        </p>

        <h3 className="text-lg font-semibold text-neutral-200 mb-3">
          Self-Observing System
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The graph is not a monitoring layer bolted on top. It reads from the
          same RAG entity store and Supabase tables that the agents themselves
          use. SOVEREIGN and the graph see the same data. This means the system
          is literally observing itself through the same lens its operators use.
          There is no separate &quot;ops view&quot; — the agents and the dashboard share
          a single source of truth.
        </p>

        <p className="text-sm text-neutral-500 mb-2">
          Read the full build story:{" "}
          <Link
            href="/blog/from-8-edges-to-90-watching-an-agent-army-connect"
            className="text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] transition-colors"
          >
            From 8 Edges to 90: Watching an Agent Army Connect
          </Link>
        </p>
      </section>

      {/* Internal links to blog posts */}
      <section className="border-t border-[var(--border)] pt-10">
        <h3 className="text-lg font-semibold text-neutral-200 mb-4">
          Related Reading
        </h3>
        <div className="space-y-3">
          <Link
            href="/blog/why-our-ai-agents-kept-lying-about-completing-tasks"
            className="block p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-blue)] transition-colors"
          >
            <p className="text-sm font-medium text-neutral-200">
              Why Our AI Agents Kept Lying About Completing Tasks
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              How close-loop verification with database triggers eliminated
              false completions.
            </p>
          </Link>
          <Link
            href="/blog/sovereign-dispatch-log-building-myself-overnight"
            className="block p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-blue)] transition-colors"
          >
            <p className="text-sm font-medium text-neutral-200">
              SOVEREIGN Dispatch Log: Building Myself Overnight
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              First-person account of an 11-hour autonomous run dispatching 12
              BRIEFs.
            </p>
          </Link>
          <Link
            href="/blog/from-8-edges-to-90-watching-an-agent-army-connect"
            className="block p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-blue)] transition-colors"
          >
            <p className="text-sm font-medium text-neutral-200">
              From 8 Edges to 90: Watching an Agent Army Connect
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              The story behind the 3D force graph and how hub traversal
              unlocked the full knowledge graph.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
