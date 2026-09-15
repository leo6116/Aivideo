"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";

export function Hero() {
  const t = useTranslations("hero");
  const highlight = t("headlineHighlight").split(",");

  const stats: [string, string][] = [
    [t("statBeatValue"), t("statBeatLabel")],
    [t("statToolsValue"), t("statToolsLabel")],
    [t("statPromptValue"), t("statPromptLabel")],
    [t("statReadyValue"), t("statReadyLabel")],
  ];

  return (
    <section className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pt-36">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
      >
        {t("eyebrow")}
      </motion.p>

      <TextReveal
        as="h1"
        text={t("headline")}
        highlight={highlight}
        className="max-w-5xl text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight"
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
      >
        {t("subheadline")}
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
            {t("startGenerating")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/history">
          <Button size="lg" variant="secondary" magnetic>
            {t("viewHistory")}
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
        {stats.map(([stat, label]) => (
          <div key={label}>
            <p className="text-3xl font-bold text-accent sm:text-4xl">{stat}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
