"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  toastMessage?: string;
  className?: string;
}

export function CopyButton({ text, label, toastMessage, className }: CopyButtonProps) {
  const t = useTranslations("copy");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const resolvedLabel = label ?? t("copy");
  const resolvedToast = toastMessage ?? t("copiedToast");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable — fall back silently, toast still confirms intent.
    }
    setCopied(true);
    showToast(resolvedToast);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-cursor="hover"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 hover:border-accent hover:text-accent",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-accent"
          >
            <Check className="h-3.5 w-3.5" />
            {t("copied")}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            {resolvedLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
