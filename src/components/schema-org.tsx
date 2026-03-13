import type { PostMeta } from "@/lib/types";

interface SchemaOrgProps {
  post: PostMeta;
  content: string;
  url: string;
}

// JSON-LD Schema.org markup for GEO optimization.
// Content is sourced from our own MDX frontmatter (trusted), not user input.
export function ArticleSchema({ post, url }: SchemaOrgProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "A.R.A.G.O.N.",
      url: url.split("/blog")[0] || url.split("/conversations")[0],
    },
    description: post.excerpt,
    keywords: post.tags.join(", "),
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
