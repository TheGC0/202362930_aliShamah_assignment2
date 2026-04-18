"use client";

import { useEffect, useState } from "react";

function formatElapsed(seconds: number): string {
  if (seconds < 60)   return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

/**
 * Displays time spent on the current page.
 * Pauses automatically when the browser tab is hidden (Page Visibility API)
 * so it only counts active reading time.
 */
export function VisitorTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;

    function start() {
      if (id !== null) return;
      id = setInterval(() => setSeconds((s) => s + 1), 1000);
    }

    function pause() {
      if (id === null) return;
      clearInterval(id);
      id = null;
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") pause();
      else start();
    }

    // Start immediately if tab is visible
    if (document.visibilityState === "visible") start();

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      pause();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <span
      aria-live="off"
      title="Active time spent on this page (pauses when tab is hidden)"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
    >
      <span aria-hidden="true">⏱</span>
      <span>{formatElapsed(seconds)}</span>
      <span className="sr-only">active time on page</span>
    </span>
  );
}
