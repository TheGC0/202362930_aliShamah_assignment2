"use client";

import { useCallback, useEffect, useState } from "react";

type QuoteState =
  | { status: "loading" }
  | { status: "success"; content: string; author: string }
  | { status: "error" };

/** Fallback quotes shown when the API is unreachable */
const FALLBACKS = [
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];

/**
 * Fetches a random inspirational/technology quote from the Quotable API
 * and displays it with a refresh button.
 * Falls back to hardcoded quotes when offline or rate-limited.
 */
export function QuoteWidget() {
  const [quote, setQuote] = useState<QuoteState>({ status: "loading" });

  const fetchQuote = useCallback(async () => {
    setQuote({ status: "loading" });
    try {
      const res = await fetch(
        "https://api.quotable.io/random?tags=technology,inspirational,wisdom&maxLength=160",
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setQuote({ status: "success", content: data.content, author: data.author });
    } catch {
      // API unreachable – show a random fallback quote
      const fb = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
      setQuote({ status: "success", content: fb.content, author: fb.author });
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
        Inspiration
      </p>

      {quote.status === "loading" && (
        <div aria-label="Loading quote…" className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[var(--surface-subtle)]" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-[var(--surface-subtle)]" />
          <div className="mt-2 h-2.5 w-1/3 animate-pulse rounded bg-[var(--surface-subtle)]" />
        </div>
      )}

      {quote.status === "success" && (
        <blockquote aria-live="polite">
          <p className="text-sm italic leading-relaxed text-[var(--text)]">
            &ldquo;{quote.content}&rdquo;
          </p>
          <cite className="mt-2 block text-xs not-italic text-[var(--muted)]">
            — {quote.author}
          </cite>
        </blockquote>
      )}

      <button
        type="button"
        onClick={fetchQuote}
        disabled={quote.status === "loading"}
        aria-label="Load a new quote"
        className="self-start rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50"
      >
        ↺ New quote
      </button>
    </div>
  );
}
