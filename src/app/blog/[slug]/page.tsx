import { notFound } from "next/navigation";
import { getBlogPosts, getPostBySlug } from "@/lib/content";
import { ArticleSchema } from "@/components/schema-org";
import { PostRenderer } from "@/components/post-renderer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <ArticleSchema
        post={post.meta}
        content={post.content}
        url={`/blog/${post.meta.slug}`}
      />

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-xs font-mono text-neutral-600">
            {post.meta.date}
          </time>
          {post.meta.pillar && (
            <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
              {post.meta.pillar}
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

      {post.meta.tags.length > 0 && (
        <footer className="mt-12 pt-6 border-t border-neutral-800">
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-neutral-600 bg-neutral-900/50 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
