"use client";

import { FormEvent, useState } from "react";

import { siteConfig } from "@/data/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]"
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-[var(--text)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-[var(--text)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={6}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          Send message
        </button>
        <p className="text-xs text-[var(--muted)]">
          This opens your email app. API integration can be added later.
        </p>
      </div>

      {status === "ready" ? (
        <p className="text-sm font-medium text-[var(--accent)]" role="status">
          Email draft opened.
        </p>
      ) : null}
    </form>
  );
}
