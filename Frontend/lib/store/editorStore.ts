"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TemplateSettings } from "@/types/settings";

const defaultSettings: TemplateSettings = {
  brand: {
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    accentColor: "#06b6d4",
    backgroundColor: "#0a0a0f",
    textColor: "#f1f5f9",
    logoUrl: null,
    logoText: "Velora",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingWeight: 700,
    baseFontSize: "md",
  },
  content: {
    headline: "Build faster with premium templates",
    subheadline: "Customize every detail and export production-ready Next.js code.",
    ctaText: "Get Started",
    ctaUrl: "#",
    features: [
      { title: "Real-time editing", description: "Preview all updates instantly." },
      { title: "Token-driven styling", description: "Design system powered by CSS variables." },
      { title: "One-click export", description: "Download ready-to-deploy Next.js templates." },
    ],
    footerText: "Built with Framify",
  },
  media: {
    heroImageUrl: null,
    productImageUrl: null,
    logoImageUrl: null,
  },
};

interface EditorStore {
  settings: TemplateSettings;
  history: TemplateSettings[];
  future: TemplateSettings[];
  isDirty: boolean;
  activeElement: string | null;
  updateSetting: (path: string, value: unknown) => void;
  resetToDefaults: () => void;
  undo: () => void;
  redo: () => void;
  setAllSettings: (settings: TemplateSettings) => void;
  setActiveElement: (elementId: string | null) => void;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setByPath(object: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let current: Record<string, unknown> = object;

  keys.slice(0, -1).forEach((key) => {
    if (!(key in current) || typeof current[key] !== "object" || !current[key]) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  });

  current[keys[keys.length - 1]] = value;
}

export const useEditorStore = create<EditorStore>()(
  immer((set, get) => ({
    settings: defaultSettings,
    history: [],
    future: [],
    isDirty: false,
    activeElement: null,
    updateSetting: (path, value) => {
      set((state) => {
        state.history.push(deepClone(state.settings));
        if (state.history.length > 20) state.history.shift();
        setByPath(state.settings as unknown as Record<string, unknown>, path, value);
        state.future = [];
        state.isDirty = true;
      });
    },
    resetToDefaults: () => {
      set((state) => {
        state.history.push(deepClone(state.settings));
        state.settings = deepClone(defaultSettings);
        state.future = [];
        state.isDirty = false;
      });
    },
    undo: () => {
      const { history, settings } = get();
      if (!history.length) return;
      const previous = history[history.length - 1];
      set((state) => {
        state.history.pop();
        state.future.unshift(deepClone(settings));
        state.settings = previous;
      });
    },
    redo: () => {
      const { future, settings } = get();
      if (!future.length) return;
      const next = future[0];
      set((state) => {
        state.future.shift();
        state.history.push(deepClone(settings));
        state.settings = next;
      });
    },
    setAllSettings: (settings) => {
      set((state) => {
        state.history.push(deepClone(state.settings));
        state.settings = settings;
        state.future = [];
        state.isDirty = true;
      });
    },
    setActiveElement: (elementId) => {
      set((state) => {
        state.activeElement = elementId;
      });
    },
  })),
);
