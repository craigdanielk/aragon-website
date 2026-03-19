export interface WorkflowAgent {
  name: string;
  role: string;
  href: string;
}

export interface WorkflowSkill {
  name: string;
  description: string;
}

export interface Workflow {
  slug: string;
  name: string;
  summary: string;
  agents: WorkflowAgent[];
  skills: WorkflowSkill[];
  /** Pattern used to match briefs in Supabase for stats */
  briefPattern: string;
  /** Mermaid-style diagram rendered as inline SVG path data */
  diagramNodes: DiagramNode[];
  diagramEdges: DiagramEdge[];
}

export interface DiagramNode {
  id: string;
  label: string;
  type: "trigger" | "agent" | "process" | "output";
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export const workflows: Workflow[] = [
  {
    slug: "brief-execution-pipeline",
    name: "BRIEF Execution Pipeline",
    summary:
      "The canonical task protocol that powers all agent work. SOVEREIGN plans sprints, FORGE validates and assigns BRIEFs, executor agents claim and complete tasks, artifacts are logged to Supabase, and HEARTBEAT notifies on completion. Every unit of work flows through this pipeline.",
    briefPattern: "BRIEF",
    agents: [
      { name: "SOVEREIGN", role: "Sprint planner and orchestrator", href: "/builds" },
      { name: "FORGE", role: "BRIEF validation and assignment", href: "/builds" },
      { name: "HEARTBEAT", role: "Completion notifications", href: "/builds" },
    ],
    skills: [
      { name: "brief-create", description: "Generate structured BRIEF from requirements" },
      { name: "brief-validate", description: "Validate BRIEF schema and dependencies" },
      { name: "brief-assign", description: "Route BRIEF to appropriate executor agent" },
      { name: "artifact-log", description: "Log completed work artifacts to Supabase" },
    ],
    diagramNodes: [
      { id: "trigger", label: "Sprint Plan", type: "trigger" },
      { id: "sovereign", label: "SOVEREIGN", type: "agent" },
      { id: "forge", label: "FORGE", type: "agent" },
      { id: "validate", label: "Validate", type: "process" },
      { id: "assign", label: "Assign", type: "process" },
      { id: "executor", label: "Executor Agent", type: "agent" },
      { id: "artifacts", label: "Artifacts", type: "output" },
      { id: "heartbeat", label: "HEARTBEAT", type: "agent" },
    ],
    diagramEdges: [
      { from: "trigger", to: "sovereign", label: "plan" },
      { from: "sovereign", to: "forge", label: "create" },
      { from: "forge", to: "validate", label: "check" },
      { from: "validate", to: "assign", label: "route" },
      { from: "assign", to: "executor", label: "claim" },
      { from: "executor", to: "artifacts", label: "produce" },
      { from: "artifacts", to: "heartbeat", label: "notify" },
    ],
  },
  {
    slug: "content-generation",
    name: "Content Generation",
    summary:
      "End-to-end content pipeline from topic harvesting to multi-platform publishing. ARAGON mines development logs for topics, generates posts via LLM with RAG context, schedules publication across 25+ platforms, and tracks engagement metrics. Real development work becomes shareable content automatically.",
    briefPattern: "content",
    agents: [
      { name: "ARAGON", role: "Content engine and publisher", href: "/builds" },
      { name: "LORE", role: "RAG context retrieval", href: "/builds" },
      { name: "SOVEREIGN", role: "Topic prioritization", href: "/builds" },
    ],
    skills: [
      { name: "topic-harvest", description: "Extract publishable topics from dev logs" },
      { name: "rag-retrieve", description: "Pull relevant context from knowledge base" },
      { name: "content-synthesize", description: "Generate post from topic + context" },
      { name: "multi-publish", description: "Distribute content across platforms" },
    ],
    diagramNodes: [
      { id: "devlogs", label: "Dev Logs", type: "trigger" },
      { id: "harvest", label: "Topic Harvest", type: "process" },
      { id: "aragon", label: "ARAGON", type: "agent" },
      { id: "lore", label: "LORE", type: "agent" },
      { id: "synthesize", label: "Synthesize", type: "process" },
      { id: "review", label: "Review", type: "process" },
      { id: "publish", label: "Publish", type: "output" },
    ],
    diagramEdges: [
      { from: "devlogs", to: "harvest", label: "mine" },
      { from: "harvest", to: "aragon", label: "topics" },
      { from: "aragon", to: "lore", label: "context" },
      { from: "lore", to: "synthesize", label: "RAG" },
      { from: "synthesize", to: "review", label: "draft" },
      { from: "review", to: "publish", label: "schedule" },
    ],
  },
  {
    slug: "demand-intelligence",
    name: "Demand Intelligence",
    summary:
      "Automated market scanning and lead qualification pipeline. RECON continuously monitors multiple data sources for demand signals, scores opportunities using LLM analysis, and routes qualified leads into the CRM pipeline. Every signal gets a confidence score and recommended action.",
    briefPattern: "recon",
    agents: [
      { name: "RECON", role: "Signal scanning and scoring", href: "/builds" },
      { name: "SOVEREIGN", role: "Priority routing", href: "/builds" },
      { name: "HEARTBEAT", role: "Alert delivery", href: "/builds" },
    ],
    skills: [
      { name: "signal-scan", description: "Monitor sources for demand signals" },
      { name: "signal-score", description: "LLM-based opportunity scoring" },
      { name: "lead-qualify", description: "Filter and rank qualified leads" },
      { name: "pipeline-route", description: "Route leads to appropriate pipeline stage" },
    ],
    diagramNodes: [
      { id: "sources", label: "Data Sources", type: "trigger" },
      { id: "recon", label: "RECON", type: "agent" },
      { id: "scan", label: "Scan", type: "process" },
      { id: "score", label: "Score", type: "process" },
      { id: "qualify", label: "Qualify", type: "process" },
      { id: "pipeline", label: "Pipeline", type: "output" },
      { id: "heartbeat", label: "HEARTBEAT", type: "agent" },
    ],
    diagramEdges: [
      { from: "sources", to: "recon", label: "ingest" },
      { from: "recon", to: "scan", label: "parse" },
      { from: "scan", to: "score", label: "signals" },
      { from: "score", to: "qualify", label: "ranked" },
      { from: "qualify", to: "pipeline", label: "qualified" },
      { from: "pipeline", to: "heartbeat", label: "alert" },
    ],
  },
  {
    slug: "skill-acquisition",
    name: "Skill Acquisition",
    summary:
      "How agents learn new capabilities. When FORGE encounters a task requiring unknown skills, LORE searches for existing patterns, composes new skill chains from primitives, tests them in sandbox, and registers proven skills in the shared registry. The skill library grows with every novel task.",
    briefPattern: "skill",
    agents: [
      { name: "LORE", role: "Skill librarian and composer", href: "/builds" },
      { name: "FORGE", role: "Skill requirement detection", href: "/builds" },
      { name: "SOVEREIGN", role: "Skill approval", href: "/builds" },
    ],
    skills: [
      { name: "skill-search", description: "Semantic search across skill registry" },
      { name: "skill-compose", description: "Chain primitives into new capabilities" },
      { name: "skill-test", description: "Sandbox validation of new skills" },
      { name: "skill-register", description: "Add proven skills to shared registry" },
    ],
    diagramNodes: [
      { id: "task", label: "Novel Task", type: "trigger" },
      { id: "forge", label: "FORGE", type: "agent" },
      { id: "detect", label: "Gap Detect", type: "process" },
      { id: "lore", label: "LORE", type: "agent" },
      { id: "compose", label: "Compose", type: "process" },
      { id: "test", label: "Sandbox Test", type: "process" },
      { id: "registry", label: "Skill Registry", type: "output" },
    ],
    diagramEdges: [
      { from: "task", to: "forge", label: "needs" },
      { from: "forge", to: "detect", label: "missing" },
      { from: "detect", to: "lore", label: "search" },
      { from: "lore", to: "compose", label: "chain" },
      { from: "compose", to: "test", label: "validate" },
      { from: "test", to: "registry", label: "register" },
    ],
  },
  {
    slug: "deploy-and-demo",
    name: "Deploy & Demo",
    summary:
      "From built project to live demo in minutes. DELIVER takes completed builds, packages them as standalone demos, deploys to Vercel with preview URLs, and notifies stakeholders. Every build gets a shareable proof-of-work link automatically.",
    briefPattern: "deploy",
    agents: [
      { name: "DELIVER", role: "Demo packaging and deployment", href: "/builds" },
      { name: "FORGE", role: "Build verification", href: "/builds" },
      { name: "HEARTBEAT", role: "Deployment notifications", href: "/builds" },
    ],
    skills: [
      { name: "build-verify", description: "Verify build passes all checks" },
      { name: "demo-package", description: "Package project as standalone demo" },
      { name: "vercel-deploy", description: "Deploy to Vercel with preview URL" },
      { name: "stakeholder-notify", description: "Send deployment links to stakeholders" },
    ],
    diagramNodes: [
      { id: "build", label: "Completed Build", type: "trigger" },
      { id: "forge", label: "FORGE", type: "agent" },
      { id: "verify", label: "Verify", type: "process" },
      { id: "deliver", label: "DELIVER", type: "agent" },
      { id: "package", label: "Package", type: "process" },
      { id: "deploy", label: "Deploy", type: "process" },
      { id: "live", label: "Live Demo", type: "output" },
      { id: "heartbeat", label: "HEARTBEAT", type: "agent" },
    ],
    diagramEdges: [
      { from: "build", to: "forge", label: "submit" },
      { from: "forge", to: "verify", label: "check" },
      { from: "verify", to: "deliver", label: "pass" },
      { from: "deliver", to: "package", label: "wrap" },
      { from: "package", to: "deploy", label: "push" },
      { from: "deploy", to: "live", label: "URL" },
      { from: "live", to: "heartbeat", label: "notify" },
    ],
  },
];

export function getWorkflow(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug);
}
