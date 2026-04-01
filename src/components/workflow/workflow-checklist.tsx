"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STEPS = [
  {
    step: "00",
    title: "Setup Your Environment",
    emoji: "⚙️",
    items: [
      "Code editor installed and open",
      "GitHub account created and first repo ready",
      "Node.js installed — node -v returns a version number",
      "One project running locally",
    ],
  },
  {
    step: "01",
    title: "Validate",
    emoji: "🔍",
    items: [
      "3 competitors listed with one specific gap each",
      "5–10 real complaints saved (links, not paraphrases)",
      "Differentiator written in one sentence",
      "Kill criteria written before any code",
    ],
  },
  {
    step: "02",
    title: "Specify",
    emoji: "📝",
    items: [
      "One target user described in two sentences",
      "Problem written in one sentence with no solution in it",
      "Five or fewer MVP features listed",
      "Out-of-scope list with at least three explicit exclusions",
      "Done condition written as a testable statement",
    ],
  },
  {
    step: "03",
    title: "Design Stack",
    emoji: "🎨",
    items: [
      "Framework and UI system chosen and written in TechDesign.md",
      "Database and auth provider chosen — no open decisions",
      "Deployment target connected and working",
      "All dependency versions pinned in package.json",
    ],
  },
  {
    step: "04",
    title: "Context Setup",
    emoji: "🗂️",
    items: [
      "AGENTS.md in repo root with stack, structure, and conventions",
      "No-touch list with at least three critical files named",
      "PRD summary (3 sentences) inside AGENTS.md",
      "First session run with AGENTS.md loaded",
    ],
  },
  {
    step: "05",
    title: "Build in Loops",
    emoji: "🔄",
    items: [
      "PRD broken into 20–30 atomic tasks",
      "At least one feature shipped with a clean commit history",
      "Zero unreviewed diffs accepted",
    ],
  },
  {
    step: "06",
    title: "Quality Gates",
    emoji: "🛡️",
    items: [
      "All changed files reviewed against PRD — no undocumented features",
      "No secrets in code or git history",
      "TypeScript build passes with zero errors",
      "At least one E2E test passes on the primary flow",
    ],
  },
  {
    step: "07",
    title: "Ship & Observe",
    emoji: "🚀",
    items: [
      "Live URL accessible without a login wall",
      "PostHog installed and recording sessions",
      "Sentry installed and catching errors",
      "At least one real user session watched end to end",
    ],
  },
  {
    step: "08",
    title: "Iterate",
    emoji: "🔁",
    items: [
      "3 friction points identified from session data — not assumptions",
      "PRD updated to reflect new scope",
      "Update shipped and live",
      "Specific metric checked to confirm improvement",
    ],
  },
];

const STORAGE_KEY = "vibeprompt-workflow-progress";

function key(step: string, i: number) {
  return `${step}-${i}`;
}

export function WorkflowChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

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
    <div>
      {/* Overall progress */}
      <div className="border-b border-border px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Your build progress</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{totalDone} of {totalItems} steps completed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-foreground transition-all duration-300"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="w-8 text-right font-mono text-xs text-muted-foreground">{overallPct}%</span>
        </div>
      </div>

      {/* Steps */}
      <div className="divide-y divide-border border-b border-border">
        {STEPS.map((s) => {
          const stepDone = s.items.filter((_, i) => checked[key(s.step, i)]).length;
          const stepTotal = s.items.length;
          const complete = stepDone === stepTotal;

          return (
            <div key={s.step} className="px-6 py-5">
              {/* Step header */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 border border-border px-1.5 py-0.5">
                    {s.step}
                  </span>
                  <span aria-hidden="true">{s.emoji}</span>
                  <span className={`text-sm font-medium ${complete ? "text-foreground/40 line-through" : "text-foreground"}`}>
                    {s.title}
                  </span>
                </div>
                <span className={`shrink-0 font-mono text-xs tabular-nums ${complete ? "text-foreground/40" : "text-muted-foreground"}`}>
                  {stepDone}/{stepTotal}
                </span>
              </div>

              {/* Checklist items */}
              <ul className="space-y-2">
                {s.items.map((item, i) => {
                  const k = key(s.step, i);
                  const done = !!checked[k];
                  return (
                    <li key={i}>
                      <label className="flex cursor-pointer items-start gap-3 group">
                        <span
                          onClick={() => toggle(k)}
                          className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${
                            done
                              ? "border-foreground/30 bg-foreground/10 text-foreground/50"
                              : "border-border text-transparent group-hover:border-foreground/30"
                          }`}
                          role="checkbox"
                          aria-checked={done}
                          tabIndex={0}
                          onKeyDown={(e) => e.key === " " && toggle(k)}
                        >
                          {done && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span
                          onClick={() => toggle(k)}
                          className={`text-sm leading-relaxed transition-colors ${
                            done ? "text-muted-foreground/40 line-through" : "text-foreground/80"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4">
        <Link
          href="/workflow"
          className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          View full workflow →
        </Link>
      </div>
    </div>
  );
}
