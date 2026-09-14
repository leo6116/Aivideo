"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        key={`${pathname}-wipe`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9997] bg-background"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "bottom" }}
      />
    </AnimatePresence>
  );
}
