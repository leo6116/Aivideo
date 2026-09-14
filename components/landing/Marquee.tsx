const ITEMS = [
  "SCRIPT",
  "TIMELINE",
  "CINEMATIC PROMPTS",
  "COPY & PASTE",
  "CAMERA LANGUAGE",
  "3–5S PACING",
];

export function Marquee() {
  const content = ITEMS.join("  ·  ") + "  ·  ";

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
