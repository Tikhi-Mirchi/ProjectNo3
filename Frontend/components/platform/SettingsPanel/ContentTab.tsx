"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { Plus, Trash2 } from "lucide-react";

export function ContentTab() {
  const settings = useEditorStore((s) => s.settings);
  const updateSetting = useEditorStore((s) => s.updateSetting);

  const addFeature = () => {
    if (settings.content.features.length >= 6) return;
    updateSetting("content.features", [
      ...settings.content.features,
      { title: "New Feature", description: "Describe this feature." },
    ]);
  };

  const removeFeature = (index: number) => {
    updateSetting(
      "content.features",
      settings.content.features.filter((_, i) => i !== index)
    );
  };

  const updateFeature = (index: number, field: "title" | "description", value: string) => {
    const updated = settings.content.features.map((f, i) =>
      i === index ? { ...f, [field]: value } : f
    );
    updateSetting("content.features", updated);
  };

  return (
    <div className="space-y-5">
      {/* Headline */}
      <div>
        <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
          <span>Headline</span>
          <span className={`font-mono ${settings.content.headline.length > 70 ? "text-amber-400" : "text-zinc-600"}`}>
            {settings.content.headline.length}/80
          </span>
        </label>
        <textarea
          value={settings.content.headline}
          onChange={(e) => updateSetting("content.headline", e.target.value)}
          maxLength={80}
          rows={2}
          className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          placeholder="Your main headline..."
        />
      </div>

      {/* Subheadline */}
      <div>
        <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
          <span>Subheadline</span>
          <span className={`font-mono ${settings.content.subheadline.length > 140 ? "text-amber-400" : "text-zinc-600"}`}>
            {settings.content.subheadline.length}/160
          </span>
        </label>
        <textarea
          value={settings.content.subheadline}
          onChange={(e) => updateSetting("content.subheadline", e.target.value)}
          maxLength={160}
          rows={3}
          className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          placeholder="A supporting subtitle..."
        />
      </div>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            CTA Label
          </label>
          <input
            type="text"
            value={settings.content.ctaText}
            onChange={(e) => updateSetting("content.ctaText", e.target.value)}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50"
            placeholder="Get Started"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            CTA URL
          </label>
          <input
            type="url"
            value={settings.content.ctaUrl}
            onChange={(e) => updateSetting("content.ctaUrl", e.target.value)}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium text-zinc-400">
            Features ({settings.content.features.length}/6)
          </label>
          <button
            type="button"
            onClick={addFeature}
            disabled={settings.content.features.length >= 6}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500/10 disabled:opacity-30"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {settings.content.features.map((feature, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    className="w-full rounded border border-white/[0.04] bg-transparent px-2 py-1.5 text-sm font-medium text-zinc-300 outline-none focus:border-blue-500/50"
                    placeholder="Feature title"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded border border-white/[0.04] bg-transparent px-2 py-1.5 text-xs text-zinc-400 outline-none focus:border-blue-500/50"
                    placeholder="Feature description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Footer Text
        </label>
        <input
          type="text"
          value={settings.content.footerText}
          onChange={(e) => updateSetting("content.footerText", e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50"
          placeholder="© 2024 Your Brand"
        />
      </div>
    </div>
  );
}
