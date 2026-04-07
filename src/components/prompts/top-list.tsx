"use client";

import Link from "next/link";
import { Prompt } from "@/lib/types";

interface TopListProps {
  prompts: Prompt[];
  saveCounts: Record<string, number>;
}

export function TopList({ prompts, saveCounts }: TopListProps) {
  const sorted = [...prompts]
    .map((p, idx) => ({ ...p, saves: saveCounts[p.slug] ?? 0, idx }))
    .sort((a, b) => {
      if (b.saves !== a.saves) return b.saves - a.saves;
      const byName = a.title.localeCompare(b.title);
      if (byName !== 0) return byName;
      return a.idx - b.idx;
    })
    .slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Top saved prompts</span>
      </div>

      {/* List */}
      <div>
        {sorted.map((p, i) => (
          <Link
            key={p.slug}
            href={`/prompts/${p.slug}`}
            className="group flex items-center gap-6 border-b border-border px-6 py-4 transition-colors hover:bg-card"
          >
            <span className="w-6 shrink-0 text-xs text-muted-foreground tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-1">
                {p.title}
              </span>
            </div>
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:flex">
              {p.categoryName}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                {p.saves}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
