## Task 1: Monochrome Rebrand (Black on Cream)

Convert the design system from dark/orange to light/monochrome using your exact hex values.

**Update `src/index.css` — convert hex to HSL tokens:**

```text
--background:        80 14% 94%   (#F2F3ED cream)
--foreground:         0  0%  7%   (#111111 near-black)
--card:               0  0% 98%   (#FAFAF7 surface-light)
--card-foreground:    0  0%  7%
--popover:            0  0% 98%
--popover-foreground: 0  0%  7%
--primary:            0  0%  0%   (#000000 pure black)
--primary-foreground: 0  0% 98%
--secondary:         80 14% 94%   (#F2F3ED)
--secondary-foreground: 0 0% 7%
--muted:             80 14% 94%
--muted-foreground: 220  9% 46%   (#6B7280)
--accent:             0  0%  7%   (matches foreground, no color accent)
--accent-foreground:  0  0% 98%
--border:            60  9% 89%   (#E6E6DF)
--input:             60  9% 89%
--ring:               0  0%  7%
--surface-dark:       0  0%  7%   (#111111 — new token for dark sections)
--surface-light:      0  0% 98%   (#FAFAF7)
```

**Update gradients & shadows (semantic tokens, kept as same names so existing components don't break):**
- `--gradient-primary`: `linear-gradient(135deg, hsl(0 0% 0%), hsl(0 0% 17%))` (black → charcoal)
- `--gradient-dark`: `linear-gradient(135deg, hsl(0 0% 7%), hsl(0 0% 12%))`
- `--shadow-orange`: rename intent, keep variable name → `0 10px 40px hsl(0 0% 0% / 0.15)` (subtle black shadow)
- `--shadow-orange-lg`: `0 20px 60px hsl(0 0% 0% / 0.20)`
- `--glow-orange`: `0 0 30px hsl(0 0% 0% / 0.15)`

**Update `tailwind.config.ts`:**
- Add new tokens to `colors`: `surface: { dark, light }` mapped to the new CSS variables
- Keep the rest as-is so all existing components inherit the new palette automatically

**Files automatically affected** (no per-component edits needed — they consume tokens):
- Hero, Services, About, Projects, Blog, Contact, Footer, TestimonialCarousel, ProjectModal, all UI buttons

Color contrast checks: black (#111) on cream (#F2F3ED) → 15.6:1 ✓ AAA. Muted gray (#6B7280) on cream → 4.7:1 ✓ AA.

---

## Task 2: Replace Navigation with React Bits CardNav

**Install dependency:**
- `gsap` (CardNav animations depend on it)

**Create `src/components/CardNav.tsx` + `src/components/CardNav.css`:**

Build the React Bits CardNav component (TS port of their JS/CSS recipe). Structure:
- Collapsed state: pill-shaped bar showing logo (left), hamburger toggle (center-right), CTA button (right) — fixed at top, ~60px tall.
- Expanded state: GSAP-animated drop-down panel revealing 3 cards side-by-side, each card has a category label + list of links.
- Theme-aware: accepts `theme="light"` prop, uses `baseColor` / `menuColor` / `buttonBgColor` props (your config: white base, black menu/button).
- Responsive: cards stack vertically on mobile (<768px).

**Wire it up in `src/pages/Index.tsx`:**

Replace `<Navigation />` import with `<CardNav />`, passing this config (adapted to your site sections):

```text
items = [
  { label: "About",    bgColor: "#111111", textColor: "#fff",
    links: [{label:"Story", href:"#about"}, {label:"Skills", href:"#about"}] },
  { label: "Work",     bgColor: "#1F1F1F", textColor: "#fff",
    links: [{label:"Featured Projects", href:"#projects"},
            {label:"Services", href:"#services"},
            {label:"Blog", href:"#blog"}] },
  { label: "Contact",  bgColor: "#111111", textColor: "#fff",
    links: [{label:"Email", href:"mailto:..."},
            {label:"WhatsApp", href:"..."},
            {label:"LinkedIn", href:"#"}] },
]
baseColor="#FAFAF7"  menuColor="#111111"
buttonBgColor="#111111"  buttonTextColor="#FAFAF7"
ease="power3.out"  theme="light"
```

Logo: text wordmark "Layo.Dev" rendered as inline SVG (since no logo file exists). I can swap to an image later if you provide one.

**Delete or keep `Navigation.tsx`:** keep the file for now (in case you want to roll back), just unimport it from Index.

---

## Implementation Order
1. Install `gsap`
2. Rewrite `src/index.css` tokens
3. Patch `tailwind.config.ts` (add surface tokens)
4. Create `src/components/CardNav.tsx` + `CardNav.css`
5. Swap navigation in `src/pages/Index.tsx`
6. Visual check on `/` — Hero, Projects, Footer all inherit cream/black

## What I will NOT change
- Component layouts, copy, sections, animations, page structure — only the design tokens and the nav component.
- Tailwind class names in components (they all reference tokens, so the rebrand cascades automatically).