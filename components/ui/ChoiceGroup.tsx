"use client";

import { cn } from "@/lib/utils";

interface ChoiceGroupProps<T extends string | number> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function ChoiceGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: ChoiceGroupProps<T>) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              type="button"
              key={String(opt.value)}
              data-cursor="hover"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-colors duration-150",
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-foreground hover:border-accent hover:text-accent"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
