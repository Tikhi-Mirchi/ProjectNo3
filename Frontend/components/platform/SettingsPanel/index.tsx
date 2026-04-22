"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { BrandTab } from "./BrandTab";
import { TypographyTab } from "./TypographyTab";
import { ContentTab } from "./ContentTab";
import { AITab } from "./AITab";
import { MediaTab } from "./MediaTab";
import { useEditorStore } from "@/lib/store/editorStore";
import { Palette, Type, FileText, Sparkles, Image, Undo2, Redo2, RotateCcw, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

interface SettingsPanelProps {
  templateName?: string;
  templateSlug?: string;
}

const tabs = [
  { value: "brand", label: "Brand", icon: Palette },
  { value: "typography", label: "Type", icon: Type },
  { value: "content", label: "Content", icon: FileText },
  { value: "media", label: "Media", icon: Image },
  { value: "ai", label: "AI", icon: Sparkles },
];

export default function SettingsPanel({ templateName, templateSlug }: SettingsPanelProps) {
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const resetToDefaults = useEditorStore((s) => s.resetToDefaults);
  const history = useEditorStore((s) => s.history);
  const future = useEditorStore((s) => s.future);
  const isDirty = useEditorStore((s) => s.isDirty);

  return (
    <aside className="flex h-screen w-full flex-col border-r border-white/[0.04] bg-zinc-950 lg:w-[380px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href={templateSlug ? `/templates/${templateSlug}` : "/"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {templateName ?? "Template"}
            </h2>
            <p className="text-xs text-zinc-500">
              {isDirty ? (
                <span className="flex items-center gap-1 text-amber-400">
                  Unsaved changes
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-400">
                  <Check className="h-3 w-3" /> Saved
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={undo}
            disabled={!history.length}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!future.length}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetToDefaults}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-red-400"
            title="Reset to defaults"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="brand" className="flex flex-1 flex-col overflow-hidden">
        <Tabs.List className="flex shrink-0 border-b border-white/[0.04] px-2 pt-1">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="group flex flex-1 flex-col items-center gap-1 rounded-t-lg px-2 py-2.5 text-xs font-medium text-zinc-500 transition-colors data-[state=active]:text-white"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <div className="h-0.5 w-full rounded-full transition-colors data-[state=active]:bg-blue-500 group-data-[state=active]:bg-blue-500" />
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex-1 overflow-y-auto">
          <Tabs.Content value="brand" className="p-4">
            <BrandTab />
          </Tabs.Content>
          <Tabs.Content value="typography" className="p-4">
            <TypographyTab />
          </Tabs.Content>
          <Tabs.Content value="content" className="p-4">
            <ContentTab />
          </Tabs.Content>
          <Tabs.Content value="media" className="p-4">
            <MediaTab />
          </Tabs.Content>
          <Tabs.Content value="ai" className="p-4">
            <AITab />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </aside>
  );
}
