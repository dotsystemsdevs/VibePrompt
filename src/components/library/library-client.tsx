"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_COLOR_MAP } from "@/lib/categories";
import { WorkflowChecklist } from "@/components/workflow/workflow-checklist";
import type { Prompt } from "@/lib/types";

type AwesomeItem = {
  name: string;
  description: string;
  href: string;
  catTitle: string;
  catEmoji: string;
};

interface LibraryClientProps {
  savedPrompts: Prompt[];
  savedAwesomeHrefs: string[];
  awesomeByHref: Record<string, AwesomeItem>;
}

const TABS = [
  { key: "all", label: "All", icon: "" },
  { key: "prompts", label: "Prompts", icon: "✦" },
  { key: "workflow", label: "Workflow", icon: "🚀" },
  { key: "awesome", label: "Awesome", icon: "⚡" },
];

export function LibraryClient({ savedPrompts, savedAwesomeHrefs, awesomeByHref }: LibraryClientProps) {
  const [tab, setTab] = useState("all");

  const showPrompts = tab === "all" || tab === "prompts";
  const showWorkflow = tab === "all" || tab === "workflow";
  const showAwesome = tab === "all" || tab === "awesome";

  return (
    <>
      {/* Tab bar */}
      <div className="relative border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon && <span aria-hidden="true" className="mr-1">{t.icon}</span>}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts section */}
      {showPrompts && (
        <>
          <div className="border-b border-border px-6 py-10">
            <p className="hero-kicker mb-3">✦ Prompts</p>
            <h2 className="text-2xl font-bold tracking-tight">Your saved prompts.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {savedPrompts.length === 0
                ? "No saved prompts yet."
                : `${savedPrompts.length} prompt${savedPrompts.length === 1 ? "" : "s"} saved.`}
            </p>
          </div>
          {savedPrompts.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="mb-6 text-sm text-muted-foreground">
                Hit the Save button on any prompt to add it here.
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Browse prompts →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {savedPrompts.map((p) => {
                const color = CATEGORY_COLOR_MAP[p.category] ?? "#6b7280";
                return (
                  <Link
                    key={p.slug}
                    href={`/prompts/${p.slug}`}
                    className="group relative border-b border-r border-border px-6 py-6 transition-colors hover:bg-card"
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">{p.categoryName}</span>
                    </div>
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground/90 group-hover:text-foreground">
                      {p.title}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground/60">
                      {p.useCase}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Workflow section */}
      {showWorkflow && (
        <>
          <div className="border-b border-border px-6 py-10">
            <p className="hero-kicker mb-3">🚀 Workflow</p>
            <h2 className="text-2xl font-bold tracking-tight">Your build checklist.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Track your progress through the 9-step vibe coding workflow. Saved locally.
            </p>
          </div>
          <WorkflowChecklist />
        </>
      )}

      {/* Awesome section */}
      {showAwesome && (
        <>
          <div className="border-b border-border px-6 py-10">
            <p className="hero-kicker mb-3">⚡ Awesome</p>
            <h2 className="text-2xl font-bold tracking-tight">Your saved tools.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {savedAwesomeHrefs.length === 0
                ? "No saved tools yet."
                : `${savedAwesomeHrefs.length} saved tool${savedAwesomeHrefs.length === 1 ? "" : "s"}.`}
            </p>
          </div>
          {savedAwesomeHrefs.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="mb-6 text-sm text-muted-foreground">
                Hit Save on any tool in the Awesome list to add it here.
              </p>
              <Link
                href="/awesome"
                className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Browse awesome tools →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border border-b border-border">
              {savedAwesomeHrefs.map((href) => {
                const item = awesomeByHref[href];
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 px-6 py-4 transition-colors hover:bg-card"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm leading-none" aria-hidden="true">{item?.catEmoji ?? "🔗"}</span>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item?.name ?? href}
                        </p>
                        {item?.catTitle && (
                          <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground/40">
                            {item.catTitle}
                          </span>
                        )}
                      </div>
                      {item?.description && (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
