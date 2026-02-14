import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Links Hub",
  description: "Quick links for Ali Shamah across portfolio, resume, and social profiles.",
};

const links = [
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
  },
  {
    label: "Linktree",
    href: siteConfig.links.linktree,
  },
  {
    label: "Personal Email",
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "WhatsApp",
    href: siteConfig.links.whatsapp,
  },
  {
    label: "Resume",
    href: siteConfig.links.resume,
  },
  {
    label: "Website",
    href: siteConfig.links.website,
  },
] as const;

export default function LinksHubPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center pb-8">
      <section className="glass-panel w-full rounded-3xl p-8 text-center sm:p-10">
        <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-subtle)]">
          <Image
            src="/logo_noBg.png"
            alt="Ali Shamah logo"
            width={72}
            height={72}
            className="h-14 w-14 object-contain"
          />
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          AS
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)]">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{siteConfig.shortTitle}</p>

        <div className="mt-8 space-y-3">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("/") ? undefined : "_blank"}
              rel={item.href.startsWith("/") ? undefined : "noreferrer"}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-5 py-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <span className="text-sm font-semibold text-[var(--text)]">{item.label}</span>
              <span className="mt-1 block text-xs text-[var(--muted)] group-hover:text-[var(--text)]">
                Open {item.label}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
