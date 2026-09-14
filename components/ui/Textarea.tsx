import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none rounded-2xl border border-border bg-surface px-5 py-4 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
