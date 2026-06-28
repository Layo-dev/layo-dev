## Fix CardNav: remove "Get Started", keep hamburger as the sole right-side control

The current `CardNav.tsx` already renders a hamburger toggle on the left and a "Get in Touch" CTA on the right. You want the CTA gone and the hamburger to be the menu trigger.

### Changes

**1. `src/components/CardNav.tsx`**
- Remove the `<button className="card-nav-cta">…</button>` block entirely.
- Remove now-unused props: `buttonBgColor`, `buttonTextColor`, `ctaLabel`, `onCtaClick` (kept in interface as optional but no longer rendered — safe to drop).
- Move the hamburger toggle to the right side of the top bar, with the logo on the left (standard nav pattern, matches your screenshot expectation).
- Top bar layout becomes: `[Logo] ........ [Hamburger]`.

**2. `src/components/CardNav.css`**
- Adjust `.card-nav-top` so logo sits left, hamburger right (already uses `space-between` — just reorder JSX).
- No structural CSS changes needed; hamburger styles already exist.

**3. `src/pages/Index.tsx`**
- Remove `buttonBgColor`, `buttonTextColor`, `ctaLabel` props from the `<CardNav />` usage (no longer used).

### Result
A clean pill nav with the Layo.Dev wordmark on the left and a hamburger icon on the right. Tapping the hamburger expands the GSAP-animated card panel with About / Work / Contact sections — same behavior as today, just without the redundant CTA button.

### Not touched
- GSAP timeline, card content, color tokens, mobile breakpoint behavior, or any other component.
