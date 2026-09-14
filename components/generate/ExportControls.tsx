"use client";

import { Download } from "lucide-react";
import { CopyButton } from "@/components/generate/CopyButton";
import { Button } from "@/components/ui/Button";
import { formatTimestamp } from "@/lib/utils";
import type { StoryboardResponse } from "@/lib/types";

function buildCombinedText(storyboard: StoryboardResponse): string {
  const header = `${storyboard.title}\n${storyboard.logline}\n${"=".repeat(40)}\n\n`;
  const body = storyboard.segments
    .map(
      (seg) =>
        `SEGMENT ${seg.index + 1} · ${formatTimestamp(seg.startTime)}–${formatTimestamp(seg.endTime)}\nCamera: ${seg.cameraTechniques.join(", ")}\nScene: ${seg.sceneDescription}\n\nPrompt:\n${seg.videoPrompt}`
    )
    .join("\n\n" + "-".repeat(40) + "\n\n");
  return header + body;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ExportControls({ storyboard }: { storyboard: StoryboardResponse }) {
  const combinedText = buildCombinedText(storyboard);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton
        text={combinedText}
        label="Copy All Prompts"
        toastMessage="All prompts copied to clipboard"
        className="px-4 py-2"
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => downloadFile(`${storyboard.title.replace(/\s+/g, "-").toLowerCase()}.txt`, combinedText, "text/plain")}
      >
        <Download className="h-3.5 w-3.5" />
        Export .txt
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          downloadFile(
            `${storyboard.title.replace(/\s+/g, "-").toLowerCase()}.json`,
            JSON.stringify(storyboard, null, 2),
            "application/json"
          )
        }
      >
        <Download className="h-3.5 w-3.5" />
        Export .json
      </Button>
    </div>
  );
}
