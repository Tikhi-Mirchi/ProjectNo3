"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { PreviewFrame } from "@/components/platform/PreviewFrame";
import type { TemplateSettings } from "@/types/settings";

export type LandingCardProps = {
  href: string;
  title: string;
  description: string;
  tags: string[];
  settings: TemplateSettings;
};

export function LandingCard({ href, title, description, tags, settings }: LandingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.div
        whileHover={{
          scale: 1.045,
          rotateX: 2.2,
          rotateY: -2.2,
        }}
        whileTap={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative"
      >
        <Link
          href={href}
          className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-[var(--framify-card-bg)] shadow-[0_1px_0_rgba(255,255,255,0.06),0_26px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          {/* Depth + glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-emerald-400/[0.09] blur-[90px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-70" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between gap-4 p-6">
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--framify-text)]">{title}</h3>
              <p className="mt-1 text-[13px] text-[var(--framify-text-dim)]">{description}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-[var(--framify-text-muted)]">
              Open <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          {/* Preview canvas (dominant visual area) */}
          <div className="relative z-10 px-6 pb-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 text-[11px] font-medium text-zinc-400">live canvas</span>
              </div>

              <motion.div
                className="relative h-[320px] bg-black"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35 }}
              >
                {/* The PreviewFrame is rendered large, then scaled down into the window */}
                <div
                  className="pointer-events-none h-full w-[320%]"
                  style={{ transform: "scale(0.31)", transformOrigin: "top left" }}
                >
                  <PreviewFrame settings={settings} scale={1} />
                </div>
              </motion.div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
                className="pointer-events-none absolute inset-0 flex items-end justify-between p-5"
              >
                <div className="pointer-events-none">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-2 text-[12px] font-semibold text-white backdrop-blur-xl">
                    <Eye className="h-4 w-4" />
                    View live
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  {tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-zinc-200 backdrop-blur-xl"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

