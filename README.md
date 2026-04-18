# Ali Shamah — Portfolio (Assignments 1, 2 & 3)

Professional, responsive personal portfolio built with Next.js + TypeScript.

Live: https://ali-shamah-portfolio.vercel.app

## Live Overview
- Main page sections: About, Featured Projects, Experience, Skills, Leadership, Contact
- Dedicated pages: Projects, Project Details, Links Hub, Resume, Contact
- Dark/light theme toggle with localStorage persistence
- GitHub live stats + featured repositories via public API + Quotable.io inspirational quotes
- Project search, category filter, and sort
- 3-step validated contact form
- Visitor time-on-page counter

---

## Assignment 3 — Advanced Functionality

### 1) API Integration
- **GitHub REST API** (existing, enhanced): Fetches live profile stats (`public_repos`, `followers`, `following`) and a small featured repository list in parallel — `components/github-stats.tsx`
- **Quotable.io API** (new): Fetches a random inspirational/technology quote on page load with a ↺ refresh button. Falls back to 4 hardcoded quotes when offline or rate-limited — `components/quote-widget.tsx`
- Both APIs display user-friendly error states when unavailable.

### 2) Complex Logic
- **Project filter + sort**: Search by keyword (title/tag/subtitle) AND filter by category AND sort by newest/oldest/A→Z/Z→A — all applied together in `useMemo` — `components/projects-client.tsx`
- **3-step contact form wizard**: Step 1 validates name (required) + email (regex); Step 2 validates message (required, 10–500 chars); Step 3 shows a read-only review before submission — `components/contact-form.tsx`

### 3) State Management
- **Multi-step form state**: Current step (`1 | 2 | 3`), field values, and per-step errors all tracked in React state
- **Visitor name** in localStorage: name saved from contact form, restored on next visit
- **Dark/light theme** in localStorage: persisted across sessions, applied before first paint (no flash)
- **Visitor timer**: Time spent on the current page displayed in the hero section, updating every second — `components/visitor-timer.tsx`

### 4) Performance
- `useMemo` on filter+sort pipeline — recalculates only when query, category, or sort changes
- `dynamic({ ssr: false })` for the visitor timer — prevents SSR/hydration mismatch
- `Promise.all` for parallel GitHub profile + repos fetches
- `IntersectionObserver` for scroll-reveal (no scroll event listeners)
- `aria-live="off"` on timer — avoids disruptive screen reader announcements every second

### 5) AI Integration
- Claude Code (Anthropic) used for code generation, debugging (caught `ssr: false` in Server Component error), and architecture suggestions
- Full details: `docs/ai-usage-report.md` — Assignment 3 section

---

## Assignment 2 — Interactive Features

### Requirements Coverage

#### 1) Dynamic Content
- **Project search + category filter**: Real-time filtering by title/tag with instant results (`components/projects-client.tsx`)
- **Empty state**: "No projects found" message with guidance when filters return nothing

#### 2) Data Handling
- **Public API fetch**: GitHub profile stats (`public_repos`, `followers`, `following`) and featured repositories loaded from `https://api.github.com/users/TheGC0` and displayed live on the About section (`components/github-stats.tsx`)
- **localStorage**: Contact form remembers your name between visits (`components/contact-form.tsx`, key: `contact-form-name`)
- **Theme preference**: Light/dark mode choice persisted in localStorage (`ali-shamah-theme`)

#### 3) Animation and Transitions
- **Scroll-reveal**: Sections and cards fade in as they enter the viewport (IntersectionObserver + CSS transition, `app/globals.css`, `app/layout.tsx`)
- **Animated role text**: Hero section cycles through roles with fade-in + gradient sheen (`components/hero-role-rotator.tsx`)
- **Hover effects**: Cards lift on hover, buttons have translate-y transitions throughout
- **Form feedback animations**: Field errors and success/error banners slide in with `fade-in-down` keyframe

