## Plan: Skills / Tech Stack Section

Create a new `Skills` section matching the reference screenshot layout, using Layo.Dev's cream/black/white brand.

### Structure
- Section heading `Tech Stack` (Poppins bold, centered)
- Subtitle `Technologies I use to build modern digital products.` (muted)
- Grid of 3 category cards (responsive: 1 col mobile → 2 col tablet → 3 col desktop)

### Cards
Each card = rounded black card (`bg-surface-dark`, cream text) with:
- Category title (Poppins, top-left)
- List of tech pills: small rounded-full pills containing the SVG logo (16–18px) + name. Pill style: `bg-white/5 border border-white/10 text-cream px-3 py-1.5`
- Pills wrap responsively (`flex flex-wrap gap-2`)

### Categories & logos
Use existing SVGs in `src/assets/` where available; use a neutral fallback (lucide icon or text-only pill) for missing ones. User will replace missing logos later.

1. **Frontend** — React (`react.svg`), TypeScript (`typescript.svg`), Tailwind (`tailwindcss.svg`), Vite (fallback text pill, no svg yet)
2. **Backend** — Node.js (`nodejs.svg`), Supabase (`supabase.svg`), PostgreSQL (`postgresql.svg`), REST APIs (fallback text pill)
3. **AI & Dev** — Lovable (fallback), Cursor (fallback), OpenAI (fallback), GitHub (`github.svg`)

### Files
- Add `src/components/Skills.tsx` (new component)
- Edit `src/pages/Index.tsx` to insert `<Skills />` after `<Services />` (or replace where appropriate — my recommendation: place directly after Services and before About)

### Styling notes
- Only cream/black/white + muted-foreground gray (brand rule)
- Card: `rounded-2xl bg-surface-dark p-6 sm:p-8`
- Fade-in animation on scroll (reuse existing `animate-fade-in`)
- Mobile: single column, generous padding
- Logos rendered as `<img>` with `alt` and `loading="lazy"`

### Open question
The existing `About` component already has a "Technical Skills" badges block. Keep both, or remove that block from About since the new Skills section supersedes it?
