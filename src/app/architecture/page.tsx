export const metadata = {
  title: "Architecture",
  description: "System architecture of the AI agent army — coming soon.",
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6">
        Architecture
      </h1>
      <p className="text-lg text-neutral-400 mb-10 max-w-2xl">
        A visual map of how the agent army coordinates — nodes, data flows,
        RAG memory layer, and deployment pipelines.
      </p>
      <div className="p-12 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] text-center">
        <p className="font-mono text-base text-neutral-500">Coming soon</p>
        <p className="text-sm text-neutral-600 mt-2">
          Interactive system diagram currently in development.
        </p>
      </div>
    </div>
  );
}
