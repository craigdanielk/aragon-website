import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkAutoLink } from "@/lib/remark-auto-link";

interface Props {
  content: string;
}

export function PostRenderer({ content }: Props) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkAutoLink]}>
      {content}
    </ReactMarkdown>
  );
}
