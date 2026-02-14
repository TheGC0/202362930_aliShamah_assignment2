import type { Metadata } from "next";

import { SectionHeader } from "@/components/ui/section-header";
import {
  certifications,
  education,
  experienceTimeline,
  siteConfig,
  skillGroups,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume snapshot for Ali Shamah with experience, skills, and downloadable PDF.",
};

export default function ResumePage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="Resume"
        title="Ali Shamah"
        description="Software Engineer | Full-Stack (Web & Mobile) | AI/ML"
      />

      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Software engineer focused on modern web and mobile applications with
          practical AI/ML integration. Strong in turning requirements into
          production-ready systems and polished user experiences.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={siteConfig.links.resume}
            download
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Download PDF
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Contact
          </a>
        </div>
      </div>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Experience</h2>
        <div className="mt-5 space-y-6">
          {experienceTimeline.map((entry) => (
            <article key={`${entry.organization}-${entry.period}`}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {entry.period}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">
                {entry.role} - {entry.organization}
              </h3>
              <ul className="mt-3 space-y-2">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-[var(--muted)]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Skills</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {group.skills.join(" | ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Education</h2>
        <p className="mt-3 text-sm text-[var(--text)]">{education.school}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {education.degree} ({education.period})
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{education.graduation}</p>

        <h3 className="mt-6 text-lg font-semibold text-[var(--text)]">Certifications</h3>
        <ul className="mt-3 space-y-2">
          {certifications.map((certification) => (
            <li key={certification} className="text-sm text-[var(--muted)]">
              {certification}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
