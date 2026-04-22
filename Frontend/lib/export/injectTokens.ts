import type React from "react";
import type { TemplateSettings } from "@/types/settings";

export function buildCSSTokens(settings: TemplateSettings): Record<string, string> {
  const scaleMap = { sm: "14px", md: "16px", lg: "18px" } as const;

  return {
    "--color-primary": settings.brand.primaryColor,
    "--color-secondary": settings.brand.secondaryColor,
    "--color-accent": settings.brand.accentColor,
    "--color-bg": settings.brand.backgroundColor,
    "--color-text": settings.brand.textColor,
    "--font-heading": `'${settings.typography.headingFont}', sans-serif`,
    "--font-body": `'${settings.typography.bodyFont}', sans-serif`,
    "--font-weight-heading": String(settings.typography.headingWeight),
    "--font-scale": scaleMap[settings.typography.baseFontSize],
  };
}

export function injectCSSTokens(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  settings: TemplateSettings,
): void {
  const iframeDoc = iframeRef.current?.contentDocument;
  if (!iframeDoc) return;

  const root = iframeDoc.documentElement;
  const tokens = buildCSSTokens(settings);
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function buildTokenCssString(settings: TemplateSettings): string {
  const tokens = buildCSSTokens(settings);
  const lines = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`);
  return [":root {", ...lines, "}"].join("\n");
}
