# Fiper Card Landing Page

Production-grade marketing site for [Fiper Card](https://fipercard.com) — the trader-focused Visa card by Fiper Global. Built with React 19, Vite 6, TailwindCSS 4, and Framer Motion. Currently live at **fipercard.com**.

---

## Live URLs

- **Production:** https://fipercard.com
- **Backup (Vercel default):** https://fiper-landing-page.vercel.app
- **Repository:** https://github.com/mbn-glitch/Fiper-landing-page

---

## Quick start

Requirements:
- Node.js 18.x or higher (recommended: Node 20 LTS)
- npm 9.x or higher

```bash
# 1. Install dependencies
npm install

# 2. Run dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

That's it. No environment variables required for local development.

---

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.1 |
| Build tool | Vite | 6.3 |
| Styling | TailwindCSS | 4.1 (with Vite plugin) |
| Animations | Framer Motion | 12.6 |
| Routing | React Router | 7.14 |
| i18n | i18next + react-i18next | 26.x / 17.x |
| Icons | Lucide React | 1.8 |
| Image processing | Sharp (devDep) | 0.34 |

---

## Project structure

```
my-landing-page/
├── public/                    # Static assets served as-is
│   ├── fiper-physical-card.png    # The branded Physical Card image (bull design)
│   ├── Fiper_Logo_white2.png      # White Fiper logo
│   ├── Fiper_Logo_black.png       # Dark variant
│   ├── favicon-*.png              # Favicons
│   └── site.webmanifest           # PWA manifest
│
├── src/
│   ├── App.jsx                    # Root layout (Navbar + sections + Footer + WhatsApp button)
│   ├── main.jsx                   # React entry point + router
│   ├── index.css                  # Global styles + Tailwind imports
│   ├── i18n.js                    # i18next config + lazy-loaded locale system
│   │
│   ├── components/
│   │   ├── Hero.jsx               # Top section with stacked dual-card composition
│   │   ├── FiperCard3D.jsx        # The animated card component (Virtual + Physical variants)
│   │   ├── ChooseCard.jsx         # "Two cards. One ecosystem." pricing section
│   │   ├── WhyFiper.jsx           # Why Fiper benefits grid
│   │   ├── HowItWorks.jsx         # 4-step activation flow
│   │   ├── TrustSecurity.jsx      # Security & trust cards
│   │   ├── FourReasons.jsx        # Four reasons to choose us
│   │   ├── TrustStrip.jsx         # Platform partner logos
│   │   ├── FAQ.jsx                # Frequently asked questions
│   │   ├── FinalCTA.jsx           # Bottom call-to-action
│   │   ├── Footer.jsx             # Site footer
│   │   ├── Navbar.jsx             # Top navigation
│   │   ├── LanguageSwitcher.jsx   # Globe dropdown for 6 languages
│   │   ├── ScrollProgress.jsx     # Top progress bar
│   │   ├── PageLoader.jsx         # Loading state
│   │   └── WhatsAppButton.jsx     # Floating WhatsApp button (universal)
│   │
│   ├── pages/
│   │   └── HelpCenter.jsx         # /help-center route — full help center page
│   │
│   ├── hooks/
│   │   └── useDirection.js        # Sets <html dir="rtl|ltr"> based on language
│   │
│   ├── data/
│   │   └── helpCenterData.js      # Help Center Q&A content (multilingual)
│   │
│   └── locales/                   # Translations
│       ├── en.json                # English (bundled, default)
│       ├── ar.json                # Arabic (RTL)
│       ├── tr.json                # Turkish
│       ├── fr.json                # French
│       ├── es.json                # Spanish
│       └── pt.json                # Portuguese (Brazilian)
│
├── index.html                     # HTML entry point with meta tags + JSON-LD
├── vercel.json                    # Vercel deployment config (cache + security headers)
├── vite.config.js                 # Vite + React + Tailwind config
└── package.json
```

---

## Internationalization (i18n)

The site supports 6 languages with full RTL support for Arabic. Only English is bundled at startup; other languages load lazily on demand.

### Adding a new language

1. Create `src/locales/<code>.json` (copy `en.json` and translate)
2. In `src/i18n.js`, add to `loaders`:
   ```js
   const loaders = {
     ar: () => import("./locales/ar.json"),
     // ...add new code here:
     de: () => import("./locales/de.json"),
   };
   ```
3. In `src/i18n.js`, add to `LANGUAGES`:
   ```js
   { code: "de", label: "Deutsch", native: "DE", flag: "🇩🇪" },
   ```
4. In `src/i18n.js`, add to `supportedLngs` array
5. The language will automatically appear in the language switcher

### Editing existing translations

All translations live in `src/locales/*.json`. Each file has the same nested structure under one root `translation` namespace. Editing a key in one file does NOT require changes elsewhere — the key is what binds them together.

### Arabic-specific rules (per Fiper Global)

- **Modern Standard Arabic (Fusha) only** — never use Gulf, Egyptian, or any regional dialect
- The `useDirection` hook automatically applies `dir="rtl"` when Arabic is active
- Tailwind logical properties (`start`/`end`, `ms`/`me`) are used throughout — they auto-flip in RTL

---

## Design system

### Colors

Defined in `src/index.css` and Tailwind config:

| Token | Hex | Usage |
|---|---|---|
| `fiper` (red) | `#DC2626` | Primary brand color, CTAs, accents |
| `fiper-dark` | `#991B1B` | Hover state for primary buttons |
| Black | `#000` | Background |
| Zinc shades | various | Text hierarchy, borders, surfaces |

### Typography

- **English/Latin scripts:** Inter (loaded from Google Fonts)
- **Arabic:** Tajawal (loaded from Google Fonts)
- Both are loaded once via `<link>` in `index.html`

### Glass effect

The `.glass` utility class (defined in `index.css`) creates frosted-glass panels with `backdrop-filter: blur(12px)`. On screens narrower than 768px, the blur is reduced to 8px for performance.

### Animations

- Most use Framer Motion's `whileInView` with `viewport={{ once: true }}` so they trigger once on scroll
- The Hero radial glow + floating cards use infinite animations gated by `whileInView` (pause when off-screen) for performance
- Touch devices (iOS, Android) get a CSS override that disables the heaviest animation (the Hero glow pulse) — see `index.css`

---

## Routing

Two routes only, set up in `src/main.jsx`:

| Route | Component | Loading |
|---|---|---|
| `/` | `App` (homepage with all sections) | Eagerly loaded |
| `/help-center` | `HelpCenter` | Lazy-loaded with React Suspense |

The `vercel.json` has a SPA rewrite rule (`/(.*) → /index.html`) so client-side routing works on direct URL hits.

---

## External integrations

### CRM

The "Get Your Card" CTAs link to https://crm.fiper.me — Fiper's customer onboarding flow.

### WhatsApp support

The floating button on every page links to https://wa.me/971561111855 — Fipo AI on Callbell. The pre-filled message is "Hello, I need help with my Fiper Card".

To change the number or message, edit `src/components/WhatsAppButton.jsx` (single source of truth — also referenced from HelpCenter contact card).

### Social links

Linktree at https://linktr.ee/fiper aggregates all Fiper social accounts. Referenced in JSON-LD structured data and Footer.

### Legal documents

Linked at https://fiper.me/legal-documentation (Fiper Global's main domain).

---

## Deployment

### Currently deployed on Vercel

The repository is connected to Vercel via the `mbn-glitch/Fiper-landing-page` GitHub repo. Every push to `main` triggers an automatic build and deploy.

### `vercel.json` configuration

Already configured with:
- SPA rewrite rule (all paths → `index.html`)
- Cache headers:
  - HTML/root: `max-age=0, must-revalidate` (always fresh)
  - `/assets/*` (Vite hashed bundles): `max-age=31536000, immutable`
  - Images (png/jpg/webp/svg/ico): `max-age=86400, must-revalidate`
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`

### Deploying to a different host

The site is a static SPA — it works on any static host. After running `npm run build`, the `/dist` folder contains everything needed.

**Netlify / Cloudflare Pages:** Drop in the `/dist` folder, configure SPA fallback to `/index.html`, replicate the cache headers from `vercel.json` in the host's equivalent config (`_headers` file for Netlify, `_headers` for Cloudflare).

**Traditional cPanel / shared hosting:** Upload `/dist` contents to `public_html`. Add an `.htaccess` file with:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

**Custom domain:** Configure DNS A/CNAME records pointing to your host. SSL is handled by Vercel/Netlify/Cloudflare automatically (Let's Encrypt).

---

## Performance notes

- Vite bundles JS into hashed chunks for aggressive caching
- All locale files except English are code-split (lazy-loaded on language change)
- HelpCenter page is lazy-loaded via React Suspense
- Lower sections wrap with `.cv-auto` (CSS `content-visibility: auto`) — browser skips rendering offscreen sections
- iOS Safari gets explicit performance optimizations: reduced blur, native scroll, disabled glow pulse animation
- Total bundle size: ~250 KB gzipped (main chunk) + lazy chunks per locale (~3-5 KB each)

---

## Known issues

- **iOS Safari flickering on scroll:** Slight visual flicker on some animated elements during fast scroll. Multiple optimization passes have reduced but not fully eliminated this. Likely root cause: Framer Motion 3D transforms + backdrop-blur stacking. Acceptable for current users; further investigation pending.

---

## Browser support

Tested and verified on:
- Chrome (desktop + Android)
- Edge (desktop)
- Safari (iOS 16+, macOS)
- Firefox (desktop)

Minimum target: ES2020-capable browsers (covers ~98% of global traffic per caniuse.com).

---

## Contact

**Project owner:** Mohammed
**Organization:** Fiper Global, UAE
**GitHub:** [mbn-glitch](https://github.com/mbn-glitch)
