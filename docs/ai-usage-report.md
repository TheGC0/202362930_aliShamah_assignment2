# AI Usage Report

## Assignment 1

### Tools Used & Use Cases

#### 1) ChatGPT (OpenAI)
- Used for UI/UX iteration and implementation support while building the portfolio.
- Helped with:
  - Refining responsive layout and spacing
  - Debugging hydration and theme-toggle behavior
  - Improving accessibility labels and focus states
  - Generating and adjusting documentation structure

### Benefits & Challenges

**Benefits**
- Reduced development time for repetitive UI and documentation tasks.
- Faster debugging through step-by-step reasoning.
- Better consistency in code style and component structure.

**Challenges**
- Some AI suggestions were too generic and needed tailoring to the project's design language.
- A few suggestions introduced edge-case issues (for example SSR/CSR mismatch risk) and required manual correction.
- AI output still needed careful verification for assignment and rubric compliance.

### Learning Outcomes
- Improved practical use of Next.js App Router with reusable components.
- Better understanding of hydration pitfalls and how to avoid server/client mismatches.
- Stronger workflow for combining AI suggestions with manual code review and testing.
- Improved confidence in documenting engineering decisions clearly.

---

## Assignment 2

### Tools Used & Use Cases

#### 1) Claude Code (Anthropic — Claude Sonnet 4.6)
Used as the primary AI assistant for implementing Assignment 2's interactive features.

**Tasks where Claude Code assisted:**

- **Contact form enhancement**: Generated the initial structure for field-level validation logic and animated error/success banners. I reviewed the generated code, adjusted the validation rules (email regex, minimum message length), confirmed the localStorage name-save pattern, and verified it matched the existing form styles.

- **GitHub Stats component**: Suggested the pattern for fetching from the GitHub public API with proper loading skeleton and error states. I reviewed the fetch logic, confirmed the cancel flag pattern prevents state updates on unmounted components, and adapted the card layout to match the site's design system.

- **Scroll-reveal animations**: Generated the IntersectionObserver script approach and the `.js-scroll` CSS class pattern (progressive enhancement — no flash of invisible content without JS). I verified the threshold value and transition timing worked well with the existing layout, then applied `.reveal` selectively to sections.

- **globals.css additions**: Suggested the `@keyframes fade-in-down` animation for form field errors and banners. I adjusted the easing and timing to be consistent with the site's existing animation style.

- **Documentation drafting**: Assisted in structuring this report and the README updates for Assignment 2. All written content was reviewed and edited for accuracy.

#### 2) ChatGPT (OpenAI) — continued from Assignment 1
- Consulted for cross-referencing specific Next.js App Router patterns.
- Used to sanity-check the IntersectionObserver approach for SSR-rendered pages.

### Benefits & Challenges — Assignment 2

**Benefits**
- Significantly faster implementation of boilerplate patterns (fetch with abort/cancel, skeleton loading states).
- Claude Code's ability to read the full codebase context meant suggestions fit the existing design system without major rework.
- Real-time iteration in the editor reduced the back-and-forth loop common with chat-based AI tools.

**Challenges**
- The first GitHub Stats card layout suggestion used absolute pixel sizes rather than the project's CSS variable system — required manual correction.
- Form validation logic needed several rounds of adjustment to match the UX goal (clear per-field inline errors that clear on typing, not on submit).
- Some scroll-reveal timing suggestions caused layout shift on fast connections — I tuned the `threshold` and `transitionDelay` values manually.

### Learning Outcomes — Assignment 2
- Stronger understanding of the IntersectionObserver API and how to use it progressively without breaking SSR.
- Hands-on practice with React `useEffect` cleanup patterns for async fetch operations.
- Practical experience using localStorage for lightweight user preference persistence.
- Improved ability to critically evaluate AI-generated code and adapt it to match an established codebase style.

### Responsible Use & Modifications
- Every AI-generated suggestion was reviewed before acceptance.
- Code was modified to match project constraints, existing design variables, and assignment requirements.
- Changes were validated with `npm run lint` and `npm run build`.
- AI was used as an assistant for speed and structure — not as a replacement for understanding. All final code decisions and edits were made by me.

### Academic Integrity Statement
- AI support was used transparently for ideation, code generation, and documentation.
- Final submitted work reflects my own understanding, review, and modifications.
- AI tools listed accurately above with descriptions of exactly how they were used.


