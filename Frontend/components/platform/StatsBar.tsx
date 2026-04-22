"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Palette, Download, Code2 } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const stats: StatItemProps[] = [
  { icon: <Layers className="h-5 w-5" />, value: "10", label: "Premium Templates", delay: 0 },
  { icon: <Palette className="h-5 w-5" />, value: "8", label: "Categories", delay: 0.1 },
  { icon: <Download className="h-5 w-5" />, value: "100%", label: "Free to Export", delay: 0.2 },
  { icon: <Code2 className="h-5 w-5" />, value: "Next.js", label: "Production Ready", delay: 0.3 },
];

export function StatsBar() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ icon, value, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.04] bg-white/[0.015] p-6 transition-all hover:border-emerald-400/10 hover:bg-emerald-400/[0.02]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400 transition-colors group-hover:bg-emerald-400/[0.12]">
        {icon}
      </div>
      <AnimatedValue value={value} isInView={isInView} />
      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">{label}</span>
    </motion.div>
  );
}

function AnimatedValue({ value, isInView }: { value: string; isInView: boolean }) {
  const [display, setDisplay] = useState("0");
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isInView) return;
    if (!isNumeric) {
      setDisplay(value);
      return;
    }

    let current = 0;
    const increment = Math.ceil(numericValue / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setDisplay(String(current));
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value, numericValue, isNumeric]);

  return (
    <span className="text-2xl font-bold tracking-tight text-white">
      {display}
      {value === "100%" && display !== "0" ? "%" : ""}
    </span>
  );
}
