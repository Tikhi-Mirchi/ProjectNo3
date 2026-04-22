import TemplatePreviewClient from "../_components/TemplatePreviewClient";

export default function ObsidentTemplatePage() {
  // Alias route for misspelling; uses the real "obsidian" template config.
  return <TemplatePreviewClient slug="obsidian" />;
}

