"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import { getTemplateBySlug } from "@/lib/templates/registry";
import { useEditorStore } from "@/lib/store/editorStore";
import SettingsPanel from "@/components/platform/SettingsPanel";
import { PreviewFrame } from "@/components/platform/PreviewFrame";

interface PageProps {
  params: { slug: string };
}

export default function CustomizeTemplatePage({ params }: PageProps) {
  const template = getTemplateBySlug(params.slug);
  const setAllSettings = useEditorStore((s) => s.setAllSettings);

  useEffect(() => {
    if (template) {
      setAllSettings(template.defaultSettings);
    }
  }, [template, setAllSettings]);

  if (!template) notFound();

  return (
    <main className="flex h-screen flex-col lg:flex-row">
      <SettingsPanel templateName={template.name} templateSlug={template.slug} />
      <section className="flex flex-1 flex-col overflow-hidden bg-zinc-900">
        <PreviewFrame />
      </section>
    </main>
  );
}

