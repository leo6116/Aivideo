"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SegmentCard } from "@/components/generate/SegmentCard";
import { ExportControls } from "@/components/generate/ExportControls";
import { formatTimestamp } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import type { StoryboardResponse } from "@/lib/types";

interface TimelineViewProps {
  storyboard: StoryboardResponse;
  onSegmentUpdate: (index: number, patch: Partial<StoryboardResponse["segments"][number]>) => void;
}

export function TimelineView({ storyboard, onSegmentUpdate }: TimelineViewProps) {
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const { showToast } = useToast();

  async function handleRegenerate(index: number) {
    const segment = storyboard.segments.find((s) => s.index === index);
    if (!segment) return;
    setRegeneratingIndex(index);
    try {
      const res = await fetch("/api/regenerate-segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle: storyboard.title,
          tone: storyboard.tone,
          aspectRatio: storyboard.aspectRatio,
          sceneDescription: segment.sceneDescription,
          startTime: segment.startTime,
          endTime: segment.endTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to regenerate segment.");
      onSegmentUpdate(index, data.segment);
      showToast(`Segment ${index + 1} regenerated`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to regenerate segment.");
    } finally {
      setRegeneratingIndex(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{storyboard.tone}</Badge>
          <Badge variant="outline">{storyboard.aspectRatio}</Badge>
          <Badge variant="outline">{formatTimestamp(storyboard.totalDuration)} total</Badge>
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{storyboard.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{storyboard.logline}</p>

        <div className="mt-8">
          <ExportControls storyboard={storyboard} />
        </div>
      </motion.div>

      <div className="mt-12 space-y-4">
        {storyboard.segments.map((segment) => (
          <SegmentCard
            key={segment.index}
            segment={segment}
            index={segment.index}
            onRegenerate={handleRegenerate}
            regenerating={regeneratingIndex === segment.index}
          />
        ))}
      </div>
    </div>
  );
}
