"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function GenerationError({ message, onRetry }: { message: string; onRetry: () => void }) {
  const t = useTranslations("error");

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{t("heading")}</h2>
      <p className="text-sm leading-relaxed text-muted">{message}</p>
      <Button variant="secondary" onClick={onRetry} magnetic>
        {t("tryAgain")}
      </Button>
    </div>
  );
}
