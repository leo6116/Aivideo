"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { InputPanel } from "@/components/generate/InputPanel";
import { GenerationLoader } from "@/components/generate/GenerationLoader";
import { GenerationError } from "@/components/generate/GenerationError";
import { TimelineView } from "@/components/generate/TimelineView";
import { useGeneratorStore } from "@/store/useGeneratorStore";
import { projectRepository } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import type { GenerateFormValues } from "@/lib/validation";
import type { Duration, Tone, AspectRatio } from "@/lib/types";

export default function GeneratePage() {
  const t = useTranslations("generate");
  const tError = useTranslations("error");
  const locale = useLocale();
  const { status, errorMessage, storyboard, startGenerating, setSuccess, setError, reset, updateSegment } =
    useGeneratorStore();

  async function handleSubmit(values: GenerateFormValues) {
    startGenerating({
      topic: values.topic,
      duration: values.duration as Duration,
      tone: values.tone as Tone,
      aspectRatio: values.aspectRatio as AspectRatio,
      hadImage: !!values.imageBase64,
    });

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || tError("generic"));

      setSuccess(data.storyboard);

      projectRepository.save({
        id: generateId(),
        createdAt: new Date().toISOString(),
        input: {
          topic: values.topic,
          duration: values.duration as Duration,
          tone: values.tone as Tone,
          aspectRatio: values.aspectRatio as AspectRatio,
          hadImage: !!values.imageBase64,
        },
        storyboard: data.storyboard,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : tError("generic"));
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-2xl px-5 py-20 sm:px-8"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">{t("newProject")}</p>
            <h1 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">{t("buildStoryboard")}</h1>
            <InputPanel onSubmit={handleSubmit} submitting={false} />
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GenerationLoader />
          </motion.div>
        )}

        {status === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GenerationError message={errorMessage ?? tError("unknown")} onRetry={reset} />
          </motion.div>
        )}

        {status === "success" && storyboard && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TimelineView storyboard={storyboard} onSegmentUpdate={updateSegment} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
