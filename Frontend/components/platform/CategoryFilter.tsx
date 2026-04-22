"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-20 z-30 mx-auto max-w-3xl">
      <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.04] bg-zinc-950/80 p-1.5 backdrop-blur-xl scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className="relative shrink-0 rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors"
          >
            {value === category && (
              <motion.div
                layoutId="active-category"
                className="absolute inset-0 rounded-xl bg-white/[0.08]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 ${
                value === category ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
