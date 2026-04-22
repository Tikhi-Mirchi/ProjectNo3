import Link from "next/link";

export type TemplateScaffoldProps = {
  name: string;
  tagline: string;
  accentClassName: string;
  surfaceClassName: string;
};

export default function TemplateScaffold({
  name,
  tagline,
  accentClassName,
  surfaceClassName,
}: TemplateScaffoldProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl ${accentClassName}`} />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{name}</h1>
              <p className="mt-1 text-sm text-zinc-400">{tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
            >
              Back to templates
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
            >
              Home
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className={`rounded-3xl border border-white/10 p-6 ${surfaceClassName}`}>
            <h2 className="text-base font-semibold">Hero</h2>
            <p className="mt-2 text-sm text-zinc-300">
              A distinct top section so each template is visually different.
            </p>
            <div className="mt-5 space-y-3">
              <div className="h-10 w-2/3 rounded-xl bg-white/5" />
              <div className="h-4 w-full rounded-lg bg-white/5" />
              <div className="h-4 w-5/6 rounded-lg bg-white/5" />
              <div className={`mt-3 h-10 w-32 rounded-xl ${accentClassName}`} />
            </div>
          </div>

          <div className={`rounded-3xl border border-white/10 p-6 ${surfaceClassName} lg:col-span-2`}>
            <h2 className="text-base font-semibold">Feature grid</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Reusable layout; templates customize only colors/accents.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Fast", desc: "Optimized structure for App Router." },
                { title: "Modular", desc: "Shared scaffold avoids duplication." },
                { title: "Tailwind", desc: "Clean utility-first styling." },
                { title: "Extendable", desc: "Add new routes by adding a folder + registry entry." },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl ${accentClassName}`} />
                    <div>
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      <p className="mt-1 text-xs text-zinc-400">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-zinc-400">
          Route: <span className="text-zinc-200">/templates</span> →{" "}
          <span className="text-zinc-200">/templates/&lt;template&gt;</span>
        </footer>
      </div>
    </main>
  );
}

