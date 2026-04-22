import type { TemplateConfig } from "@/types/template";
import type { TemplateSettings } from "@/types/settings";

const defaultSettings: TemplateSettings = {
  brand: { primaryColor: "#3b82f6", secondaryColor: "#1f2937", accentColor: "#60a5fa", backgroundColor: "#0a0a0f", textColor: "#f8fafc", logoUrl: null, logoText: "Obsidian" },
  typography: { headingFont: "Inter", bodyFont: "Inter", headingWeight: 800, baseFontSize: "md" },
  content: { headline: "Command your growth.", subheadline: "A premium SaaS launch template.", ctaText: "Start free", ctaUrl: "#", features: [{ title: "Fast", description: "Ship in days" }, { title: "Flexible", description: "Edit all tokens" }, { title: "Polished", description: "Studio-grade UI" }], footerText: "Obsidian template" },
  media: { heroImageUrl: null, productImageUrl: null, logoImageUrl: null },
};

export const obsidianConfig: TemplateConfig = { id: "obsidian", name: "Obsidian", slug: "obsidian", category: "saas", tags: ["dark", "glass"], style: "dark", hasThreeJS: true, hasGSAP: true, hasLottie: false, defaultSettings, thumbnail: "/thumbnails/obsidian.jpg", previewUrl: "/templates/obsidian" };
