"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SearchBar } from "./SearchBar";

export type HeroSectionProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-40 animated-grid" />

        {/* Glows */}
        <div className="absolute top-[-220px] left-1/2 h-[720px] w-[980px] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[160px]" />
        <div className="absolute bottom-[-160px] right-[-140px] h-[560px] w-[560px] rounded-full bg-indigo-500/[0.05] blur-[140px]" />
        <div className="absolute bottom-[-120px] left-[-120px] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />

        {/* Subtle animated orbs */}
        <motion.div
          animate={{ y: [-14, 14, -14], x: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 right-[16%] h-3 w-3 rounded-full bg-emerald-400/30 blur-sm"
        />
        <motion.div
          animate={{ y: [12, -12, 12], x: [-8, 10, -8] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[44%] left-[10%] h-2 w-2 rounded-full bg-emerald-300/20 blur-sm"
        />

        {/* Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="h-[640px] w-[640px] rounded-full border border-emerald-400/[0.035]"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
            className="h-[860px] w-[860px] rounded-full border border-dashed border-emerald-400/[0.025]"
          />
        </div>
      </div>

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-6xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-7xl lg:text-[96px]"
        >
          <span className="text-[var(--framify-text)]">SHIP</span>{" "}
          <span className="gradient-text-hero drop-shadow-[0_0_26px_rgba(167,243,208,0.10)]">STUNNING</span>
          <br />
          <span className="text-[var(--framify-text)]">LANDING</span>{" "}
          <span className="gradient-text-hero drop-shadow-[0_0_26px_rgba(167,243,208,0.10)]">PAGES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-[var(--framify-text-muted)]"
        >
          Curated, production-ready landing experiences with live customization, AI-powered copy,
          and exportable code.
        </motion.p>

        <SearchBar value={searchQuery} onChange={onSearchChange} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="#featured"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-emerald-400 px-8 py-4 text-[14px] font-semibold text-zinc-900 shadow-xl shadow-emerald-400/20 transition-all hover:shadow-emerald-400/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Explore featured</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-[14px] font-medium text-[var(--framify-text-muted)] transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-[var(--framify-text)]"
          >
            Start for free
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {["from-emerald-400 to-teal-500","from-sky-400 to-blue-500","from-violet-400 to-purple-500","from-amber-400 to-orange-500","from-rose-400 to-pink-500"].map((bg, i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-full bg-gradient-to-br ${bg} ring-2 ring-[var(--framify-bg)] flex items-center justify-center text-[10px] font-bold text-white/80`}
              >
                {["A","M","R","K","J"][i]}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[var(--framify-text-dim)]">
            Trusted by <span className="text-[var(--framify-text-muted)]">2,400+</span> makers &amp; teams
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[3px] text-[var(--framify-text-dim)]">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-[var(--framify-text-dim)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

