export interface PortfolioRepo {
  name: string;
  description: string;
  category: 'ai-infrastructure' | 'automation' | 'web-platform' | 'tooling';
  highlights: string[];
  techStack: string[];
  url?: string;
  github: string;
}

export const portfolioRepos: PortfolioRepo[] = [
  {
    name: "Champion Grip",
    description:
      "E-commerce product site for lawn bowling grips. 17,500+ units sold globally. Full product catalog with variant selection, responsive design, and conversion-optimised layout.",
    category: "web-platform",
    highlights: ["17,500+ units sold", "Product catalog", "Conversion-optimised"],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Vercel"],
    url: "https://champion-grip-demo.vercel.app",
    github: "https://github.com/craigdanielk/champion-grip-demo",
  },
  {
    name: "ARAGON Engine",
    description:
      "Automated content generation pipeline for multi-platform publishing. Harvests topics from real development work, synthesises posts via AI, and distributes across 25+ channels.",
    category: "ai-infrastructure",
    highlights: ["RAG-powered generation", "Multi-platform publishing", "Auto-scheduling"],
    techStack: ["Python", "Claude API", "Supabase", "RAG"],
    github: "https://github.com/craigdanielk/aragon-engine",
  },
  {
    name: "A.R.A.G.O.N. Website",
    description:
      "GEO-optimised content platform and publishing front-end. Practitioner-led AI development content with blog, workflows, agent catalogue, and consultation booking.",
    category: "web-platform",
    highlights: ["GEO-optimised", "MDX blog engine", "Consultation booking"],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Vercel"],
    url: "https://aragon-website-livid.vercel.app",
    github: "https://github.com/craigdanielk/aragon-website",
  },
  {
    name: "Sovereign Dashboard",
    description:
      "Master orchestrator dashboard for the agent army. Plans sprints, assigns work across agents, and maintains system coherence with real-time visibility.",
    category: "ai-infrastructure",
    highlights: ["Sprint planning", "Cross-agent coordination", "Real-time status"],
    techStack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    url: "https://sovereign-dashboard-info-94818341s-projects.vercel.app",
    github: "https://github.com/craigdanielk/sovereign-dashboard",
  },
  {
    name: "RAG System",
    description:
      "Production RAG infrastructure powering semantic search and knowledge retrieval across the entire agent ecosystem. The memory layer that makes agents context-aware.",
    category: "ai-infrastructure",
    highlights: ["Semantic search", "Vector embeddings", "Multi-agent memory"],
    techStack: ["Python", "Pinecone", "Claude API", "Supabase"],
    github: "https://github.com/craigdanielk/RAG-System",
  },
  {
    name: "Forge",
    description:
      "Project pipeline CLI that takes a brief through spec, architecture, tickets, agent assignment, and deployment. The canonical build system behind the BRIEF protocol.",
    category: "automation",
    highlights: ["BRIEF protocol v1", "203+ tests", "End-to-end pipeline"],
    techStack: ["Python", "Claude API", "CLI"],
    github: "https://github.com/craigdanielk/forge",
  },
  {
    name: "LORE",
    description:
      "Bulk document ingestion pipeline for RAG infrastructure. Indexes, retrieves, and composes knowledge for the agent ecosystem.",
    category: "ai-infrastructure",
    highlights: ["Bulk ingestion", "Skill registry", "Semantic indexing"],
    techStack: ["Python", "Pinecone", "Claude API"],
    github: "https://github.com/craigdanielk/LORE",
  },
  {
    name: "Web Builder",
    description:
      "Multi-pass website generation pipeline using decomposed design primitives. Section taxonomy, style schemas, industry presets, and orchestration scripts for high-quality site generation.",
    category: "automation",
    highlights: ["Design decomposition", "Industry presets", "Multi-pass generation"],
    techStack: ["TypeScript", "Claude API", "Node.js"],
    github: "https://github.com/craigdanielk/web-builder",
  },
  {
    name: "Control Tower",
    description:
      "Central command and monitoring for the distributed agent system. Health checks, task routing, and system-wide observability.",
    category: "ai-infrastructure",
    highlights: ["Agent health monitoring", "Task routing", "System observability"],
    techStack: ["TypeScript", "Supabase", "Node.js"],
    github: "https://github.com/craigdanielk/control-tower",
  },
  {
    name: "LISA",
    description:
      "Language Intent to Software Architecture. Conversational specification builder that transforms natural language intent into validated system architectures.",
    category: "ai-infrastructure",
    highlights: ["Intent-to-architecture", "CSR framework", "Spec generation"],
    techStack: ["Python", "Claude API", "TypeScript"],
    github: "https://github.com/craigdanielk/lisa",
  },
  {
    name: "Phase0 Expert",
    description:
      "Conversational Phase0 specification builder with CSR framework validation. Integrates with LISA to produce validated, agent-ready project specifications.",
    category: "automation",
    highlights: ["CSR validation", "Conversational UX", "Spec output"],
    techStack: ["Python", "Claude API"],
    github: "https://github.com/craigdanielk/phase0-expert",
  },
  {
    name: "Project Ops",
    description:
      "Plug-and-play project state management for AI-assisted development. Clone, init, delete — keeps agent workspaces clean and reproducible.",
    category: "tooling",
    highlights: ["State management", "Workspace isolation", "CLI interface"],
    techStack: ["Bash", "Git", "CLI"],
    github: "https://github.com/craigdanielk/project-ops",
  },
  {
    name: "Email Agent",
    description:
      "Property management email automation. Processes tenant communications, extracts action items, and routes responses with minimal human intervention.",
    category: "automation",
    highlights: ["Email parsing", "Action extraction", "Auto-routing"],
    techStack: ["Python", "Claude API", "Gmail API"],
    github: "https://github.com/craigdanielk/email-agent-property-management",
  },
  {
    name: "Gravity Claw",
    description:
      "Specialised automation agent handling task extraction and execution across the system. Part of the agent army infrastructure.",
    category: "automation",
    highlights: ["Task extraction", "Automated execution", "Pipeline integration"],
    techStack: ["Python", "Claude API"],
    github: "https://github.com/craigdanielk/Gravity_Claw",
  },
  {
    name: "Fractal OS",
    description:
      "Recursive operating system framework for self-organising agent architectures. Explores fractal patterns for scalable multi-agent coordination.",
    category: "ai-infrastructure",
    highlights: ["Recursive architecture", "Self-organising agents", "Fractal patterns"],
    techStack: ["TypeScript", "Python"],
    github: "https://github.com/craigdanielk/fractal-os",
  },
];

export const categoryLabels: Record<PortfolioRepo["category"], string> = {
  "ai-infrastructure": "AI Infrastructure",
  automation: "Automation",
  "web-platform": "Web Platform",
  tooling: "Tooling",
};

export const categoryColors: Record<PortfolioRepo["category"], string> = {
  "ai-infrastructure": "bg-blue-900/40 text-blue-400 border-blue-500/20",
  automation: "bg-purple-900/40 text-purple-400 border-purple-500/20",
  "web-platform": "bg-emerald-900/40 text-emerald-400 border-emerald-500/20",
  tooling: "bg-amber-900/40 text-amber-400 border-amber-500/20",
};
