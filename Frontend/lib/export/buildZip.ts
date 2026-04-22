import JSZip from "jszip";
import { promises as fs } from "fs";
import path from "path";
import type { TemplateSettings } from "@/types/settings";
import { buildTokenCssString } from "@/lib/export/injectTokens";

function replacePlaceholders(content: string, settings: TemplateSettings): string {
  const map: Record<string, string> = {
    "{{HEADLINE}}": settings.content.headline,
    "{{SUBHEADLINE}}": settings.content.subheadline,
    "{{CTA_TEXT}}": settings.content.ctaText,
    "{{CTA_URL}}": settings.content.ctaUrl,
    "{{FOOTER_TEXT}}": settings.content.footerText,
    "{{LOGO_TEXT}}": settings.brand.logoText,
  };
  return Object.entries(map).reduce((acc, [key, value]) => acc.replaceAll(key, value), content);
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  }));
  return nested.flat();
}

export async function buildTemplateZip(templateId: string, settings: TemplateSettings): Promise<Buffer> {
  const root = path.join(process.cwd(), "templates", templateId);
  const zip = new JSZip();
  const files = await walk(root);

  await Promise.all(files.map(async (file) => {
    const rel = path.relative(root, file).replaceAll("\\", "/");
    const source = await fs.readFile(file, "utf8");
    zip.file(rel, replacePlaceholders(source, settings));
  }));

  zip.file("tokens.css", buildTokenCssString(settings));
  zip.file("README.md", `# ${templateId} - exported from Framify\n\n## Setup\nnpm install && npm run dev\n\n## Deploy\nnpx vercel\n`);
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
