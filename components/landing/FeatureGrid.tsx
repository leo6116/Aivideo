"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera, Clock, Image as ImageIcon, Sparkles, Wand2, Workflow } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

export function FeatureGrid() {
  const t = useTranslations("featureGrid");

  const features = [
    { icon: Camera, title: t("f1Title"), body: t("f1Body") },
    { icon: Clock, title: t("f2Title"), body: t("f2Body") },
    { icon: Workflow, title: t("f3Title"), body: t("f3Body") },
    { icon: ImageIcon, title: t("f4Title"), body: t("f4Body") },
    { icon: Wand2, title: t("f5Title"), body: t("f5Body") },
    { icon: Sparkles, title: t("f6Title"), body: t("f6Body") },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">{t("eyebrow")}</p>
      <TextReveal
        as="h2"
        text={t("heading")}
        className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight"
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
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
