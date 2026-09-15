"use client";

import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const items = t("items").split(",");
  const content = items.join("  ·  ") + "  ·  ";

  return (
    <div className="overflow-hidden border-y border-border bg-accent py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4 text-sm font-semibold uppercase tracking-widest text-accent-foreground sm:text-base">
          {content.repeat(4)}
        </span>
        <span className="px-4 text-sm font-semibold uppercase tracking-widest text-accent-foreground sm:text-base" aria-hidden>
          {content.repeat(4)}
        </span>
      </div>
    </div>
  );
}
