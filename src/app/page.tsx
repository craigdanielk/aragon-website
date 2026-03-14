import { getBlogPosts, getConversationPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { HeroSection } from "@/components/sections/hero";
import { MetricsStrip } from "@/components/sections/metrics";
import { ContentPillars } from "@/components/sections/content-pillars";
import { BuildsTeaser } from "@/components/sections/builds-teaser";
import { CtaSection } from "@/components/sections/cta";

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 5);
  const conversations = getConversationPosts().slice(0, 3);

  return (
    <div>
      <HeroSection />
      <MetricsStrip />

      <div className="max-w-5xl mx-auto px-6 py-20">
        {blogPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-semibold text-neutral-100 mb-8">
              Recent Posts
            </h2>
            <div className="space-y-1">
              {blogPosts.map((post) => (
                <PostCard key={post.meta.slug} post={post.meta} />
              ))}
            </div>
          </section>
        )}

        {conversations.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-semibold text-neutral-100 mb-8">
              Conversations with Claude
            </h2>
            <div className="space-y-1">
              {conversations.map((post) => (
                <PostCard key={post.meta.slug} post={post.meta} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ContentPillars />
      <BuildsTeaser />
      <CtaSection />
    </div>
  );
}
