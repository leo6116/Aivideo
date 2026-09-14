"use client";

import { motion } from "framer-motion";
import { Camera, Clock, Image as ImageIcon, Sparkles, Wand2, Workflow } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

const FEATURES = [
  {
    icon: Camera,
    title: "Cinematic camera language built-in",
    body: "Dolly ins, whip pans, rack focus, orbit shots — applied purposefully, not randomly, by a director-trained prompt engine.",
  },
  {
    icon: Clock,
    title: "3–5s pacing tuned for short-form",
    body: "Every beat is timed for the attention span of Reels, TikTok, and Shorts — no dead air, no rushed cuts.",
  },
  {
    icon: Workflow,
    title: "Works with any AI video tool",
    body: "Prompts are written generically and precisely enough to paste straight into Sora, Runway, Kling, Luma, Veo, or Pika.",
  },
  {
    icon: ImageIcon,
    title: "Reference-image aware",
    body: "Upload a mood board or product shot and the AI grounds the entire narrative in what it sees.",
  },
  {
    icon: Wand2,
    title: "Tone-matched narrative",
    body: "Cinematic, energetic, documentary, luxury, or comedic — tone shapes both the story and the shot choices.",
  },
  {
    icon: Sparkles,
    title: "Zero prompt-engineering required",
    body: "You bring the idea. SceneForge writes the dense, technical, professional-grade prompt paragraph for you.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Why SceneForge</p>
      <TextReveal
        as="h2"
        text="Built by directors, for creators."
        className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight"
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-background p-8 transition-colors duration-200 hover:bg-surface"
          >
            <f.icon className="h-6 w-6 text-accent transition-transform duration-200 group-hover:scale-110" />
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
