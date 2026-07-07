## Replace CardNav with the exact React Bits design

Rebuild `src/components/CardNav.tsx` and `src/components/CardNav.css` to match the reference screenshots exactly (hamburger left, centered logo, "Get Started" pill on the right; expanded state shows 3 dark cards with arrow links).

### 1. `src/components/CardNav.tsx` — replace with the pasted reference

- Use the exact React Bits component you pasted (props: `logo`, `logoAlt`, `items`, `baseColor`, `menuColor`, `buttonBgColor`, `buttonTextColor`, `ease`, `className`).
- Top bar layout: `[Hamburger] .... [Logo centered] .... [Get Started button]`.
- Hamburger animates into an X when open (two lines → cross), matching the screenshot.
- GSAP timeline animates nav height + staggers the 3 cards in.
- Add a small `logoText` fallback so we can render "Layo.Dev" until the user drops in their SVG (kept minimal; when `logo` is provided it renders the `<img>` exactly as in the reference).

### 2. `src/components/CardNav.css` — replace with the React Bits stylesheet

Match the reference precisely:
- Container: fixed, top ~1.5rem, centered, max-width ~1100px, pill radius (border-radius 9999px collapsed → ~1.25rem expanded).
- Background `#fff`, soft shadow, 1px border in `--border`.
- Top bar: 60px tall, `display:flex`, hamburger absolutely-anchored left, logo centered via `position:absolute; left:50%; transform:translateX(-50%)`, CTA on the right.
- Hamburger: two 2px black bars, 24px wide; `.open` state rotates them into an X.
- CTA button: black pill, white text, `padding: 0.7rem 1.4rem`, radius 9999px.
- Expanded content: 3-column grid, dark cards (`#1B1722` / `#2F293A`), white text, big label top-left (~1.75rem, Poppins/serif-ish weight 600), links bottom-left with `GoArrowUpRight` icon before the label.
- Mobile (`max-width: 768px`): stack cards vertically, hide CTA label text or shrink it, keep hamburger + logo.

### 3. `src/pages/Index.tsx` — update usage to the reference API

```tsx
<CardNav
  logoText="Layo.Dev"        // temporary until user provides logo.svg
  items={navItems}            // About / Projects / Contact with the exact colors from the reference
  baseColor="#FAFAF7"
  menuColor="#111111"
  buttonBgColor="#111111"
  buttonTextColor="#FAFAF7"
  ease="power3.out"
/>
```

Update `navItems` colors to match the reference cards: About `#1B1722`, Projects `#2F293A`, Contact `#2F293A`, all with `#FFFFFF` text. Keep the existing `href` values so in-page anchors still work.

### Not touched
Design tokens in `index.css`, other sections, GSAP version, react-icons dependency (already installed).

### Technical notes
- `react-icons` and `gsap` are already in `package.json` from the earlier install.
- The pasted component uses `useLayoutEffect`; safe in this Vite CSR app.
- Logo slot: `logo` prop stays optional in TS so the page can pass `logoText` for now and swap to `logo={logoUrl}` later without a code change.
