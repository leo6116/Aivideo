"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/generate/CopyButton";
import { formatTimestamp } from "@/lib/utils";
import type { StoryboardSegment } from "@/lib/types";

interface SegmentCardProps {
  segment: StoryboardSegment;
  index: number;
  onRegenerate?: (index: number) => void;
  regenerating?: boolean;
}

export function SegmentCard({ segment, index, onRegenerate, regenerating }: SegmentCardProps) {
  const t = useTranslations("segment");
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.6), ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">
            {t("segmentLabel", { n: segment.index + 1 })} · {formatTimestamp(segment.startTime)}–{formatTimestamp(segment.endTime)}
          </Badge>
          {segment.cameraTechniques.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              type="button"
              data-cursor="hover"
              disabled={regenerating}
              onClick={() => onRegenerate(index)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${regenerating ? "animate-spin" : ""}`} />
              {t("tryAgain")}
            </button>
          )}
          <CopyButton text={segment.videoPrompt} toastMessage={t("copiedToast", { n: segment.index + 1 })} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground">{segment.sceneDescription}</p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        data-cursor="hover"
        className="mt-4 text-xs font-medium uppercase tracking-widest text-muted hover:text-accent"
      >
        {expanded ? t("hidePrompt") : t("showPrompt")}
      </button>

      {expanded && (
        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed text-foreground/90">
          {segment.videoPrompt}
        </pre>
      )}
    </motion.div>
  );
}
