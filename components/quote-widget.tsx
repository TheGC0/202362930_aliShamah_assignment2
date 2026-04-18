"use client";

import { useCallback, useEffect, useState } from "react";

const FALLBACKS = [
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];

type QuoteState =
  | { status: "loading" }
  | { status: "success"; content: string; author: string; live: boolean }
  | { status: "error" };

/**
 * Fetches a random inspirational quote from Quotable.io.
 * Shows a subtle "offline" badge when falling back to hardcoded quotes
 * so users can distinguish live API data from cached content.
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
      setQuote({ status: "success", content: data.content, author: data.author, live: true });
    } catch {
      const fb = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
      setQuote({ status: "success", content: fb.content, author: fb.author, live: false });
    }
  }, []);

  useEffect(() => { fetchQuote(); }, [fetchQuote]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
          Inspiration
        </p>
        {/* Show "offline" badge when API is unreachable and fallback is used */}
        {quote.status === "success" && !quote.live && (
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)]">
            offline quote
          </span>
        )}
      </div>

      {quote.status === "loading" && (
        <div aria-label="Loading quote…" role="status" className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[var(--surface-subtle)]" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-[var(--surface-subtle)]" />
          <div className="mt-2 h-2.5 w-1/3 animate-pulse rounded bg-[var(--surface-subtle)]" />
        </div>
      )}

      {quote.status === "success" && (
        <figure aria-live="polite">
          <blockquote>
            <p className="text-sm italic leading-relaxed text-[var(--text)]">
              &ldquo;{quote.content}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-2 text-xs not-italic text-[var(--muted)]">
            — {quote.author}
          </figcaption>
        </figure>
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
