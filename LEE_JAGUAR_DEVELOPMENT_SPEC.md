# LJ-Collective — Website Development Specification (Cursor-Ready)

> **How to use this file in Cursor:** Place this file in the project root as `SPEC.md`, put the two files from `/reference` into `/reference`, then open Cursor Agent and paste the **Kickoff Prompt** in Section 20. Section 19 contains a ready-made `.cursor/rules` file. Build phase by phase (Section 18) — do not ask the agent to build everything in one pass.

---

## 0. PROJECT SUMMARY

| Item | Value |
|---|---|
| Project name | **LJ-Collective** |
| Tagline (logo) | Textiles & Apparel |
| Type | **B2B corporate marketing website** (lead generation). **NOT an e-commerce store.** No cart, checkout, prices, product SKUs, accounts or payments. |
| Positioning | Full-service fashion development & production partner (UAE-based) |
| Main statement | WE DESIGN. WE DEVELOP. WE PRODUCE. |
| Supporting statement | Ideas into products. Creativity into production. |
| Primary conversion goal | "Start a Project" enquiry (Contact page) |
| Audience | Established fashion brands, emerging labels, fashion retailers / retail chains, online fashion businesses, private-label brands, distributors and brand owners |
| Tone | **Corporate, credible, premium, restrained.** Editorial photography, but with a structured, business-grade layout. |

### 0.1 Hard exclusions (do not build, do not mention anywhere)

- **No "Corporate & Institutional" section, page, nav item, card, image or copy.**
- No uniforms, workwear, promotional merchandise or institutional supply — anywhere.
- No shop, cart, product pricing, "Add to cart", wishlists, login.
- No invented clients, logos, certifications, factory ownership, production capacity, awards or statistics.
- No invented contact details (see Section 13).

### 0.2 Reference files

| File | Purpose |
|---|---|
| `/reference/design-reference.jpeg` | Visual mood reference: layout rhythm, photography style, logo lockup, button shapes, thin dividers, icon style. **Use for look & feel only — see conflicts in 0.3.** |
| `/reference/logo-reference.png` | **Logo to reproduce exactly** (see Section 5). |

### 0.3 Where this spec overrides the reference image

The reference image was produced for an earlier concept. Follow the image for composition and quality level, **but the following are overridden:**

| In reference image | In this build |
|---|---|
| Nav: "Corporate & Institutional", "Capabilities" | Nav is: Home, Fashion & Retail, Our Services, Product Categories, About Us, Contact |
| Hero CTA "Explore Corporate & Institutional" | Removed |
| "Two distinct needs. One capable partner." split panel | Removed entirely |
| Dark brown panels with **white text** | **Forbidden.** Use Natural Cream / Muted Stone panels with Espresso text |
| White text on Burnt Sienna buttons | **Forbidden.** See button spec, Section 7 |
| "Uniform supply programme" copy | Removed |
| Mineral Blue "Explore Corporate Solutions" button | Removed |
| Corporate model with name badge & scarf | Do not use |

---

## 1. TECH STACK (decision)

The original brief mentioned WordPress/Elementor. Because this document is for Cursor-based development, the default build is a code project:

- **Next.js 14+ (App Router)** + **TypeScript**
- **Tailwind CSS** (design tokens mapped to the approved palette)
- **next/font/google** — Playfair Display + Montserrat (self-hosted by Next, no layout shift)
- **next/image** for all photography (WebP/AVIF, responsive `sizes`, blur placeholders)
- **Framer Motion** for subtle reveal/transition (respect `prefers-reduced-motion`)
- **lucide-react** for icons (thin stroke, 1.5px)
- **react-hook-form + zod** for the enquiry form, **Resend** (or SMTP via Nodemailer) for delivery through a Next.js Route Handler
- Deployment target: Vercel (or any Node host). Node 20+.

> If WordPress/Elementor Pro is still mandatory, tell the agent to keep everything in this spec (tokens, sections, copy, rules) and output an Elementor build checklist instead of code. Do not mix both in one repo.

---

## 2. DESIGN TOKENS

### 2.1 Colour (only these five colours exist in the system)

| Token | Name | Hex | Usage |
|---|---|---|---|
| `espresso` | Espresso | `#352720` | **All text**, headings, icons, borders on light |
| `sienna` | Burnt Sienna | `#A9573D` | Accent, link underline, arrows, numerals, large display accents |
| `mineral` | Mineral Blue | `#7895A3` | Secondary accents, small icons, tinted image overlays, hover lines |
| `stone` | Muted Stone | `#C9B8A5` | Dividers, alt section backgrounds, button fill |
| `cream` | Natural Cream | `#F2ECE3` | Main background |

