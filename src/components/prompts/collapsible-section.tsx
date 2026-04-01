"use client";

import { useState } from "react";

interface CollapsibleSectionProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ label, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-1 border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left transition-colors hover:text-foreground"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">{label}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="pb-6 pt-1">{children}</div>}
    </div>
  );
}
