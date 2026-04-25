# Developer Handoff Notes

This document gives you context on the current state of the Fiper Card landing page, what's been done, what's pending, and recommended next steps.

---

## Current state (as of handoff)

The site is **production-ready and live** at fipercard.com. It's been through multiple audit and polish passes. All critical (P0) and high-priority (P1) issues have been resolved.

### What's working

- ✅ Full responsive design (mobile, tablet, desktop)
- ✅ 6-language support with full Arabic RTL
- ✅ Animated dual-card Hero composition (Physical front, Virtual back)
- ✅ Real Physical Card image (branded with bull artwork)
- ✅ Pricing transparency with breakdown boxes (Virtual: $50 fee → $30 loaded → $20 cost)
- ✅ Premium Choice badge + emphasis on Physical Card
- ✅ Universal WhatsApp floating button on all pages
- ✅ Help Center at `/help-center` with 55+ Q&A across 9 categories
- ✅ Multilingual SEO (canonical URL, hreflang via OG locale alternates, JSON-LD structured data)
- ✅ Optimized cache + security headers in `vercel.json`
- ✅ Performance optimizations (content-visibility, gated animations, mobile-tuned blur)

---

## Recent commit history

Recent meaningful commits on `main`:

```
chore: production-ready meta tags + cache + security headers
feat: universal WhatsApp button across all pages
fix: remove Reverse fee + i18n race condition fix + iOS Safari native scroll
perf: optimize iOS Safari scroll performance
fix: add Physical Card image asset
feat: dual-card stacked Hero composition + emphasize Physical
feat: replace Physical Card visual with branded production design
feat: align pricing model + Premium Choice highlight
fix: P0+P1 audit hotfixes
```

Run `git log --oneline` to see the full history.

---

## Backlog — recommended next work

These are NOT broken — they're enhancement opportunities, ordered by impact.

### P2 — high value

**1. Vercel Analytics integration**
Add Vercel's analytics package to capture conversion funnels. Especially valuable for:
- Tracking which CTA gets the most clicks (Hero vs Final vs Card sections)
- Measuring language preference distribution
- Identifying drop-off points in the scroll journey

```bash
npm install @vercel/analytics
```
Then wrap `<App />` with `<Analytics />` in `main.jsx`.

**2. Social proof section**
Currently no testimonials or trader counts. Adding a "Trusted by 5,000+ traders" or 2-3 testimonial cards above the FAQ would significantly increase conversion confidence. Place between TrustSecurity and FourReasons.

**3. Custom OG image**
Currently the Open Graph image is `fiper-physical-card.png` (1500x951). Works, but it's the literal card on a transparent background. A designed OG image (1200x630, with copy + branding) would look better when shared on WhatsApp/X/LinkedIn. Tools: Figma OG template, Cloudinary OG generator.

**4. Ecosystem links to FPT and Fiper Hub**
Fiper Global has sister products:
- **FPT** (Fiper Pro Traders) at fpt-website-rust.vercel.app
- **Fiper Hub** at fiperhub.com

Footer should mention/link these so visitors understand Fiper Card is part of a larger ecosystem.

### P2 — medium value

**5. Full Arabic translation review**
The Arabic translations were machine-assisted. A native Arabic speaker should review for:
- Modern Standard Arabic (Fusha) compliance — no dialect slip-throughs
- Gendered language consistency
- Trading-specific terminology (Forex, prop firm, payout) accuracy

The user has explicitly required Fusha-only — verify nothing accidentally uses Gulf/Egyptian/Levantine forms.

**6. site.webmanifest update**
Currently `public/site.webmanifest` may have outdated values. Update with:
- `start_url`: `https://fipercard.com/`
- `name`: "Fiper Card"
- `short_name`: "Fiper"
- `theme_color`: `#DC2626`
- `background_color`: `#000000`
- Proper icon set for PWA install

**7. Privacy Policy & Terms of Service pages**
Currently `/legal-documentation` redirects externally. For better SEO and trust signals, mirror the key documents on this site:
- Create `src/pages/Privacy.jsx` and `src/pages/Terms.jsx`
- Add routes in `main.jsx`
- Link from Footer

