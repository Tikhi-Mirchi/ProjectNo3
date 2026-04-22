import { TemplateSettings } from "./settings";

export type TemplateCategory =
  | "saas"
  | "agency"
  | "portfolio"
  | "startup"
  | "app"
  | "ecommerce"
  | "creator"
  | "ai-tool"
  | "event"
  | "wellness"
  | "coming-soon";

export interface TemplateConfig {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  tags: string[];
  style: "dark" | "light" | "both";
  hasThreeJS: boolean;
  hasGSAP: boolean;
  hasLottie: boolean;
  defaultSettings: TemplateSettings;
  thumbnail: string;
  previewUrl: string;
}
