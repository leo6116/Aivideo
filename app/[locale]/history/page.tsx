"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clapperboard, Trash2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { projectRepository } from "@/lib/storage";
import { useGeneratorStore } from "@/store/useGeneratorStore";
import { formatTimestamp } from "@/lib/utils";
import type { StoryboardProject } from "@/lib/types";

export default function HistoryPage() {
  const t = useTranslations("history");
  const locale = useLocale();
  const [projects, setProjects] = useState<StoryboardProject[]>([]);
  const router = useRouter();
  const loadStoryboard = useGeneratorStore((s) => s.loadStoryboard);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable client-side
    setProjects(projectRepository.list());
  }, []);

  function handleOpen(project: StoryboardProject) {
    loadStoryboard(project.storyboard, {
      topic: project.input.topic,
      duration: project.input.duration,
      tone: project.input.tone,
      aspectRatio: project.input.aspectRatio,
      hadImage: project.input.hadImage,
    });
    router.push("/generate");
  }

  function handleDelete(id: string) {
    projectRepository.remove(id);
    setProjects(projectRepository.list());
  }

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">{t("eyebrow")}</p>
        <h1 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-24 text-center">
            <Clapperboard className="h-8 w-8 text-muted" />
            <p className="text-sm text-muted">{t("emptyState")}</p>
            <Link href="/generate">
              <Button magnetic>{t("startGenerating")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{project.storyboard.tone}</Badge>
                    <Badge variant="outline">{project.storyboard.aspectRatio}</Badge>
                  </div>
                  <button
                    type="button"
                    data-cursor="hover"
                    onClick={() => handleDelete(project.id)}
                    aria-label={t("deleteProject")}
                    className="text-muted opacity-0 transition-opacity duration-150 hover:text-red-400 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-4 line-clamp-2 text-lg font-semibold tracking-tight">
                  {project.storyboard.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{project.storyboard.logline}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>
                    {formatTimestamp(project.storyboard.totalDuration)} · {project.storyboard.segments.length}{" "}
                    {t("segmentsSuffix")}
                  </span>
                  <span>{new Date(project.createdAt).toLocaleDateString(locale)}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  onClick={() => handleOpen(project)}
                >
                  {t("open")}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
