"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Palette, Heart } from "lucide-react";
import type { TemplateConfig } from "@/types/template";
import { useState } from "react";
import { PreviewFrame } from "./PreviewFrame";

const templateGradients: Record<string, string> = {
  obsidian: "from-blue-600/20 via-slate-900 to-zinc-900",
  aurora: "from-violet-500/20 via-emerald-500/10 to-fuchsia-500/10",
  stark: "from-zinc-100/10 via-zinc-200/5 to-red-500/10",
  luminary: "from-amber-500/20 via-zinc-900 to-zinc-800",
  prism: "from-indigo-500/20 via-purple-500/15 to-pink-500/15",
  carbon: "from-green-500/15 via-zinc-900 to-zinc-800",
  bloom: "from-rose-500/15 via-orange-400/10 to-fuchsia-400/10",
  apex: "from-blue-600/15 via-slate-200/5 to-zinc-100/5",
  kinetic: "from-sky-500/20 via-slate-900 to-zinc-900",
  stellar: "from-cyan-500/20 via-slate-950 to-zinc-950",
};

/* Actual hover preview — shows scaled down actual template */
function ActualHoverPreview({ template }: { template: TemplateConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-[333.33%] h-[333.33%] pointer-events-none" style={{ transform: "scale(0.3)", transformOrigin: "top left" }}>
        <PreviewFrame settings={template.defaultSettings} scale={1} />
      </div>

      {/* Action overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <span className="flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-[12px] font-semibold text-zinc-900 shadow-lg">
          <Eye className="h-3.5 w-3.5" /> Preview
        </span>
        <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur">
          <Palette className="h-3.5 w-3.5" /> Customize
        </span>
      </div>
    </motion.div>
  );
}

export function TemplateCard({ template }: { template: TemplateConfig }) {
  const gradient = templateGradients[template.slug] ?? "from-zinc-800 to-zinc-700";
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
      <Link
        href={`/templates/${template.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-[var(--framify-card-border)] bg-[var(--framify-card-bg)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/[0.12] hover:shadow-2xl hover:shadow-emerald-400/[0.04]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          <div className="absolute inset-0 grid-pattern opacity-40" />
          {/* Static name */}
          {!hovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-extrabold uppercase tracking-tight text-white/25">{template.name}</span>
            </div>
          )}
          {/* Hover preview */}
          {hovered && <ActualHoverPreview template={template} />}
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            {template.hasThreeJS && <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 backdrop-blur-sm">3D</span>}
            {template.hasGSAP && <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 backdrop-blur-sm">GSAP</span>}
            {template.hasLottie && <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-pink-400 backdrop-blur-sm">Lottie</span>}
          </div>
          {/* Like button */}
          <button className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur-sm transition-colors hover:text-rose-400" onClick={(e) => e.preventDefault()}>
            <Heart className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Info — Dribbble-style (Photo 1) */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-bold text-zinc-900">
              {template.name[0]}
            </div>
            <div>
              <h3 className="flex items-center gap-1 text-[13px] font-semibold text-[var(--framify-text)]">
                {template.name}
                <ArrowUpRight className="h-3 w-3 text-[var(--framify-text-dim)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
              </h3>
              <p className="text-[11px] capitalize text-[var(--framify-text-dim)]">{template.category.replace("-", " ")}</p>
            </div>
          </div>
          <span className="rounded-lg border border-[var(--framify-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--framify-text-dim)]">
            {template.style}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
