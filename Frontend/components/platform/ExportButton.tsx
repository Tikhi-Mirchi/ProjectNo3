"use client";

import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";

interface ExportButtonProps {
  templateId: string;
}

export function ExportButton({ templateId }: ExportButtonProps) {
  const settings = useEditorStore((s) => s.settings);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleExport = async () => {
    setState("loading");

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, settings }),
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `template-${templateId}-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setState("done");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={state === "loading"}
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-emerald-500 hover:to-green-500 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50"
    >
      {state === "loading" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : state === "done" ? (
        <>
          <Check className="h-4 w-4" />
          Downloaded!
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export ZIP
        </>
      )}
    </button>
  );
}
