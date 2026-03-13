"use client";

import { PILLARS } from "@/lib/types";

interface PillarFilterProps {
  active: string | null;
  onSelect: (pillar: string | null) => void;
}

export function PillarFilter({ active, onSelect }: PillarFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect(null)}
        className={`text-xs font-mono px-3 py-1.5 rounded transition-colors ${
          active === null
            ? "bg-neutral-800 text-neutral-200"
            : "text-neutral-500 hover:text-neutral-300"
        }`}
      >
        All
      </button>
      {PILLARS.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`text-xs font-mono px-3 py-1.5 rounded transition-colors ${
            active === p.id
              ? "bg-neutral-800 text-neutral-200"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
