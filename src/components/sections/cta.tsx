"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";

export function CtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <RevealOnScroll>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Need something built?
          </h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-8">
            Autonomous AI agent systems, production web apps, and automation
            pipelines. Describe what you need — get a scope and quote.
          </p>
          <Link
            href="/consultation"
            className="inline-block px-8 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
          >
            Start a Consultation
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
