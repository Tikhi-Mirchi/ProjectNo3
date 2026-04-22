export interface TemplateSettings {
  brand: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    logoUrl: string | null;
    logoText: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: 400 | 500 | 600 | 700 | 800 | 900;
    baseFontSize: "sm" | "md" | "lg";
  };
  content: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaUrl: string;
    features: Array<{ title: string; description: string }>;
    footerText: string;
  };
  media: {
    heroImageUrl: string | null;
    productImageUrl: string | null;
    logoImageUrl: string | null;
  };
}

export type TemplateSettingsKey = keyof TemplateSettings;
