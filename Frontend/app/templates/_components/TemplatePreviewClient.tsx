"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Palette, Monitor, Smartphone } from "lucide-react";
import { Navbar } from "@/components/platform/Navbar";
import { getTemplateBySlug } from "@/lib/templates/registry";

export type TemplatePreviewClientProps = {
  slug: string;
};

export default function TemplatePreviewClient({ slug }: TemplatePreviewClientProps) {
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const defaultSettings = template.defaultSettings;
  const bgColor = defaultSettings.brand.backgroundColor;
  const textColor = defaultSettings.brand.textColor;
  const primaryColor = defaultSettings.brand.primaryColor;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="sticky top-16 z-40 border-b border-white/[0.04] bg-zinc-950/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <Link
                href="/templates"
                className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Templates
              </Link>
              <div className="h-5 w-px bg-white/[0.06]" />
              <div>
                <h1 className="text-sm font-semibold text-white">{template.name}</h1>
                <p className="text-xs capitalize text-zinc-500">
                  {template.category.replace("-", " ")} · {template.style}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-white/[0.06] bg-white/[0.02] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("desktop")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "desktop"
                      ? "bg-white/10 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("mobile")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "mobile"
                      ? "bg-white/10 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              <Link
                href={`/templates/${template.slug}/customize`}
                className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
              >
                <Palette className="h-3.5 w-3.5" />
                Customize
              </Link>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:scale-[1.02]"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-zinc-900/50 p-6">
          <motion.div
            layout
            className={`overflow-hidden rounded-xl border border-white/[0.06] shadow-2xl transition-all duration-500 ${
              viewMode === "mobile" ? "w-[375px]" : "w-full max-w-6xl"
            }`}
            style={{ minHeight: "80vh" }}
          >
            {/* The same preview/landing content you had before */}
            <div className="flex min-h-[80vh] flex-col" style={{ backgroundColor: bgColor, color: textColor }}>
              <nav
                className="flex items-center justify-between px-8 py-5"
                style={{ borderBottom: `1px solid ${primaryColor}20` }}
              >
                <span className="text-lg font-bold" style={{ color: primaryColor }}>
                  {defaultSettings.brand.logoText}
                </span>
                <div className="flex gap-6 text-sm opacity-60">
                  <span>Features</span>
                  <span>Pricing</span>
                  <span>About</span>
                </div>
              </nav>

              <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
                <h1
                  className="max-w-3xl text-5xl font-bold leading-tight"
                  style={{ fontFamily: `${defaultSettings.typography.headingFont}, sans-serif` }}
                >
                  {defaultSettings.content.headline}
                </h1>
                <p className="mt-6 max-w-xl text-lg opacity-60">{defaultSettings.content.subheadline}</p>
                <button
                  type="button"
                  className="mt-8 rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  {defaultSettings.content.ctaText}
                </button>
              </div>

              <div className="grid gap-6 px-8 pb-16 sm:grid-cols-3">
                {defaultSettings.content.features.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      border: `1px solid ${primaryColor}15`,
                    }}
                  >
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm opacity-60">{feature.description}</p>
                  </div>
                ))}
              </div>

              <footer
                className="px-8 py-6 text-center text-sm opacity-40"
                style={{ borderTop: `1px solid ${primaryColor}10` }}
              >
                {defaultSettings.content.footerText}
              </footer>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

