"use client";

import { useEffect, useState } from "react";

/** Formats seconds into a human-readable string: 0s → 59s → 1m 30s → 1h 2m */
function formatElapsed(seconds: number): string {
  if (seconds < 60)   return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

/**
 * Displays how long the current visitor has been on the page.
 * Counter starts at 0 and increments every second.
 * Rendered client-side only to avoid SSR/hydration mismatches.
 */
export function VisitorTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      aria-live="off"
      title="Time spent on this page"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
    >
      <span aria-hidden="true">⏱</span>
      <span>{formatElapsed(seconds)}</span>
      <span className="sr-only">on page</span>
    </span>
  );
}
