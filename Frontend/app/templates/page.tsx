import Link from "next/link";
import { templatePages } from "@/lib/templates/pageRegistry";

export default function TemplatesIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Browse available templates. Add a new template by creating{" "}
              <span className="font-mono text-zinc-200">app/templates/&lt;name&gt;/page.tsx</span>{" "}
              and registering it in{" "}
              <span className="font-mono text-zinc-200">lib/templates/pageRegistry.ts</span>.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
          >
            Home
          </Link>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templatePages.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">{t.name}</h2>
                <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300">
                  {t.slug}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">{t.description}</p>
              <div className="mt-5 text-sm font-medium text-zinc-200 group-hover:text-white">
                Open →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

