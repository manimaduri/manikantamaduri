import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
