# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Premium Landing Page Template Platform
### Version 1.0 — MVP
**Status:** Draft | **Last Updated:** April 2026 | **Authors:** Founder 1, Founder 2

---

## 1. EXECUTIVE SUMMARY

We are building a premium, curated landing page template platform — a destination where developers, designers, founders, and marketers discover stunning Next.js landing page templates, customize them through a clean settings panel, and export production-ready code. Every template is designed to the standard of a world-class design studio. The platform is fully free at launch to maximize distribution and build community trust.

---

## 2. PROBLEM STATEMENT

### 2.1 Current Landscape Failures

| Platform | Core Problem |
|----------|-------------|
| ThemeForest / Template sites | Thousands of inconsistent, bloated, outdated templates. Zero design curation. Flea market experience. |
| Framer / Webflow templates | Platform lock-in. Cannot own or export clean code. Creative ceiling imposed by the builder. |
| Free HTML templates | Visually poor. No motion, no 3D, no modern design patterns. Last updated 2018. |
| Building from scratch | Takes 3–6 weeks for a senior developer. Overkill for a landing page. |

### 2.2 User Pain Points

- Founders spend days searching for a template that doesn't look generic
- Developers waste time rebuilding the same landing page patterns repeatedly
- Non-technical users are locked out of premium design because they can't code
- Agencies overpay for design work that could start from a strong template base

---

## 3. PRODUCT VISION

**"The world's most visually impressive, production-ready landing page templates — built in Next.js, customizable in seconds, free to export."**

The platform is not a website builder. It is not a no-code tool. It is a premium template gallery with a smart customization layer and clean code export. The design quality is the product. The code quality is the promise.

---

## 4. TARGET USERS

### Primary Users

**4.1 Developers & Fullstack Engineers**
- Need: A polished starting point for client sites or side projects
- Behavior: Will edit exported code extensively
- Value from platform: Save 2–3 weeks of landing page work; start with something genuinely impressive
- Success metric: Exports code and deploys within 1 hour

**4.2 Non-Technical Founders**
- Need: A landing page for their startup — today
- Behavior: Uses settings panel fully; hands off ZIP to a developer
- Value from platform: Goes from idea to shareable page without hiring a designer
- Success metric: Customizes and exports without needing help

**4.3 Designers & Creative Agencies**
- Need: Fast concept presentation; premium starting point for client pitches
- Behavior: Browses for visual quality; may modify exported code heavily
- Value from platform: Dramatically cuts concept-to-presentation time
- Success metric: Uses template as a pitch artifact within same day

**4.4 Freelancers**
- Need: Fast delivery of quality sites for clients
- Behavior: Maintains multiple active customizations across templates
- Value from platform: Delivers faster, charges more, scales their workload
- Success metric: Reuses platform for >3 client projects

**4.5 Indie Makers & Creators**
- Need: A beautiful landing page for their product, tool, or newsletter
- Behavior: Strong social sharing tendency; active in communities (Product Hunt, Twitter, IH)
- Value from platform: Organic growth engine — they share what they love
- Success metric: Shares their published site publicly and credits the platform

---

## 5. GOALS & SUCCESS METRICS

### MVP Goals (Month 1–6)
| Metric | Target |
|--------|--------|
| Registered users | 1,000 |
| Template exports per week | 50+ |
| Template count | 10 |
| Page load time (homepage) | < 2.5s |
| Settings panel to export time | < 5 minutes (avg) |
| Net Promoter Score | > 50 |

### V2 Goals (Month 7–12)
| Metric | Target |
|--------|--------|
| Registered users | 5,000 |
| Monthly exports | 500+ |
| Monthly recurring revenue | $1,000–$3,000 |
| Template count | 20+ |

---

## 6. PRODUCT SCOPE

### 6.1 In Scope — MVP

**Core Gallery**
- Homepage with template gallery grid (auto-fit, responsive)
- Category filter: SaaS, Agency, Portfolio, Startup, App, Creator, AI, E-commerce, Wellness, Coming Soon
- Template card with thumbnail, category badge, style tag (Dark/Light)
- Hover state: animated preview or looping thumbnail video
- Full-page template preview — scrollable, desktop and mobile toggle

**Customization Editor**
- Settings panel (30% width sidebar) with 4 tabs: Brand, Typography, Content, Media
- Real-time preview — every change reflects instantly in the preview frame
- Brand tab: 4 color pickers (primary, secondary, accent, background), logo upload or text, light/dark mode toggle (where supported)
- Typography tab: heading font selector (12 curated Google Fonts), body font, size scale, heading weight
- Content tab: headline, subheadline, CTA label + URL, feature fields (up to 6), footer text
- Media tab: hero image upload, product screenshot upload
- AI tab: OpenRouter-powered copy generation with product type, audience, and tone inputs
- Undo/redo (keyboard + UI)
- Reset to defaults
- Autosave (2-second debounce, logged-in users only)
- Mobile preview toggle in editor

