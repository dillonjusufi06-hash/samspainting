# SEO Audit — Sam's Painting (`samspaintingnj.com`)

**Audit date:** June 2026  
**Scope:** Full read of 39 source files across `app/`, `components/`, `lib/`, `public/`, and config.  
**Live URL:** https://www.samspaintingnj.com/

---

## Executive Scores

| Category | Score | Summary |
|----------|-------|---------|
| **Technical SEO** | 6.5/10 | Sitemap, robots, OG tags, JSON-LD exist — but missing canonicals, `metadataBase`, FAQ in DOM, and confirmed hero/OG image in repo |
| **On-Page SEO** | 7/10 | Unique service titles/H1s, good keyword vocabulary, no more `#1 Top Rated` boilerplate |
| **Local SEO** | 6/10 | Franklin Lakes NAP is consistent in UI; schema is solid; no city pages; gallery towns conflict with service area |
| **Structured Data** | 7.5/10 | LocalBusiness + PaintingContractor + Service schema — strong foundation; rating claim is risky |
| **Content / E-E-A-T** | 5.5/10 | Static testimonials, competitor hotlinked images, thin service pages, no About page |
| **Conversion SEO** | 8/10 | Phone + form everywhere, 24hr hours, persistent CTAs |

**Overall: 6.5/10** — Good skeleton for an 8-page contractor site. Biggest gaps are assets, trust proof, and crawlability of FAQ content.

---

## 1. Site Architecture & Indexable URLs

**8 indexable routes:**

| URL | Type | In sitemap |
|-----|------|------------|
| `/` | Homepage | ✅ priority 1.0 |
| `/contact` | Contact | ✅ 0.9 |
| `/service/interior-painting` | SSG | ✅ 0.8 |
| `/service/exterior-painting` | SSG | ✅ 0.8 |
| `/service/commercial-painting` | SSG | ✅ 0.8 |
| `/service/deck-and-fence-staining` | SSG | ✅ 0.8 |
| `/service/epoxy-floor-coatings` | SSG | ✅ 0.8 |
| `/service/cabinet-painting` | SSG | ✅ 0.8 |

**Missing pages that hurt local SEO:**

- No `/about` (E-E-A-T gap — no faces, story, or crew narrative)
- No city/area landing pages (Franklin Lakes, Ridgewood, Saddle River, etc.)
- No dedicated reviews page
- No `not-found.tsx` custom 404
- No privacy/terms

**Internal linking:**

- Header: Services, Gallery, Testimonials, Contact + IG + phone
- Footer: all 6 services + section anchors + contact
- Service pages **do not cross-link** to other services
- All phone CTAs use `tel:` — none link to `/contact` or the form section
- Gallery projects are not linked to relevant service pages

---

## 2. Metadata (Title, Description, OG, Twitter)

### Per-page titles (all unique ✅)

| Page | Title |
|------|-------|
| Home | Professional House Painters in North Jersey \| Sam's Painting |
| Contact | Request a Free Painting Estimate \| Sam's Painting NJ |
| Interior | Interior Painting Services \| North Jersey Home Painters |
| Exterior | Exterior House Painting & Prep Experts \| North Jersey |
| Commercial | Commercial Painting Contractors \| North Jersey Offices |
| Deck & Fence | Deck & Fence Staining Services \| Bergen & Morris County |
| Epoxy | Garage Epoxy Floor Coatings \| North Jersey Installation |
| Cabinet | Kitchen Cabinet Painting & Refinishing \| North Jersey |

Service titles **omit "Sam's Painting"** — not fatal, but branded titles often CTR better in local SERPs.

### What's working

- Unique descriptions per page via `lib/seo.ts` → `serviceSeo` + `buildPageMetadata()`
- Open Graph: title, description, url, siteName, locale, type, image
- Twitter: `summary_large_image` with same image
- Favicon wired via `public/favicon.svg`

### Gaps

- **No `metadataBase`** in root layout
- **No canonical URLs** (`alternates.canonical`)
- **No per-service OG images** — every page shares `/banner.jpg`
- **No `robots` meta** for staging/preview environments
- Layout fallback title differs from homepage title (homepage overrides correctly)

---

## 3. NAP & Geographic Identity

### Canonical NAP (`lib/contact.ts`)

```
Sam's Painting
574 Commerce St #2023, Franklin Lakes, NJ 07417
(201) 232-5978
Open 24 hours
NJ HIC #13VH03695800
Instagram: @samspainting
```

### Consistency check

| Location | Franklin Lakes |
|----------|----------------|
| Footer address | ✅ |
| Contact page | ✅ |
| JSON-LD schema | ✅ |
| Homepage hero | ✅ |
| Footer tagline | ✅ |
| Meta descriptions | ✅ |

**No LLC, email, or Facebook** — intentional.

### Remaining geo friction

