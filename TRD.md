# TECHNICAL REQUIREMENTS DOCUMENT (TRD)
## Premium Landing Page Template Platform
### Version 1.0 — MVP
**Status:** Draft | **Last Updated:** April 2026 | **Authors:** Founder 1 (Platform Lead), Founder 2 (Templates Lead)

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│  Next.js App Router · React 18 · TypeScript · Tailwind CSS  │
│  Zustand Store · Framer Motion · Shadcn/ui                  │
└───────────────┬─────────────────────────┬───────────────────┘
                │ HTTPS                   │ HTTPS
┌───────────────▼──────────────┐ ┌────────▼──────────────────┐
│     Next.js API Routes       │ │     MongoDB                 │
│  /api/export                 │ │  Document Database            │
│  /api/customizations         │ │  NextAuth (email + OAuth)     │
│  /api/generate-copy          │ │  Local file storage           │
└───────────────┬──────────────┘ └───────────────────────────┘
                │ HTTPS
┌───────────────▼──────────────┐
│     OpenRouter API           │
│  openai/gpt-oss-20b:free     │
│  /v1/messages                │
└──────────────────────────────┘
```

**Hosting:** Vercel (Next.js platform, global edge CDN)
**Database:** MongoDB (via Compass / Atlas)
**Auth:** NextAuth.js (Google + GitHub OAuth, JWT sessions)
**File Storage:** Local / S3 (configurable)
**AI:** OpenRouter API (OSS models)

---

## 2. TECH STACK — COMPLETE SPECIFICATION

### 2.1 Frontend

| Concern | Technology | Version | Rationale |
|---------|-----------|---------|-----------|
| Framework | Next.js (App Router) | 14.2.x | SSR for SEO, API routes, image optimization |
| Language | TypeScript | 5.x (strict) | Type safety across settings system + export |
| Styling | Tailwind CSS | 3.x | Fast iteration, design tokens, purge for perf |
| CSS Tokens | CSS Custom Properties | Native | Settings panel drives all template styling |
| UI Components | Shadcn/ui + Radix | Latest | Headless, accessible, no style conflicts |
| State | Zustand + Immer | 4.x | Simple global state, immer for immutable updates |
| Platform Animations | Framer Motion | 11.x | Page transitions, panel slide-ins, gallery filters |
| Icons | Lucide React | Latest | Consistent, tree-shakeable icon set |
| Forms | React Hook Form + Zod | 7.x / 3.x | Type-safe form validation throughout |

### 2.2 Template-specific Libraries

| Concern | Technology | Version | Rationale |
|---------|-----------|---------|-----------|
| 3D Rendering | React Three Fiber | 8.x | Declarative Three.js in React |
| 3D Helpers | @react-three/drei | 9.x | Camera, controls, helpers |
| 3D Post-processing | @react-three/postprocessing | Latest | Bloom, depth of field effects |
| Three.js Core | three | 0.165.x | Underlying 3D engine |
| Scroll Animations | GSAP + ScrollTrigger | 3.x | Industry-standard scroll-based animation |
| 2D Animations | Lottie React | 2.x | Lightweight JSON-based vector animation |
| Fonts (templates) | Google Fonts (next/font) | — | Zero layout shift font loading |

### 2.3 Backend / Infrastructure

| Concern | Technology | Version | Rationale |
|---------|-----------|---------|-----------|
| Auth | Supabase Auth | 2.x | Email + Google + GitHub OAuth, JWT |
| Database | Supabase PostgreSQL | Latest | Managed Postgres, realtime, RLS |
| File Storage | Supabase Storage | Latest | User logo/image uploads, CDN delivery |
| ZIP Generation | JSZip | 3.x | Client-safe ZIP construction |
| File Save | file-saver | 2.x | Browser-native file download trigger |
| AI | OpenRouter HTTP API | Latest | Provider-agnostic OSS model routing |
| Image Processing | Sharp | 0.33.x | Resize and optimize uploaded images |
| File Upload UX | React Dropzone | 14.x | Drag-and-drop upload in settings panel |

### 2.4 Dev Tooling

| Tool | Purpose |
|------|---------|
| ESLint + eslint-config-next | Code quality, Next.js-specific rules |
| Prettier + prettier-plugin-tailwindcss | Code formatting, Tailwind class sort |
| TypeScript strict mode | Maximum type safety |
| Vercel CLI | Preview deployments per branch |
| Supabase CLI | Local DB dev, migration management |

---

## 3. REQUIREMENTS.TXT

The following `requirements.txt` must be generated at project root on initialization:

```
# ============================================================
# PLATFORM REQUIREMENTS — requirements.txt
# Premium Landing Page Template Platform
# Generated: [timestamp]
# ============================================================

