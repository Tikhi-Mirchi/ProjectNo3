"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
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
        <nav className="relative mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.35)]">
          {/* Left links (HEX-like) */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="#" withChevron>
              Platform
            </NavLink>
            <NavLink href="#" withChevron>
              Solutions
            </NavLink>
            <NavLink href="#">Enterprise</NavLink>
          </div>

          {/* Center brand */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[20px] font-extrabold tracking-[0.12em] text-[var(--framify-text)]"
            aria-label="Framify Home"
          >
            FRAMIFY
          </Link>

          {/* Right links */}
          <div className="hidden items-center gap-2 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center rounded-xl px-3.5 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:text-[var(--framify-text)]">
                Resources
                <ChevronDown className="ml-1 h-3 w-3 opacity-60" />
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-2xl"
                >
                  <div className="flex flex-col p-2">
                    <Link
                      href="#"
                      className="rounded-xl px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--framify-text)]"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="#"
                      className="rounded-xl px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--framify-text)]"
                    >
                      Blog
                    </Link>
                    <Link
                      href="#"
                      className="rounded-xl px-3 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--framify-text)]"
                    >
                      Support
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            <NavLink href="#">Pricing</NavLink>

            <Link
              href="/auth/login"
              className="rounded-xl px-3.5 py-2 text-[13px] font-medium text-[var(--framify-text-dim)] transition-colors hover:text-[var(--framify-text)]"
            >
              Log In
            </Link>

            <Link
              href="/auth/signup"
              className="rounded-xl border border-white/20 bg-white/[0.06] px-4 py-2 text-[13px] font-semibold text-[var(--framify-text)] shadow-[0_1px_0_rgba(255,255,255,0.10)] transition-colors hover:bg-white/[0.10]"
            >
              Get started
            </Link>

            <button
              type="button"
              onClick={toggle}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl text-[var(--framify-text-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--framify-text)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
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
          className="mx-6 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col p-2">
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
              Platform
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
              Solutions
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
              Enterprise
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
              Pricing
            </MobileNavLink>
            <hr className="my-2 border-[var(--framify-border)]" />
            <MobileNavLink href="/auth/login" onClick={() => setMobileOpen(false)}>Log In</MobileNavLink>
            <Link
              href="/auth/signup"
              onClick={() => setMobileOpen(false)}
              className="mx-2 mt-1 mb-2 rounded-xl border border-white/20 bg-white/[0.06] py-2.5 text-center text-[13px] font-semibold text-[var(--framify-text)]"
            >
              Get started
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
  withChevron,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  withChevron?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors ${
        active
          ? "text-[var(--framify-text)]"
          : "text-[var(--framify-text-dim)] hover:text-[var(--framify-text-muted)]"
      }`}
    >
      {children}
      {withChevron && <ChevronDown className="ml-1 h-3 w-3 opacity-60" />}
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
