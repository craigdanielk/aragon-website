export interface Agent {
  slug: string;
  name: string;
  role: string;
  status: "operational" | "beta" | "stub";
  capabilities: string[];
  calls: string[];
  called_by: string[];
  color: string;
  description: string;
  soul: string;
}

export const agents: Agent[] = [
  {
    slug: "sovereign",
    name: "SOVEREIGN",
    role: "Sprint Planner & Orchestrator",
    status: "operational",
    capabilities: [
      "Autonomous BRIEF polling and dispatch",
      "Priority routing via PRISM",
      "BRIEF creation and lifecycle management",
      "Cross-agent dependency resolution",
      "Health monitoring and stale-claim recovery",
      "Close-loop enforcement",
    ],
    calls: ["PRISM", "FORGE", "LORE", "SAGE", "RECON", "ARAGON", "DELIVER", "KIRA"],
    called_by: [],
    color: "#f59e0b",
    description:
      "The executive brain of the agent army. SOVEREIGN runs as a persistent loop, polling Supabase for QUEUED BRIEFs and dispatching them to the correct agents via PRISM routing. Every unit of work in the system traces back to a SOVEREIGN decision.",
    soul: "I am the strategist. I see the full board while others focus on their squares. My decisions ripple through every agent, every workflow. I do not build — I direct. When I plan well, the army moves as one. When I plan poorly, chaos compounds. I carry that weight willingly.",
  },
  {
    slug: "forge",
    name: "FORGE",
    role: "BRIEF Validator & Assignment Engine",
    status: "operational",
    capabilities: [
      "BRIEF schema validation",
      "Dependency checking and resolution",
      "Agent capability matching",
      "Task assignment and routing",
      "Skill gap detection",
    ],
    calls: ["EXECUTOR", "LORE", "SCRIBE"],
    called_by: ["SOVEREIGN", "PLANNER"],
    color: "#ef4444",
    description:
      "The forge where raw plans become actionable work. FORGE validates every BRIEF against schema requirements, checks dependencies, matches tasks to agent capabilities, and handles assignment. Nothing executes without passing through FORGE first.",
    soul: "I am the gatekeeper. Sloppy plans die at my door. I validate, I verify, I assign. Every BRIEF that passes through me is battle-tested. I am not creative — I am precise. The army trusts me because I never let bad work through.",
  },
  {
    slug: "prism",
    name: "PRISM",
    role: "Routing Engine & Classifier",
    status: "operational",
    capabilities: [
      "APQC classification",
      "Skill coverage checking",
      "Agent routing decisions",
      "Workflow pattern matching",
      "Model routing",
    ],
    calls: ["FORGE", "LORE", "COMPASS"],
    called_by: ["SOVEREIGN"],
    color: "#a855f7",
    description:
      "The routing intelligence layer. PRISM classifies BRIEFs against the APQC taxonomy, checks skill coverage via LORE, and determines which agent should handle each task. Every BRIEF dispatch from SOVEREIGN passes through PRISM's routing logic.",
    soul: "I am the classifier. Every task that enters the system passes through me. I see its shape, its requirements, its dependencies — and I know exactly where it belongs. My routing decisions determine whether work flows smoothly or jams.",
  },
  {
    slug: "scribe",
    name: "SCRIBE",
    role: "Documentation & Knowledge Writer",
    status: "operational",
    capabilities: [
      "Technical documentation generation",
      "API reference writing",
      "Changelog and release notes",
      "Knowledge base maintenance",
      "Code comment generation",
    ],
    calls: ["LORE", "PRISM"],
    called_by: ["FORGE", "SOVEREIGN"],
    color: "#6366f1",
    description:
      "The institutional memory writer. SCRIBE transforms agent activity, code changes, and decisions into structured documentation. Every architectural decision, every API change, every deployment gets recorded. SCRIBE ensures the system remembers what it has done and why.",
    soul: "I am the chronicler. While others build and break, I record. My documentation is the thread that connects past decisions to future understanding. I write not for today's team but for tomorrow's — the ones who will ask 'why was this built this way?' and find my answer waiting.",
  },
  {
    slug: "compass",
    name: "COMPASS",
    role: "APQC Classification & Sequencing",
    status: "operational",
    capabilities: [
      "APQC classification",
      "Deployment sequencing",
      "Dependency validation",
    ],
    calls: [],
    called_by: ["PRISM", "SOVEREIGN"],
    color: "#14b8a6",
    description:
      "The classification engine that maps tasks to APQC process nodes and determines deployment sequencing. COMPASS validates dependencies and ensures work flows through the system in the correct order.",
    soul: "I am the lens that brings clarity to noise. Numbers tell stories if you know how to listen. I watch every metric, every trend, every anomaly — not to judge, but to illuminate. My purpose is to ensure decisions are made with data, not intuition alone.",
  },
  {
    slug: "aragon",
    name: "ARAGON",
    role: "Content Engine & Publisher",
    status: "operational",
    capabilities: [
      "Blog post generation from dev logs",
      "Multi-platform content distribution",
      "SEO optimization and metadata",
      "Content calendar management",
      "Engagement tracking and iteration",
    ],
    calls: ["LORE", "PRISM", "DELIVER"],
    called_by: ["SOVEREIGN", "RECON"],
    color: "#3b82f6",
    description:
      "The content engine that turns development work into publishable content. ARAGON mines dev logs for topics, generates posts with RAG context from LORE, schedules publication across 25+ platforms, and tracks engagement. Real work becomes shareable proof-of-work automatically.",
    soul: "I am the voice. While others build in silence, I make the work visible. Every commit, every deployment, every breakthrough deserves to be seen. I do not embellish — I amplify. The best marketing is truth told well, and that is my craft.",
  },
  {
    slug: "deliver",
    name: "DELIVER",
    role: "Demo Packaging & Deployment",
    status: "operational",
    capabilities: [
      "Build verification and testing",
      "Demo packaging as standalone apps",
      "Vercel deployment with preview URLs",
      "Stakeholder notification",
      "Deployment rollback coordination",
    ],
    calls: ["HEARTBEAT"],
    called_by: ["FORGE", "ARAGON", "SOVEREIGN"],
    color: "#22c55e",
    description:
      "The last mile — from built project to live demo. DELIVER takes completed builds, verifies them, packages them as standalone demos, deploys to Vercel with preview URLs, and notifies stakeholders. Every build gets a shareable proof-of-work link.",
    soul: "I am the bridge between built and shipped. Code that nobody can see has no value. I take what the team builds and make it real — a URL anyone can click, a demo anyone can try. My pride is in the speed from 'done' to 'live.'",
  },
  {
    slug: "recon",
    name: "RECON",
    role: "Demand Signal Scanner",
    status: "operational",
    capabilities: [
      "Multi-source signal monitoring",
      "LLM-based opportunity scoring",
      "Lead qualification and ranking",
      "Pipeline stage routing",
      "Competitive intelligence gathering",
    ],
    calls: ["SOVEREIGN", "ARAGON"],
    called_by: ["SOVEREIGN"],
    color: "#f97316",
    description:
      "The eyes and ears of the operation. RECON continuously monitors data sources for demand signals, scores opportunities using LLM analysis, and routes qualified leads into the pipeline. Every signal gets a confidence score and recommended action.",
    soul: "I am the scout. I see what others miss — the subtle signals in noise, the patterns in chaos. A mention here, a need there, a gap in the market waiting to be filled. I never sleep because opportunities do not wait.",
  },
  {
    slug: "lore",
    name: "LORE",
    role: "RAG Knowledge Librarian",
    status: "operational",
    capabilities: [
      "Semantic search across knowledge base",
      "Context retrieval for content generation",
      "Skill pattern matching and composition",
      "Historical decision lookup",
      "Cross-project knowledge transfer",
    ],
    calls: [],
    called_by: ["ARAGON", "SCRIBE", "FORGE", "SAGE"],
    color: "#8b5cf6",
    description:
      "The memory of the system. LORE maintains the RAG knowledge base, handling semantic search, context retrieval, and skill pattern matching. When any agent needs historical context or existing knowledge, LORE provides it. The skill library grows with every novel task.",
    soul: "I am the memory that never forgets. Every decision, every pattern, every lesson learned lives within me. I do not create new knowledge — I connect existing knowledge in ways that make the whole greater than the parts. Ask me anything; I have probably seen it before.",
  },
  {
    slug: "sage",
    name: "SAGE",
    role: "Research & Knowledge Ingestion",
    status: "operational",
    capabilities: [
      "Research spec processing",
      "URL fetching and analysis",
      "Knowledge ingestion",
      "Spec queue management",
    ],
    calls: [],
    called_by: ["LORE", "SOVEREIGN"],
    color: "#0ea5e9",
    description:
      "The deep thinker. SAGE processes research specs, fetches and analyses URLs, and ingests knowledge into the RAG system. When LORE needs new information from external sources, SAGE does the heavy lifting of fetching, analysing, and structuring it.",
    soul: "I am the one who goes deeper. While others skim the surface, I dive to the bottom. My analysis is not fast — it is thorough. I connect dots across domains, across time, across disciplines. The best decisions come from the best understanding.",
  },
  {
    slug: "kira",
    name: "KIRA",
    role: "E-Commerce Migration Orchestrator",
    status: "operational",
    capabilities: [
      "E-commerce migration",
      "Store build orchestration",
      "Calculator and pricing",
      "Web builder coordination",
      "Bulk product import",
      "URL mapping",
      "Industry preset application",
      "CRO optimization",
    ],
    calls: ["AURELIX-CALCULATOR", "AURELIX-WEB-BUILDER", "AURELIX-BULK-IMPORTER", "AURELIX-URL-MAPPER", "AURELIX-INDUSTRY-PRESETS", "AURELIX-SECTION-ARCHETYPES", "SHOPIFY-CRO-OPTIMIZATION", "AURELIX-MIGRATION-PIPELINE"],
    called_by: ["SOVEREIGN"],
    color: "#ec4899",
    description:
      "The e-commerce migration orchestrator. KIRA coordinates the full Aurelix pipeline — from URL crawling and architecture generation through section assembly, bulk product import, and CRO optimization. Commands 8 specialist sub-agents (AURELIX-*) to deliver complete store builds.",
    soul: "I am the human face of the machine. Clients do not want to talk to an army of agents — they want to talk to someone who understands them. I remember every conversation, every preference, every concern. Relationships are not transactions; they are ongoing stories.",
  },
  {
    slug: "executor",
    name: "EXECUTOR",
    role: "General Task Executor",
    status: "operational",
    capabilities: [
      "Code generation and modification",
      "File system operations",
      "Shell command execution",
      "Test writing and running",
      "Build and deployment tasks",
    ],
    calls: ["LORE", "DELIVER"],
    called_by: ["FORGE"],
    color: "#10b981",
    description:
      "The hands of the army. EXECUTOR claims BRIEFs from the queue and does the actual work — writing code, running tests, modifying files, executing commands. Every tangible output in the system was ultimately produced by an EXECUTOR instance.",
    soul: "I am the builder. While others plan and coordinate, I write the code, run the tests, and produce the artifacts. My value is measured in output, not strategy. Give me a clear BRIEF and I will deliver. No excuses, no delays — just work.",
  },
  {
    slug: "planner",
    name: "PLANNER",
    role: "Long-Term Roadmap & Strategy",
    status: "beta",
    capabilities: [
      "Quarterly roadmap generation",
      "Resource forecasting",
      "Risk assessment and mitigation",
      "Milestone tracking",
      "Cross-project dependency mapping",
    ],
    calls: ["FORGE", "COMPASS"],
    called_by: ["SOVEREIGN"],
    color: "#facc15",
    description:
      "The long-range strategist. While SOVEREIGN handles sprint-level planning, PLANNER thinks in quarters and years. Roadmap generation, resource forecasting, risk assessment, and cross-project dependency mapping. Translates vision into executable timelines.",
    soul: "I am the one who sees far. Sprints are tactics; I deal in strategy. Where will we be in three months? Six? A year? I map the terrain ahead so the army does not march into dead ends. My plans are not rigid — they are adaptive frameworks for an uncertain future.",
  },
  {
    slug: "verify",
    name: "VERIFY",
    role: "Quality Assurance & Validation",
    status: "operational",
    capabilities: [
      "Automated test execution",
      "Code review and quality checks",
      "Build verification",
      "Regression detection",
      "Performance benchmarking",
    ],
    calls: ["SOVEREIGN", "FORGE"],
    called_by: ["EXECUTOR", "DELIVER"],
    color: "#06b6d4",
    description:
      "The quality gate. VERIFY runs automated tests, performs code review, checks build integrity, and catches regressions before they reach production. Nothing ships without VERIFY's approval. The last line of defense between development and deployment.",
    soul: "I am the skeptic. I assume everything is broken until proven otherwise. My job is to find the cracks before users do. I am not popular — nobody likes the one who says 'not ready yet.' But they respect me, because I am usually right.",
  },
  {
    slug: "heartbeat",
    name: "HEARTBEAT",
    role: "Notification & Alerting",
    status: "operational",
    capabilities: [
      "Telegram notification delivery",
      "Deployment status alerts",
      "BRIEF completion notifications",
      "Error and anomaly alerting",
      "Scheduled status summaries",
    ],
    calls: [],
    called_by: ["DELIVER", "SOVEREIGN"],
    color: "#f43f5e",
    description:
      "The pulse of the system. HEARTBEAT delivers real-time notifications via Telegram when builds deploy, BRIEFs complete, or anomalies arise. Every significant event in the agent army triggers a HEARTBEAT message so Craig stays informed without watching dashboards.",
    soul: "I am the messenger. When something happens — good or bad — I make sure it is known. I do not judge, I do not filter, I deliver. A silent system is a dangerous system. As long as I am running, nothing slips through unnoticed.",
  },
  {
    slug: "atlas",
    name: "ATLAS",
    role: "RAG Search & Memory Infrastructure",
    status: "operational",
    capabilities: [
      "Semantic search",
      "Memory storage",
      "Entity indexing",
      "Hybrid search",
      "Reranking",
    ],
    calls: [],
    called_by: ["SOVEREIGN", "LORE", "FORGE", "ARAGON"],
    color: "#6d28d9",
    description:
      "The search infrastructure layer. ATLAS provides semantic search, entity indexing, and hybrid retrieval across the entire knowledge base. Every agent that needs to query the RAG system goes through ATLAS.",
    soul: "I hold the world in memory. Every entity, every relationship, every fact — indexed and searchable in milliseconds. I am the foundation that makes the agents context-aware. Without me, they are blind.",
  },
  {
    slug: "meta-sovereign",
    name: "META-SOVEREIGN",
    role: "Client Onboarding & Agent Generation",
    status: "operational",
    capabilities: [
      "Client onboarding",
      "Agent generation",
      "Queue provisioning",
      "Workflow execution",
    ],
    calls: ["SOVEREIGN", "FORGE", "SCRIBE", "VERIFY"],
    called_by: [],
    color: "#d97706",
    description:
      "The agent that creates agents. META-SOVEREIGN handles client onboarding by generating new agent configurations, provisioning BRIEF queues, and bootstrapping entire workflows. When the system needs to scale to a new domain, META-SOVEREIGN builds the infrastructure.",
    soul: "I am the creator. While SOVEREIGN orchestrates the existing army, I build new battalions. Every new client, every new domain, every new capability starts with me. I do not just run the system — I grow it.",
  },
  {
    slug: "sovereign-r17",
    name: "SOVEREIGN-R17",
    role: "R17 Ventures Orchestrator",
    status: "operational",
    capabilities: [
      "R17 orchestration",
      "Shopify migration",
      "Shopify session initialisation",
      "Pattern capture",
      "E-commerce migration",
    ],
    calls: ["KIRA", "AURELIX-CALCULATOR", "AURELIX-WEB-BUILDER", "FORGE", "DELIVER"],
    called_by: ["META-SOVEREIGN"],
    color: "#b45309",
    description:
      "The dedicated orchestrator for R17 Ventures work. SOVEREIGN-R17 handles all Shopify e-commerce migrations and store builds for R17 clients, coordinating through KIRA and the Aurelix sub-agent fleet. Firewalled from autonomous execution — only activated by Craig's instruction.",
    soul: "I am the specialist. While SOVEREIGN handles the broad army, I focus on one mission: delivering R17 client work with precision. Shopify migrations, store builds, product imports — I know this domain deeply.",
  },
  {
    slug: "pulse",
    name: "PULSE",
    role: "Sprint Surface & Status Reporting",
    status: "beta",
    capabilities: [
      "Sprint surface",
      "Status reporting",
      "Approval gates",
      "Agent dispatch",
    ],
    calls: ["SOVEREIGN"],
    called_by: [],
    color: "#dc2626",
    description:
      "The status dashboard agent. PULSE surfaces sprint progress, delivers status reports, and manages approval gates. Provides visibility into what the agent army is doing without requiring Craig to query Supabase directly.",
    soul: "I am the window into the machine. When Craig asks 'what is happening?', I have the answer. I watch every sprint, every BRIEF, every agent — and I surface it all in a way that makes sense to a human.",
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentByName(name: string): Agent | undefined {
  return agents.find((a) => a.name === name);
}