# ── Core Framework ──────────────────────────────────────────
next@14.2.x
react@18.x
react-dom@18.x
typescript@5.x

# ── Styling ─────────────────────────────────────────────────
tailwindcss@3.x
postcss@8.x
autoprefixer@10.x
@tailwindcss/typography
clsx
tailwind-merge

# ── UI Components ───────────────────────────────────────────
@radix-ui/react-dialog
@radix-ui/react-tabs
@radix-ui/react-slider
@radix-ui/react-select
@radix-ui/react-switch
@radix-ui/react-tooltip
@radix-ui/react-popover
lucide-react
shadcn-ui

# ── State Management ────────────────────────────────────────
zustand@4.x
immer

# ── Animation (Platform UI) ─────────────────────────────────
framer-motion@11.x

# ── Animation (Templates) ───────────────────────────────────
gsap@3.x
@gsap/react
lottie-react@2.x

# ── 3D (Templates) ──────────────────────────────────────────
three@0.165.x
@react-three/fiber@8.x
@react-three/drei@9.x
@react-three/postprocessing

# ── Auth + Database ─────────────────────────────────────────
@supabase/supabase-js@2.x
@supabase/ssr

# ── File Export ─────────────────────────────────────────────
jszip@3.x
file-saver@2.x

# ── AI / OpenRouter Integration ─────────────────────────────
# (No SDK required; uses HTTP fetch API)

# ── Fonts ───────────────────────────────────────────────────
geist@1.x

# ── Forms + Validation ──────────────────────────────────────
react-hook-form@7.x
zod@3.x
@hookform/resolvers

# ── Image Handling ──────────────────────────────────────────
sharp@0.33.x
react-dropzone@14.x

# ── Dev Tools ───────────────────────────────────────────────
eslint@8.x
eslint-config-next
prettier@3.x
prettier-plugin-tailwindcss
@types/react
@types/node
@types/three
@types/file-saver
```

---

## 4. CSS TOKEN SYSTEM — TECHNICAL SPECIFICATION

This is the foundation of the entire customization system. Every template MUST consume only CSS custom properties — never hardcoded color or font values.

### 4.1 Token Map

```css
/* tokens.css — generated per export with user values baked in */
:root {
  /* Brand Colors */
  --color-primary:        #3b82f6;   /* User-controlled */
  --color-secondary:      #1e40af;   /* User-controlled */
  --color-accent:         #06b6d4;   /* User-controlled */
  --color-background:     #0a0a0f;   /* User-controlled */
  --color-text:           #f1f5f9;   /* User-controlled */
  --color-text-muted:     rgba(241, 245, 249, 0.6);

  /* Typography */
  --font-heading:         'Inter', sans-serif;  /* User-controlled */
  --font-body:            'Inter', sans-serif;  /* User-controlled */
  --font-mono:            'JetBrains Mono', monospace;
  --font-weight-heading:  700;                  /* User-controlled */

  /* Derived tokens (computed from primary — not user-controlled) */
  --color-primary-10:     color-mix(in srgb, var(--color-primary) 10%, transparent);
  --color-primary-20:     color-mix(in srgb, var(--color-primary) 20%, transparent);
  --color-primary-glow:   color-mix(in srgb, var(--color-primary) 40%, transparent);

  /* Spacing scale (fixed — not customizable) */
  --space-xs:   0.25rem;
  --space-sm:   0.5rem;
  --space-md:   1rem;
  --space-lg:   1.5rem;
  --space-xl:   2rem;
  --space-2xl:  3rem;
  --space-3xl:  5rem;

  /* Border radius (fixed) */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;
}
```

### 4.2 Real-Time Injection Architecture

```typescript
// lib/store/editorStore.ts

