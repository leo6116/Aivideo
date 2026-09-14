"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  highlight?: string[];
}

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

export function TextReveal({ text, className, as = "h2", delay = 0, highlight = [] }: TextRevealProps) {
  const words = text.split(" ");
  const Tag = TAGS[as];

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-[0.15em]">
          <motion.span
            className={cn("inline-block", highlight.includes(word.replace(/[.,]/g, "")) && "text-accent")}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
