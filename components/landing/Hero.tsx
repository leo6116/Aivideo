"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pt-36">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
      >
        AI Video Script &amp; Prompt Generator
      </motion.p>

      <TextReveal
        as="h1"
        text="Turn one idea into a cinematic timeline of prompts."
        highlight={["cinematic", "prompts."]}
        className="max-w-5xl text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight"
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
      >
        Paste a topic or drop in a reference image. SceneForge AI breaks it into
        3–5 second beats and writes ultra-detailed, cinematic, copy-paste-ready
        prompts for Sora, Runway, Kling, Luma, Veo, and Pika — zero
        prompt-engineering required.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-12 flex flex-wrap items-center gap-4"
      >
        <Link href="/generate">
          <Button size="lg" magnetic className="group">
            Start Generating
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/history">
          <Button size="lg" variant="secondary" magnetic>
            View History
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4"
      >
        {[
          ["3–5s", "beat length"],
          ["6", "AI video tools"],
          ["<60s", "to first prompt"],
          ["100%", "copy-paste ready"],
        ].map(([stat, label]) => (
          <div key={label}>
            <p className="text-3xl font-bold text-accent sm:text-4xl">{stat}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
