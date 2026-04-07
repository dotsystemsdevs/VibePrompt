"use client";

import { useState } from "react";

interface PromptActionsProps {
  slug: string;
  promptText: string;
  initialUpvotes: number;
  initialSaved?: boolean;
  color?: string;
  sidebar?: boolean;
  inline?: boolean;
}

export function PromptActions({ promptText, sidebar, inline }: PromptActionsProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (inline) {
    return (
      <button
        onClick={copy}
        className="px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: copied ? "#16a34a" : "var(--accent-blue)" }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    );
  }

  if (sidebar) {
    return (
      <button
        onClick={copy}
        className="w-full px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: "var(--accent-blue)" }}
      >
        <span className="inline-flex items-center justify-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-6A2.25 2.25 0 0 0 5.25 4.5v10.5A2.25 2.25 0 0 0 7.5 17.25h.75M15.666 3.888A2.25 2.25 0 0 1 17.25 6.052V19.5A2.25 2.25 0 0 1 15 21.75H10.5A2.25 2.25 0 0 1 8.25 19.5v-.75M15.666 3.888H10.5A2.25 2.25 0 0 0 8.25 6.138v12.362" />
          </svg>
          <span>{copied ? "Copied ✓" : "Copy prompt"}</span>
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center border-b-2 border-foreground/25 py-3">
      <button
        onClick={copy}
        className={`ml-auto px-3 py-1.5 text-xs transition-colors ${copied ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
