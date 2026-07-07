## Enforce strict monochrome brand: Cream `#F2F3ED`, Black `#000000`, White `#FFFFFF`

Replace every gradient and off-black with solid brand colors. No `bg-gradient-*`, no `#1B1722`/`#2F293A`/`#111111` fills — only cream, black, white (with subtle border/opacity variants already tokenized).

### 1. `src/index.css` — flatten tokens
- `--background`: cream `80 14% 94%`  ✓ (keep)
- `--card`, `--popover`, `--surface-light`: **white** `0 0% 100%` (currently `#FAFAF7`)
- `--foreground`, `--primary`, `--accent`, `--ring`, `--surface-dark`: **black** `0 0% 0%` (surface-dark currently `#111111`)
- Replace gradient variables with flat colors so any leftover `bg-gradient-*` class renders solid black:
  - `--gradient-primary: hsl(0 0% 0%);`
  - `--gradient-dark: hsl(0 0% 0%);`
- Shadows: keep neutral black-alpha (already are), rename intent stays.

### 2. `src/components/TestimonialCarousel.tsx`
- All three `bg-gradient-dark` → `bg-primary text-primary-foreground` (solid black section, white text). Update inner card/text classes to read on black.

### 3. `src/components/Contact.tsx`
- Section `bg-gradient-dark` → `bg-primary text-primary-foreground`.
- Inner icon tiles `group-hover:bg-gradient-primary` → `group-hover:bg-primary-foreground group-hover:text-primary` (or keep `bg-primary`).
- `bg-card/50` panels → `bg-background/5` so they read on black.

### 4. `src/components/Hero.tsx`
- `bg-clip-text bg-gradient-primary` on the highlighted word → plain `text-primary` (solid black word).

### 5. `src/components/Services.tsx`
- Card `hover:bg-gradient-dark` → `hover:bg-primary hover:text-primary-foreground`.
- Icon `group-hover:bg-gradient-primary` → `group-hover:bg-primary group-hover:text-primary-foreground`.

### 6. `src/components/About.tsx`
- Badge `hover:bg-gradient-primary` → `hover:bg-primary hover:text-primary-foreground`.

### 7. `src/components/Footer.tsx`
- Social icon `hover:bg-gradient-primary` → `hover:bg-primary hover:text-primary-foreground`.

### 8. `src/components/Projects.tsx`
- Placeholder tile `bg-gradient-primary` → `bg-primary text-primary-foreground`.
- Keep the subtle `bg-gradient-to-t from-background/60` overlay only if it reads as neutral cream fade; otherwise switch to `from-background/70`.

### 9. `src/components/Blog.tsx`
- Same neutral fade overlay — keep (cream over image) since it uses `background` token, not a color gradient.

### 10. `src/components/BackgroundElements.tsx`
- Remove the orange/yellow/red orbs entirely. Replace with two subtle black orbs at very low opacity (`bg-primary opacity-[0.03] blur-3xl`) or drop the file's decorative orbs. Grid overlay: swap orange rgba lines for `rgba(0,0,0,0.03)`.

### 11. `src/components/ui/button.tsx`
- `default` variant: `bg-primary text-primary-foreground hover:opacity-90` (drop `bg-gradient-primary`, `hover:scale-105`, `shadow-orange`).
- `hero` variant: same solid black treatment, keep size.
- `outline-hero` hover: `hover:bg-primary hover:text-primary-foreground`.
- Drop `shadow-orange*` / `hover:shadow-glow` (they're already neutral but rename usage stays — leave shadow tokens black-alpha).

### 12. `src/pages/Index.tsx` (CardNav items)
- `bgColor` values `#1B1722` and `#2F293A` → `#000000` for all three cards (About/Projects/Contact). `textColor` stays `#FFFFFF`.
- CardNav base stays cream: change `baseColor="#FAFAF7"` → `baseColor="#F2F3ED"` and `buttonTextColor="#FAFAF7"` → `"#FFFFFF"`.

### Not touched
- Layout, typography, spacing, animations, component structure, copy.
- Muted-foreground gray stays for secondary text (readability) — it's neutral, not a brand color.

### Result
Only cream, black, and white appear as brand surfaces. Any residual `bg-gradient-*` class falls back to solid black via the flattened CSS variables, so nothing renders as `#1B1722`/`#2F293A`/purple-black again.
