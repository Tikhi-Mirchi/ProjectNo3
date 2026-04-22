export type TemplatePage = {
  /** URL segment under `/templates/<slug>` */
  slug: string;
  /** Human-readable name */
  name: string;
  /** Short description for the templates index */
  description: string;
};

/**
 * Templates that have dedicated page routes at:
 * `app/templates/<slug>/page.tsx`
 *
 * Add new templates here to show them on `/templates`.
 */
export const templatePages: TemplatePage[] = [
  {
    slug: "obsidian",
    name: "Obsidian",
    description: "Dark, obsidian-inspired landing with sharp contrast and glow accents.",
  },
  {
    slug: "obsident",
    name: "Obsident (alias)",
    description: "Alias route pointing to the Obsidian template.",
  },
  {
    slug: "aurora",
    name: "Aurora",
    description: "Light, airy layout with soft gradients and polished product sections.",
  },
  {
    slug: "prism",
    name: "Prism",
    description: "Bold gradients and startup energy with a confident hero section.",
  },
  {
    slug: "stark",
    name: "Stark",
    description: "Minimal editorial layout with sharp typography and clean spacing.",
  },
  {
    slug: "luminary",
    name: "Luminary",
    description: "Moody portfolio aesthetic with editorial serif-forward vibes.",
  },
  {
    slug: "carbon",
    name: "Carbon",
    description: "Developer-first template with terminal-inspired tone and strong contrast.",
  },
  {
    slug: "bloom",
    name: "Bloom",
    description: "Warm, friendly creator template with soft color energy.",
  },
  {
    slug: "apex",
    name: "Apex",
    description: "Enterprise-ready B2B SaaS layout with professional polish.",
  },
  {
    slug: "kinetic",
    name: "Kinetic",
    description: "Motion-forward app landing with bold, modern highlights.",
  },
  {
    slug: "stellar",
    name: "Stellar",
    description: "Space-inspired AI startup design with crisp, futuristic contrast.",
  },
];

export function getTemplatePage(slug: string): TemplatePage | undefined {
  return templatePages.find((t) => t.slug === slug);
}

