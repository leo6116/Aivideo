"use client";

import { useTranslations } from "next-intl";
import { Clapperboard } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/generate", label: t("generate") },
    { href: "/history", label: t("history") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" data-cursor="hover" className="flex items-center gap-2 font-semibold tracking-tight">
          <Clapperboard className="h-5 w-5 text-accent" />
          <span>
            Scene<span className="text-accent">Forge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={cn(
                "transition-colors duration-150 hover:text-foreground",
                pathname === link.href && "text-accent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/generate">
            <Button size="sm" magnetic>
              {t("newProject")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
