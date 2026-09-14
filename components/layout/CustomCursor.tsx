"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const touchCapable = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pointer capability is only knowable client-side
    setIsTouch(touchCapable);
    if (touchCapable) return;

    document.body.classList.add("cursor-none-desktop");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = 0;

    function loop() {
      ringX += (targetX - ringX) * (reduceMotion ? 1 : 0.18);
      ringY += (targetY - ringY) * (reduceMotion ? 1 : 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function handleMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor === "hover" ? null : el.dataset.cursor || null);
      } else {
        setActive(false);
        setLabel(null);
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transform: "translate(-9999px, -9999px)" }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-accent/70 transition-[width,height,background-color] duration-200 ease-out ${
          active ? "h-16 w-16 bg-accent/10" : "h-8 w-8 bg-transparent"
        }`}
        style={{ transform: "translate(-9999px, -9999px)" }}
      >
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-wide text-accent">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
