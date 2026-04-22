"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TemplateCard } from "./TemplateCard";
import { CategoryFilter } from "./CategoryFilter";
import { templateConfigs, getCategories } from "@/lib/templates/registry";

export function TemplateGallery() {
  const categories = useMemo(() => getCategories(), []);
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? templateConfigs
        : templateConfigs.filter((t) => t.category === category),
    [category]
  );

  return (
    <section className="space-y-8">
      <CategoryFilter
        categories={categories}
        value={category}
        onChange={setCategory}
      />

      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-zinc-600">
          No templates in this category yet.
        </div>
      )}
    </section>
  );
}
