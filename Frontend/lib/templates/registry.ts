import type { TemplateConfig } from "@/types/template";
import type { TemplateSettings } from "@/types/settings";

/* ═══════════════════════════════════════════════════════════
   Default settings factory — reusable base for all templates
   ═══════════════════════════════════════════════════════════ */
function makeDefaults(overrides: Partial<{
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  logoText: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: TemplateSettings["typography"]["headingWeight"];
  headline: string;
  subheadline: string;
}>): TemplateSettings {
  return {
    brand: {
      primaryColor: overrides.primary ?? "#3b82f6",
      secondaryColor: overrides.secondary ?? "#1e40af",
      accentColor: overrides.accent ?? "#06b6d4",
      backgroundColor: overrides.bg ?? "#0a0a0f",
      textColor: overrides.text ?? "#f1f5f9",
      logoUrl: null,
      logoText: overrides.logoText ?? "Framify",
    },
    typography: {
      headingFont: overrides.headingFont ?? "Inter",
      bodyFont: overrides.bodyFont ?? "Inter",
      headingWeight: overrides.headingWeight ?? 700,
      baseFontSize: "md",
    },
    content: {
      headline: overrides.headline ?? "Build faster with premium templates",
      subheadline: overrides.subheadline ?? "Customize and export production-ready Next.js code.",
      ctaText: "Get Started",
      ctaUrl: "#",
      features: [
        { title: "Real-time Editing", description: "Preview all updates instantly." },
        { title: "Token-driven Styling", description: "Design system powered by CSS variables." },
        { title: "One-click Export", description: "Download ready-to-deploy Next.js templates." },
      ],
      footerText: "Built with Framify",
    },
    media: {
      heroImageUrl: null,
      productImageUrl: null,
      logoImageUrl: null,
    },
  };
}

/* ═══════════════════════════════════════════════════════════
   Template Configs — All 10 Templates
   ═══════════════════════════════════════════════════════════ */

