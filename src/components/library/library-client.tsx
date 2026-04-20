"use client";

import { useMemo, useState } from "react";
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

export function LibraryClient({ savedPrompts, savedAwesomeHrefs, awesomeByHref }: LibraryClientProps) {
  const [tab, setTab] = useState<"prompts" | "workflow" | "awesome">("prompts");

  const savedAwesomeItems = useMemo(() => {
    return savedAwesomeHrefs
      .map((href) => ({ href, item: awesomeByHref[href] }))
      .filter((row) => Boolean(row.item));
  }, [awesomeByHref, savedAwesomeHrefs]);

  return (
    <>
      {/* Tabs (no “All”) */}
      <div className="relative border-b border-foreground/12 bg-background/60 backdrop-blur">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-6">
          {[
            { key: "prompts" as const, label: "Prompts", icon: "✦" },
            { key: "workflow" as const, label: "Workflow", icon: "🚀" },
            { key: "awesome" as const, label: "Awesome", icon: "⚡" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground/80"
              }`}
            >
              <span aria-hidden="true" className="mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick summary strip */}
      <div className="border-b border-foreground/12 px-6 py-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">{savedPrompts.length}</span> prompt{savedPrompts.length === 1 ? "" : "s"}
          </span>
          <span className="text-foreground/15" aria-hidden>·</span>
          <span>
            <span className="font-semibold text-foreground">{savedAwesomeHrefs.length}</span> tool{savedAwesomeHrefs.length === 1 ? "" : "s"}
          </span>
          <span className="text-foreground/15" aria-hidden>·</span>
          <span className="text-muted-foreground">Saved locally</span>
        </div>
      </div>

      {/* Prompts section */}
      {tab === "prompts" ? (
        <>
          <div className="border-b border-foreground/12 bg-foreground/[0.03] px-6 py-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Saved prompts</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Prompts</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {savedPrompts.length === 0
                ? "No saved prompts yet."
                : `${savedPrompts.length} prompt${savedPrompts.length === 1 ? "" : "s"} saved.`}
            </p>
          </div>
          {savedPrompts.length === 0 ? (
            <div className="px-6 py-10">
              <div className="border border-foreground/12 bg-foreground/[0.02] px-6 py-8">
                <p className="text-sm text-muted-foreground">
                  Hit the Save button on any prompt to add it here.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/browse"
                    className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                  >
                    Browse prompts →
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Tip: save 3–5 prompts you reuse weekly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 border-l border-t border-foreground/12 sm:grid-cols-2 lg:grid-cols-3">
              {savedPrompts.map((p) => {
                const color = CATEGORY_COLOR_MAP[p.category] ?? "#6b7280";
                return (
                  <Link
                    key={p.slug}
                    href={`/prompts/${p.slug}`}
                    className="group relative border-b border-r border-foreground/12 px-6 py-6 transition-colors hover:bg-white/[0.03]"
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
      ) : null}

      {/* Workflow section */}
      {tab === "workflow" ? (
        <>
      <div className="border-b border-foreground/12 bg-foreground/[0.03] px-6 py-8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Saved workflow</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Checklist</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Track your progress through the 9-step vibe coding workflow. Saved locally.
        </p>
      </div>
      <WorkflowChecklist />
        </>
      ) : null}

      {/* Awesome section */}
      {tab === "awesome" ? (
        <>
          <div className="border-b border-foreground/12 bg-foreground/[0.03] px-6 py-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Saved tools</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Awesome</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {savedAwesomeHrefs.length === 0
                ? "No saved tools yet."
                : `${savedAwesomeHrefs.length} saved tool${savedAwesomeHrefs.length === 1 ? "" : "s"}.`}
            </p>
          </div>
          {savedAwesomeHrefs.length === 0 ? (
            <div className="px-6 py-10">
              <div className="border border-foreground/12 bg-foreground/[0.02] px-6 py-8">
                <p className="text-sm text-muted-foreground">
                  Hit Save on any tool in the Awesome list to add it here.
                </p>
                <div className="mt-6">
                  <Link
                    href="/awesome"
                    className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                  >
                    Browse awesome tools →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-foreground/12 border-b border-foreground/12">
              {savedAwesomeItems.map(({ href, item }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 px-6 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none" aria-hidden="true">{item!.catEmoji ?? "🔗"}</span>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item!.name ?? href}
                      </p>
                      {item!.catTitle && (
                        <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground/40">
                          {item!.catTitle}
                        </span>
                      )}
                    </div>
                    {item!.description && (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {item!.description}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground/40 transition-colors group-hover:text-foreground/70">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