interface EditorState {
  settings: TemplateSettings;
  history: TemplateSettings[];      // for undo
  future: TemplateSettings[];       // for redo
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
}

interface EditorActions {
  updateBrand: (key: keyof BrandSettings, value: string) => void;
  updateTypography: (key: keyof TypographySettings, value: string | number) => void;
  updateContent: (path: string, value: string) => void;
  updateMedia: (key: keyof MediaSettings, url: string) => void;
  undo: () => void;
  redo: () => void;
  reset: (templateDefaults: TemplateSettings) => void;
  loadSaved: (settings: TemplateSettings) => void;
}

// On every settings mutation:
// 1. Push current state to history (max 20 items)
// 2. Update state
// 3. Call injectCSSTokens(iframeRef, newSettings) synchronously
// 4. Schedule autosave debounce (2000ms)
```

### 4.3 Preview Iframe Architecture

The template preview runs inside a sandboxed `<iframe>`. CSS injection targets the iframe's `:root`:

```typescript
// lib/export/injectTokens.ts

export function injectCSSTokens(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  settings: TemplateSettings
): void {
  const iframe = iframeRef.current;
  if (!iframe?.contentDocument) return;

  const root = iframe.contentDocument.documentElement;
  const tokens = buildCSSTokens(settings);

  // Batch all token updates in a single style mutation
  requestAnimationFrame(() => {
    Object.entries(tokens).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  });
}

