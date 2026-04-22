"use client";

import { motion } from "framer-motion";
import { Layers, Download, Heart, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/platform/Navbar";
import { Footer } from "@/components/platform/Footer";

const recentExports = [
  { template: "Obsidian", date: "2 hours ago", slug: "obsidian" },
  { template: "Aurora", date: "Yesterday", slug: "aurora" },
  { template: "Stark", date: "3 days ago", slug: "stark" },
];

const favorites = [
  { template: "Prism", category: "Startup", slug: "prism" },
  { template: "Carbon", category: "Dev Tool", slug: "carbon" },
  { template: "Stellar", category: "AI Tool", slug: "stellar" },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-zinc-500">
              Manage your saved customizations, exports, and favorites.
            </p>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <StatCard icon={<Download className="h-5 w-5" />} label="Total Exports" value="3" />
            <StatCard icon={<Heart className="h-5 w-5" />} label="Favorites" value="3" />
            <StatCard icon={<Layers className="h-5 w-5" />} label="Customizations" value="5" />
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recent exports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  Recent Exports
                </h2>
              </div>
              <div className="space-y-3">
                {recentExports.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/templates/${item.slug}`}
                    className="flex items-center justify-between rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-300">{item.template}</p>
                      <p className="text-xs text-zinc-600">{item.date}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-zinc-600" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Favorites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Heart className="h-4 w-4 text-zinc-500" />
                  Favorites
                </h2>
              </div>
              <div className="space-y-3">
                {favorites.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/templates/${item.slug}/customize`}
                    className="flex items-center justify-between rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-300">{item.template}</p>
                      <p className="text-xs text-zinc-600">{item.category}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-zinc-600" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-zinc-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
