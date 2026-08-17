# Plan: About Me page + Projects page

Two new routes in the CWB / Layo.Dev brand system (cream background, black surfaces, white text, Poppins headings, Inter body). Home page keeps its existing About and Projects sections.

## Task 1 — About Me page (`/about`), no image

Text-driven layout matching the reference: very large bold headline, generous whitespace, left-aligned content column, muted body text.

Sections in order:

1. **Hero headline** — oversized Poppins line ("I'm Benedict.") plus a positioning sentence in large bold type, then a short intro paragraph. No portrait.
2. **Personal Information** — compact definition list: name, role, location (Nigeria), email, phone, availability.
3. **Professional Positioning** — one bold statement paragraph on what kind of developer/partner he is.
4. **What I Do** — 3–4 cards (Web Development, UI/UX, API/Backend, AI-assisted builds) reusing the Services card styling.
5. **Process** — numbered blocks `01 / 02 / 03 / 04` (Discover, Design, Build, Launch & Support) on a light rounded panel, matching the numbered-card reference.
6. **Short Background / Story** — 2–3 paragraphs of narrative copy.
7. **CTA — Get in Touch** — bold collaborate-style headline, supporting line, black pill "Get In Touch" button linking to `/#contact`.

Copy will be drafted from the existing Hero/About text; easy to edit later.

## Task 2 — Projects page (`/projects`)

- Full grid of all projects from Supabase (no 6-item limit), same card design as the home Projects section, with loading skeletons and empty state.
- Page heading "Projects" + subtitle, cards link to the existing `/project/:id` detail page.
- "View All Projects" button on the home Projects section now navigates to `/projects` (currently it does nothing).
- Navbar: the Projects card's "Portfolio" link points to `/projects`; "Case Studies" stays on the home projects section. About card's "Me" link points to `/about`.

## Technical notes

- New files: `src/pages/AboutPage.tsx`, `src/pages/ProjectsPage.tsx`; both lazy-loaded and registered in `src/App.tsx` above the catch-all route.
- Both pages reuse `CardNav` (with `CWB-logo.svg`), `Footer`, and `WhatsAppButton` for consistency.
- Nav items are duplicated per page today; they will be extracted into a shared `src/config/navItems.ts` so the new links stay consistent everywhere.
- Projects page uses the existing `useOptimizedProjects` hook with a higher limit; card markup extracted into a small shared `ProjectCard` component so home and the new page stay in sync.
- Responsive: single column under 475px, 2 columns at md, 3 at lg; existing `xs` breakpoint and fade-in/slide-up animations reused.
- SEO: unique title, meta description and canonical per page, single H1 each.
