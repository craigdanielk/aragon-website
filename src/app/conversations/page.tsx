import { getConversationPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";

export const metadata = {
  title: "Conversations with Claude",
  description:
    "The human arc of building an AI system. What happened, what frustrated me, what clicked, what I learned.",
};

export default function ConversationsPage() {
  const posts = getConversationPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-xl text-neutral-100 mb-2">
          Conversations with Claude
        </h1>
        <p className="text-sm text-neutral-500">
          The human side of building an AI system. What happened, what
          frustrated me, what clicked, what I learned.
        </p>
      </header>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.meta.slug} post={post.meta} />
        ))
      ) : (
        <p className="text-sm text-neutral-600 font-mono">
          First conversation coming soon.
        </p>
      )}
    </div>
  );
}
