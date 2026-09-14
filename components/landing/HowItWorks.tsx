"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const STEPS = [
  {
    n: "01",
    title: "Describe your idea",
    body: "Type a topic or drop in a reference image, set your target duration, tone, and aspect ratio.",
  },
  {
    n: "02",
    title: "AI breaks it into a timeline",
    body: "Your idea is drafted into a script and split into precise 3–5 second beats, timestamped end to end.",
  },
  {
    n: "03",
    title: "Copy cinematic prompts",
    body: "Every beat ships with a dense, professional English prompt — camera moves, lighting, lens, mood — ready to paste.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">How it works</p>
      <TextReveal
        as="h2"
        text="From blank page to shot list."
        className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight"
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-8"
          >
            <span className="text-sm font-semibold text-accent">{step.n}</span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
