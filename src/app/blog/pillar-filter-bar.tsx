"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PILLARS } from "@/lib/types";

interface Props {
  active: string | null;
}

export function PillarFilterBar({ active }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function select(pillar: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (pillar) {
      params.set("pillar", pillar);
    } else {
      params.delete("pillar");
    }
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => select(null)}
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
          onClick={() => select(p.id)}
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