export const templateConfigs: TemplateConfig[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    slug: "obsidian",
    category: "saas",
    tags: ["dark", "glassmorphism", "3D"],
    style: "dark",
    hasThreeJS: true,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#3b82f6",
      secondary: "#1f2937",
      accent: "#60a5fa",
      bg: "#0a0a0f",
      text: "#f8fafc",
      logoText: "Obsidian",
      headingWeight: 800,
      headline: "Command your growth.",
      subheadline: "A premium SaaS launch template with 3D elements and glassmorphism design.",
    }),
    thumbnail: "/thumbnails/obsidian.jpg",
    previewUrl: "/templates/obsidian",
  },
  {
    id: "aurora",
    name: "Aurora",
    slug: "aurora",
    category: "ai-tool",
    tags: ["light", "gradient", "AI"],
    style: "light",
    hasThreeJS: false,
    hasGSAP: false,
    hasLottie: true,
    defaultSettings: makeDefaults({
      primary: "#7c3aed",
      secondary: "#4f46e5",
      accent: "#a78bfa",
      bg: "#fafafa",
      text: "#1e293b",
      logoText: "Aurora",
      headingFont: "Plus Jakarta Sans",
      headingWeight: 700,
      headline: "Intelligence, amplified.",
      subheadline: "AI-powered tools that transform how you work, think, and create.",
    }),
    thumbnail: "/thumbnails/aurora.jpg",
    previewUrl: "/templates/aurora",
  },
  {
    id: "stark",
    name: "Stark",
    slug: "stark",
    category: "agency",
    tags: ["light", "minimal", "editorial"],
    style: "light",
    hasThreeJS: false,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#ef4444",
      secondary: "#1f2937",
      accent: "#ef4444",
      bg: "#ffffff",
      text: "#111827",
      logoText: "Stark",
      headingFont: "Playfair Display",
      headingWeight: 900,
      headline: "We craft digital experiences.",
      subheadline: "A design agency that believes in the power of simplicity.",
    }),
    thumbnail: "/thumbnails/stark.jpg",
    previewUrl: "/templates/stark",
  },
  {
    id: "luminary",
    name: "Luminary",
    slug: "luminary",
    category: "portfolio",
    tags: ["dark", "editorial", "serif"],
    style: "dark",
    hasThreeJS: false,
    hasGSAP: true,
    hasLottie: true,
    defaultSettings: makeDefaults({
      primary: "#f59e0b",
      secondary: "#92400e",
      accent: "#fbbf24",
      bg: "#111111",
      text: "#fafafa",
      logoText: "Luminary",
      headingFont: "Cormorant Garamond",
      headingWeight: 700,
      headline: "Selected works.",
      subheadline: "A portfolio showcasing craft, vision, and attention to detail.",
    }),
    thumbnail: "/thumbnails/luminary.jpg",
    previewUrl: "/templates/luminary",
  },
  {
    id: "prism",
    name: "Prism",
    slug: "prism",
    category: "startup",
    tags: ["light", "3D", "gradient"],
    style: "light",
    hasThreeJS: true,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      bg: "#ffffff",
      text: "#1e293b",
      logoText: "Prism",
      headingFont: "Sora",
      headingWeight: 800,
      headline: "Launch with confidence.",
      subheadline: "The startup template with bold gradients and 3D crystal effects.",
    }),
    thumbnail: "/thumbnails/prism.jpg",
    previewUrl: "/templates/prism",
  },
  {
    id: "carbon",
    name: "Carbon",
    slug: "carbon",
    category: "saas",
    tags: ["dark", "terminal", "developer"],
    style: "dark",
    hasThreeJS: false,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#22c55e",
      secondary: "#60a5fa",
      accent: "#22c55e",
      bg: "#0d1117",
      text: "#e6edf3",
      logoText: "Carbon",
      headingFont: "JetBrains Mono",
      bodyFont: "JetBrains Mono",
      headingWeight: 700,
      headline: "Build. Ship. Scale.",
      subheadline: "Developer tools that make your CLI feel like home.",
    }),
    thumbnail: "/thumbnails/carbon.jpg",
    previewUrl: "/templates/carbon",
  },
  {
    id: "bloom",
    name: "Bloom",
    slug: "bloom",
    category: "creator",
    tags: ["light", "soft", "friendly"],
    style: "light",
    hasThreeJS: false,
    hasGSAP: false,
    hasLottie: true,
    defaultSettings: makeDefaults({
      primary: "#f43f5e",
      secondary: "#e879f9",
      accent: "#fb923c",
      bg: "#fffdf7",
      text: "#1c1917",
      logoText: "Bloom",
      headingFont: "Bricolage Grotesque",
      headingWeight: 700,
      headline: "Share your story.",
      subheadline: "A warm, inviting template for creators and personal brands.",
    }),
    thumbnail: "/thumbnails/bloom.jpg",
    previewUrl: "/templates/bloom",
  },
  {
    id: "apex",
    name: "Apex",
    slug: "apex",
    category: "saas",
    tags: ["light", "enterprise", "professional"],
    style: "light",
    hasThreeJS: false,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#3b82f6",
      bg: "#ffffff",
      text: "#1e293b",
      logoText: "Apex",
      headingWeight: 700,
      headline: "Enterprise-grade SaaS.",
      subheadline: "The professional B2B template trusted by industry leaders.",
    }),
    thumbnail: "/thumbnails/apex.jpg",
    previewUrl: "/templates/apex",
  },
  {
    id: "kinetic",
    name: "Kinetic",
    slug: "kinetic",
    category: "app",
    tags: ["dark", "3D", "mobile"],
    style: "dark",
    hasThreeJS: true,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#38bdf8",
      secondary: "#0ea5e9",
      accent: "#7dd3fc",
      bg: "#020617",
      text: "#f0f9ff",
      logoText: "Kinetic",
      headingFont: "Outfit",
      headingWeight: 800,
      headline: "Your app, elevated.",
      subheadline: "A motion-first template for mobile apps that demand attention.",
    }),
    thumbnail: "/thumbnails/kinetic.jpg",
    previewUrl: "/templates/kinetic",
  },
  {
    id: "stellar",
    name: "Stellar",
    slug: "stellar",
    category: "ai-tool",
    tags: ["dark", "space", "3D"],
    style: "dark",
    hasThreeJS: true,
    hasGSAP: true,
    hasLottie: false,
    defaultSettings: makeDefaults({
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      bg: "#02040a",
      text: "#f0fdfa",
      logoText: "Stellar",
      headingFont: "Space Grotesk",
      headingWeight: 700,
      headline: "Beyond the horizon.",
      subheadline: "An AI startup template inspired by the vastness of space.",
    }),
    thumbnail: "/thumbnails/stellar.jpg",
    previewUrl: "/templates/stellar",
  },
];

/* ═══════════════════════════════════════════════════════════
   Lookup helpers
   ═══════════════════════════════════════════════════════════ */

export function getTemplateBySlug(slug: string): TemplateConfig | undefined {
  return templateConfigs.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  if (category === "all") return templateConfigs;
  return templateConfigs.filter((t) => t.category === category);
}

/** Unique categories from all registered templates */
export function getCategories(): string[] {
  const cats = new Set(templateConfigs.map((t) => t.category));
  return ["all", ...Array.from(cats)];
}
