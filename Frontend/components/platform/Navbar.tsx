"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="relative mt-4 flex items-center justify-between rounded-2xl border border-[var(--framify-border)] bg-[var(--framify-nav-bg)] px-5 py-3 backdrop-blur-2xl transition-colors duration-300">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/20 transition-shadow group-hover:shadow-emerald-500/30">
              <Layers className="h-4.5 w-4.5 text-zinc-900" />
              <div className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-lg" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[var(--framify-text)]">
              Framify
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden items-center gap-0.5 md:flex">
            <NavLink href="/" active>Templates</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            
            {/* Dropdown for Resources */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center rounded-lg px-3.5 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:text-[var(--framify-text-muted)]">
                Resources
                <ChevronDown className="ml-0.5 h-3 w-3 opacity-50" />
              </button>
              
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[var(--framify-border)] bg-[var(--framify-surface-1)] shadow-xl backdrop-blur-xl"
                >
                  <div className="flex flex-col p-2">
                    <Link href="#" className="rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-[var(--framify-card-bg)] hover:text-[var(--framify-text)]">Documentation</Link>
                    <Link href="#" className="rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-[var(--framify-card-bg)] hover:text-[var(--framify-text)]">Blog</Link>
                    <Link href="#" className="rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-[var(--framify-card-bg)] hover:text-[var(--framify-text)]">Support</Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Desktop Auth + Theme Toggle ── */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Dark/Light toggle */}
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--framify-text-dim)] transition-all hover:bg-[var(--framify-card-bg)] hover:text-[var(--framify-text)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              href="/auth/signup"
              className="rounded-xl px-4 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:text-[var(--framify-text)]"
            >
              Sign up
            </Link>
            <Link
              href="/auth/login"
              className="relative overflow-hidden rounded-xl bg-[var(--framify-text)] px-5 py-2.5 text-[13px] font-semibold text-[var(--framify-bg)] transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Log in
            </Link>
          </div>

          {/* ── Mobile Menu Button ── */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--framify-text-dim)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl text-[var(--framify-text-dim)] transition-colors hover:text-[var(--framify-text)]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile Nav ── */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mx-6 mt-2 overflow-hidden rounded-2xl border border-[var(--framify-border)] bg-[var(--framify-surface-1)] backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col p-2">
            <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>Templates</MobileNavLink>
            <MobileNavLink href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>Resources</MobileNavLink>
            <hr className="my-2 border-[var(--framify-border)]" />
            <MobileNavLink href="/auth/signup" onClick={() => setMobileOpen(false)}>Sign up</MobileNavLink>
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="mx-2 mt-1 mb-2 rounded-xl bg-[var(--framify-text)] py-2.5 text-center text-[13px] font-semibold text-[var(--framify-bg)]"
            >
              Log in
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
        active
          ? "text-[var(--framify-text)]"
          : "text-[var(--framify-text-dim)] hover:text-[var(--framify-text-muted)]"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[var(--framify-text-muted)] transition-colors hover:bg-[var(--framify-card-bg)]"
    >
      {children}
    </Link>
  );
}
