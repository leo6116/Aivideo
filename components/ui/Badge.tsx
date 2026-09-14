import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "outline" | "muted";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  accent: "bg-accent text-accent-foreground",
  outline: "border border-border text-foreground hover:border-accent hover:text-accent",
  muted: "bg-surface-alt text-muted",
};

export function Badge({ className, variant = "outline", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-150",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
