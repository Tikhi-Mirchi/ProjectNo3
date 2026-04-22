"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import type { TemplateSettings } from "@/types/settings";

interface PreviewFrameProps {
  settings?: TemplateSettings;
  onElementClick?: (elementId: string) => void;
  scale?: number;
}

export function PreviewFrame({ settings: propSettings, onElementClick, scale = 1 }: PreviewFrameProps) {
  const storeSettings = useEditorStore((s) => s.settings);
  const setActiveElement = useEditorStore((s) => s.setActiveElement);
  const activeElement = useEditorStore((s) => s.activeElement);
  const updateSetting = useEditorStore((s) => s.updateSetting);
  
  const settings = propSettings || storeSettings;
  const isReadOnly = !!propSettings;

  const { brand, typography, content } = settings;

  // Inline editor component
  const EditableText = ({ id, value, className, style, multiLine = false, as: Component = "div" }: any) => {
    if (isReadOnly) return <Component className={className} style={style}>{value}</Component>;

    const isEditing = activeElement === id;

    if (isEditing) {
      return multiLine ? (
        <textarea
          autoFocus
          className={`w-full bg-black/20 outline-none ring-2 ring-emerald-400 rounded-lg p-1 ${className}`}
          style={{ ...style, resize: 'none', overflow: 'hidden' }}
          value={value}
          onChange={(e) => updateSetting(id, e.target.value)}
          onBlur={() => setActiveElement(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setActiveElement(null); }}
        />
      ) : (
        <input
          autoFocus
          type="text"
          className={`w-full text-center bg-black/20 outline-none ring-2 ring-emerald-400 rounded-lg p-1 ${className}`}
          style={style}
          value={value}
          onChange={(e) => updateSetting(id, e.target.value)}
          onBlur={() => setActiveElement(null)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setActiveElement(null); }}
        />
      );
    }

    return (
      <Component
        className={`cursor-text border border-transparent hover:border-emerald-400/50 hover:bg-emerald-400/10 rounded-lg p-1 transition-all ${className}`}
        style={style}
        onClick={(e: any) => {
          e.preventDefault();
          setActiveElement(id);
        }}
      >
        {value}
      </Component>
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
      {/* Preview toolbar */}
      <div className="flex items-center justify-between border-b border-white/[0.04] bg-zinc-950 px-4 py-2.5">
        <span className="text-xs font-medium text-zinc-500">Live Preview</span>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* Preview content */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none"
        style={{
          backgroundColor: brand.backgroundColor,
          color: brand.textColor,
          fontFamily: `'${typography.bodyFont}', sans-serif`,
          fontSize: typography.baseFontSize === "sm" ? "14px" : typography.baseFontSize === "lg" ? "18px" : "16px",
        }}
      >
        {/* Nav */}
        <nav
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: `1px solid ${brand.primaryColor}20` }}
        >
          <span
            className="text-lg font-bold"
            style={{
              color: brand.primaryColor,
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontWeight: typography.headingWeight,
            }}
          >
            {brand.logoText}
          </span>
          <div className="flex gap-6 text-sm opacity-60">
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-8 py-24 text-center">
          <EditableText
            id="content.headline"
            value={content.headline}
            as="h1"
            className="max-w-3xl text-5xl leading-tight inline-block"
            style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontWeight: typography.headingWeight,
            }}
          />
          <EditableText
            id="content.subheadline"
            value={content.subheadline}
            as="p"
            multiLine={true}
            className="mt-6 max-w-xl text-lg opacity-60 inline-block text-center"
          />
          <div
            className="mt-8 inline-block rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <EditableText
              id="content.ctaText"
              value={content.ctaText}
              as="span"
              className="inline-block"
            />
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-6 px-8 pb-16 sm:grid-cols-3">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: `${brand.primaryColor}10`,
                border: `1px solid ${brand.primaryColor}15`,
              }}
            >
              <h3
                className="text-lg"
                style={{
                  fontFamily: `'${typography.headingFont}', sans-serif`,
                  fontWeight: typography.headingWeight,
                }}
              >
                {feature.title}
              </h3>
              <p className="mt-2 text-sm opacity-60">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Secondary color accent bar */}
        <section
          className="mx-8 mb-16 rounded-2xl p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${brand.primaryColor}15, ${brand.accentColor}15)`,
            border: `1px solid ${brand.primaryColor}10`,
          }}
        >
          <h2
            className="text-3xl"
            style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontWeight: typography.headingWeight,
            }}
          >
            Ready to get started?
          </h2>
          <p className="mt-3 opacity-60">
            Export this template and deploy in minutes.
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: brand.accentColor }}
          >
            {content.ctaText}
          </button>
        </section>

        {/* Footer */}
        <footer
          className="px-8 py-6 text-center text-sm opacity-40"
          style={{ borderTop: `1px solid ${brand.primaryColor}10` }}
        >
          {content.footerText}
        </footer>
      </div>
    </div>
  );
}
