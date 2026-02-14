type SkillGroupProps = {
  title: string;
  skills: readonly string[];
};

export function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        {title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-sm text-[var(--text)]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
