import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ali Shamah for full-stack, mobile, and AI/ML collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Share your project context and goals. I will respond through email and continue from there."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">Direct links</h2>
          <div className="mt-4 space-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Email: {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Phone: {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              LinkedIn profile
            </a>
          </div>
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
