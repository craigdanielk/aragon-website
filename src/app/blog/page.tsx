import { getBlogPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { PillarFilterBar } from "./pillar-filter-bar";

interface Props {
  searchParams: Promise<{ pillar?: string }>;
}

export const metadata = {
  title: "Blog",
  description:
    "Technical content: build logs, patterns, cost breakdowns, tool autopsies, and reference stacks.",
};

export default async function BlogPage({ searchParams }: Props) {
  const { pillar } = await searchParams;
  const posts = getBlogPosts();

  const filtered = pillar
    ? posts.filter((p) => p.meta.pillar === pillar)
    : posts;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-xl text-neutral-100 mb-2">Blog</h1>
        <p className="text-sm text-neutral-500">
          Technical content across five pillars: build logs, patterns, costs,
          tool autopsies, and reference stacks.
        </p>
      </header>

      <PillarFilterBar active={pillar || null} />

      {filtered.length > 0 ? (
        filtered.map((post) => (
          <PostCard key={post.meta.slug} post={post.meta} />
        ))
      ) : (
        <p className="text-sm text-neutral-600 font-mono">
          No posts in this pillar yet.
        </p>
      )}
    </div>
  );
}
