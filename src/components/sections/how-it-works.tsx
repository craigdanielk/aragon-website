"use client";

import { Fragment, useRef } from "react";
import { RevealOnScroll } from "@/components/motion";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "BRIEF",
    description:
      "A structured task protocol defines what needs to happen. Human intent or agent-generated — every unit of work starts as a BRIEF.",
  },
  {
    number: "02",
    title: "Agent Fleet",
    description:
      "SOVEREIGN routes the BRIEF to the right agents. FORGE validates, executors build, VERIFY checks quality. 14 agents coordinate autonomously.",
  },
  {
    number: "03",
    title: "Delivered",
    description:
      "Artifacts produced, deployed, and distributed. Blog posts published, demos live, leads qualified. Measurable output, every time.",
  },
];

function ConnectorLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="hidden md:flex items-center justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px w-full bg-gradient-to-r from-[var(--accent-green)]/40 via-[var(--accent-green)]/20 to-[var(--accent-green)]/40 origin-left"
      />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="shrink-0 text-[var(--accent-green)]"
        aria-hidden="true"
      >
        <path
          d="M2 6h8M7 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
              From intent to output in three steps
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <RevealOnScroll delay={i * 0.2}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[var(--accent-green)]/30 bg-[var(--accent-green-glow)] mb-4">
                    <span className="text-lg font-bold font-mono text-[var(--accent-green)]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100 font-mono mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
              {i < steps.length - 1 && <ConnectorLine />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
