import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--muted)]">
      {children}
    </span>
  );
}
