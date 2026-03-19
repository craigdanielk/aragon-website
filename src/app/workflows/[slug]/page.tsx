import { notFound } from "next/navigation";
import { workflows, getWorkflow } from "@/lib/workflows";
import { WorkflowDetail } from "./workflow-detail";

export function generateStaticParams() {
  return workflows.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workflow = getWorkflow(slug);
  if (!workflow) return { title: "Workflow Not Found" };
  return {
    title: workflow.name,
    description: workflow.summary,
  };
}

export default async function WorkflowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workflow = getWorkflow(slug);
  if (!workflow) notFound();

  return <WorkflowDetail workflow={workflow} />;
}
