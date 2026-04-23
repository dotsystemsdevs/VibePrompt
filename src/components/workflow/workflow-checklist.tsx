"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import type { TaskGroup, TaskItem } from "./workflow-stepper";

const STORAGE_KEY_STEP = "vibeprompt-step-done-v1";

function stepItemKey(step: string, i: number) {
  return `step-${step}-${i}`;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded-sm bg-white/[0.04] px-1 font-mono text-[0.85em] text-white/80">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function getFavicon(href: string) {
  try {
    const domain = new URL(href).hostname;
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  } catch { return null; }
}



function DocumentChecklist({ step, items, startIndex, checked, toggle }: {
  step: string;
  items: TaskGroup[];
  startIndex: number;
  checked: Record<string, boolean>;
  toggle: (k: string) => void;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>(
    () => items.reduce((acc, _, i) => ({ ...acc, [i]: true }), {} as Record<number, boolean>)
  );

  const allFlat = items.flatMap((g) => g.items);
  const totalAll = allFlat.length;
  const totalDone = allFlat.filter((_, i) => !!checked[stepItemKey(step, startIndex + i)]).length;
  const totalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  // Compute which section is active (first incomplete)
  const activeSectionIdx = (() => {
    let idx = startIndex;
    for (let gi = 0; gi < items.length; gi++) {
      const allDone = items[gi].items.every((_, ii) => !!checked[stepItemKey(step, idx + ii)]);
      if (!allDone) return gi;
      idx += items[gi].items.length;
    }
    return items.length; // all done
  })();

  // Auto-open next section when it becomes active
  useEffect(() => {
    if (activeSectionIdx < items.length) {
      const id = setTimeout(() => setOpen((prev) => ({ ...prev, [activeSectionIdx]: true })), 0);
      return () => clearTimeout(id);
    }
  }, [activeSectionIdx, items.length]);

  const groupStarts = items.reduce<number[]>((acc, group, i) => {
    acc.push(i === 0 ? startIndex : acc[i - 1] + items[i - 1].items.length);
    return acc;
  }, []);

  return (
    <div className="overflow-hidden border border-foreground/12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-foreground/10 bg-foreground/[0.03] px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Spec, {items.length} sections</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tabular-nums text-white/40">{totalDone}/{totalAll}</span>
          <div className="h-1.5 w-20 overflow-hidden border border-white/10 bg-white/5">
            <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${totalPct}%` }} />
          </div>
        </div>
      </div>

      {/* Sections */}
      {items.map((group, gi) => {
        const groupStart = groupStarts[gi];
        const doneInGroup = group.items.filter((_, ii) => !!checked[stepItemKey(step, groupStart + ii)]).length;
        const groupTotal = group.items.length;
        const sectionDone = doneInGroup === groupTotal && groupTotal > 0;
        const isActive = gi === activeSectionIdx;
        const isOpen = open[gi] ?? true;

        return (
          <div key={gi} className={`border-b last:border-b-0 ${sectionDone ? "border-foreground/[0.04]" : "border-foreground/[0.08]"}`}>

            {/* Section heading, clickable to collapse */}
            <button
              onClick={() => setOpen((prev) => ({ ...prev, [gi]: !isOpen }))}
              className={`group w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${sectionDone ? "bg-foreground/[0.01]" : isActive ? "bg-blue-400/[0.05] hover:bg-blue-400/[0.08]" : "bg-foreground/[0.03] hover:bg-foreground/[0.05]"}`}
            >
              <span className={`shrink-0 font-mono text-xs font-bold tabular-nums ${sectionDone ? "text-white/20" : "text-blue-400"}`}>
                {String(gi + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 text-sm font-bold uppercase tracking-widest ${sectionDone ? "text-white/20 line-through" : isActive ? "text-blue-400" : "text-white"}`}>
                {group.heading}
              </span>
              <span className={`shrink-0 font-mono text-xs font-bold tabular-nums ${sectionDone ? "text-white/15" : isActive ? "text-blue-400/70" : "text-white/50"}`}>
                {doneInGroup}/{groupTotal}
              </span>
              <svg
                className={`shrink-0 h-3.5 w-3.5 transition-transform ${sectionDone ? "text-white/15" : "text-white/40"} ${isOpen ? "rotate-0" : "-rotate-90"}`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Collapsible content */}
            {isOpen && (
              <>
                {/* Description */}
                {group.description && (
                  <div className="border-b border-foreground/[0.06] bg-foreground/[0.02] px-5 py-3">
                    <p className="text-xs leading-relaxed text-foreground/50">{group.description}</p>
                  </div>
                )}

                {/* Task rows */}
                <div className="divide-y divide-foreground/[0.06]">
                  {group.items.map((item: TaskItem, ii: number) => {
                    const fi = groupStart + ii;
                    const k = stepItemKey(step, fi);
                    const done = !!checked[k];
                    const isWatch = item.text.startsWith("Watch:");
                    const isRead = item.text.startsWith("Read:");
                    const firstLink = item.links?.[0];

                    return (
                      <label
                        key={ii}
                        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) e.preventDefault(); }}
                        className={`group flex cursor-pointer items-center gap-4 px-5 py-3.5 transition-colors ${
                          done ? "opacity-20" : "hover:bg-foreground/[0.03]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggle(k)}
                          className="sr-only"
                        />
                        {/* Checkbox */}
                        <span className={`shrink-0 flex h-4 w-4 items-center justify-center border-2 transition-colors ${
                          done ? "border-white/20 text-white/30" : "border-white/40 group-hover:border-white text-white"
                        }`} aria-hidden="true">
                          {done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>

                        {/* Task text */}
                        <p className={`flex-1 min-w-0 text-sm font-medium leading-snug transition-colors ${done ? "text-white/20 line-through" : "text-white"}`}>
                          {item.text}
                        </p>

                        {/* Far-right resource icon */}
                        {!done && firstLink && (
                          <a
                            href={firstLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={firstLink.label}
                            className="shrink-0 transition-colors text-white/25 hover:text-white"
                          >
                            {isWatch ? (
                              /* YouTube play icon */
                              <svg width="18" height="13" viewBox="0 0 24 18" fill="currentColor">
                                <path d="M22.2 2.8a2.8 2.8 0 0 0-2-2C18.4.4 12 .4 12 .4S5.6.4 3.8.8a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.4 9a29 29 0 0 0 .4 6.2 2.8 2.8 0 0 0 2 2c1.8.4 8.2.4 8.2.4s6.4 0 8.2-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22.6 9a29 29 0 0 0-.4-6.2Z" opacity=".5"/>
                                <path d="M10.2 5.6v6.8l6-3.4-6-3.4Z"/>
                              </svg>
                            ) : isRead ? (
                              /* Arrow out */
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                            ) : (
                              /* External link */
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                            )}
                          </a>
                        )}
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StepChecklist({ step, items, storageKey, startIndex = 0, variant = "card" }: {
  step: string;
  items: TaskGroup[];
  storageKey?: string;
  startIndex?: number;
  variant?: "card" | "document";
}) {
  const key = storageKey ?? STORAGE_KEY_STEP;
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch { return {}; }
  });

  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  function toggle(k: string) {
    setChecked((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      try {
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("vp-tasks-changed"));
      } catch {}
      return next;
    });
  }

  // SSR skeleton
  if (!mounted) {
    return (
      <div className="space-y-4">
        {items.map((group, gi) => (
          <div key={gi} className="border border-foreground/10 overflow-hidden">
            {group.heading && (
              <div className="border-b border-foreground/8 bg-foreground/[0.03] px-5 py-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/30">{group.heading}</p>
              </div>
            )}
            <div className="divide-y divide-foreground/[0.06]">
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-3 px-5 py-3">
                  <span className="shrink-0 h-4 w-4 border border-foreground/20" />
                  <span className="text-sm text-foreground/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Document variant ────────────────────────────────────────────────────────
  if (variant === "document") {
    return (
      <DocumentChecklist
        step={step}
        items={items}
        startIndex={startIndex}
        checked={checked}
        toggle={toggle}
      />
    );
  }


  // ── Card variant (default) ───────────────────────────────────────────────────
  const flatStarts = items.reduce<number[]>((acc, group, i) => {
    acc.push(i === 0 ? startIndex : acc[i - 1] + items[i - 1].items.length);
    return acc;
  }, []);
  return (
    <div>
      {items.map((group, gi) => {
        const groupStart = flatStarts[gi];

        return (
          <div key={gi}>
            {/* Section heading */}
            {group.heading && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 border-b border-foreground/[0.06] bg-foreground/[0.02] px-4 py-3 sm:px-6">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">{group.heading}</span>
                {group.description && (
                  <span className="text-[11px] text-muted-foreground/40">{group.description}</span>
                )}
              </div>
            )}

            {/* Task rows */}
            <div className="divide-y divide-foreground/[0.06]">
              {group.items.map((item: TaskItem, ii: number) => {
                const fi = groupStart + ii;
                const k = stepItemKey(step, fi);
                const done = !!checked[k];
                const isWatch = item.text.startsWith("Watch:");
                const isRead = item.text.startsWith("Read:");
                const label = item.text.replace(/^(Watch|Read): /, "");
                const firstLink = item.links?.[0];

                // Watch/Read, link row with YouTube icon
                if (isWatch || isRead) {
                  return (
                    <div key={ii} className={`group flex items-center gap-4 px-4 py-5 sm:px-6 sm:py-3.5 transition-colors ${done ? "opacity-30" : "hover:bg-foreground/[0.03]"}`}>
                      <label className="shrink-0 flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggle(k)}
                          className="sr-only"
                          aria-label={label}
                        />
                        <span className={`flex h-3.5 w-3.5 items-center justify-center border transition-colors ${
                          done ? "border-foreground/15 bg-foreground/10" : "border-foreground/20 hover:border-foreground/45"
                        }`} aria-hidden="true">
                          {done && <svg width="7" height="5" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                      </label>
                      {firstLink ? (
                        <a href={firstLink.href} target="_blank" rel="noopener noreferrer" className="flex flex-1 min-w-0 items-center gap-3">
                          {isWatch ? (
                            <svg width="13" height="9" viewBox="0 0 24 18" fill="none" aria-hidden className="shrink-0">
                              <path d="M22.2 2.8a2.8 2.8 0 0 0-2-2C18.4.4 12 .4 12 .4S5.6.4 3.8.8a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.4 9a29 29 0 0 0 .4 6.2 2.8 2.8 0 0 0 2 2c1.8.4 8.2.4 8.2.4s6.4 0 8.2-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22.6 9a29 29 0 0 0-.4-6.2Z" fill="#ff2020" opacity=".8"/>
                              <path d="M10.2 5.6v6.8l6-3.4-6-3.4Z" fill="white"/>
                            </svg>
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-foreground/30">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          )}
                          <p className={`text-sm transition-colors ${done ? "text-foreground/30 line-through" : "text-foreground/80 group-hover:text-foreground"}`}>{label}</p>
                        </a>
                      ) : (
                        <p className={`flex-1 text-sm ${done ? "text-foreground/30 line-through" : "text-foreground/80"}`}>{label}</p>
                      )}
                      {!done && firstLink && <span className="shrink-0 text-[10px] text-foreground/20 transition-colors group-hover:text-foreground/50">↗</span>}
                    </div>
                  );
                }

                // Regular task, clean text, favicon links on the right
                return (
                  <label
                    key={ii}
                    onClick={(e) => { if ((e.target as HTMLElement).closest("a")) e.preventDefault(); }}
                    className={`group flex cursor-pointer items-start gap-4 px-4 py-4 sm:px-6 sm:py-3.5 transition-colors ${done ? "opacity-30" : "hover:bg-foreground/[0.03]"}`}
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(k)}
                      className="sr-only"
                    />
                    <span className={`mt-0.5 shrink-0 flex h-4.5 w-4.5 sm:h-3.5 sm:w-3.5 items-center justify-center border transition-colors ${
                      done ? "border-foreground/15 bg-foreground/10" : "border-foreground/20 group-hover:border-foreground/45"
                    }`} aria-hidden="true">
                      {done && <svg width="7" height="5" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-normal sm:leading-snug transition-colors ${done ? "text-foreground/30 line-through" : "text-foreground/90 group-hover:text-foreground"}`}>
                        <InlineText text={label} />
                      </p>
                      {item.detail && !done && (
                        <p className="mt-0.5 text-xs text-muted-foreground/60">
                          <InlineText text={item.detail} />
                        </p>
                      )}
                      {/* Inline link chips */}
                      {item.links && item.links.length > 0 && !done && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.links.map((link, li) => {
                            const fav = getFavicon(link.href);
                            return (
                              <a
                                key={li}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex min-h-6 items-center gap-1 border border-foreground/[0.15] px-2.5 py-1.5 sm:px-2 sm:py-1.5 text-[11px] sm:text-[10px] text-foreground/55 transition-colors hover:border-foreground/30 hover:text-foreground/90"
                              >
                                {fav && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={fav} alt="" width={11} height={11} className="h-[11px] w-[11px] rounded-sm" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                )}
                                {link.label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Legacy standalone checklist (sidebar widget) ───────────────────────────

const STEPS = [
  { step: "00", title: "Setup Your Environment", emoji: "⚙️", items: ["Code editor installed and open", "GitHub account created and first repo ready", "Node.js installed, node -v returns a version number", "One project running locally"] },
  { step: "01", title: "Validate", emoji: "🔍", items: ["3 competitors listed with one specific gap each", "5–10 real complaints saved (links, not paraphrases)", "Differentiator written in one sentence", "Kill criteria written before any code"] },
  { step: "02", title: "Specify", emoji: "📝", items: ["One target user described in two sentences", "Problem written in one sentence with no solution in it", "Five or fewer MVP features listed", "Out-of-scope list with at least three explicit exclusions", "Done condition written as a testable statement"] },
  { step: "03", title: "Design Stack", emoji: "🎨", items: ["Framework and UI system chosen and written in TechDesign.md", "Database and auth provider chosen, no open decisions", "Deployment target connected and working", "All dependency versions pinned in package.json"] },
  { step: "04", title: "Context Setup", emoji: "🗂️", items: ["AGENTS.md in repo root with stack, structure, and conventions", "No-touch list with at least three critical files named", "PRD summary (3 sentences) inside AGENTS.md", "First session run with AGENTS.md loaded"] },
  { step: "05", title: "Build in Loops", emoji: "🔄", items: ["PRD broken into 20–30 atomic tasks", "At least one feature shipped with a clean commit history", "Zero unreviewed diffs accepted"] },
  { step: "06", title: "Quality Gates", emoji: "🛡️", items: ["All changed files reviewed against PRD, no undocumented features", "No secrets in code or git history", "TypeScript build passes with zero errors", "At least one E2E test passes on the primary flow"] },
  { step: "07", title: "Ship & Observe", emoji: "🚀", items: ["Live URL accessible without a login wall", "PostHog installed and recording sessions", "Sentry installed and catching errors", "At least one real user session watched end to end"] },
  { step: "08", title: "Iterate", emoji: "🔁", items: ["3 friction points identified from session data, not assumptions", "PRD updated to reflect new scope", "Update shipped and live", "Specific metric checked to confirm improvement"] },
];

const STORAGE_KEY = "vibeprompt-workflow-progress";

function itemKey(step: string, i: number) {
  return `${step}-${i}`;
}

export function WorkflowChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch { return {}; }
  });
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  function toggle(k: string) {
    setChecked((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const totalItems = STEPS.reduce((acc, s) => acc + s.items.length, 0);
  const totalDone = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalItems) * 100);

  if (!mounted) return null;

  return (
    <div className="border border-foreground/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-foreground/[0.03]"
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">Track your progress</span>
          <span className="font-mono text-[10px] text-foreground/30 tabular-nums">{totalDone}/{totalItems}</span>
          <div className="h-0.5 w-24 overflow-hidden bg-foreground/10">
            <div className="h-full bg-foreground/40 transition-all duration-300" style={{ width: `${overallPct}%` }} />
          </div>
          {overallPct > 0 && <span className="font-mono text-[10px] text-foreground/25">{overallPct}%</span>}
        </div>
        <svg className={`h-3.5 w-3.5 shrink-0 text-foreground/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-foreground/10">
          <div className="divide-y divide-foreground/[0.06]">
            {STEPS.map((s) => {
              const stepDone = s.items.filter((_, i) => checked[itemKey(s.step, i)]).length;
              const complete = stepDone === s.items.length;
              return (
                <div key={s.step} className="px-5 py-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] tabular-nums text-foreground/25">{s.step}</span>
                      <span aria-hidden="true">{s.emoji}</span>
                      <span className={`text-xs font-medium ${complete ? "text-foreground/35 line-through" : "text-foreground"}`}>{s.title}</span>
                    </div>
                    <span className={`shrink-0 font-mono text-[10px] tabular-nums ${complete ? "text-foreground/30" : "text-foreground/40"}`}>{stepDone}/{s.items.length}</span>
                  </div>
                  <ul className="space-y-2 pl-8">
                    {s.items.map((item, i) => {
                      const k = itemKey(s.step, i);
                      const done = !!checked[k];
                      return (
                        <li key={i}>
                          <label className="group flex cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => toggle(k)}
                              className="sr-only"
                            />
                            <span className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${done ? "border-foreground/30 bg-foreground/10 text-foreground/50" : "border-foreground/20 text-transparent group-hover:border-foreground/35"}`} aria-hidden="true">
                              {done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </span>
                            <span className={`text-xs leading-relaxed transition-colors ${done ? "text-foreground/30 line-through" : "text-foreground/70"}`}>{item}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
