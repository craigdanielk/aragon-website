export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600 font-mono">
          A.R.A.G.O.N. &mdash; Automated RAG Orchestrated Narratives
        </p>
        <p className="text-sm text-neutral-600">
          Built by Craig &middot; Cape Town
        </p>
      </div>
    </footer>
  );
}