1. **`serviceArea.towns` still lists Wyckoff** in `lib/seo.ts` but Wyckoff never appears in visible copy
2. **Gallery includes Rumson** (Monmouth County) — outside stated Bergen/Morris/Essex focus
3. **Schema `areaServed`** = 3 counties only; towns like Saddle River, Alpine appear in gallery but not in structured data
4. **Google Maps link** in testimonials goes to address search, not a dedicated GBP review URL

---

## 4. Heading Structure

### Homepage

- **H1:** Professional House Painters **in North Jersey** (gradient suffix ✅)
- H2: Our Painting Services / Our Past Painting Work / What Our Clients Say / FAQ / Contact Sam

### Service pages

- **H1:** `{Service headline}` **in North Jersey**
- H2: Our {Service} Services / Testimonials / FAQ / Contact Sam
- H3: Subservice card titles, PaintCTA

### Contact

- **H1:** Contact Us (no location suffix)
- H2: Get in Touch / Contact Sam

**No duplicate H1s. No old `#1 Top Rated` template.**

---

## 5. Structured Data (JSON-LD)

### Sitewide — `localBusinessJsonLd()` in every page via `layout.tsx`

- `@type`: `["LocalBusiness", "PaintingContractor"]`
- `aggregateRating`: `{ ratingValue: "5.0", reviewCount: "821" }`
- `openingHoursSpecification`: Mon–Sun 00:00–23:59 (array format ✅)
- `areaServed`: Bergen, Morris, Essex counties (array of objects ✅)
- `hasOfferCatalog`: 6 main services with URLs
- `sameAs`: Instagram only

### Per service page — `serviceJsonLd(slug)`

- `@type`: Service
- `provider` → links to `/#localbusiness`
- `offers` → free estimates at `/contact`

### What's good

- Dual `@type` LocalBusiness + PaintingContractor ✅
- Service pages link back to business entity via `@id` ✅
- `priceRange: "$$"` ✅

### What's missing or risky

| Issue | Risk |
|-------|------|
| **`aggregateRating` 821 reviews** | Must match verifiable GBP data. Site shows 9 static testimonials |
| **No `FAQPage` schema** | 42 FAQs on site, zero FAQ structured data |
| **No `BreadcrumbList`** | Missed navigation signal for service pages |
| **No individual `Review` objects** | Only aggregate rating |
| **Service schema images** | Point to competitor hotlinked URLs |

---

## 6. Images

### Referenced but missing from `public/`

**`/banner.jpg`** is used for:

- Homepage hero
- Contact hero
- Open Graph image (all pages)
- Twitter card image
- LocalBusiness schema `image`

Repo scan found **no `banner.jpg` in `public/`** (only `favicon.svg`, `robots.txt`, brand SVGs). If not deployed, heroes and social previews break in production.

### External / hotlinked images

**Service cards & heroes (`lib/services.ts`):**

| Service | Image host |
|---------|------------|
| Interior | lakeshore-painting.org |
| Exterior | solispainting.com |
| Commercial | pizzazzpainting.com |
| Deck & Fence | elkhartlandscape.com |
| Epoxy | certapro.com |
| Cabinet | i.imgur.com |

**Gallery (`components/home-page.tsx`):** 15 images, all `i.imgur.com`

### SEO impact

- Assets not owned — hosts can block or change URLs
- Core Web Vitals suffer on third-party CDNs
- Alt text is thin (project title only, no location in alt)
- `next.config.ts` whitelists 10+ external domains
- Unused: `angi.svg`, `yelp.svg` in `public/brands/`

### Alt text patterns

- Heroes: service title or `"Sam's Painting"` — OK
- Gallery: `proj.title` — OK, could be richer
- Subservices: parent image reused 6× with different alts — duplicate images
- Brand logos: `brand.name` — good

---

## 7. Content Quality

### Strengths

- Service-specific vocabulary (prep, trim, epoxy, stain, HIC license)
- Unique meta + H1 per service
- 12 homepage FAQs + 5 per service = 42 total Q&As
- Testimonials filtered by service on service pages
- Concrete gallery project names

### Weaknesses

**Templated / duplicate blocks:**

- `PaintCTA` — identical on every page
- `ContactFormSection` — identical everywhere
- Subservices intro — same skeleton all 6 pages
- Service card descriptions are one-liners

**Trust / E-E-A-T:**

- 9 testimonials with generic names — reads synthetic
- "Verified Homeowner" with no link to Google profile
- "5.0 Star Rated" on hero with no citation
- No About page, no crew narrative
- `WhySamSection` component exists but is **never rendered**

**Dead / stale code:**

- `scripts/download-images.mjs` — never successfully ran
- `README.md` — AI Studio boilerplate
- Wyckoff in `serviceArea.towns` only (not in visible copy)

---

## 8. Technical SEO & Crawlability

### robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://www.samspaintingnj.com/sitemap.xml
```

Works around apostrophe-in-path bug that broke `app/robots.ts`.

### sitemap.xml (`app/sitemap.xml/route.ts`)

- Dynamic, 8 URLs, priorities set
- `lastmod` always = build time
- No image sitemap entries

### Client vs server rendering

| Component | Mode | SEO note |
|-----------|------|----------|
| `app/page.tsx` | Server | Metadata ✅ |
| `home-page.tsx` | Full client | Content SSR'd; heavy JS |
| FAQ accordions | Client | **Answers hidden when collapsed** — crawl risk |
| Testimonials carousel | Client | Text in DOM ✅ |
| Fillout form | Client embed | External content |

### Other notes

- `lang="en"` on `<html>` ✅
- No redirects, no trailing-slash config
- Project folder `sam's-painting` breaks Next.js metadata file conventions

---

## 9. Conversion & CTA Map

| Element | Where | Action |
|---------|-------|--------|
| Header phone | All pages | `tel:2012325978` |
| Header IG | All pages | Instagram |
| Hero phone CTA | Home + services | `tel:` |
| PaintCTA bands | Home ×3, services ×2 | `tel:` |
| Float button | Global | Phone + Fillout popup |
| Contact form | Home, contact, all services | Fillout embed |
| Google reviews link | Testimonials | Maps search URL |

**Gap:** No CTA links to form section or `/contact` from PaintCTA.

---

## 10. FAQ Inventory (42 total)

**Homepage (12):** cost, free estimates, interior/exterior, timeline, furniture, paint brands, protection, licensed/insured, cabinets, commercial, cleanup, guarantee

**Per service (5 each × 6 = 30):** pricing, scope, prep, timeline, protection — localized to service type

Geo language uses "North Jersey" — consistent with positioning.

**Missing:** FAQPage JSON-LD, visible answers in HTML when collapsed.

---

## 11. Live Site vs Codebase

Live site at https://www.samspaintingnj.com/ still shows the **old build**:

- `#1 Top-Rated Painting Company`
- Mixed Wyckoff / Franklin Lakes address
- No schema, no unique service metadata
- No form on homepage

**Improvements in this repo are not live until deployed.**

---

## Priority Fix List

### 🔴 Critical (before deploy)

1. Add `/public/banner.jpg` (or update all references to an existing asset)
2. Verify `aggregateRating.reviewCount` matches real Google review count (currently `821`)
3. Download gallery + service images to `/public/images/` — stop hotlinking
4. Deploy updated codebase

### 🟠 High impact

5. FAQ answers always in DOM + `FAQPage` JSON-LD
6. Add `metadataBase` + canonical URLs
7. Per-service OG images
8. Remove Rumson from gallery or expand service area story
9. Link GBP reviews with direct Google review URL

### 🟡 Medium impact

10. About section/page
11. City landing pages (`/areas/franklin-lakes`, etc.)
12. Cross-link services on each service page
13. Richer gallery alt text (town + service)
14. Add `"Sam's Painting"` to service meta titles
15. Wire or delete `WhySamSection`, `angi.svg`, `yelp.svg`

### 🟢 Nice to have

16. BreadcrumbList schema + visible breadcrumbs
17. Image sitemap
18. Custom 404 with phone CTA
19. Rename project folder to `sams-painting` (no apostrophe)
20. PaintCTA → link to form section

---

## What's Working (Don't Break)

- Unique service H1s with gradient "in North Jersey"
- Franklin Lakes NAP consistent across footer, contact, schema
- Phone + form + IG only (no email/Facebook clutter)
- 24-hour hours in schema and contact page
- Service schema linked to LocalBusiness entity
- Sitemap + robots working
- Fillout form on every money page
- License number in multiple trust positions
- No statewide / `#1 Top Rated` boilerplate

---

## Files Audited

**App:** `layout.tsx`, `page.tsx`, `globals.css`, `contact/page.tsx`, `service/[slug]/page.tsx`, `sitemap.xml/route.ts`

**Components:** `home-page.tsx`, `site-header.tsx`, `site-footer.tsx`, `page-hero.tsx`, `local-business-schema.tsx`, `service-schema.tsx`, `faq-section.tsx`, `paint-cta.tsx`, `contact-float-button.tsx`, `contact-form.tsx`, `contact-form-section.tsx`, `testimonials-section.tsx`, `service-card.tsx`, `subservices-section.tsx`, `why-sam-section.tsx`, `site-logo.tsx`

**Lib:** `seo.ts`, `contact.ts`, `services.ts`, `service-faqs.ts`, `testimonials.ts`

**Config:** `next.config.ts`, `package.json`, `tsconfig.json`, `.eslintrc.json`, `eslint.config.mjs`, `postcss.config.mjs`

**Public:** `robots.txt`, `favicon.svg`, `brands/*.svg`
