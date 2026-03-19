import { workflows } from "@/lib/workflows";
import { WorkflowsContent } from "./workflows-content";

export const metadata = {
  title: "Workflows",
  description:
    "Live execution pipelines powering the AI agent army. Real stats, real diagrams, real output.",
};

export default function WorkflowsPage() {
  return <WorkflowsContent workflows={workflows} />;
}