### P3 — polish

**8. iOS Safari flickering investigation**
A subtle flickering of cards during fast scroll on iOS. Multiple optimization passes have reduced it. Suspected root cause:
- Framer Motion 3D transforms (`rotateY(-15deg) rotateX(10deg)`)
- Backdrop-blur stacking on the cards above other blurred elements

Approaches to try:
- Replace 3D transforms with 2D scale/translate (lose the depth perception, gain stability)
- Pre-render the rotated card as a static image at build time
- Use `transform: translate3d(0,0,0)` on parent containers to force layer promotion

**9. FPT-style design system**
Fiper Pro Traders has a more refined visual identity. Aligning Fiper Card's design with FPT's would unify the brand. Reference: fpt-website-rust.vercel.app.

**10. A/B test Hero copy**
Current Hero headline: "Turn your trading profits into real power in Minutes". Variants worth testing:
- "Spend your prop firm payouts. Anywhere. Today."
- "From trading screen to checkout. In 5 minutes."
- "The card built for traders, by traders."

Use Vercel's experiment routing or third-party A/B tools (Optimizely, GrowthBook).

---

## Things to be careful about

### When changing prices

The pricing model is documented in a comment at the top of `src/components/ChooseCard.jsx`:

```
// PRICING MODEL — confirmed with operations
// Virtual Card: $50 issuing fee → $30 loaded to card balance → $20 actual cost
// Physical Card: $100 issuing fee (no balance loaded)
// These values MUST match helpCenter.vp_a1 in src/locales/*.json.
```

If prices change, **update both the ChooseCard.jsx prices AND the helpCenter.vp_a1 answer in all 6 locale files**. They were intentionally kept in sync after a previous audit found them mismatched.

### When changing the Physical Card image

The current image (`public/fiper-physical-card.png`) was processed to:
- Mask the card number (now shows `•••• •••• •••• 4242`)
- Have rounded corners with transparency
- Be optimized to ~277 KB

If a new card design is provided:
1. Replace `public/fiper-physical-card.png` with same dimensions (1500×951)
2. Use the same masking approach for any visible card number
3. Keep transparent rounded corners for the Hero composition to look right
4. Run through `pngquant --quality=85-95` to keep file size reasonable

### When updating translations

Don't translate keys, only values. The keys (e.g., `chooseCard.virtualCard`) are referenced in `.jsx` files and must stay identical across all locale files.

After editing locale JSON, run:
```bash
node -e "['en','ar','tr','fr','es','pt'].forEach(l => { JSON.parse(require('fs').readFileSync('src/locales/' + l + '.json', 'utf8')); console.log(l + ': valid'); })"
```
to verify all 6 files are still valid JSON.

### When adding new sections

If you add a section component below Hero, wrap it in a `cv-auto` div in `App.jsx` for performance:

```jsx
<div className="cv-auto"><YourNewSection /></div>
```

This enables CSS `content-visibility: auto` so the browser skips rendering it when offscreen.

### When changing fonts

Fonts are loaded in `index.html` via Google Fonts. If you change them:
- Update the `<link>` tag in `index.html`
- Update `font-family` in `src/index.css` (look for `Inter` and `Tajawal` references)
- Verify Arabic still uses an Arabic-script-supporting font (Tajawal, Cairo, or similar)

---

## Domain & deployment access

If you need access to:

- **GitHub repo:** Owner is `mbn-glitch`. Get added as collaborator via Settings → Collaborators.
- **Vercel project:** Owner manages this. Get invited via Vercel team settings.
- **Domain (Namecheap):** Owned by Fiper Global. Contact Mohammed.
- **WhatsApp number (Callbell):** Connected to Fipo AI bot. Contact Mohammed before changing the number in `WhatsAppButton.jsx` — there's a backend Worker (`fipo-callbell-bridge`) tied to it.

---

## Questions?

Reach out to **Mohammed** (project owner at Fiper Global). He has full context on every decision made and can answer any "why is this like that?" question.
