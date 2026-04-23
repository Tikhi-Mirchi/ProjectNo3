"use client";

import { motion } from "framer-motion";

export function SplitRevealSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-emerald-400/70">
              Scroll reveal
            </span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-[var(--framify-text)] sm:text-4xl">
              Opens as you <span className="gradient-text-static">scroll</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--framify-text-dim)]">
              A custom split-reveal animation: the card “unseals” from the center outward,
              then lifts into place. Built for Framify’s visual language.
            </p>
          </motion.div>

          <SplitRevealCard />
        </div>
      </div>
    </section>
  );
}

function SplitRevealCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-140px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.06] via-zinc-950 to-zinc-950 p-6 shadow-2xl shadow-emerald-400/[0.04]">
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-[var(--framify-text)]">Framify Studio</h3>
              <p className="mt-1 text-[12px] text-[var(--framify-text-dim)]">Tokens → preview → export</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-zinc-200">
              Live
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { k: "Primary", v: "#10b981" },
              { k: "Accent", v: "#22d3ee" },
              { k: "Font", v: "Geist Sans" },
              { k: "CTA", v: "Get started" },
            ].map((item) => (
              <div key={item.k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] font-semibold text-zinc-400">{item.k}</div>
                <div className="mt-1 text-[13px] font-medium text-zinc-100">{item.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-zinc-200">Preview</div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <div className="text-[11px] text-zinc-400">rendering</div>
              </div>
            </div>
            <div className="mt-3 h-24 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-400/10 via-cyan-400/5 to-transparent" />
          </div>
        </div>

        {/* Split-open shutters (custom design; inspired by “bisection” behavior) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial="closed"
          whileInView="open"
          viewport={{ once: true, margin: "-140px" }}
          variants={{}}
        >
          {/* Top shutter */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-zinc-950"
            style={{
              boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-140px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            transformOrigin="bottom"
          />
          {/* Bottom shutter */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-140px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            transformOrigin="top"
          />
          {/* Center seam glow */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-140px" }}
            transition={{ duration: 0.35, delay: 0.25 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

