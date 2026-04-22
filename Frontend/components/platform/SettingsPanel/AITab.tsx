"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

const toneOptions = [
  { value: "bold", label: "Bold & Direct" },
  { value: "professional", label: "Professional & Clean" },
  { value: "warm", label: "Warm & Friendly" },
  { value: "playful", label: "Playful & Creative" },
] as const;

export function AITab() {
  const settings = useEditorStore((s) => s.settings);
  const updateSetting = useEditorStore((s) => s.updateSetting);

  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<string>("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGenerate = async () => {
    if (!productDescription.trim() || !targetAudience.trim()) {
      setError("Please fill in both product description and target audience.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription,
          targetAudience,
          tone,
          templateName: settings.brand.logoText,
          templateStyle: "dark",
          templateCategory: "saas",
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed. Please try again.");
      }

      const data = await response.json();

      // Auto-fill content fields
      if (data.headline) updateSetting("content.headline", data.headline);
      if (data.subheadline) updateSetting("content.subheadline", data.subheadline);
      if (data.ctaText) updateSetting("content.ctaText", data.ctaText);
      if (data.footerText) updateSetting("content.footerText", data.footerText);
      if (data.features) updateSetting("content.features", data.features);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Description */}
      <div>
        <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
          <span>Product Description</span>
          <span className="font-mono text-zinc-600">{productDescription.length}/300</span>
        </label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          maxLength={300}
          rows={3}
          className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          placeholder="What does your product do? (e.g., AI-powered HR tool for enterprise teams)"
        />
      </div>

      {/* Audience */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Target Audience
        </label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          maxLength={200}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-violet-500/50"
          placeholder="Who is it for? (e.g., HR Directors at companies 500+)"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
          Tone
        </label>
        <div className="grid grid-cols-2 gap-2">
          {toneOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTone(opt.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                tone === opt.value
                  ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                  : "border-white/[0.04] bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Generate button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-blue-500 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Copy
          </>
        )}
      </button>

      {/* Attribution */}
      <p className="text-center text-[10px] text-zinc-600">
        Powered by OpenRouter · AI-generated content
      </p>
    </div>
  );
}
