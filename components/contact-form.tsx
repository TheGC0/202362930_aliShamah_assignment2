"use client";

import { FormEvent, useEffect, useState } from "react";

import { siteConfig } from "@/data/site";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type SubmitStatus = "idle" | "submitting" | "sent" | "error";

const STORAGE_KEY = "contact-form-name";

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) {
    errors.name = "Name is required.";
  }
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Restore name from localStorage on mount (client-only, safe to read after hydration)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setName(saved);
    } catch {
      // localStorage unavailable — silently continue
    }
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
    try {
      if (value.trim()) {
        localStorage.setItem(STORAGE_KEY, value.trim());
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage unavailable — silently continue
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fieldErrors = validate(name, email, message);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "mt-2 w-full rounded-xl border px-4 py-3 text-sm text-[var(--text)] bg-[var(--surface-subtle)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";
  const inputOk = "border-[var(--border)]";
  const inputErr = "border-red-500";

  const msgLen = message.trim().length;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]"
    >
      {/* How it works */}
      <p className="text-xs leading-relaxed text-[var(--muted)]">
        Fill in your details below and click <strong className="text-[var(--text)]">Send message</strong>.
        Your email app will open with a pre-filled draft — just review and hit send.
      </p>

      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="text-sm font-medium text-[var(--text)]">
          Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          aria-describedby={errors.name ? "cf-name-error" : "cf-name-hint"}
          aria-invalid={!!errors.name}
          className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
        />
        {errors.name ? (
          <p id="cf-name-error" role="alert" className="form-field-error mt-1.5 text-xs text-red-500">
            {errors.name}
          </p>
        ) : (
          <p id="cf-name-hint" className="mt-1 text-xs text-[var(--muted)]">
            Saved automatically for your next visit.
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="text-sm font-medium text-[var(--text)]">
          Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
        />
        {errors.email ? (
          <p id="cf-email-error" role="alert" className="form-field-error mt-1.5 text-xs text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Message */}
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="cf-message" className="text-sm font-medium text-[var(--text)]">
            Message <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <span className={`text-xs ${msgLen > 0 && msgLen < 10 ? "text-red-500" : "text-[var(--muted)]"}`}>
            {msgLen} / 10 min
          </span>
        </div>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          placeholder="What would you like to discuss? Projects, collaborations, or opportunities…"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          aria-describedby={errors.message ? "cf-message-error" : "cf-message-hint"}
          aria-invalid={!!errors.message}
          className={`${inputBase} ${errors.message ? inputErr : inputOk}`}
        />
        {errors.message ? (
          <p id="cf-message-error" role="alert" className="form-field-error mt-1.5 text-xs text-red-500">
            {errors.message}
          </p>
        ) : (
          <p id="cf-message-hint" className="mt-1 text-xs text-[var(--muted)]">
            Minimum 10 characters. Be as brief or detailed as you like.
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Opening email…" : "Send message"}
        </button>
        <p className="text-xs text-[var(--muted)]">Fields marked <span aria-hidden="true" className="text-red-500">*</span> are required.</p>
      </div>

      {/* Success banner */}
      {status === "sent" ? (
        <div
          role="status"
          className="form-banner rounded-xl border border-green-500/30 bg-green-500/10 p-4"
        >
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            Email draft opened — just hit send in your email app!
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Nothing opened? Email directly:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline hover:text-[var(--text)]"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      ) : null}

      {/* Error banner */}
      {status === "error" ? (
        <div
          role="alert"
          className="form-banner rounded-xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            Something went wrong. Please try again or email directly.
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline hover:text-[var(--text)]"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      ) : null}
    </form>
  );
}
