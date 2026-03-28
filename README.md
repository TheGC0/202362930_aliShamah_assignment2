# Ali Shamah — Portfolio (Assignment 1 + 2)

Professional, responsive personal portfolio built with Next.js + TypeScript.

This implementation is intentionally above the minimum assignment baseline while covering every required item for both assignments.

## Live Overview
- Main page sections: About, Featured Projects, Experience, Skills, Leadership, Contact
- Dedicated pages: Projects, Project Details, Links Hub, Resume, Contact
- Theme toggle + interactive project search/filter
- GitHub live stats via public API
- Validated contact form with animated feedback

---

## Assignment 2 — Interactive Features

### Requirements Coverage

#### 1) Dynamic Content
- **Project search + category filter**: Real-time filtering by title/tag with instant results (`components/projects-client.tsx`)
- **Empty state**: "No projects found" message with guidance when filters return nothing

#### 2) Data Handling
- **Public API fetch**: GitHub profile stats (`public_repos`, `followers`, `following`) loaded from `https://api.github.com/users/TheGC0` and displayed live on the About section (`components/github-stats.tsx`)
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
- Theme toggle (light/dark/system)
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
- next/image, next/font

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
|   |-- contact-form.tsx      Validated form with animated feedback + localStorage
|   |-- github-stats.tsx      GitHub public API fetch with loading/error states
|   |-- hero-role-rotator.tsx Animated role text
|   |-- projects-client.tsx   Search + filter with empty state
|   |-- site-header.tsx
|   `-- ...
|-- data/
|   |-- site.ts               Personal/profile data
|   `-- projects.ts           Project data source
|-- public/
|-- docs/
|   |-- ai-usage-report.md
|   |-- technical-documentation.md
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
