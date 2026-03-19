import Link from "next/link";
import type { PostMeta } from "@/lib/types";

const pillarLabels: Record<string, string> = {
  "build-log": "Build Log",
  "pattern-library": "Pattern Library",
  "cost-breakdown": "Cost Breakdown",
  "tool-autopsy": "Tool Autopsy",
  "reference-stack": "Reference Stack",
};

export function LatestBlog({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-3">
            Latest from the Blog
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
            What we&apos;re building and learning
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden md:block text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors h-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <time className="text-xs font-mono text-neutral-600">
                {post.date}
              </time>
              {post.pillar && (
                <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                  {pillarLabels[post.pillar] || post.pillar}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-neutral-50 transition-colors leading-tight mb-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
            {post.readingTime && (
              <p className="text-xs font-mono text-neutral-600 mt-3">
                {post.readingTime}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="md:hidden mt-8 text-center">
        <Link
          href="/blog"
          className="text-base text-[var(--accent-blue-hover)] hover:text-[var(--accent-blue)] transition-colors"
        >
          View all posts &rarr;
        </Link>
      </div>
    </section>
  );
}
