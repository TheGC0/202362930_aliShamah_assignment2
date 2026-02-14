# Ali Shamah Portfolio

Modern, SEO-focused portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 (App Router, compatible with 14+ requirement)
- TypeScript
- Tailwind CSS v4
- `next/image`, `next/font`
- Data-driven content from local TypeScript files

## Features

- Multi-page portfolio:
  - `/` Home (hero, about, featured projects, experience, skills, leadership, contact)
  - `/projects` Projects index with category filters and search
  - `/projects/[slug]` Project case studies with prev/next navigation
  - `/links` Links hub (Linktree-style)
  - `/resume` Resume summary + PDF download
  - `/contact` Contact form + direct links
- Responsive layout with sticky navigation
- Theme toggle (system default, with light/dark override)
- Accessibility basics: keyboard focus styles, semantic landmarks, ARIA labels
- SEO:
  - Metadata and social cards
  - JSON-LD (`Person`, `WebSite`)
  - `sitemap.xml` via `app/sitemap.ts`
  - `robots.txt` via `app/robots.ts`

## Content Sources

- `data/site.ts` for profile, experience, skills, certifications, and links.
- `data/projects.ts` as the single source of truth for project cards and case studies.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Build & Production

Build production bundle:

```bash
npm run build
```

Run production server locally:

```bash
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Use default Next.js settings.
4. Deploy.

Optional after deployment:
- Update `siteConfig.url` in `data/site.ts` with your final domain.
- Replace placeholder social URLs in `data/site.ts`.

## Assets

- Favicon/logo: `public/logo_noBg.png` and `app/favicon.ico`
- Project placeholders: `public/projects/*.png`
- Open Graph image: `public/og-cover.png`
- Resume PDF: `public/resume.pdf` (replace with final CV file)

## File Map (Key)

- `app/layout.tsx` global layout, metadata, JSON-LD
- `app/globals.css` theme tokens and base styles
- `app/page.tsx` home page
- `app/projects/page.tsx` project index
- `app/projects/[slug]/page.tsx` case study template
- `app/links/page.tsx` links hub
- `app/resume/page.tsx` resume page
- `app/contact/page.tsx` contact route
- `app/sitemap.ts` sitemap generation
- `app/robots.ts` robots rules
- `components/*` reusable UI building blocks
- `data/site.ts` and `data/projects.ts` data layer
