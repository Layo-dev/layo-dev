# Plan: Project Detail Page (replace modal)

Turn the current `ProjectModal` into a full route `/project/:id` that matches the reference screenshots and Layo.Dev's cream/black/white brand.

## Route & navigation
- Add `/project/:id` route in `src/App.tsx` (lazy-loaded), pointing to new `src/pages/ProjectDetail.tsx`.
- In `src/components/Projects.tsx`: remove `ProjectModal`, `selectedProject`, `modalOpen` state. `handleViewProject` becomes `navigate(`/project/${project.id}`)`.
- Delete `src/components/ProjectModal.tsx`.

## Page structure (top → bottom)
Reuse the existing `CardNav` at the top (same as Index).

1. **Back link** — `← Back to Projects` (anchor to `/#projects`), cream pill icon + text.
2. **Hero header** — Large bold title (Poppins, ~5xl/6xl), then a subtitle paragraph (project's `elevator_pitch` or `description`). A black pill `Visit Live Site ↗` button aligned right on desktop / stacked on mobile.
3. **Meta bar** — Thin top border. Left sidebar (desktop) / stacked (mobile) with three blocks:
   - `ROLE` — from new optional `role` field (fallback: "Full Stack Developer")
   - `TIMELINE` — from new optional `timeline` field (fallback: hidden)
   - `TECH STACK` — pill badges from `tech_stack`
4. **Hero image** — full-width rounded image (`image_url`), 16:9.
5. **Two-column body** (sticky left meta, right content on desktop; single column mobile):
   - **Overview** section (icon + heading + prose from `description`)
   - **Challenges & Solutions** — combines `problem_statement` + `solution_approach` OR two subheads
   - **Key Features** — 2-col grid of bulleted pill cards (new optional `features` string[]; fallback: hide section)
   - **Project Screens (Gallery)** — 2-col image grid, click to lightbox
   - **Video Demo** — embedded iframe when `video_url` exists
6. **Footer CTA row** — GitHub button + Live Demo button (both pill style).
7. Reuse existing `Footer` component.

## Data
- Fetch single project by `id` via new hook `useProject(id)` in `src/hooks/useOptimizedQuery.tsx` (select all fields incl. `elevator_pitch, problem_statement, solution_approach, gallery_images, video_url`).
- Fetch related `project_tech` for tech logos (same query modal uses).
- Optional new columns `role` (text) and `timeline` (text) and `features` (text[]) — only add via migration if the user confirms; otherwise render fallbacks/hide.
- Loading skeleton + 404 state (redirect to `/#projects` if not found).

## Styling (brand)
- Only cream `#F2F3ED`, black `#000000`, white `#FFFFFF` + existing muted-foreground gray.
- Section icons: small square with light cream bg + black stroke icon (lucide `Layers`, `Zap`, `Code2`, `Image`, `Play`).
- Feature pills: `rounded-full bg-muted px-4 py-3` with black bullet dot.
- Typography: Poppins headings, Inter body — already in project.
- Responsive: single-column below `md`, sidebar layout at `md+`, generous padding.
- Reuse image lightbox pattern from the current modal.

## Technical notes
- Scroll to top on mount.
- SEO: set `<title>` and meta description per project via a small `useEffect` (no react-helmet needed).
- Keep the existing modal-only fields optional; no schema changes required to ship v1.

## Files touched
- Add `src/pages/ProjectDetail.tsx`
- Edit `src/App.tsx` (route)
- Edit `src/components/Projects.tsx` (navigate instead of modal)
- Edit `src/hooks/useOptimizedQuery.tsx` (add `useProject`)
- Delete `src/components/ProjectModal.tsx`

## Open question
Do you want me to also add DB columns for `role`, `timeline`, and `features` (list) now, or ship the page first with sensible fallbacks and add fields later?
