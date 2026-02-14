"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";

type ProjectsClientProps = {
  initialProjects: Project[];
};

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialProjects.filter((project) => {
      const categoryMatch =
        activeCategory === "All" || project.categories.includes(activeCategory);

      const queryMatch =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return categoryMatch && queryMatch;
    });
  }, [activeCategory, initialProjects, query]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
        <label htmlFor="project-search" className="text-sm font-medium text-[var(--text)]">
          Search projects
        </label>
        <input
          id="project-search"
          name="project-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by project name or tag"
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Project categories">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
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
      </section>

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
            Try another keyword or switch category filters.
          </p>
        </section>
      )}
    </div>
  );
}
