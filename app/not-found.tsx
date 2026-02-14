import Link from "next/link";

export default function NotFound() {
  return (
    <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-[var(--text)]">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        The page you requested does not exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        Go back home
      </Link>
    </div>
  );
}
