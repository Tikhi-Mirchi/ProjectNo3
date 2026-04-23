export type FeaturedLanding = {
  slug: "obsidian" | "aurora" | "stark";
  title: string;
  description: string;
  tags: string[];
};

export const featuredLandings: FeaturedLanding[] = [
  {
    slug: "obsidian",
    title: "Obsidian",
    description: "Premium dark SaaS with glass accents and strong contrast.",
    tags: ["Dark", "SaaS", "Glass", "3D"],
  },
  {
    slug: "aurora",
    title: "Aurora",
    description: "Bright AI product landing with soft gradients and clarity.",
    tags: ["Light", "AI", "Gradient"],
  },
  {
    slug: "stark",
    title: "Stark",
    description: "Editorial agency vibe with sharp type and minimal layout.",
    tags: ["Editorial", "Agency", "Minimal"],
  },
];

