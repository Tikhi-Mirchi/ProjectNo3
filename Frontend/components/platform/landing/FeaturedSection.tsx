"use client";

import { motion } from "framer-motion";
import { featuredLandings } from "@/lib/showcase/featuredLandings";
import { getTemplateBySlug } from "@/lib/templates/registry";
import { LandingCard } from "./LandingCard";

export function FeaturedSection() {
  return (
    <section className="relative px-6 pb-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-emerald-400/70">
            Featured
          </span>
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-4xl lg:text-5xl">
            Three launches we <span className="gradient-text-static">love</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[var(--framify-text-dim)]">
            Curated like a design platform: real “mini app” previews, motion, and depth.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {featuredLandings.map((item) => {
            const template = getTemplateBySlug(item.slug);
            if (!template) return null;

            return (
              <motion.div key={item.slug} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <LandingCard
                  href={`/templates/${item.slug}`}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  settings={template.defaultSettings}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

