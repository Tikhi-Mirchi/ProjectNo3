"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, Zap, Code2, Sparkles, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Navbar } from "@/components/platform/Navbar";
import { Footer } from "@/components/platform/Footer";
import { TemplateGallery } from "@/components/platform/TemplateGallery";
import { CategoryFilter } from "@/components/platform/CategoryFilter";
import { getCategories } from "@/lib/templates/registry";
import { TopWebsitesSection } from "@/components/platform/TopWebsitesSection";

export default function PlatformHomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = getCategories();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[-200px] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[150px]" />
            <div className="absolute bottom-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
            <div className="absolute inset-0 grid-pattern opacity-50" />
            {/* Animated orbs */}
            <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 right-[15%] h-3 w-3 rounded-full bg-emerald-400/30 blur-sm" />
            <motion.div animate={{ y: [15, -15, 15], x: [-10, 10, -10] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] left-[10%] h-2 w-2 rounded-full bg-emerald-300/20 blur-sm" />
            {/* Rotating rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="h-[600px] w-[600px] rounded-full border border-emerald-400/[0.04]" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="h-[800px] w-[800px] rounded-full border border-dashed border-emerald-400/[0.03]" />
            </div>
          </div>

          {/* Hero Content */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center">
            {/* Hero Headline — Bold typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-4xl text-6xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-7xl lg:text-[96px]"
            >
              <span className="text-[var(--framify-text)]">SHIP</span>{" "}
              <span className="gradient-text-hero">STUNNING</span>
              <br />
              <span className="text-[var(--framify-text)]">LANDING</span>{" "}
              <span className="gradient-text-hero">PAGES</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-[var(--framify-text-muted)]"
            >
              Curated, production-ready Next.js templates with live customization,
              AI-powered copy, and one-click export.
            </motion.p>

            {/* Search Bar — Dribbble inspired (Photo 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-10 max-w-xl"
            >
              <div className="relative flex items-center rounded-full border border-[var(--framify-border-hover)] bg-[var(--framify-surface-1)] px-5 py-3 shadow-lg transition-all focus-within:border-emerald-400/30 focus-within:shadow-emerald-400/5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What type of template are you looking for?"
                  className="flex-1 bg-transparent text-[14px] text-[var(--framify-text)] outline-none placeholder:text-[var(--framify-text-dim)]"
                />
                <button className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-zinc-900 shadow-md transition-transform hover:scale-105">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {/* Popular tags */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[12px] font-semibold text-[var(--framify-text-dim)]">Popular:</span>
                {["SaaS", "landing page", "portfolio", "startup", "AI"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-full border border-[var(--framify-border)] px-3 py-1 text-[11px] font-medium text-[var(--framify-text-muted)] transition-all hover:border-emerald-400/30 hover:text-emerald-400"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Category bar (moved up under search + popular) */}
              <div className="mt-5">
                <CategoryFilter categories={categories} value={category} onChange={setCategory} sticky={false} />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="#gallery"
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-emerald-400 px-8 py-4 text-[14px] font-semibold text-zinc-900 shadow-xl shadow-emerald-400/20 transition-all hover:shadow-emerald-400/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Browse Templates</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center gap-2 rounded-2xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] px-8 py-4 text-[14px] font-medium text-[var(--framify-text-muted)] transition-all hover:border-[var(--framify-border-hover)] hover:text-[var(--framify-text)]"
              >
                Start for free
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {["from-emerald-400 to-teal-500","from-sky-400 to-blue-500","from-violet-400 to-purple-500","from-amber-400 to-orange-500","from-rose-400 to-pink-500"].map((bg, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full bg-gradient-to-br ${bg} ring-2 ring-[var(--framify-bg)] flex items-center justify-center text-[10px] font-bold text-white/80`}>
                    {["A","M","R","K","J"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-[var(--framify-text-dim)]">
                Loved by <span className="text-[var(--framify-text-muted)]">2,400+</span> developers &amp; designers
              </p>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[3px] text-[var(--framify-text-dim)]">Scroll</span>
              <div className="h-8 w-[1px] bg-gradient-to-b from-[var(--framify-text-dim)] to-transparent" />
            </motion.div>
          </motion.div>
        </section>

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

        {/* ═══ TOP WEBSITES (before gallery) ═══ */}
        <TopWebsitesSection />

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
      </main>
      <Footer />
    </>
  );
}
