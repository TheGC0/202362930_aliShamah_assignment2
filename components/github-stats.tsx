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

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type FetchState =
  | { status: "loading" }
  | { status: "success"; data: GitHubUser; repos: GitHubRepo[] }
  | { status: "error" };

const REPO_COUNT = 3;

export function GitHubStats({ username }: { username: string }) {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function loadGitHubData() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal }),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${REPO_COUNT}&type=public`,
            { signal },
          ),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error(`Status ${profileResponse.status}/${reposResponse.status}`);
        }

        const [profile, repos] = await Promise.all([
          profileResponse.json() as Promise<GitHubUser>,
          reposResponse.json() as Promise<GitHubRepo[]>,
        ]);

        setState({ status: "success", data: profile, repos: repos.slice(0, REPO_COUNT) });
      } catch (err) {
        // AbortError is expected on cleanup — don't show an error state
        if (err instanceof Error && err.name === "AbortError") return;
        setState({ status: "error" });
      }
    }

    void loadGitHubData();

    return () => controller.abort();
  }, [username]);

  if (state.status === "loading") {
    return (
      <div
        className="glass-panel rounded-2xl p-6"
        role="status"
        aria-label="Loading GitHub stats…"
        aria-busy="true"
      >
        <div className="h-3 w-28 animate-pulse rounded bg-[var(--border)]" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
              <div className="h-7 w-10 animate-pulse rounded bg-[var(--border)]" />
              <div className="mt-2 h-2.5 w-14 animate-pulse rounded bg-[var(--border)]" />
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-3 w-40 animate-pulse rounded bg-[var(--border)]" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--border)]" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-[var(--border)]" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-[var(--border)]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="glass-panel rounded-2xl p-5" role="alert">
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

  const { data, repos } = state;

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        GitHub Activity
      </h3>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {[
          { value: data.public_repos, label: "Public Repos" },
          { value: data.followers,    label: "Followers" },
          { value: data.following,    label: "Following" },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-center">
            <p className="text-2xl font-semibold tabular-nums text-[var(--text)]">{value}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{label}</p>
          </div>
        ))}
      </div>

      {data.bio ? (
        <p className="mt-4 text-sm italic text-[var(--muted)]">&ldquo;{data.bio}&rdquo;</p>
      ) : null}

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Featured repositories
        </h4>
        <div className="mt-3 space-y-3">
          {repos.length > 0 ? (
            repos.map((repo) => {
              const updated = new Date(repo.updated_at).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              });
              return (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${repo.name} repository on GitHub`}
                  className="block rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[var(--text)]">{repo.name}</p>
                      {repo.description ? (
                        <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                          {repo.description}
                        </p>
                      ) : null}
                    </div>
                    <span aria-label={`${repo.stargazers_count} stars`} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-medium text-[var(--muted)]">
                      ★ {repo.stargazers_count}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {repo.language ? <span>{repo.language}</span> : null}
                    <span>Updated {updated}</span>
                  </div>
                </a>
              );
            })
          ) : (
            <p className="text-sm text-[var(--muted)]">No public repositories found.</p>
          )}
        </div>
      </div>

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
