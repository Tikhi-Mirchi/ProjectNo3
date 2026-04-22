"use client";

import { useEditorStore } from "@/lib/store/editorStore";

const fontOptions = [
  "Inter",
  "Plus Jakarta Sans",
  "Sora",
  "Space Grotesk",
  "Outfit",
  "DM Sans",
  "Bricolage Grotesque",
  "Playfair Display",
  "Cormorant Garamond",
  "JetBrains Mono",
  "Geist",
  "Poppins",
];

const weightOptions = [400, 500, 600, 700, 800, 900] as const;
const scaleOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
] as const;

export function TypographyTab() {
  const settings = useEditorStore((s) => s.settings);
  const updateSetting = useEditorStore((s) => s.updateSetting);

  return (
    <div className="space-y-5">
      {/* Heading Font */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Heading Font
        </label>
        <select
          value={settings.typography.headingFont}
          onChange={(e) => updateSetting("typography.headingFont", e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50"
          style={{ fontFamily: `'${settings.typography.headingFont}', sans-serif` }}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: `'${font}', sans-serif` }}>
              {font}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-zinc-600" style={{ fontFamily: `'${settings.typography.headingFont}', sans-serif` }}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Body Font */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Body Font
        </label>
        <select
          value={settings.typography.bodyFont}
          onChange={(e) => updateSetting("typography.bodyFont", e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-blue-500/50"
          style={{ fontFamily: `'${settings.typography.bodyFont}', sans-serif` }}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: `'${font}', sans-serif` }}>
              {font}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-zinc-600" style={{ fontFamily: `'${settings.typography.bodyFont}', sans-serif` }}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Heading Weight */}
      <div>
        <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
          <span>Heading Weight</span>
          <span className="font-mono text-zinc-500">{settings.typography.headingWeight}</span>
        </label>
        <input
          type="range"
          min={400}
          max={900}
          step={100}
          value={settings.typography.headingWeight}
          onChange={(e) => updateSetting("typography.headingWeight", Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
          {weightOptions.map((w) => (
            <span key={w} className={settings.typography.headingWeight === w ? "text-blue-400" : ""}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Font Scale */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Font Scale
        </label>
        <div className="grid grid-cols-3 gap-2">
          {scaleOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateSetting("typography.baseFontSize", opt.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                settings.typography.baseFontSize === opt.value
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  : "border-white/[0.04] bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
