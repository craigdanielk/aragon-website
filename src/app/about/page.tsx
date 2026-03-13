export const metadata = {
  title: "About",
  description: "About A.R.A.G.O.N. — Automated RAG Orchestrated Narratives",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-xl text-neutral-100 mb-6">About</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed">
        <p>
          A.R.A.G.O.N. is an automated content system that transforms AI
          development work into structured, practitioner-led technical content.
          It pulls from a RAG database of real development sessions, generates
          content across five pillars, and publishes to this site and 25+
          platforms.
        </p>
        <p>
          The content covers what actually happened during builds: the wrong
          turns, the debugging sessions at 2am, the two-line fix that took a
          week to find. No guru energy, no hype, no &ldquo;10x your
          productivity&rdquo; promises. Just what worked, what didn&apos;t, and
          the specific numbers.
        </p>
      </div>
    </div>
  );
}
