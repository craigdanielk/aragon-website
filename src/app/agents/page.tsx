import { agents } from "@/lib/agents";
import { AgentsContent } from "./agents-content";

export const metadata = {
  title: "Agents",
  description:
    "Meet the 14 AI agents powering the ARAGON system. Live status, capabilities, and connections.",
};

export default function AgentsPage() {
  return <AgentsContent agents={agents} />;
}
