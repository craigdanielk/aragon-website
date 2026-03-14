"use client";

import Link from "next/link";
import { HeroBackground } from "@/components/hero-background";
import { WordReveal } from "@/components/motion";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <p className="font-mono text-base text-[var(--accent-green)] mb-4 tracking-wider">
          A.R.A.G.O.N.
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-neutral-100 leading-[1.1] mb-6 max-w-3xl">
          <WordReveal text="Practitioner-led AI development." />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10"
        >
          Build logs, architectural patterns, cost breakdowns, and tool
          autopsies from real projects. What actually worked, what didn&apos;t,
          and why.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/blog"
            className="px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
          >
            Read the Blog
          </Link>
          <Link
            href="/consultation"
            className="px-6 py-3 text-base font-medium rounded-md border border-[var(--border)] text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
