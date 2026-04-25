# Architecture

How the pieces fit together. Read this once before making structural changes.

---

## Component hierarchy

```
main.jsx                          (entry, sets up React + Router)
└── BrowserRouter
    ├── Route "/" → App
    │   └── App.jsx
    │       ├── ScrollProgress    (top progress bar)
    │       ├── Navbar
    │       ├── <main>
    │       │   ├── Hero           (NOT wrapped in cv-auto — always visible)
    │       │   └── cv-auto wrappers around:
    │       │       ├── TrustStrip
    │       │       ├── WhyFiper
    │       │       ├── ChooseCard (uses FiperCard3D)
    │       │       ├── HowItWorks
    │       │       ├── TrustSecurity
    │       │       ├── FourReasons
    │       │       ├── FAQ
    │       │       └── FinalCTA
    │       ├── Footer
    │       └── WhatsAppButton    (fixed position, last child for z-index)
    │
    └── Route "/help-center" → HelpCenter (lazy-loaded)
        └── HelpCenter.jsx
            ├── Top nav
            ├── Search + category grid
            ├── Per-category Q&A accordion
            ├── Contact card (green box)
            └── WhatsAppButton    (same shared component as homepage)
```

---

## Data flow

### Translation flow

```
User clicks a language in LanguageSwitcher
        ↓
LanguageSwitcher calls changeLanguageSafely(code) from i18n.js
        ↓
i18n.js: ensureLoaded(code) — async import of locale JSON
        ↓
i18n.addResourceBundle() — registers translation
        ↓
i18n.changeLanguage(code) — switches active language
        ↓
useDirection hook detects change → updates <html dir="rtl|ltr">
        ↓
React re-renders all components using useTranslation()
        ↓
All t("...") calls return the new locale's strings
```

The previous version of `i18n.js` had a race condition where `changeLanguage()` happened BEFORE the bundle loaded, requiring manual page refresh. The current `changeLanguageSafely()` awaits the bundle first.

### Direction (LTR/RTL) flow

```
useDirection hook (src/hooks/useDirection.js):
  Reads i18n.language
  Determines direction (Arabic = "rtl", others = "ltr")
  Sets document.documentElement.dir
  Sets document.documentElement.lang
```

Components use Tailwind's logical properties (`start`/`end`/`ms`/`me`) which automatically flip based on `dir`. The `rtl-flip` utility class is used on icons that should mirror (like arrow icons).

---

## Animation strategy

### Three categories of animations

