"use client";

import type { DiagramNode, DiagramEdge } from "@/lib/workflows";

const nodeColors: Record<DiagramNode["type"], { bg: string; border: string; text: string }> = {
  trigger: {
    bg: "bg-[var(--accent-blue)]/10",
    border: "border-[var(--accent-blue)]/30",
    text: "text-[var(--accent-blue-hover)]",
  },
  agent: {
    bg: "bg-[var(--accent-green-glow)]",
    border: "border-[var(--accent-green)]/20",
    text: "text-[var(--accent-green)]",
  },
  process: {
    bg: "bg-neutral-800/50",
    border: "border-neutral-700",
    text: "text-neutral-300",
  },
  output: {
    bg: "bg-[var(--accent-blue)]/10",
    border: "border-[var(--accent-blue)]/20",
    text: "text-[var(--accent-blue-hover)]",
  },
};

const nodeTypeLabels: Record<DiagramNode["type"], string> = {
  trigger: "TRIGGER",
  agent: "AGENT",
  process: "PROCESS",
  output: "OUTPUT",
};

interface WorkflowDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  compact?: boolean;
}

export function WorkflowDiagram({ nodes, edges, compact = false }: WorkflowDiagramProps) {
  if (compact) {
    return <CompactDiagram nodes={nodes} edges={edges} />;
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 overflow-x-auto">
      <div className="flex items-center gap-2 mb-5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
          Flow Diagram
        </span>
      </div>

      <div className="flex items-center gap-3 min-w-max">
        {nodes.map((node, i) => {
          const colors = nodeColors[node.type];
          const edge = edges.find((e) => e.to === node.id);

          return (
            <div key={node.id} className="flex items-center gap-3">
              {i > 0 && edge && (
                <div className="flex items-center gap-1">
                  <div className="w-8 h-px bg-neutral-600" />
                  <span className="text-[10px] font-mono text-neutral-600 -mt-4 absolute-label">
                    {edge.label}
                  </span>
                  <svg width="8" height="8" viewBox="0 0 8 8" className="text-neutral-600 -ml-1">
                    <path d="M0 0L8 4L0 8Z" fill="currentColor" />
                  </svg>
                </div>
              )}
              <div
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border ${colors.bg} ${colors.border} min-w-[100px]`}
              >
                <span className={`text-[9px] font-mono uppercase tracking-widest ${colors.text} opacity-60`}>
                  {nodeTypeLabels[node.type]}
                </span>
                <span className={`text-sm font-mono font-medium ${colors.text}`}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-5 pt-4 border-t border-[var(--border)]">
        {(["trigger", "agent", "process", "output"] as const).map((type) => {
          const colors = nodeColors[type];
          return (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm border ${colors.bg} ${colors.border}`} />
              <span className="text-[10px] font-mono text-neutral-600 uppercase">
                {type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Thumbnail version for index cards */
function CompactDiagram({ nodes, edges }: { nodes: DiagramNode[]; edges: DiagramEdge[] }) {
  // Show a simplified horizontal flow
  const displayed = nodes.slice(0, 5);

  return (
    <div className="flex items-center gap-1.5 overflow-hidden">
      {displayed.map((node, i) => {
        const colors = nodeColors[node.type];
        const edge = edges.find((e) => e.to === node.id);

        return (
          <div key={node.id} className="flex items-center gap-1.5">
            {i > 0 && edge && (
              <div className="flex items-center">
                <div className="w-4 h-px bg-neutral-700" />
                <svg width="5" height="5" viewBox="0 0 5 5" className="text-neutral-700 -ml-0.5">
                  <path d="M0 0L5 2.5L0 5Z" fill="currentColor" />
                </svg>
              </div>
            )}
            <div
              className={`px-2 py-1 rounded border text-[10px] font-mono ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {node.label}
            </div>
          </div>
        );
      })}
      {nodes.length > 5 && (
        <span className="text-[10px] font-mono text-neutral-600 ml-1">
          +{nodes.length - 5}
        </span>
      )}
    </div>
  );
}
