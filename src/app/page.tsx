import { getBlogPosts, getConversationPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 5);
  const conversations = getConversationPosts().slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-16">
        <p className="font-mono text-sm text-neutral-600 mb-3">A.R.A.G.O.N.</p>
        <h1 className="text-2xl text-neutral-100 leading-tight mb-4">
          Practitioner-led AI development content.
        </h1>
        <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
          Build logs, architectural patterns, cost breakdowns, and tool
          autopsies from real projects. What actually worked, what didn&apos;t,
          and why.
        </p>
      </header>

      {blogPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="font-mono text-xs text-neutral-600 uppercase tracking-wider mb-6">
            Recent Posts
          </h2>
          {blogPosts.map((post) => (
            <PostCard key={post.meta.slug} post={post.meta} />
          ))}
        </section>
      )}

      {conversations.length > 0 && (
        <section>
          <h2 className="font-mono text-xs text-neutral-600 uppercase tracking-wider mb-6">
            Conversations with Claude
          </h2>
          {conversations.map((post) => (
            <PostCard key={post.meta.slug} post={post.meta} />
          ))}
        </section>
      )}

      {blogPosts.length === 0 && conversations.length === 0 && (
        <p className="text-sm text-neutral-600 font-mono">
          First posts incoming.
        </p>
      )}
    </div>
  );
}
