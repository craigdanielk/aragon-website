import { Suspense } from "react";
import { StatusTracker } from "./status-tracker";

export const metadata = {
  title: "Build Status | Aurelix",
  description: "Track the status of your Aurelix web build.",
};

export default function AurelixStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg text-neutral-300">Loading...</p>
        </div>
      }
    >
      <StatusTracker />
    </Suspense>
  );
}
