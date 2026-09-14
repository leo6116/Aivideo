"use client";

import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_0_0_1px_rgba(255,214,10,0.15)]",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-foreground hover:text-accent",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = false, children, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement | null>(null);

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (!magnetic || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      innerRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }

    function handleMouseLeave() {
      if (!magnetic || !innerRef.current) return;
      innerRef.current.style.transform = "translate(0, 0)";
    }

    return (
      <button
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out disabled:opacity-40 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