---

## Assignment 3

### Tools Used & Use Cases

#### 1) Claude Code (Anthropic — Claude Sonnet 4.6)
Primary AI assistant for implementing Assignment 3's advanced features.

**Tasks where Claude Code assisted:**

- **Sort functionality in ProjectsClient**: Suggested adding a `SortKey` union type and a `<select>` dropdown alongside the existing category filter. I reviewed the generated sort logic, confirmed `localeCompare` is the right comparator for both date strings (ISO format) and titles, and added the "results count" line and "Clear filters" reset button myself.

- **QuoteWidget component (Quotable.io API)**: Generated the initial fetch pattern with loading skeleton, fallback quotes, and refresh button. I reviewed the error handling, adjusted the API query parameters (`tags`, `maxLength`) to get more relevant quotes, and matched the card styling to the existing `glass-panel` design system.

- **VisitorTimer component**: Suggested the `setInterval` + `useEffect` cleanup pattern. I added the `formatElapsed` function myself (seconds → minutes → hours formatting), chose `aria-live="off"` deliberately (a live-updating timer announced every second would be extremely disruptive to screen reader users), and added the `sr-only` span for context.

- **Multi-step ContactForm**: Suggested the step-state approach (`Step = 1 | 2 | 3`). I designed the `StepIndicator` sub-component layout, wrote the per-step validation functions (`validateStep1`, `validateStep2`) with specific error messages, added the subject field (optional, step 2), and built the review summary `<dl>` table in step 3.

- **`date` field for sort**: I added the `date` field to the `Project` type and assigned dates to all 6 projects based on my knowledge of when each was built. Claude did not know the actual dates.

- **Server Component `dynamic` fix**: Claude initially placed `dynamic({ ssr: false })` in `app/page.tsx` (a Server Component), which caused a build error. It then diagnosed the issue and suggested the `VisitorTimerDynamic` client wrapper pattern, which I implemented.

#### 2) ChatGPT (OpenAI) — reference use
- Cross-referenced the `aria-live="off"` decision for the timer — confirmed that a timer with frequent updates should not be `polite` or `assertive` to avoid disrupting screen reader users.

### Benefits & Challenges — Assignment 3

**Benefits**
- The multi-step form refactor was significantly faster with AI assistance — generating the initial structure took minutes rather than the hour it would have taken from scratch.
- Claude's codebase awareness (reading existing components before generating) meant suggestions already used `var(--accent)`, `var(--border)`, and the existing button class patterns without manual adaptation.
- Parallel feature development: while I reviewed one AI suggestion, the next could be drafted.

**Challenges**
- The `dynamic({ ssr: false })` in a Server Component error was caught only at build time, not in the editor. AI suggestions for Next.js App Router patterns should always be verified against the component's rendering context (server vs. client).
- The Quotable.io API occasionally returns quotes that don't quite fit a tech portfolio. The `tags` filter helps, but the fallback list required careful manual curation.
- Step 3 "review" panel required several iterations to display `message` without XSS risk — I confirmed that React's JSX escapes text by default (no manual `escapeHtml` needed, unlike the plain HTML version).

### Learning Outcomes — Assignment 3
- Deeper understanding of Next.js App Router rendering boundaries: `dynamic({ ssr: false })` must be inside a `"use client"` component, not a Server Component.
- Better grasp of when to use `aria-live` and when to explicitly suppress it (`aria-live="off"`) — accessibility is not just about adding ARIA, it's about not being disruptive.
- Practical use of `Promise.all` for parallel API calls — fetching profile and repos simultaneously rather than sequentially cut GitHub load time roughly in half.
- Understanding that sort + filter composition requires immutable operations (`[...results].sort(...)`) to avoid mutating the memoized source array.

### Responsible Use & Modifications
- All AI-generated code was reviewed, tested against `npm run build`, and modified to fit the project's design system and assignment requirements.
- The `date` field values, fallback quotes, and accessibility decisions were made by me, not by AI.
- `npm run lint` and `npm run build` were run after every change to verify correctness.
- AI was used for scaffolding speed and pattern suggestions — all architectural decisions (component boundaries, state shape, API choice) were made independently.

### Academic Integrity Statement
- AI support is documented transparently above with precise descriptions of what was generated vs. what was written independently.
- All submitted code reflects my own understanding, review, and modifications.
- I can explain every line of code in this project.