**1. One-shot scroll-in animations**
Used for section entries (titles, cards appearing as you scroll past them).
Pattern: `whileInView` + `viewport={{ once: true, margin: "-100px" }}`

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7 }}
>
```

The `once: true` is critical — without it, the animation re-fires every time you scroll past, causing flickering.

**2. Persistent in-view animations**
Used for floating cards, pulsing glows. They should keep animating WHILE visible but pause when offscreen.
Pattern: `whileInView` + `repeat: Infinity` (no `once: true`)

```jsx
<motion.div
  initial={{ y: 0 }}
  whileInView={{ y: [-10, 10, -10] }}
  viewport={{ margin: "-50px" }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
>
```

This is what FiperCard3D does for the floating card motion.

**3. Always-on UI animations**
Used for the Navbar scroll progress bar, the WhatsApp button pulse. These run regardless of viewport because they're always visible (fixed position).

### Touch device override

In `src/index.css`, a media query targets touch devices:
```css
@media (hover: none) and (pointer: coarse) {
  .hero-glow-pulse {
    animation: none !important;
    /* fallback to a static state */
  }
  html { scroll-behavior: auto; }
}
```

This disables the heaviest animation on iOS/Android Safari and lets native scrolling take over from CSS smooth-scroll.

---

## Styling approach

### TailwindCSS 4 (with Vite plugin)

No `tailwind.config.js` is needed — Tailwind 4 auto-detects classes via the Vite plugin. Custom utilities are defined in `src/index.css` using `@layer`:

```css
@layer utilities {
  .glass { ... }
  .gpu-layer { ... }
  .cv-auto { ... }
  .rtl-flip { ... }
}
```

### Custom CSS classes (in index.css)

| Class | Purpose |
|---|---|
| `.glass` | Frosted glass effect (backdrop-blur) — reduced on mobile |
| `.glass-strong` | Stronger blur variant |
| `.noise-bg` | Subtle noise texture on dark backgrounds |
| `.card-shine` | Diagonal shine effect on hover |
| `.gpu-layer` | Forces GPU layer for transformed elements |
| `.cv-auto` | Enables `content-visibility: auto` for offscreen sections |
| `.rtl-flip` | Mirrors element horizontally in RTL contexts |
| `.hero-glow-pulse` | Tag for the Hero radial glow (CSS targets it on touch devices) |

### Brand colors (Tailwind extensions)

Defined inline in `index.css` via `@theme`:
- `text-fiper` / `bg-fiper` → `#DC2626`
- `text-fiper-dark` / `bg-fiper-dark` → `#991B1B`

---

## SEO strategy

### Static SEO

The `index.html` is statically served — it includes:
- Canonical URL pointing to `https://fipercard.com/`
- OG tags with absolute URLs and image dimensions
- 6 OG locale alternates (`og:locale:alternate`)
- JSON-LD structured data (Organization schema)
- Twitter Card metadata

This means search engines and social platforms see proper metadata even before any JS runs.

### Dynamic content

The actual page content (rendered by React after JS loads) is in client-side JavaScript. This is fine for landing pages — Google's crawler executes JS — but if you ever need server-rendered content for stricter SEO, consider migrating to:
- **Vite SSG** (`vite-plugin-ssr`)
- **Astro** (with React islands)
- **Next.js** (full SSR/SSG)

Currently this isn't needed.

### Multilingual SEO

- `og:locale:alternate` declared for all 6 languages
- The `useDirection` hook updates `<html lang="...">` dynamically as user switches
- For better multilingual SEO, you could pre-render per-language URLs (e.g., `/ar/`, `/fr/`) but this requires a routing rework

---

## Performance budget

Current production bundle (rough numbers):

| Asset | Size (gzipped) |
|---|---|
| Main JS chunk | ~250 KB |
| Per-locale chunks | 3-5 KB each |
| `fiper-physical-card.png` | ~277 KB |
| Logo PNGs | ~10-20 KB each |
| Total initial load | ~600-700 KB |

Lighthouse scores on Vercel (mobile, throttled):
- Performance: 85-95
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

---

## Common pitfalls when making changes

1. **Don't add JSX inside the cv-auto wrappers in App.jsx without keeping the wrapper.** The `content-visibility: auto` is what keeps scroll smooth.

2. **Don't change the Navbar height (currently h-16) without checking Hero's `mt-12 lg:mt-14`.** They're tuned together.

3. **Don't add new dependencies casually.** The bundle is currently lean. Each new dep adds bytes that affect mobile loading.

4. **Don't hardcode strings in JSX.** Use `t("...")` and add the key to all 6 locale files. Even small UI text needs translation.

5. **Don't use right/left margins/paddings — use start/end.** `right-6` won't flip in RTL, `end-6` will.

6. **Don't disable `viewport={{ once: true }}` on entry animations.** It causes flickering on repeated scroll.

7. **Don't change brand colors without coordinating with Fiper Global brand team.** The red `#DC2626` is shared across the entire Fiper ecosystem.

---

## Build output

Running `npm run build` produces a `dist/` folder:

```
dist/
├── index.html               (with hash-busted asset references)
├── assets/
│   ├── index-<hash>.js      (main bundle, immutable cache)
│   ├── index-<hash>.css     (Tailwind output)
│   ├── ar-<hash>.js         (Arabic locale chunk)
│   ├── tr-<hash>.js
│   ├── fr-<hash>.js
│   ├── es-<hash>.js
│   ├── pt-<hash>.js
│   ├── HelpCenter-<hash>.js (lazy-loaded route chunk)
│   └── ...                  (other Vite-generated chunks)
├── fiper-physical-card.png
├── Fiper_Logo_white2.png
├── ...                      (rest of public/ contents)
├── favicon files
└── site.webmanifest
```

Deploy the entire `dist/` folder to any static host. The hashed asset names mean you can cache `/assets/*` for a year safely — when you redeploy, the names change.
