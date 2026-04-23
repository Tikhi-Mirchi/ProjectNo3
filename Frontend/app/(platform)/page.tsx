"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Code2, Sparkles, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/platform/Navbar";
import { Footer } from "@/components/platform/Footer";
import { TemplateGallery } from "@/components/platform/TemplateGallery";
import { CategoryFilter } from "@/components/platform/CategoryFilter";
import { getCategories } from "@/lib/templates/registry";
import { HeroSection } from "@/components/platform/landing/HeroSection";
import { FeaturedSection } from "@/components/platform/landing/FeaturedSection";

export default function PlatformHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = getCategories();

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative min-h-screen overflow-hidden"
      >
        <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div id="featured" />
        <FeaturedSection />

        {/* ═══ FEATURES ═══ */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <Zap className="h-5 w-5" />, title: "Instant Preview", desc: "See every change in real-time" },
                { icon: <Code2 className="h-5 w-5" />, title: "Clean Code", desc: "Production-ready Next.js + Tailwind" },
                { icon: <Sparkles className="h-5 w-5" />, title: "AI Copy", desc: "Generate copy with one click" },
                { icon: <MousePointerClick className="h-5 w-5" />, title: "One-Click Export", desc: "Download a deployable ZIP" },
              ].map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group rounded-2xl border border-[var(--framify-card-border)] bg-[var(--framify-card-bg)] p-6 transition-all duration-300 hover:border-emerald-400/10 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400 transition-colors group-hover:bg-emerald-400/[0.12]">{f.icon}</div>
                  <h3 className="text-[15px] font-semibold text-[var(--framify-text)]">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--framify-text-dim)]">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY ═══ */}
        <section id="gallery" className="relative px-6 pb-28">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="mb-12 text-center">
              <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-emerald-400/70">Template Gallery</span>
              <h2 className="text-4xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-5xl lg:text-6xl">
                EVERY TEMPLATE,{" "}<span className="gradient-text-static">A MASTERPIECE</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-[var(--framify-text-dim)]">
                Studio-grade designs with unique visual identities. Pick a template, make it yours, export clean code.
              </p>
            </motion.div>
            <div className="mb-8">
              <CategoryFilter categories={categories} value={category} onChange={setCategory} sticky={false} />
            </div>
            <TemplateGallery category={category} onCategoryChange={setCategory} showFilter={false} />
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-emerald-400/70">How it works</span>
              <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-4xl">THREE STEPS TO <span className="gradient-text-static">LAUNCH</span></h2>
            </motion.div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/20 via-emerald-400/10 to-transparent sm:left-1/2" />
              {[
                { step: "01", title: "Choose a template", desc: "Browse 10 premium templates crafted for different industries." },
                { step: "02", title: "Customize everything", desc: "Change colors, fonts, content, and media. AI generates copy for you." },
                { step: "03", title: "Export & deploy", desc: "Download a complete Next.js project. Run npm install && npm run dev." },
              ].map((item, i) => (
                <motion.div key={item.step} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`relative mb-12 flex items-start gap-6 ${i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}
                >
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.05] font-mono text-lg font-bold text-emerald-400">{item.step}</div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-[var(--framify-text)]">{item.title}</h3>
                    <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[var(--framify-text-dim)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BOTTOM CTA ═══ */}
        <section className="relative px-6 pb-28">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-emerald-400/[0.08] bg-gradient-to-br from-emerald-400/[0.06] via-emerald-500/[0.03] to-transparent p-14 text-center sm:p-20"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.08] blur-[100px]" />
                <div className="absolute inset-0 grid-pattern opacity-30" />
              </div>
              <div className="relative">
                <h3 className="text-3xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-4xl lg:text-5xl">
                  READY TO BUILD<br /><span className="gradient-text-static">EXTRAORDINARY?</span>
                </h3>
                <p className="mx-auto mt-5 max-w-lg text-[15px] text-[var(--framify-text-muted)]">
                  Pick a template, customize it in seconds, and export production-ready code.
                </p>
                <div className="mt-10">
                  <Link href="#gallery" className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-8 py-4 text-[14px] font-semibold text-zinc-900 shadow-xl shadow-emerald-400/20 transition-all hover:shadow-emerald-400/30 hover:scale-[1.02]">
                    Get started — it&apos;s free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </>
  );
}