// Google Font injection on font change
export function injectGoogleFont(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  fontName: string
): void {
  const iframe = iframeRef.current;
  if (!iframe?.contentDocument) return;

  const existing = iframe.contentDocument.getElementById('dynamic-font');
  if (existing) existing.remove();

  const link = iframe.contentDocument.createElement('link');
  link.id = 'dynamic-font';
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700;800;900&display=swap`;
  iframe.contentDocument.head.appendChild(link);
}
```

---

## 5. DATABASE SCHEMA

### 5.1 Full Schema with Indexes and RLS

```sql
-- ── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Profiles (extends auth.users) ───────────────────────────
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  username      text unique,
  avatar_url    text,
  created_at    timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles viewable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Templates registry ──────────────────────────────────────
create table public.templates (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  category      text not null,
  tags          text[] default '{}',
  thumbnail_url text,
  style         text check (style in ('dark','light','both')) default 'dark',
  has_threejs   boolean default false,
  has_gsap      boolean default false,
  has_lottie    boolean default false,
  is_featured   boolean default false,
  sort_order    int default 0,
  created_at    timestamptz not null default now()
);
create index templates_category_idx on public.templates(category);
create index templates_featured_idx on public.templates(is_featured);

-- ── User customizations ─────────────────────────────────────
create table public.customizations (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  template_id   uuid references public.templates(id) on delete cascade not null,
  settings      jsonb not null default '{}',
  updated_at    timestamptz not null default now(),
  unique(user_id, template_id)
);
create index customizations_user_idx on public.customizations(user_id);
alter table public.customizations enable row level security;
create policy "Users manage own customizations"
  on public.customizations for all
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;
create trigger update_customizations_updated_at
  before update on public.customizations
  for each row execute function public.update_updated_at();

-- ── Favorites ───────────────────────────────────────────────
create table public.favorites (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  template_id   uuid references public.templates(id) on delete cascade not null,
  created_at    timestamptz not null default now(),
  unique(user_id, template_id)
);
create index favorites_user_idx on public.favorites(user_id);
alter table public.favorites enable row level security;
create policy "Users manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id);

-- ── Exports analytics ───────────────────────────────────────
create table public.exports (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  template_id   uuid references public.templates(id) not null,
  exported_at   timestamptz not null default now()
);
create index exports_template_idx on public.exports(template_id);
create index exports_user_idx on public.exports(user_id);
```

---

## 6. API SPECIFICATION

### 6.1 POST /api/customizations — Save Settings

**Request:**
```typescript
{
  templateId: string;   // UUID
  settings: TemplateSettings;
}
```
**Response:** `{ success: true, updatedAt: string }`
**Auth:** Required (Bearer JWT)
**Behavior:** Upsert on (user_id, template_id) constraint. Validates settings shape with Zod.

---

### 6.2 GET /api/customizations?templateId=[id] — Load Settings

**Response:** `{ settings: TemplateSettings | null }`
**Auth:** Required
**Behavior:** Returns null if no saved customization exists for this user + template.

---

### 6.3 POST /api/export — Generate ZIP

**Request:**
```typescript
{
  templateId: string;
  settings: TemplateSettings;
}
```
**Response:** Binary stream — `application/zip`
**Headers:** `Content-Disposition: attachment; filename="[slug]-[timestamp].zip"`
**Auth:** Required
**Behavior:**
1. Validate request with Zod
2. Read template source files from `/templates/[slug]/` on server
3. Build `tokens.css` from settings
4. Inject content strings into template placeholders
5. Generate `README.md`
6. Bundle with JSZip and stream
7. Log to `exports` table asynchronously

**Error responses:**
- 400: Invalid templateId or settings validation failure
- 401: Unauthenticated
- 500: ZIP generation failure

---

### 6.4 POST /api/generate-copy — OpenRouter AI Copy

**Request:**
```typescript
{
  templateId: string;
  templateCategory: string;
  templateStyle: string;        // "dark" | "light" | "both"
  productDescription: string;   // max 300 chars
  targetAudience: string;       // max 200 chars
  tone: 'bold' | 'professional' | 'warm' | 'playful';
  field?: string;               // optional — regenerate single field only
}
```
**Response:**
```typescript
{
  headline: string;             // max 70 chars
  subheadline: string;          // max 140 chars
  ctaText: string;              // max 25 chars
  features: Array<{
    title: string;              // max 40 chars
    description: string;        // max 100 chars
  }>;                           // exactly 3 items
  footerText: string;           // max 80 chars
}
```
**Auth:** Required
**Timeout:** 30 seconds
**Model:** openai/gpt-oss-20b:free (configurable)
**System prompt strategy:** Template context (name, category, visual personality) + tone instructions + strict JSON-only response instruction + field character limits enforced in prompt

---

## 7. EXPORT SYSTEM — TECHNICAL DETAIL

### 7.1 Template Source Structure

Each template folder must follow this structure:

```
templates/
└── obsidian/
    ├── template.config.ts          # TemplateConfig export
    ├── defaultSettings.ts          # Default TemplateSettings values
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── HeroSection.tsx
    │   │   ├── FeaturesSection.tsx
    │   │   ├── PricingSection.tsx
    │   │   └── Footer.tsx
    │   ├── styles/
    │   │   └── tokens.css          # TOKEN PLACEHOLDER — replaced on export
    │   └── public/
    │       └── (placeholder images)
    ├── package.json                # Template's own deps
    └── README.template.md          # README template with {{TEMPLATE_NAME}} etc.
```

### 7.2 Content Placeholder Convention

All placeholder strings in template source files follow this format:

```
{{HEADLINE}}
{{SUBHEADLINE}}
{{CTA_TEXT}}
{{CTA_URL}}
{{FEATURE_1_TITLE}}
{{FEATURE_1_DESC}}
{{FEATURE_2_TITLE}}
{{FEATURE_2_DESC}}
{{FEATURE_3_TITLE}}
{{FEATURE_3_DESC}}
{{FOOTER_TEXT}}
{{LOGO_TEXT}}
```

The export system performs a single-pass string replacement across all `.tsx`, `.ts`, `.css`, and `.md` files.

### 7.3 ZIP Build Process

```typescript
// lib/export/buildZip.ts
export async function buildTemplateZip(
  templateSlug: string,
  settings: TemplateSettings
): Promise<Buffer> {
  const zip = new JSZip();
  const templateDir = path.join(process.cwd(), 'templates', templateSlug, 'src');

  // 1. Walk all source files recursively
  const files = await walkDir(templateDir);

  for (const filePath of files) {
    let content = await fs.readFile(filePath, 'utf-8');

    // 2. Replace content placeholders
    content = replacePlaceholders(content, settings.content);

    // 3. Add to ZIP preserving directory structure
    const relativePath = path.relative(templateDir, filePath);
    zip.file(relativePath, content);
  }

  // 4. Generate and inject tokens.css
  const cssTokens = buildCSSTokenString(settings);
  zip.file('styles/tokens.css', cssTokens);

  // 5. Generate README
  const readme = generateReadme(templateSlug, settings);
  zip.file('README.md', readme);

  // 6. Generate as Buffer
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
```

---

## 8. TEMPLATE TECHNICAL REQUIREMENTS

Every template must satisfy these technical requirements before it ships:

### 8.1 Performance
- [ ] Lighthouse Performance score ≥ 90 on desktop
- [ ] Lighthouse Performance score ≥ 75 on mobile
- [ ] Three.js scenes wrapped in React.lazy + Suspense with a fallback
- [ ] GSAP ScrollTrigger initialized only after DOM mount (useLayoutEffect)
- [ ] All images use `next/image` with proper width/height
- [ ] Lottie animations lazy loaded with dynamic import

### 8.2 Code Quality
- [ ] Zero TypeScript errors in strict mode
- [ ] Zero ESLint errors
- [ ] Zero hardcoded color values — all use `var(--token)`
- [ ] All components have explicit TypeScript prop interfaces
- [ ] No `console.log` statements in production code
- [ ] `npm run build` passes on clean install from ZIP

### 8.3 Accessibility
- [ ] All images have meaningful `alt` text
- [ ] All interactive elements are keyboard focusable
- [ ] `prefers-reduced-motion` respected — GSAP and Three.js animations disabled when set
- [ ] Color contrast ratio ≥ 4.5:1 on all text elements
- [ ] Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>` used correctly

### 8.4 Responsiveness
- [ ] Fully responsive from 375px to 2560px
- [ ] Three.js canvas resizes correctly on window resize
- [ ] Mobile navigation is functional (hamburger menu or equivalent)
- [ ] Typography scales appropriately across breakpoints

### 8.5 Animation Behavior
- [ ] Three.js renders at capped 60fps (use `useFrame` delta time)
- [ ] GSAP ScrollTrigger instances killed on component unmount
- [ ] No animation jank on initial page load (all critical CSS inlined)
- [ ] Low-power device detection: `navigator.hardwareConcurrency < 4` disables Three.js, shows static fallback

---

## 9. SECURITY REQUIREMENTS

### 9.1 Authentication
- All Supabase API calls use server-side client (not anon key on client for mutations)
- JWT validation on every API route via `supabase.auth.getUser()`
- Session refresh handled by `@supabase/ssr` middleware

### 9.2 Input Validation
- All API route inputs validated with Zod before any processing
- Settings JSONB stored only after schema validation
- File uploads: MIME type verified server-side; only jpg, png, webp accepted
- File uploads: max 5MB enforced on server route, not just client

### 9.3 Data Access
- Row Level Security enabled on `customizations`, `favorites` tables
- No client-side query ever exposes another user's data
- Template source files read from server filesystem only — never exposed via API
- Export API does not return raw template source — only the built ZIP

### 9.4 Rate Limiting
- `/api/generate-copy`: 10 requests per user per hour (enforce via Supabase edge function or middleware)
- `/api/export`: 20 exports per user per hour

---

## 10. ENVIRONMENT VARIABLES

```bash
# .env.local — required for local dev
# .env.production — set in Vercel dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server-side only, never expose to client

# OpenRouter
OPENROUTER_API_KEY=                 # server-side only

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=Velora

# Optional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

---

## 11. DEPLOYMENT ARCHITECTURE

### 11.1 Vercel Configuration (`vercel.json`)

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "functions": {
    "app/api/export/route.ts": {
      "maxDuration": 30
    },
    "app/api/generate-copy/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### 11.2 Branch Strategy

```
main          → production (auto-deploy on merge)
develop       → staging (Vercel preview URL)
feature/*     → individual Vercel preview deployments
```

### 11.3 CI/CD Checks (GitHub Actions)

On every PR to `develop`:
1. `npm run type-check` — TypeScript strict compilation
2. `npm run lint` — ESLint zero-error check
3. `npm run build` — full Next.js build must succeed
4. Vercel preview deployment triggered

---

## 12. PERFORMANCE BUDGETS

| Metric | Target | Tool |
|--------|--------|------|
| Homepage LCP | < 2.5s (4G) | Lighthouse |
| Homepage TTI | < 3.5s | Lighthouse |
| Settings panel → preview update | < 100ms | Manual measurement |
| Export ZIP generation | < 5s | Manual measurement |
| Three.js frame rate | ≥ 60fps (desktop) | Three.js stats |
| Lottie file size | < 200KB per animation | Lottie checks |
| Total JS bundle (platform, no templates) | < 250KB gzipped | Bundle analyzer |

---

## 13. MONITORING & OBSERVABILITY

**Analytics:** Plausible Analytics (privacy-first, no cookies, GDPR compliant)
- Track: template views, customization sessions, exports per template, AI copy generation usage

**Error Monitoring:** Vercel's built-in error logging for API routes

**Performance:** Vercel Analytics for Core Web Vitals per page

**Export Success Rate:** Log to `exports` table with success/failure status — alert if failure rate > 1%

---

## 14. SCALABILITY CONSIDERATIONS

### When to upgrade infrastructure:

| Trigger | Action |
|---------|--------|
| > 10,000 MAU | Upgrade Supabase to Pro ($25/month) |
| > 100GB storage | Enable Supabase Storage CDN offloading |
| Export queue > 5s avg | Move export to background job (Vercel Queue or Upstash) |
| > 500 exports/day | Cache ZIP builds server-side by (templateId + settings hash) |
| AI API costs > $200/month | Add rate limiting, prefer free/open models, cache common prompts |

### Caching Strategy (V2)
- Template registry: cached at edge with 1-hour TTL (rarely changes)
- Template thumbnails: served via Vercel CDN, immutable cache headers
- ZIP exports: cache by SHA256 hash of (templateId + JSON.stringify(settings)) — skip rebuild if same settings re-exported within 24h

---

## 15. IMPLEMENTATION ORDER

Execute in strict sequence to avoid rework:

| Phase | Week | Task |
|-------|------|------|
| Foundation | 1–2 | Repo setup, directory structure, TypeScript config, Tailwind config, Shadcn install |
| Token System | 2–3 | CSS token schema, Zustand store, iframe injection engine |
| Auth + DB | 3–4 | Supabase setup, schema migrations, auth flow (login, signup, OAuth) |
| Settings Panel | 4–6 | All 4 tabs, color picker, font selector, image upload, autosave |
| First 3 Templates | 5–9 | Obsidian, Aurora, Stark — full build with animations |
| Export System | 7–9 | ZIP generation, placeholder injection, README generation |
| OpenRouter API | 8–10 | Copy generation endpoint, AI tab in settings panel |
| Dashboard | 9–10 | User dashboard, saved customizations, favorites |
| Remaining Templates | 10–18 | Luminary, Prism, Carbon, Bloom, Apex, Kinetic, Stellar |
| Homepage | 16–19 | Gallery, filter, animated template cards, stats |
| QA & Polish | 20–22 | Lighthouse audits, mobile testing, bug fixes, copy review |
| Launch Prep | 23–24 | Product Hunt assets, demo video, waitlist email, staging deploy |