Tailwind config (`tailwind.config.ts`):

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    colors: {
      // Deliberately NO white, black, or default palettes.
      transparent: "transparent",
      current: "currentColor",
      espresso: "#352720",
      sienna: "#A9573D",
      mineral: "#7895A3",
      stone: "#C9B8A5",
      cream: "#F2ECE3",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1200px", wide: "1360px" },
    },
  },
  plugins: [],
};
export default config;
```

Because `white` and `black` are not in the theme, any `text-white` / `bg-white` will fail to compile — that is intentional.

### 2.2 NO WHITE TEXT — enforced rule

1. `body { color: #352720; background: #F2ECE3; }` set explicitly in `globals.css`.
2. Every text-bearing component sets an explicit Espresso (or Sienna for approved accents) colour class — never rely on inheritance alone for buttons, nav, form labels, captions, footer, mobile menu, hover/focus states.
3. Never place text directly on photography. If text and image overlap, text sits on a solid Natural Cream or Muted Stone panel.
4. Add a CI/lint check (Section 16) that fails the build if `#fff`, `#ffffff`, `white`, `text-white`, `bg-white`, `rgb(255,255,255)` or `color-scheme`-driven auto-contrast appears in `src/`.
5. Set `color-scheme: light` and **do not** implement dark mode.
6. Style `::selection` as `background: #C9B8A5; color: #352720`.

### 2.3 Contrast guidance (so the "no white" rule still passes accessibility)

| Pair | Ratio (approx.) | Rule |
|---|---|---|
| Espresso on Cream | ~12:1 | Default text — OK everywhere |
| Espresso on Stone | ~7:1 | OK for body text and buttons |
| Sienna on Cream | ~4.3:1 | **Large/bold text only** (≥24px, or ≥18.5px bold), numerals, arrows, underlines. **Do not use for small body text.** |
| Espresso on Sienna | ~2.8:1 | **Fails** — do not put text on a Sienna fill |
| Mineral on Cream | ~2.8:1 | Decorative only (lines, icons ≥24px, overlays). Never for text |

### 2.4 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings / display | Playfair Display | 500–600 | Uppercase for H1/H2 section titles per brief; tight tracking (`-0.01em`) |
| Body | Montserrat | 400 (500 for emphasis) | 16–17px, line-height 1.7 |
| Navigation | Montserrat | 500 | 13px uppercase, tracking `0.08em` |
| Buttons | Montserrat | 600 | 13px uppercase, tracking `0.1em` |
| Eyebrow labels | Montserrat | 500 | 12px uppercase, tracking `0.18em`, Sienna (≥ bold) or Espresso |

Fluid scale (use `clamp`):

```css
--text-h1: clamp(2.5rem, 6vw, 5rem);     /* hero */
--text-h2: clamp(1.75rem, 3.4vw, 2.75rem);
--text-h3: clamp(1.25rem, 2vw, 1.5rem);
--text-body: 1.0625rem;
--text-small: 0.875rem;
```

### 2.5 Layout & spacing

- Content width **1200px**, wide image bands up to 1360px / full-bleed.
- Section vertical padding: `clamp(4rem, 9vw, 8rem)`.
- Grid: 12 columns desktop, 8 tablet, 4 mobile. Gutter 24px (32px ≥1280).
- **Corporate feel:** square or max `2px` corner radius; thin 1px dividers in Stone; no drop shadows (or a single very soft `0 1px 0` hairline); no heavy rounded cards; minimal boxes.
- Breakpoints: mobile `<640`, tablet `640–1023`, desktop `≥1024`, wide `≥1280`.

---

## 3. PROJECT STRUCTURE

```
lee-jaguar/
├─ SPEC.md
├─ reference/
│  ├─ design-reference.jpeg
│  └─ logo-reference.png
├─ .cursor/rules/lee-jaguar.mdc
├─ public/
│  ├─ brand/logo.svg            # vector logo (Section 5)
│  ├─ brand/logo-mark.svg       # LJ monogram only
│  ├─ brand/favicon.svg
│  └─ images/
│     ├─ hero/ intro/ process/ categories/ why/ about/ cta/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx               # Homepage (Sections 01–09)
│  │  ├─ fashion-retail/page.tsx
│  │  ├─ services/page.tsx
│  │  ├─ product-categories/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ api/contact/route.ts
│  │  ├─ not-found.tsx
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ layout/ Header.tsx MobileMenu.tsx Footer.tsx
│  │  ├─ ui/ Button.tsx Eyebrow.tsx SectionHeading.tsx Reveal.tsx Divider.tsx Logo.tsx
│  │  └─ sections/ Hero.tsx Intro.tsx Process.tsx Categories.tsx WhyLjCollective.tsx About.tsx FinalCta.tsx
│  ├─ content/
│  │  ├─ site.ts                # nav, company, contact (env-driven)
│  │  ├─ process.ts
│  │  ├─ categories.ts
│  │  └─ why.ts
│  ├─ lib/ images.ts  validators.ts
│  └─ styles/globals.css
├─ scripts/check-no-white.mjs
└─ .env.example
```

All copy lives in `/src/content/*.ts` — components render data, they do not hard-code strings.

---

## 4. SITE MAP & NAVIGATION

| Label | Route | Notes |
|---|---|---|
| Home | `/` | Full homepage per Section 8 |
| Fashion & Retail | `/fashion-retail` | Who we serve + how we work with brands/retailers |
| Our Services | `/services` | Expanded six-stage process |
| Product Categories | `/product-categories` | Nine categories, expanded |
| About Us | `/about` | Company overview |
| Contact | `/contact` | Enquiry form + verified details |

CTA button (header, hero, final CTA): **START A PROJECT →** → `/contact`.

Inner pages for this phase are **clean, lighter layouts** reusing the same components (heading + intro + sections already defined). Do not invent additional copy beyond what is provided; where a page needs extra text, insert clearly marked `TODO(content)` blocks and flag them in the final report.

---

## 5. LOGO

**Source:** `/reference/logo-reference.png` (cropped from the approved design). Reproduce it **exactly**:

- **Monogram:** stylised italic serif **"L" + "J"** interlocked. The "L" is Espresso; the "J" descends below the baseline with a **Burnt Sienna** curved tail/leaf stroke.
- **Vertical thin divider** (Stone/Espresso, 1px) between monogram and wordmark.
- **Wordmark:** `LJ Collective` in a high-contrast serif (Playfair Display–style), Espresso.
- **Descriptor beneath:** `TEXTILES & APPAREL` in small, widely tracked Montserrat caps (Sienna).

Implementation steps for the agent:

1. Create `public/brand/logo.svg` by **vectorising** the reference (trace the monogram to SVG paths; set the wordmark as live text converted to paths for fidelity). Keep colours to `#352720` and `#A9573D`. Transparent background.
2. Favicon is the letters `LJC` (`public/brand/favicon.svg`). The mobile header uses the `LJ Collective` wordmark.
3. Build `<Logo variant="full | mark" />` using `next/image` or inline SVG. It links to `/` with `aria-label="LJ-Collective — Home"`.
4. Sizes: desktop header height 44–48px; mobile 36px. Minimum clear space = height of the "L".
5. **Do not redesign, restyle or substitute the logo.** If vector tracing is not accurate enough, ship the high-res PNG (`logo@2x.png`, transparent) as a temporary asset and add `TODO(brand): replace with client vector file`.

---

## 6. IMAGERY (high-quality apparel photography)

### 6.1 Requirements

- High resolution (min **2400px** wide for hero/wide bands, **1600px** for others), exported **WebP** (AVIF via Next), quality ~80, each < 250 KB after optimisation where possible.
- Style: contemporary editorial fashion; **warm, muted, natural tones** consistent with the palette. Apply a consistent subtle colour treatment (slightly lowered saturation, warm highlights) — do via source selection or a one-time batch edit, **not** CSS filters on text.
- Subjects: apparel, models in contemporary clothing, fabric swatches, mood boards, sketches/tech packs, pattern making, sewing/sampling close-ups, finished garment racks.
- **Do not use:** office teams, generic handshakes, conveyor/factory-line wide shots as dominant visuals, uniforms/workwear/hi-vis/corporate-badge staff, promotional merchandise, logos of third-party brands, identifiable celebrities.
- Never reuse the same image in two sections.

### 6.2 Sourcing & licensing

The agent cannot invent image URLs. Source from **licensed free-commercial libraries** (Unsplash, Pexels) or a client-supplied library, **download locally** into `public/images/...` (do **not** hotlink), and record each in `src/content/image-manifest.json`:

```json
{ "file": "hero-main.webp", "source": "Unsplash", "author": "…", "url": "…", "license": "Unsplash License", "alt": "…" }
```

Prefer images with model releases for people. If a suitable image cannot be found, use a neutral Stone-coloured placeholder with `TODO(image)` — never a stock “corporate” photo.

### 6.3 Image slot manifest

| Slot | File | Ratio | Search keywords | Alt text |
|---|---|---|---|---|
| Hero main | `hero/hero-main.webp` | 3:2 landscape, min 2400w | fashion editorial model tailored camel coat studio | Model wearing a tailored camel coat in an editorial studio setting |
| Hero support A | `hero/hero-mannequin.webp` | 4:5 | dress form mannequin measuring tape atelier | Dress form with measuring tape in a fashion design studio |
| Hero support B | `hero/hero-fabrics.webp` | 4:5 | folded fabric swatches rust blue textile | Folded rust and blue textile swatches |
| Hero support C | `hero/hero-sewing.webp` | 3:2 | sewing machine close up hand fabric | Hands guiding fabric through a sewing machine during sampling |
| Intro | `intro/intro-studio.webp` | 4:5 | fashion studio fabric rolls pattern table | Fabric and pattern materials on a fashion studio table |
| Process 01 | `process/01-trend.webp` | 4:5 | mood board fashion colour palette inspiration | Fashion mood board with colour and texture references |
| Process 02 | `process/02-design.webp` | 4:5 | fashion sketch design illustration garment | Garment design sketches on a studio desk |
| Process 03 | `process/03-fabrics.webp` | 4:5 | knit woven fabric texture yarn swatches | Knitted and woven fabric and yarn samples |
| Process 04 | `process/04-tech.webp` | 4:5 | pattern making tech pack measuring garment | Pattern pieces and measurements for technical development |
| Process 05 | `process/05-sampling.webp` | 4:5 | fit model garment sample pinning atelier | Garment sample being fitted and refined |
| Process 06 | `process/06-production.webp` | 4:5 | garment rack finished clothing quality check | Finished garments on a rack ready for quality review |
| Cat 01 Knitwear & Jersey | `categories/knitwear.webp` | 4:5 | model hoodie sweatshirt neutral studio | Model in a neutral knit sweatshirt |
| Cat 02 Activewear | `categories/activewear.webp` | 4:5 | activewear leggings sports bra model studio | Model in contemporary activewear |
| Cat 03 Loungewear & Sleepwear | `categories/loungewear.webp` | 4:5 | loungewear set pyjamas model soft light | Model in a coordinated loungewear set |
| Cat 04 Outerwear | `categories/outerwear.webp` | 4:5 | padded jacket coat overshirt model | Model wearing a contemporary jacket |
| Cat 05 Denim & Woven | `categories/denim-woven.webp` | 4:5 | denim jeans woven shirt model editorial | Model in denim and woven apparel |
| Cat 06 Dresses & Contemporary | `categories/dresses.webp` | 4:5 | fashion dress skirt model editorial | Model in a contemporary dress |
| Cat 07 Swimwear & Resortwear | `categories/swimwear.webp` | 4:5 | resortwear swimwear cover-up beach editorial | Model in resortwear and swimwear |
| Cat 08 Intimates & Shapewear | `categories/intimates.webp` | 4:5 | lingerie shapewear basics tasteful studio | Tasteful studio image of intimates and shapewear |
| Cat 09 Babywear & Kidswear | `categories/kidswear.webp` | 4:5 | baby romper bodysuit flat lay | Flat lay of baby romper and bodysuit |
| Why (×4 optional) | `why/*.webp` | 3:2 | fabric detail, stitch detail, garment rack, costing sheet | Descriptive per image |
| About | `about/about-main.webp` | 4:5 or 3:4 tall | fashion designer studio fabrics collection | Fashion development studio with fabrics and garments |
| Final CTA (optional) | `cta/cta-band.webp` | 21:9 | fabric texture neutral drape | Draped neutral fabric texture |

Intimates/swimwear images must be **tasteful, non-suggestive, commercially appropriate** (flat lays or neutral studio shots are acceptable).

### 6.4 Implementation rules

- `next/image` with explicit `sizes`, `placeholder="blur"`, and `priority` only on the hero main image.
- Reserve aspect ratios to prevent CLS.
- `object-fit: cover` with art-directed `object-position`.
- Every image has descriptive `alt`; decorative images use `alt=""`.

---

## 7. COMPONENT SPECS

### 7.1 Button (`ui/Button.tsx`)

Corporate, square, no pill shapes. Text is **always Espresso**.

| Variant | Default | Hover / focus |
|---|---|---|
| **Primary** | Fill `stone`, text `espresso`, 1px border `espresso`, bottom accent 2px `sienna` | Fill `cream`, border `sienna`, arrow translates +4px |
| **Secondary** | Transparent, text `espresso`, 1px border `espresso` | Fill `stone`, arrow translates +4px |
| **Text link** | Text `espresso`, 1px underline `sienna` | Underline thickens, arrow +4px |

- Font Montserrat 600, 13px, uppercase, tracking 0.1em; padding `16px 28px`; min height 48px (tap-friendly); radius `0–2px`.
- Trailing `→` (lucide `ArrowRight`, 16px, stroke 1.75) colour `espresso` (or `sienna` on hover).
- Visible focus ring: `outline: 2px solid #A9573D; outline-offset: 3px`.
- Renders `<a>` (via `next/link`) when `href` is present, else `<button>`.

### 7.2 Eyebrow
Small uppercase label above headings, with a 32px Sienna line before it.

### 7.3 SectionHeading
Props: `eyebrow?, title, lead?, align`. H2 in Playfair, uppercase, Espresso. Lead in Montserrat, max-width 60ch.

### 7.4 Reveal
Framer Motion wrapper: fade + 16px upward translate, 600ms ease-out, `once: true`, disabled for `prefers-reduced-motion`. Image variant uses a clip/opacity reveal (no scaling jank).

### 7.5 Divider
1px line in `stone`.

---

## 8. HOMEPAGE — SECTION-BY-SECTION

Sections must render in this exact order: 01 → 09. Each is its own component, with an `id` for anchoring.

### SECTION 01 — HEADER / NAVIGATION

- Sticky, background `cream`; on scroll add a 1px `stone` bottom border (restrained background transition, 200ms). Height 80px → 68px after scroll.
- Left: Logo (links `/`). Right: nav links (Home, Fashion & Retail, Our Services, Product Categories, About Us, Contact) + **START A PROJECT →** primary button.
- Nav: Montserrat 500, 13px uppercase, Espresso. Active page: 2px `sienna` underline. Hover: underline slides in from left (200ms).
- **Mobile (<1024px):** logo-left, menu button right (Espresso icon, 44×44 tap target). Menu = full-height panel, **Natural Cream background, Espresso links**, large Playfair links, CTA at bottom. Focus trap, `Esc` closes, body scroll lock, `aria-expanded`/`aria-controls`.
- Skip-to-content link (Espresso on Stone).

### SECTION 02 — HERO

**Layout (desktop, 80–90vh):** a two-zone composition inspired by the reference.

- **Left (≈5/12 cols):** solid `cream` text area, left-aligned, vertically centred.
- **Right (≈7/12 cols):** editorial image composition — one large portrait/landscape main image (hero-main) with a stacked column of three small supporting images (mannequin, fabrics, sewing) like the reference collage. Thin Cream gutters (8–12px) between images. **No text over images.**
- Mobile: text first, then hero-main full width, then a 3-up swipeable/stacked strip of the supporting images.

Copy (exact):

- Eyebrow: `APPAREL DEVELOPMENT & PRODUCTION`
- H1 (3 lines, Playfair, Espresso): `WE DESIGN.` / `WE DEVELOP.` / `WE PRODUCE.`
- Supporting headline (H2-level, Playfair italic, Sienna ≥24px or Espresso): `FROM THE FIRST IDEA TO THE FINISHED COLLECTION.`
- Body (two paragraphs):
  1. "From trend research and creative direction to fabric development, sampling and production, we bring every stage of apparel development together."
  2. "Based in the UAE and connected to international production capabilities, we work with fashion brands and retailers to turn ideas into commercially ready apparel."
- Primary CTA: `EXPLORE OUR SERVICES →` → `/services`
- Secondary CTA: `START A PROJECT →` → `/contact`

Also render the short tagline "Ideas into products. Creativity into production." beneath the H1 in Playfair italic, Espresso.

### SECTION 03 — INTRODUCTION

Two-column editorial layout on `cream`, 1px `stone` vertical divider (like reference).

- Left: H2 `MORE THAN A MANUFACTURING PARTNER.`
- Right copy:
  - "Great fashion products begin long before production."
  - "They start with an understanding of the market, a strong creative direction, the right materials and careful product development."
  - "LJ-Collective works alongside fashion brands and retailers to bring these elements together — from the first concept and collection planning to sampling, manufacturing and delivery."
- Highlight statement (Sienna, large Playfair/Montserrat caps): `ONE PARTNER. EVERY STAGE OF DEVELOPMENT.`
- Image: `intro-studio.webp` placed alongside (below text on mobile).

### SECTION 04 — OUR DEVELOPMENT PROCESS

- H2: `FROM CONCEPT TO COLLECTION.`
- Lead: "A connected approach to developing fashion products, bringing creative thinking and technical execution together."
- **Desktop:** six-column horizontal timeline. A 1px `stone` line runs across with 6 nodes (Sienna dot). Each column: image (4:5) → numeral `01` (Playfair, Sienna) → title (Montserrat 600, uppercase, Espresso) → description. At 1024–1279px use 3×2 grid with the connecting line per row.
- **Mobile:** vertical timeline — left vertical Stone line with Sienna nodes; each stage stacks image, numeral, title, text.
- Corporate icon set (thin line icons: pencil, dress form, fabric stack, ruler/tech pack, scissors/needle, check/box) may sit beside numerals — Espresso stroke only.
- CTA: `DISCOVER OUR SERVICES →` → `/services`

Content (`src/content/process.ts`):

| # | Title | Description |
|---|---|---|
| 01 | TREND RESEARCH & CREATIVE DIRECTION | Seasonal research, colour direction, market insights, mood boards and collection concepts. |
| 02 | DESIGN & COLLECTION DEVELOPMENT | Garment design, silhouettes, artwork, prints and range development. |
| 03 | FABRICS & MATERIALS | Fabric research, knitted and woven materials, yarn selection, trims and accessories. |
| 04 | TECHNICAL PRODUCT DEVELOPMENT | Tech packs, specifications, pattern development, measurements, construction and costing. |
| 05 | SAMPLING & APPROVAL | Proto samples, fit samples, material approvals, revisions and pre-production samples. |
| 06 | MANUFACTURING & PRODUCTION | Production planning, manufacturing coordination, quality management and delivery coordination. |

### SECTION 05 — PRODUCT CATEGORIES

- H2: `APPAREL FOR EVERY EXPRESSION OF FASHION.`
- Lead: "From everyday essentials to contemporary collections, we support the development and production of apparel across a diverse range of fashion categories."
- **Nine categories**, consistent editorial grid: desktop 3×3, tablet 2 columns, mobile 1 column (2 columns ≥480px if copy fits). Each card = image (4:5) with Cream gap → below: numeral, category name (Montserrat 600 uppercase), short description. **No text over images, no heavy card borders** (hairline `stone` top rule only).
- Hover: image scales 1.03 over 500ms inside overflow-hidden frame; title underline slides in; small arrow appears. Cards are **not** product listings — they link to `/product-categories#<slug>` (anchor sections) only.
- CTA: `EXPLORE ALL PRODUCT CATEGORIES →` → `/product-categories`
- Do **not** turn individual garments into main categories.

Content (`src/content/categories.ts`):

| # | Name | Slug | Description |
|---|---|---|---|
| 01 | KNITWEAR & JERSEY | `knitwear-jersey` | T-shirts, polos, sweatshirts, hoodies and joggers. |
| 02 | ACTIVEWEAR & PERFORMANCE | `activewear-performance` | Leggings, sports bras, training tops and performance apparel. |
| 03 | LOUNGEWEAR & SLEEPWEAR | `loungewear-sleepwear` | Lounge sets, pyjamas, robes and coordinated comfortwear. |
| 04 | OUTERWEAR | `outerwear` | Jackets, coats, padded jackets and overshirts. |
| 05 | DENIM & WOVEN APPAREL | `denim-woven` | Jeans, trousers, woven shirts and shorts. |
| 06 | DRESSES & CONTEMPORARY FASHION | `dresses-contemporary` | Dresses, skirts, tops and fashion co-ordinates. |
| 07 | SWIMWEAR & RESORTWEAR | `swimwear-resortwear` | Swimwear, cover-ups and beachwear. |
| 08 | INTIMATES & SHAPEWEAR | `intimates-shapewear` | Underwear, briefs, camisoles and shapewear. |
| 09 | BABYWEAR & KIDSWEAR | `babywear-kidswear` | Rompers, bodysuits, baby sets and children's apparel. |

### SECTION 06 — WHY LJ-Collective

- H2: `CREATIVE THINKING. TECHNICAL EXPERTISE. PRODUCTION EXECUTION.`
- Four editorial columns (desktop), 2×2 (tablet), stacked (mobile). Each: thin top rule in `stone`, numeral in Sienna, title, text; optional small image above. Background may alternate to `stone` at ~30% tint **only if** tint is built from the palette (e.g., `rgba(201,184,165,0.25)` over cream).

| # | Title | Text |
|---|---|---|
| 01 | END-TO-END DEVELOPMENT | A connected approach from initial concept and collection planning to approved products and production. |
| 02 | FABRIC & PRODUCT EXPERTISE | Material selection and technical understanding to develop products that meet design, quality and commercial requirements. |
| 03 | FLEXIBLE PRODUCTION NETWORK | Access to appropriate international production capabilities based on the product, quantity and project requirements. |
| 04 | COMMERCIAL APPROACH | Balancing design intent, product quality, costing and production feasibility. |

No claims about certifications, owned factories, clients or capacity.

### SECTION 07 — ABOUT LJ-Collective

- Layout: large tall editorial photo on one side (≈6/12), text on the other. Image alternates side from Section 03 (image right here if Section 03 image was right).
- H2: `BUILT AROUND THE WAY FASHION IS DEVELOPED.`
- Copy:
  1. "LJ-Collective brings together creative development, technical expertise and production coordination to support fashion brands and retailers."
  2. "We believe successful apparel development requires more than manufacturing. It requires an understanding of the product, the materials, the market and the processes needed to bring a collection to life."
  3. "Working from the UAE and connected to international production capabilities, we collaborate with clients throughout the development journey."
- CTA: `DISCOVER LJ-Collective →` → `/about`

### SECTION 08 — FINAL CALL TO ACTION

- Large Natural Cream band, generous padding, centred or left-aligned strong typography, 1px `stone` rule above and below.
- H2: `HAVE A COLLECTION IN MIND?`
- Body: "Whether you are developing a new fashion label, expanding an existing collection or looking for a production partner, let's start with your brief."
- Primary: `START A PROJECT →` → `/contact`
- Secondary text link: `GET IN TOUCH →` → `/contact`

### SECTION 09 — FOOTER

- Background `stone` (#C9B8A5). **All text Espresso.** Links underline on hover.
- Columns: Logo + statement ("Fashion development and production, from the first idea to the finished collection.") | Footer navigation (Home, Fashion & Retail, Our Services, Product Categories, About Us, Contact) | `FASHION DEVELOPMENT & PRODUCTION` focus label | Contact details (from env; render only if set) | Social icons (render only if URL set).
- Bottom bar: `© 2026 LJ-Collective. All Rights Reserved.`
- Do not use any white text, including icons.

---

## 9. INNER PAGES (this phase: functional, clean, reusing homepage components)

| Page | Composition |
|---|---|
| `/fashion-retail` | Page hero (H1 + intro), audience list (the 6 target audiences from Section 0), process summary, CTA band |
| `/services` | Page hero, the six process stages expanded (alternating image/text rows), CTA band |
| `/product-categories` | Page hero, nine categories as anchored sections (image + name + description), CTA band |
| `/about` | Section 07 content expanded using only supplied copy, CTA band |
| `/contact` | Enquiry form + verified contact details (Section 13) |

Use `TODO(content)` markers where extra copy is needed. Never fabricate facts.

---

## 10. INTERACTIONS & ANIMATION

- Smooth page transitions (opacity fade 250ms via a template/transition wrapper).
- Gentle on-scroll image reveal (Section 7.4).
- Category image hover scale (Section 8, 05).
- Nav link underline slide; CTA arrow +4px.
- Sticky header background/border transition.
- **Forbidden:** parallax-heavy effects, rotating/marquee text, flashing, auto-playing carousels, cursor effects.
- Honour `@media (prefers-reduced-motion: reduce)` — disable all transforms.

---

## 11. RESPONSIVE BEHAVIOUR

| Area | Desktop ≥1024 | Tablet 640–1023 | Mobile <640 |
|---|---|---|---|
| Header | Full nav + CTA | Hamburger | Hamburger, compact logo |
| Hero | Text + collage side by side | Text above, collage below (2-col) | Stacked; headline on 3 readable lines |
| Intro | 2 columns | 2 columns reduced / stacked | Stacked |
| Process | 6-column horizontal (3×2 at 1024–1279) | 2 columns | Vertical timeline |
| Categories | 3×3 | 2 columns | 1 col (2 col ≥480px) |
| Why | 4 columns | 2×2 | Stacked |
| About | Split | Split/stacked | Stacked |
| Footer | 4 columns | 2 columns | Stacked |

- **No horizontal overflow** at any width (test 320px → 1920px).
- Tap targets ≥ 44px. Body text never below 16px on mobile.
- All text stays Espresso and legible at every breakpoint.

---

## 12. ACCESSIBILITY (WCAG 2.2 AA target)

- Semantic landmarks: `header`, `nav`, `main`, `footer`, ordered headings (one H1 per page).
- Keyboard operable menu, visible focus states, skip link.
- Contrast per Section 2.3; Sienna small text prohibited.
- Alt text per manifest; decorative icons `aria-hidden`.
- Form: labels bound to inputs, error messages with `aria-describedby`, `aria-live` status.
- Reduced motion respected.

---

## 13. CONTACT PAGE & FORM (B2B enquiry — functional, no invented data)

Contact details are **environment-driven** and only shown when provided:

```
# .env.example
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_CONTACT_ADDRESS=
NEXT_PUBLIC_SOCIAL_LINKEDIN=
NEXT_PUBLIC_SOCIAL_INSTAGRAM=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

- If a value is empty, the UI **omits** that item — never shows placeholders like "+971 xx xxx".
- **Form fields:** Full name*, Company / brand*, Business email*, Phone (optional), Type of business (select: Established brand / Emerging label / Retailer / Online fashion business / Private label / Distributor or brand owner), Product categories of interest (multi-select from the nine categories), Estimated stage (Concept / Design in progress / Tech pack ready / Ready for sampling / Ready for production), Project brief* (textarea), Consent checkbox*.
- Optional file upload for brief/tech pack is **out of scope** unless requested (note in report).
- Validation with zod (client and server). Honeypot field + simple rate limit on `/api/contact`. Success and error states displayed inline.
- The route handler sends the email via Resend using the env vars; if env vars are missing it returns a clear 503 and the form shows "Enquiries are temporarily unavailable" — it must **never** silently pretend to send.
- Form label and input text: Espresso. Input background `cream`, 1px `espresso` border (focus: 2px `sienna`). Placeholder colour Espresso at 60% opacity (never white/grey-white).

---

## 14. SEO & PERFORMANCE

- Per-page `metadata` (title, description, OpenGraph, canonical). Homepage title suggestion: `LJ-Collective | Fashion Development & Apparel Production Partner (UAE)`.
- JSON-LD `Organization` (only with verified data) and `WebSite`.
- `sitemap.ts`, `robots.ts`.
- Lighthouse targets (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95. LCP < 2.5s, CLS < 0.05.
- Fonts via `next/font` with `display: swap`, subsets `latin`.

---

## 15. CONTENT RULES (compliance)

- Use the copy in this document verbatim; do not paraphrase headings.
- No unsupported claims (clients, certifications, owned factories, capacity, years in business, stats).
- No corporate uniforms / workwear / promotional merchandise / institutional supply anywhere (including alt text, metadata and code comments).
- Maintain consistent spelling (British: "colour", "pyjamas", "organisations").

---

## 16. QUALITY CONTROL & AUTOMATED CHECKS

`scripts/check-no-white.mjs` — scan `src/**/*.{ts,tsx,css,mdx}` and fail on:

`#fff`, `#ffffff`, `#FFF`, `rgb(255, 255, 255)`, `rgba(255,255,255`, `text-white`, `bg-white`, `border-white`, `white`(as CSS colour keyword), and `prefers-color-scheme: dark`.

Also fail on the words `uniform`, `workwear`, `corporate & institutional`, `merchandise`, `institutional` in `src/`.

`package.json` scripts: `"check": "node scripts/check-no-white.mjs && next lint && tsc --noEmit"`; run in CI before build.

### Final acceptance checklist

- [ ] Sections 01–09 appear in the exact order
- [ ] No "Corporate & Institutional" content anywhere; nav matches Section 4
- [ ] No white text/colour anywhere; every text colour explicitly set
- [ ] Logo matches `/reference/logo-reference.png`
- [ ] Playfair Display headings, Montserrat body/nav/buttons
- [ ] All 9 categories and all 6 process stages present with images
- [ ] No image reused across sections; all have alt text; all WebP, optimised
- [ ] All links and CTAs resolve (no 404, no `#` placeholders)
- [ ] Contact form works end-to-end or shows an honest unavailable state
- [ ] No placeholder or invented contact details; no unsupported claims
- [ ] Mobile menu works (open/close/focus/esc); no horizontal overflow 320–1920px
- [ ] Reduced-motion honoured; Lighthouse targets met
- [ ] `npm run check` passes

---

## 17. DEFINITION OF DONE

When a fashion brand lands on the homepage they should immediately understand: *"These people can help us research, design, develop, source materials, sample and produce our fashion collections."* — delivered through a **corporate, structured, premium** B2B presentation, not a retail store.

---

## 18. BUILD PHASES (feed to the agent one at a time)

1. **Scaffold:** Next.js + TS + Tailwind, fonts, tokens, `globals.css`, no-white script, `.cursor/rules`, folder structure.
2. **Brand & UI kit:** Logo (SVG), Button, Eyebrow, SectionHeading, Reveal, Divider.
3. **Layout:** Header (sticky + mobile menu), Footer, skip link.
4. **Content files:** `site.ts`, `process.ts`, `categories.ts`, `why.ts`, image manifest.
5. **Images:** source, optimise, place per Section 6.3 (report any gaps).
6. **Homepage sections 02 → 08** (one commit per section), then composite `page.tsx`.
7. **Inner pages** + Contact form + API route.
8. **Polish:** animations, a11y pass, SEO, Lighthouse, QC checklist, final report listing every `TODO(...)`.

After each phase: run `npm run check`, run the dev server, and verify at 360px, 768px, 1280px.

---

## 19. CURSOR RULES FILE

Save as `.cursor/rules/lee-jaguar.mdc`:

```md
---
description: LJ-Collective B2B website rules
alwaysApply: true
---
- Source of truth is SPEC.md. Follow it exactly; ask before deviating.
- This is a B2B corporate marketing site, NOT e-commerce. Never add cart, checkout, prices, accounts.
- Never create or mention "Corporate & Institutional", uniforms, workwear or promotional merchandise.
- Colours: only espresso #352720, sienna #A9573D, mineral #7895A3, stone #C9B8A5, cream #F2ECE3.
- NEVER use white or #FFFFFF for text or any colour. Every text element must set an explicit dark colour (default espresso). No dark mode.
- Never place text directly on photographs; use a cream/stone panel.
- Fonts: Playfair Display (headings), Montserrat (body/nav 500/buttons 600) via next/font.
- Buttons: square (max 2px radius), Espresso text always, never text on a sienna fill.
- All copy lives in src/content/*.ts. Do not invent copy, contact details, clients, certifications, capacity or statistics. Use TODO(content) markers instead.
- Images: next/image, WebP, local files in public/images, descriptive alt, never reuse an image across sections, never hotlink.
- Animations subtle only; respect prefers-reduced-motion.
- TypeScript strict, no `any`. Components small, typed, accessible (semantic HTML, focus states).
- Run `npm run check` before declaring any task complete.
- Build in phases per SPEC.md Section 18; do not jump ahead.
```

---

## 20. KICKOFF PROMPT (paste into Cursor Agent)

```text
Read @SPEC.md fully, plus @reference/design-reference.jpeg and @reference/logo-reference.png.
We are building the LJ-Collective B2B corporate website (not e-commerce).
Start with PHASE 1 only (Scaffold) from SPEC.md Section 18. Create the Next.js + TypeScript + Tailwind project in the current directory, configure Playfair Display and Montserrat with next/font, implement the design tokens exactly as in Section 2 (no white in the theme), add the no-white check script, and create the .cursor/rules file from Section 19.
Do not build any sections yet. When finished, list what you created, run `npm run check`, and wait for my approval before Phase 2.
Constraints: omit all "Corporate & Institutional" content from the reference image, never use white text, and never invent contact details or claims.
```
