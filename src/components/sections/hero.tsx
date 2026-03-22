"use client";

import Link from "next/link";
import { HeroBackground } from "@/components/hero-background";
import { WordReveal } from "@/components/motion";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-[var(--accent-green)] mb-6 tracking-widest uppercase"
        >
          A.R.A.G.O.N. &mdash; Autonomous Agent System
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold text-neutral-100 leading-[1.08] mb-6 max-w-4xl">
          <WordReveal text="AI-powered content and automation, delivered by agents." />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10"
        >
          15 coordinated AI agents that turn your intent into shipped output.
          Content pipelines, demand intelligence, skill acquisition, and
          build automation &mdash; running in production, measured in results.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/consultation"
            className="px-8 py-3.5 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
          >
            Start a Consultation
          </Link>
          <Link
            href="/workflows"
            className="px-8 py-3.5 text-base font-medium rounded-md border border-[var(--border)] text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
          >
            Explore Workflows
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
