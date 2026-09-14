import Link from "next/link";
import { Clapperboard } from "lucide-react";

export function Footer() {
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
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            From idea to cinematic, copy-paste-ready AI video prompts — broken into a
            perfectly paced timeline, in under a minute.
          </p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">Product</span>
            <Link href="/generate" className="text-foreground hover:text-accent">
              Generate
            </Link>
            <Link href="/history" className="text-foreground hover:text-accent">
              History
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">Works with</span>
            <span className="text-muted">Sora · Runway · Kling</span>
            <span className="text-muted">Luma · Veo · Pika</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} SceneForge AI. Built for creators.
      </div>
    </footer>
  );
}
