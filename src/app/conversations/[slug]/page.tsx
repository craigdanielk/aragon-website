import { notFound } from "next/navigation";
import { getConversationPosts, getPostBySlug } from "@/lib/content";
import { ArticleSchema } from "@/components/schema-org";
import { PostRenderer } from "@/components/post-renderer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getConversationPosts();
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("conversations", slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  };
}

export default async function ConversationPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("conversations", slug);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <ArticleSchema
        post={post.meta}
        content={post.content}
        url={`/conversations/${post.meta.slug}`}
      />

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-xs font-mono text-neutral-600">
            {post.meta.date}
          </time>
          {post.meta.win && (
            <span className="text-xs font-mono text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
              win
            </span>
          )}
          {post.meta.readingTime && (
            <span className="text-xs font-mono text-neutral-600">
              {post.meta.readingTime}
            </span>
          )}
        </div>
        <h1 className="text-2xl text-neutral-100 leading-tight">
          {post.meta.title}
        </h1>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <PostRenderer content={post.content} />
      </div>
    </article>
  );
}
