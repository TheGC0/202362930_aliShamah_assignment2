"use client";

import { useEffect, useState } from "react";

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

type FetchState =
  | { status: "loading" }
  | { status: "success"; data: GitHubUser }
  | { status: "error" };

export function GitHubStats({ username }: { username: string }) {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json() as Promise<GitHubUser>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (state.status === "loading") {
    return (
      <div
        className="glass-panel rounded-2xl p-6"
        aria-label="Loading GitHub stats"
        aria-busy="true"
      >
        <div className="h-3 w-28 animate-pulse rounded bg-[var(--border)]" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4"
            >
              <div className="h-7 w-10 animate-pulse rounded bg-[var(--border)]" />
              <div className="mt-2 h-2.5 w-14 animate-pulse rounded bg-[var(--border)]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="glass-panel rounded-2xl p-5">
        <p className="text-sm text-[var(--muted)]">
          GitHub stats could not be loaded right now.
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm font-medium text-[var(--text)] underline decoration-[var(--border)] transition hover:decoration-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          View @{username} on GitHub →
        </a>
      </div>
    );
  }

  const { data } = state;

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        GitHub Activity
      </h3>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums text-[var(--text)]">
            {data.public_repos}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">Public Repos</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums text-[var(--text)]">
            {data.followers}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">Followers</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums text-[var(--text)]">
            {data.following}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">Following</p>
        </div>
      </div>

      {data.bio ? (
        <p className="mt-4 text-sm italic text-[var(--muted)]">
          &ldquo;{data.bio}&rdquo;
        </p>
      ) : null}

      <a
        href={data.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm font-medium text-[var(--text)] underline decoration-[var(--border)] transition hover:decoration-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        @{data.login} on GitHub →
      </a>
    </div>
  );
}
