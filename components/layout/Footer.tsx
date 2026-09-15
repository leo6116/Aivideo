import { useTranslations } from "next-intl";
import { Clapperboard } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 font-semibold tracking-tight">
            <Clapperboard className="h-5 w-5 text-accent" />
            <span>
              Scene<span className="text-accent">Forge</span> AI
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{t("tagline")}</p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">{t("product")}</span>
            <Link href="/generate" className="text-foreground hover:text-accent">
              {tNav("generate")}
            </Link>
            <Link href="/history" className="text-foreground hover:text-accent">
              {tNav("history")}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">{t("worksWith")}</span>
            <span className="text-muted">Sora · Runway · Kling</span>
            <span className="text-muted">Luma · Veo · Pika</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