**Export System**
- ZIP download containing complete Next.js project
- Settings baked into `tokens.css` and `tailwind.config.ts`
- Content placeholders replaced with user inputs
- README.md with install and deploy instructions included
- Export event logged for analytics

**Authentication & Dashboard**
- Email/password signup and login
- Google OAuth and GitHub OAuth
- User dashboard: all saved customizations, favorite templates
- Guest mode: can browse and edit; prompted to sign up before export

**Templates (MVP — 10)**
Obsidian, Aurora, Stark, Luminary, Prism, Carbon, Bloom, Apex, Kinetic, Stellar
(See visual specifications in implementation prompt document)

### 6.2 Out of Scope — MVP

- Drag-and-drop visual editor
- One-click deploy to Vercel/Netlify
- Custom domain connection or site hosting
- Community marketplace / user-submitted templates
- Template ratings and reviews
- Dark/light toggle at preview level (V2)
- Shareable preview links (V2)
- Monetization / payments (V2)
- Team / agency accounts (V3)
- AI image generation (V3)
- Mobile app (V3)

---

## 7. FEATURE REQUIREMENTS

### 7.1 Template Gallery

**FR-01:** The gallery page shall display all templates in a responsive auto-fit grid minimum card width 340px.

**FR-02:** Template cards shall display: thumbnail image, template name, category badge, style tag (Dark / Light / Both).

**FR-03:** Hovering a template card shall trigger an animated preview — either CSS animation or a looping 3-second video clip.

**FR-04:** The gallery shall include a category filter bar. Selecting a category filters the grid with a smooth Framer Motion layout animation.

**FR-05:** Clicking a template card shall open the full-page preview of that template.

**FR-06:** The full preview shall be rendered at full resolution and be scrollable, showing all template sections.

**FR-07:** Two persistent CTAs shall be visible during full preview: "Customize" and "Export" (export only available after auth for logged-in users).

### 7.2 Settings Panel

**FR-08:** The customization view shall render the settings panel (30%) alongside the template preview (70%) side by side.

**FR-09:** All changes in the settings panel shall reflect in the preview within 100ms — no page reload, no loading state.

**FR-10:** The settings panel shall have four tabs: Brand, Typography, Content, Media.

**FR-11:** Color pickers shall include a hex input field, a color wheel, and 6 preset palettes curated for that specific template.

**FR-12:** Font selectors shall show a live preview of the font name rendered in that font face.

**FR-13:** Image uploads (logo, hero, product) shall be accepted as JPG, PNG, or WebP, max 5MB, auto-resized on upload.

**FR-14:** The Content tab shall show character count beneath each text input with a maximum character limit enforced.

**FR-15:** Autosave shall trigger 2 seconds after the last change. A small "Saved" indicator shall confirm success.

**FR-16:** Undo shall support up to 20 steps. Redo shall restore undone steps. Both shall be accessible via Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z.

### 7.3 AI Copy Generation (OpenRouter)

**FR-17:** The AI tab shall present three inputs: product description (free text), target audience (free text), and tone (select: Bold & Direct / Professional & Clean / Warm & Friendly / Playful & Creative).

**FR-18:** Clicking "Generate" shall call the OpenRouter API and return: headline, subheadline, CTA text, 3 feature titles + descriptions, footer text.

**FR-19:** Generated copy shall auto-fill the Content tab fields. The preview shall update instantly.

**FR-20:** Each generated field shall have an individual "regenerate" icon allowing single-field refresh without regenerating all content.

**FR-21:** AI attribution shall appear subtly in the AI tab: "Powered by OpenRouter."

### 7.4 Export

**FR-22:** Clicking "Export" shall generate and download a ZIP file within 5 seconds.

**FR-23:** The ZIP shall contain a complete, working Next.js project that passes `npm run build` without modification.

**FR-24:** The ZIP shall include a `tokens.css` file with all brand settings baked in as CSS custom properties.

**FR-25:** All content placeholders in the template shall be replaced with the user's settings in the exported code.

**FR-26:** The ZIP shall include a `README.md` with installation steps, local dev instructions, and Vercel deploy instructions.

**FR-27:** Export shall be gated behind authentication — guest users see the export button but are prompted to sign up.

### 7.5 Authentication & Dashboard

**FR-28:** Users may sign up via email/password or OAuth (Google, GitHub).

**FR-29:** The dashboard shall list all templates the user has saved customizations for, with the last saved date.

**FR-30:** Each dashboard item shall include a "Continue Editing" button that restores the saved settings state exactly.

**FR-31:** Users may favorite templates from the gallery or preview page. Favorites appear in the dashboard.

---

## 8. USER FLOWS

### 8.1 New Visitor → Export (No Account)
1. Lands on homepage → sees gallery immediately
2. Browses, hovers template cards → sees animated previews
3. Clicks template → full preview opens
4. Clicks "Customize" → settings panel opens (guest mode)
5. Makes changes → sees real-time updates
6. Clicks "Export" → prompted to sign up
7. Signs up → export triggers immediately, ZIP downloads
8. Receives README → deploys to Vercel

