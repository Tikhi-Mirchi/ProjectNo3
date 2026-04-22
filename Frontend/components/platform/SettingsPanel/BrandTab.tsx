"use client";

import { useEditorStore } from "@/lib/store/editorStore";

const colorFields = [
  { key: "brand.primaryColor", label: "Primary Color" },
  { key: "brand.secondaryColor", label: "Secondary Color" },
  { key: "brand.accentColor", label: "Accent Color" },
  { key: "brand.backgroundColor", label: "Background" },
  { key: "brand.textColor", label: "Text Color" },
] as const;

const presets = [
  { label: "Ocean", colors: { primary: "#3b82f6", secondary: "#1e40af", accent: "#06b6d4" } },
  { label: "Violet", colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#a78bfa" } },
  { label: "Rose", colors: { primary: "#f43f5e", secondary: "#be123c", accent: "#fb7185" } },
  { label: "Amber", colors: { primary: "#f59e0b", secondary: "#b45309", accent: "#fbbf24" } },
  { label: "Emerald", colors: { primary: "#10b981", secondary: "#047857", accent: "#34d399" } },
  { label: "Slate", colors: { primary: "#64748b", secondary: "#334155", accent: "#94a3b8" } },
];

export function BrandTab() {
  const settings = useEditorStore((s) => s.settings);
  const updateSetting = useEditorStore((s) => s.updateSetting);

  const getVal = (path: string): string => {
    const parts = path.split(".");
    let val: unknown = settings;
    for (const p of parts) val = (val as Record<string, unknown>)?.[p];
    return (val as string) ?? "";
  };

  const applyPreset = (preset: typeof presets[number]) => {
    updateSetting("brand.primaryColor", preset.colors.primary);
    updateSetting("brand.secondaryColor", preset.colors.secondary);
    updateSetting("brand.accentColor", preset.colors.accent);
  };

  return (
    <div className="space-y-5">
      {/* Color presets */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Color Presets
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:border-white/[0.1] hover:text-white"
            >
              <div className="flex -space-x-1">
                <div className="h-4 w-4 rounded-full ring-1 ring-zinc-800" style={{ backgroundColor: preset.colors.primary }} />
                <div className="h-4 w-4 rounded-full ring-1 ring-zinc-800" style={{ backgroundColor: preset.colors.secondary }} />
                <div className="h-4 w-4 rounded-full ring-1 ring-zinc-800" style={{ backgroundColor: preset.colors.accent }} />
              </div>
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Individual color pickers */}
      {colorFields.map(({ key, label }) => (
        <div key={key}>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="color"
                value={getVal(key)}
                onChange={(e) => updateSetting(key, e.target.value)}
                className="h-9 w-9 cursor-pointer rounded-lg border border-white/[0.06] bg-transparent"
              />
            </div>
            <input
              type="text"
              value={getVal(key)}
              onChange={(e) => updateSetting(key, e.target.value)}
              className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-300 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
              placeholder="#000000"
            />
          </div>
        </div>
      ))}

      {/* Logo text */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Logo Text
        </label>
        <input
          type="text"
          value={settings.brand.logoText}
          onChange={(e) => updateSetting("brand.logoText", e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          placeholder="Brand name"
        />
      </div>
    </div>
  );
}
