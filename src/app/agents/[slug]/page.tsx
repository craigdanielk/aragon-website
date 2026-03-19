import { agents, getAgent } from "@/lib/agents";
import { AgentDetail } from "./agent-detail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: `${agent.name} — ${agent.role}`,
    description: agent.description,
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  return <AgentDetail agent={agent} />;
}
