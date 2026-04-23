"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { topWebsites } from "@/lib/showcase/topWebsites";
import { getTemplateBySlug } from "@/lib/templates/registry";
import { PreviewFrame } from "@/components/platform/PreviewFrame";

export function TopWebsitesSection() {
  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-emerald-400/70">
            Top websites
          </span>
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-4xl lg:text-5xl">
            Three launches we <span className="gradient-text-static">love</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[var(--framify-text-dim)]">
            Live previews are always visible. Hover to spotlight. Click to open.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {topWebsites.map((site, idx) => (
            <TopWebsiteCard key={site.templateSlug} {...site} priority={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopWebsiteCard({
  title,
  templateSlug,
  description,
  priority,
}: {
  title: string;
  templateSlug: string;
  description: string;
  priority?: boolean;
}) {
  const template = getTemplateBySlug(templateSlug);
  if (!template) return null;

  const settings = template.defaultSettings;

  return (
    <Link
      href={`/templates/${templateSlug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--framify-card-bg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:shadow-2xl hover:shadow-emerald-400/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/[0.09] blur-[80px]" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-semibold text-[var(--framify-text)]">{title}</h3>
            <p className="mt-1 text-[13px] text-[var(--framify-text-dim)]">{description}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-[var(--framify-text-muted)]">
            Open <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Permanent preview stack (like hover-preview, but always shown) */}
        <div className="relative mt-6 h-[240px]">
          <WindowPreview
            className="absolute left-1/2 top-0 w-[92%] -translate-x-1/2"
            settings={settings}
            scale={0.26}
            priority={priority}
          />
          <WindowPreview
            className="absolute left-0 top-10 w-[86%] -rotate-3 opacity-55 blur-[0.2px]"
            settings={settings}
            scale={0.22}
            subtle
          />
          <WindowPreview
            className="absolute right-0 top-12 w-[86%] rotate-3 opacity-55 blur-[0.2px]"
            settings={settings}
            scale={0.22}
            subtle
          />
        </div>
      </div>
    </Link>
  );
}

function WindowPreview({
  className,
  settings,
  scale,
  priority,
  subtle,
}: {
  className: string;
  settings: any;
  scale: number;
  priority?: boolean;
  subtle?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, delay: priority ? 0.05 : 0.12 }}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-xl backdrop-blur transition-transform duration-300 ${
          subtle ? "" : "group-hover:scale-[1.01]"
        }`}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
          <span className="ml-2 text-[11px] font-medium text-zinc-400">preview</span>
        </div>
        <div className="h-[220px] bg-black">
          <div
            className="pointer-events-none h-full w-[340%]"
            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
          >
            <PreviewFrame settings={settings} scale={1} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

