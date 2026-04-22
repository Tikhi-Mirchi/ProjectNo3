"use client";

import { Upload, ImageIcon } from "lucide-react";

export function MediaTab() {
  return (
    <div className="space-y-5">
      <MediaUploadZone label="Hero Image" description="Main visual for the hero section" />
      <MediaUploadZone label="Product Screenshot" description="App or product mockup image" />
      <MediaUploadZone label="Logo Image" description="Your brand logo (replaces logo text)" />

      <p className="text-[10px] text-zinc-600">
        Supported formats: JPG, PNG, WebP · Max 5MB
      </p>
    </div>
  );
}

function MediaUploadZone({ label, description }: { label: string; description: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
      </label>
      <div className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-white/[0.06] bg-white/[0.01] p-6 text-center transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">
          <ImageIcon className="h-5 w-5 text-zinc-600" />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-400">
            <span className="text-blue-400">Click to upload</span> or drag & drop
          </p>
          <p className="mt-0.5 text-[10px] text-zinc-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
