"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";

type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc",  label: "Oldest first" },
  { value: "name-asc",  label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
];

type ProjectsClientProps = {
  initialProjects: Project[];
};

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [query,          setQuery]    = useState("");
  const [activeCategory, setCategory] = useState<ProjectCategory>("All");
  const [sort,           setSort]     = useState<SortKey>("date-desc");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Filter by search term (title + tags + subtitle)
    let results = initialProjects.filter((project) => {
      const categoryMatch =
        activeCategory === "All" || project.categories.includes(activeCategory);

      const queryMatch =
        q.length === 0 ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));

      return categoryMatch && queryMatch;
    });

    // 2. Sort
    switch (sort) {
      case "date-desc": results = [...results].sort((a, b) => b.date.localeCompare(a.date)); break;
      case "date-asc":  results = [...results].sort((a, b) => a.date.localeCompare(b.date)); break;
      case "name-asc":  results = [...results].sort((a, b) => a.title.localeCompare(b.title)); break;
      case "name-desc": results = [...results].sort((a, b) => b.title.localeCompare(a.title)); break;
    }

    return results;
  }, [activeCategory, initialProjects, query, sort]);

  function handleReset() {
    setQuery("");
    setCategory("All");
    setSort("date-desc");
  }

  const hasActiveFilters = query.trim() || activeCategory !== "All" || sort !== "date-desc";

  return (
    <div className="space-y-8">
      {/* Controls panel */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
        {/* Search */}
        <label htmlFor="project-search" className="text-sm font-medium text-[var(--text)]">
          Search projects
        </label>
        <p className="mt-0.5 text-xs text-[var(--muted)]">
          Filter by project name, technology, or description. Results update as you type.
        </p>
        <input
          id="project-search"
          name="project-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Flutter, Firebase, AI…"
          aria-describedby="project-search-hint"
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />

        {/* Category filter + sort row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            <span id="project-search-hint" className="text-xs text-[var(--muted)]">Category:</span>
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                    isActive
                      ? "border-transparent bg-[var(--accent)] text-white"
                      : "border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="project-sort" className="text-xs text-[var(--muted)]">Sort:</label>
            <select
              id="project-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count + reset */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[var(--muted)]" aria-live="polite" aria-atomic="true">
            {filteredProjects.length === initialProjects.length
              ? `${initialProjects.length} projects`
              : `${filteredProjects.length} of ${initialProjects.length} projects`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[var(--muted)] underline-offset-2 hover:text-[var(--text)] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Project grid */}
      {filteredProjects.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <h2 className="text-lg font-semibold text-[var(--text)]">No projects found</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Try another keyword, switch category, or{" "}
            <button
              type="button"
              onClick={handleReset}
              className="text-[var(--accent)] underline-offset-2 hover:underline"
            >
              reset filters
            </button>
            .
          </p>
        </section>
      )}
    </div>
  );
}
