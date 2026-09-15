"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export function GenerationLoader() {
  const t = useTranslations("loader");
  const stages = [t("stage1"), t("stage2"), t("stage3"), t("stage4"), t("stage5")];
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, stages.length - 1));
    }, 1600);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-border" />
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mt-8 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stages[stageIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-sm font-medium uppercase tracking-widest text-muted"
          >
            {stages[stageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-surface-alt">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${((stageIndex + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <p className="mt-4 text-xs text-muted/70">{t("hint")}</p>
    </div>
  );
}
