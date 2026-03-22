"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";

interface BriefStatus {
  id: string;
  name: string;
  status: "QUEUED" | "CLAIMED" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "BLOCKED";
  summary: string;
  preview_url?: string | null;
  completed_at?: string | null;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  QUEUED: {
    label: "Queued",
    color: "text-yellow-400",
    bgColor: "bg-yellow-950/30",
    borderColor: "border-yellow-800",
  },
  CLAIMED: {
    label: "In Progress",
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800",
  },
  ACTIVE: {
    label: "Building",
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800",
  },
  COMPLETED: {
    label: "Completed",
    color: "text-green-400",
    bgColor: "bg-green-950/30",
    borderColor: "border-green-800",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-neutral-400",
    bgColor: "bg-neutral-900/30",
    borderColor: "border-neutral-700",
  },
  BLOCKED: {
    label: "Blocked",
    color: "text-red-400",
    bgColor: "bg-red-950/30",
    borderColor: "border-red-800",
  },
};

const STEPS = ["QUEUED", "CLAIMED", "COMPLETED"] as const;

export function StatusTracker() {
  const searchParams = useSearchParams();
  const briefId = searchParams.get("id");
  const [brief, setBrief] = useState<BriefStatus | null>(null);
  const [error, setError] = useState("");
  const [polling, setPolling] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!briefId) return;

    try {
      const res = await fetch(`/api/aurelix/status?id=${briefId}`);
      if (!res.ok) {
        throw new Error("Brief not found");
      }
      const data = await res.json();
      setBrief(data);

      // Stop polling if terminal state
      if (data.status === "COMPLETED" || data.status === "CANCELLED") {
        setPolling(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch status"
      );
      setPolling(false);
    }
  }, [briefId]);

  useEffect(() => {
    fetchStatus();

    if (!polling) return;

    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [fetchStatus, polling]);

  if (!briefId) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-neutral-100 mb-4">
          No Build ID Provided
        </h1>
        <p className="text-neutral-400 mb-8">
          Submit an intake form to get a tracking link.
        </p>
        <Link
          href="/aurelix"
          className="px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
        >
          Go to Intake Form
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-neutral-100 mb-4">
          Error
        </h1>
        <p className="text-red-400 mb-8">{error}</p>
        <Link
          href="/aurelix"
          className="px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
        >
          Submit New Request
        </Link>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-lg text-neutral-300">Loading build status...</p>
      </div>
    );
  }

  const statusInfo = STATUS_CONFIG[brief.status] || STATUS_CONFIG.QUEUED;
  const currentStepIndex = STEPS.indexOf(
    brief.status === "ACTIVE" || brief.status === "CLAIMED"
      ? "CLAIMED"
      : (brief.status as (typeof STEPS)[number])
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
          Build Status
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          Tracking your Aurelix web build in real time.
        </p>
      </RevealOnScroll>

      {/* Status badge */}
      <div className="mb-8">
        <span
          className={`inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg ${statusInfo.bgColor} ${statusInfo.color} border ${statusInfo.borderColor}`}
        >
          {(brief.status === "QUEUED" ||
            brief.status === "CLAIMED" ||
            brief.status === "ACTIVE") && (
            <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
          )}
          {statusInfo.label}
        </span>
      </div>

      {/* Progress steps */}
      <div className="mb-12">
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => {
            const isActive = i <= currentStepIndex && currentStepIndex >= 0;
            const isCurrent = i === currentStepIndex;
            const stepLabels: Record<string, string> = {
              QUEUED: "Queued",
              CLAIMED: "Building",
              COMPLETED: "Complete",
            };
            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono border-2 transition-colors ${
                      isActive
                        ? isCurrent
                          ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                          : "border-[var(--accent-green)] bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
                        : "border-neutral-700 bg-neutral-900 text-neutral-600"
                    }`}
                  >
                    {isActive && !isCurrent ? "\u2713" : i + 1}
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      isActive ? "text-neutral-200" : "text-neutral-600"
                    }`}
                  >
                    {stepLabels[step]}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 -mt-5 ${
                      i < currentStepIndex
                        ? "bg-[var(--accent-green)]"
                        : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Brief details */}
      <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] mb-8">
        <h2 className="text-xl font-semibold text-neutral-100 mb-3">
          Build Details
        </h2>
        <p className="text-base text-neutral-300 leading-relaxed mb-4">
          {brief.summary}
        </p>
        <p className="text-xs font-mono text-neutral-500">
          ID: {brief.id}
        </p>
      </div>

      {/* Preview URL (shown when completed) */}
      {brief.status === "COMPLETED" && brief.preview_url && (
        <div className="p-6 rounded-lg bg-[var(--accent-blue-glow)] border border-[var(--accent-blue)]/30 mb-8">
          <h2 className="text-xl font-semibold text-neutral-100 mb-3">
            Your Site is Ready
          </h2>
          <a
            href={brief.preview_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
          >
            View Preview
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="inline-block"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {brief.completed_at && (
            <p className="text-sm text-neutral-400 mt-3">
              Completed{" "}
              {new Date(brief.completed_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}

      {/* Polling indicator */}
      {polling && (
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span className="inline-block w-3 h-3 border border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
          Auto-refreshing every 5 seconds
        </div>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/aurelix"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          &larr; Submit another request
        </Link>
      </div>
    </div>
  );
}
