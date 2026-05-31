import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-3 text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_10px_36px_-6px_rgba(139,92,246,0.8)] hover:brightness-110",
  outline:
    "border border-border-strong bg-surface/40 text-foreground hover:border-accent/60 hover:bg-surface",
  ghost: "text-muted hover:text-foreground",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(base, VARIANTS[variant], className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, VARIANTS[variant], className)} {...props}>
      {children}
    </button>
  );
}
