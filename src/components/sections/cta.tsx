"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";

export function CtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-28">
      <RevealOnScroll>
        <div className="text-center">
          <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-4">
            Ready to Automate?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-4">
            Let the agents work for you
          </h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10">
            Autonomous AI agent systems, production web apps, and automation
            pipelines. Describe what you need &mdash; get a scope and quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/consultation"
              className="inline-block px-10 py-4 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
            >
              Start a Consultation
            </Link>
            <Link
              href="/about"
              className="inline-block px-10 py-4 text-base font-medium rounded-md border border-[var(--border)] text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