#### 4) Error Handling and User Feedback
- **Form validation**: Per-field inline errors (name required, valid email format, message ≥ 10 chars) that clear as you type
- **Form success banner**: Animated green banner confirming email draft was opened, with fallback email link
- **Form error banner**: Animated red banner with direct email link if something goes wrong
- **GitHub stats loading**: Animated skeleton placeholder shown while API fetch is in progress
- **GitHub stats error**: Friendly fallback with link to GitHub profile if the API is unavailable
- **Filter empty state**: "No projects found" with helpful hint to try another keyword

#### 5) AI Enhancement
- Claude Code (Anthropic) and ChatGPT used for code generation, debugging, and documentation
- Full details: `docs/ai-usage-report.md`

#### 6) Documentation
- This README covers setup, features, and AI use summary
- `docs/ai-usage-report.md` — detailed AI tool log for both assignments
- `docs/technical-documentation.md` — architecture and component breakdown

---

## Assignment 1 — Requirements Coverage

### 1) Repository Setup
- Clean folder structure with reusable components and data-driven content.

### 2) Content Requirements
- **About Me**: intro + tagline + profile avatar
- **Projects**: 6 projects (exceeds 2+ requirement) with title, description, and images
- **Contact**: form with Name, Email, Message

### 3) Responsive Design
- Mobile-first layout using Tailwind CSS (Flexbox/Grid).
- Works across mobile, tablet, and desktop.

### 4) Interactivity
- Theme toggle (light/dark with a system-aware default)
- Animated role text in hero
- Smooth section scrolling and active nav state
- Project search + category filters

### 5) AI Integration
- Detailed report: `docs/ai-usage-report.md`

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- next/image
- CSS font stacks with local fallbacks

## Project Structure
```text
portfolio/
|-- app/
|   |-- page.tsx              Home page sections
|   |-- layout.tsx            Root layout (theme init + scroll-reveal script)
|   |-- globals.css           Global styles + animations
|   |-- contact/
|   |-- projects/
|   |-- resume/
|   `-- links/
|-- components/
|   |-- contact-form.tsx           3-step wizard with per-step validation + localStorage
|   |-- github-stats.tsx           GitHub public API fetch with loading/error states + featured repos
|   |-- hero-role-rotator.tsx      Animated role text
|   |-- projects-client.tsx        Search + category filter + sort with results count
|   |-- quote-widget.tsx           Quotable.io API fetch with fallback + refresh
|   |-- visitor-timer.tsx          Time-on-page counter (client-only)
|   |-- visitor-timer-dynamic.tsx  SSR-safe dynamic wrapper for visitor timer
|   |-- site-header.tsx
|   `-- ...
|-- data/
|   |-- site.ts               Personal/profile data
|   `-- projects.ts           Project data source
|-- public/
|-- docs/
|   |-- ai-usage-report.md
|   |-- technical-documentation.md
|-- scripts/
|   `-- build.mjs
`-- README.md
```

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open:
```
http://localhost:3000
```

## Production Build

```bash
npm run lint
npm run build
npm run start
```

`npm run build` uses a tiny wrapper in `scripts/build.mjs` to disable Next telemetry and keep the production build reliable in restricted environments. The app output is unchanged.

## Quality and Validation
- Linting: `npm run lint`
- Production readiness: `npm run build`
- Responsive checks: mobile, tablet, desktop in browser DevTools
- Accessibility: keyboard navigation, focus states, ARIA labels, skip link, reduced-motion support

## Deployment
1. Push repository to GitHub.
2. Import project into Vercel.
3. Deploy with default Next.js settings.

Live deployment: https://ali-shamah-portfolio.vercel.app

## AI Use Summary
Claude Code (Anthropic) and ChatGPT were used for implementing interactive features, generating boilerplate patterns (fetch with cancel, form validation, scroll animations), and structuring documentation. All AI-generated outputs were reviewed, adapted to fit the project's design system, and validated manually. Full details in `docs/ai-usage-report.md`.
