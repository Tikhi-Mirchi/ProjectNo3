import { Layers } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Templates", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Pricing", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "GitHub", href: "https://github.com" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--framify-border)] bg-[var(--framify-surface-1)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500">
                <Layers className="h-4 w-4 text-zinc-900" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[var(--framify-text)]">Framify</span>
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-[var(--framify-text-dim)]">
              Premium, production-ready Next.js landing page templates. Customize in seconds, export clean code.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--framify-text-dim)]">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-[var(--framify-text-muted)] transition-colors hover:text-emerald-400">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--framify-border)] pt-8 sm:flex-row">
          <p className="text-[11px] text-[var(--framify-text-dim)]">&copy; {new Date().getFullYear()} Framify. All rights reserved.</p>
          <p className="text-[11px] text-[var(--framify-text-dim)]">Built with Next.js, Tailwind CSS &amp; MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
