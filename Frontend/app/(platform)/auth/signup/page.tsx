"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Mail, Lock, User, Github } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignup = async () => {
    window.location.href = "/api/auth/signin/google";
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.05] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500">
              <Layers className="h-5 w-5 text-zinc-900" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-[var(--framify-text)]">Framify</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] p-8 backdrop-blur">
          <h1 className="text-center text-2xl font-bold text-[var(--framify-text)]">Create your account</h1>
          <p className="mt-2 text-center text-sm text-[var(--framify-text-dim)]">Start customizing and exporting templates for free</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={handleGoogleSignup} className="flex items-center justify-center gap-2 rounded-xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--framify-text-muted)] transition-colors hover:border-emerald-400/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--framify-text-muted)] transition-colors hover:border-emerald-400/20">
              <Github className="h-4 w-4" /> GitHub
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--framify-border)]" /></div>
            <div className="relative flex justify-center"><span className="bg-[var(--framify-bg)] px-3 text-xs text-[var(--framify-text-dim)]">or continue with email</span></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--framify-text-muted)]">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--framify-text-dim)]" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] py-2.5 pr-3 pl-10 text-sm text-[var(--framify-text)] outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20" placeholder="Your name" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--framify-text-muted)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--framify-text-dim)]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] py-2.5 pr-3 pl-10 text-sm text-[var(--framify-text)] outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--framify-text-muted)]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--framify-text-dim)]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-[var(--framify-border)] bg-[var(--framify-card-bg)] py-2.5 pr-3 pl-10 text-sm text-[var(--framify-text)] outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full rounded-xl bg-emerald-400 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-emerald-300">Create account</button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--framify-text-dim)]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300">Log in</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
