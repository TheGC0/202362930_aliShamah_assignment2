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