### 8.2 Returning User → Saved Session
1. Logs in → lands on dashboard
2. Sees saved customization → clicks "Continue Editing"
3. Settings panel restores exactly where they left off
4. Makes adjustments → autosave triggers
5. Downloads new export

### 8.3 AI Copy Flow
1. User opens Customize view
2. Navigates to AI tab
3. Fills: "AI-powered HR tool for enterprise teams", "HR Directors at companies 500+", Tone: Professional & Clean
4. Clicks Generate
5. OpenRouter model returns copy in < 3 seconds
6. Content tab fills automatically, preview updates
7. User tweaks one headline manually, regenerates subheadline only

---

## 9. NON-FUNCTIONAL REQUIREMENTS

**Performance**
- Homepage Largest Contentful Paint (LCP): < 2.5s on 4G
- Settings panel change → preview update: < 100ms
- Export ZIP generation: < 5s
- Three.js scenes must lazy load — never block initial page render

**Accessibility**
- WCAG 2.1 AA compliance on platform UI
- All interactive elements keyboard navigable
- All images have meaningful alt text
- Color contrast ratio minimum 4.5:1

**Responsiveness**
- Platform UI responsive from 375px to 2560px
- Template previews show desktop view by default; mobile toggle available

**Security**
- MongoDB access controlled via NextAuth session validation
- All API routes validate input with Zod before processing
- User-uploaded files scanned for MIME type before storage
- No user sees another user's customization data

**Reliability**
- Platform uptime target: 99.5%
- Export failure rate: < 1%
- Autosave failure must surface a visible error to user

---

## 10. DESIGN PRINCIPLES

1. **The template is the hero.** The platform UI steps back. Never compete visually with the templates.
2. **Speed is a feature.** Real-time preview. Instant export. No loading screens where avoidable.
3. **Quality over quantity.** 5 exceptional templates beat 15 mediocre ones.
4. **Code you're proud of.** The exported ZIP is a product in itself. Clean, commented, deploy-ready.
5. **Non-technical users are first-class.** If a founder can't use the settings panel unaided, it's broken.

---

## 11. MONETIZATION ROADMAP

### Phase 1 — Launch (MVP, Free)
Everything free. No payment system. Goal: users and trust.

### Phase 2 — Pro Tier (V2, Month 7–12)
- Free tier: 5 core templates, 1 saved customization per template
- Pro ($9–15/month or $79/year): all templates, unlimited customizations, early access to new drops, dark/light toggle, shareable preview links

### Phase 3 — Agency & Marketplace (V3, Month 13–18)
- Agency plan ($49/month): white-label exports, team seats, client project management
- Template marketplace: vetted third-party templates, revenue share
- Affiliate links inside exported READMEs (Vercel, MongoDB Atlas)

---

## 12. RISKS

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Template quality slip under time pressure | High | High | Ship 5 perfect templates, not 10 rushed ones |
| Settings panel complexity underestimated | High | High | Prototype settings injection in week 1 |
| 3D performance on mobile | Medium | Medium | Fallback to static on low-power devices |
| Market entrant from Framer/Webflow | Medium | Medium | Build community moat from day 1 on social |
| Scope creep delays launch | Medium | High | Hard MVP cutoff list — nothing moves from V2 to V1 |

---

## 13. LAUNCH PLAN

**Pre-launch (Month 5)**
- Coming soon page with email waitlist live
- Build in public on X/Twitter — weekly design screenshots
- Post template previews on Dribbble and Behance
- Target: 200+ waitlist signups before launch day

**Launch Day (Month 6)**
- Product Hunt submission (Tuesday–Thursday)
- Hacker News "Show HN" post
- Posts in r/webdev, r/SideProject, r/InternetIsBeautiful
- Email full waitlist with personal note
- Demo video posted to Twitter, LinkedIn, YouTube Shorts

**Post-launch (Month 6+)**
- New template drops every 3–4 weeks (announced like product launches)
- SEO: individual template pages optimized for "Next.js [niche] landing page template"
- Dev.to / Hashnode technical articles driving inbound
- Open-source 2 templates on GitHub for community traction

---

## 14. APPENDIX — TEMPLATE DIRECTORY

| # | Name | Category | Style | 3D | GSAP | Lottie |
|---|------|----------|-------|----|------|--------|
| 1 | Obsidian | SaaS | Dark | ✓ | ✓ | — |
| 2 | Aurora | AI Product | Light | — | — | ✓ |
| 3 | Stark | Agency | Light | — | ✓ | — |
| 4 | Luminary | Portfolio | Dark | — | ✓ | ✓ |
| 5 | Prism | Startup | Light | ✓ | ✓ | — |
| 6 | Carbon | Dev Tool | Dark | — | ✓ | — |
| 7 | Bloom | Creator | Light | — | — | ✓ |
| 8 | Apex | B2B SaaS | Light | — | ✓ | — |
| 9 | Kinetic | Mobile App | Dark | ✓ | ✓ | — |
| 10 | Stellar | AI Startup | Dark | ✓ | ✓ | — |
