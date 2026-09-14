"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Badge } from "@/components/ui/Badge";

const PREVIEW_SEGMENTS = [
  {
    time: "00:00–00:04",
    scene: "Alarm buzzes in a dim bedroom; a hand reaches out to silence it.",
    tags: ["Push-In", "Close-Up"],
    prompt:
      "Cinematic close-up push-in on a hand silencing a vintage alarm clock in a dim bedroom, soft blue pre-dawn light through blinds, 35mm lens, shallow depth of field, vertical 9:16 framing, quiet anticipatory mood.",
  },
  {
    time: "00:04–00:08",
    scene: "She rises, sunlight floods the room, energetic stretch.",
    tags: ["Dolly Out", "Wide Shot"],
    prompt:
      "Dolly out to a wide shot as she rises and stretches, warm golden sunlight flooding the bedroom, handheld micro-movement for energy, vertical 9:16 framing, motivational morning tone.",
  },
  {
    time: "00:08–00:12",
    scene: "Whip pan to a fresh green smoothie on the kitchen counter.",
    tags: ["Whip Pan", "Extreme Close-Up"],
    prompt:
      "Fast whip pan transition into an extreme close-up of a vivid green smoothie being poured, condensation on the glass, bright kitchen daylight, saturated fresh color palette, vertical 9:16 framing, energetic pacing.",
  },
];

export function PreviewShowcase() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Preview</p>
      <TextReveal
        as="h2"
        text="Your storyboard, beat by beat."
        className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight"
      />

      <div className="mt-16 space-y-4">
        {PREVIEW_SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.time}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{seg.time}</Badge>
                {seg.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
              <Copy className="h-4 w-4 text-muted" />
            </div>
            <p className="mt-4 text-sm text-foreground">{seg.scene}</p>
            <p className="mt-3 rounded-xl bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted">
              {seg.prompt}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
