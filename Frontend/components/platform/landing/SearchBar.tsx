"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35 }}
      className="mx-auto mt-10 max-w-xl"
    >
      <div className="group relative">
        {/* Soft glow */}
        <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-emerald-400/10 blur-2xl opacity-50 transition-opacity duration-500 group-focus-within:opacity-80" />

        <div className="relative flex items-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.06),0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 group-focus-within:border-emerald-400/30 group-focus-within:bg-white/[0.06]">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search curated landings, vibes, and industries…"
            className="flex-1 bg-transparent text-[14px] text-[var(--framify-text)] outline-none placeholder:text-[var(--framify-text-dim)]"
          />
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-zinc-900 shadow-md shadow-emerald-400/20"
            type="button"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[12px] font-semibold text-[var(--framify-text-dim)]">Popular:</span>
        {["SaaS", "AI", "portfolio", "startup", "dark"].map((tag) => (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-[var(--framify-text-muted)] transition-all hover:border-emerald-400/25 hover:text-emerald-300"
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

