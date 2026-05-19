"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StepChecklist } from "./workflow-checklist";
import type { ArticleMeta } from "@/lib/articles";
import type { ListProblem } from "@/lib/list-problems";
import { LIST_CATEGORY_LABEL } from "@/lib/list-problems";

type Resource = { label: string; href: string; usage?: string[]; type?: "video" | "tool" | "article" };

export type TaskLink = { label: string; href: string };
export type TaskItem = { text: string; detail?: string; links?: TaskLink[] };
export type TaskGroup = { heading?: string; description?: string; badge?: string; items: TaskItem[]; resources?: Resource[] };

export type StepRelated = {
  articles: ArticleMeta[];
  fixes: ListProblem[];
};

export type StepData = {
  step: string;
  title: string;
  emoji: string;
  whatThis: string;
  why: string;
  tasks: TaskGroup[];
  commonMistakes: string[];
  resources: Resource[];
  output: string[];
  browseSlug: string;
  intro?: {
    forWho: string[];
    struggle: string[];
    origin: string;
  };
};

interface WorkflowStepperProps {
  steps: StepData[];
  relatedByStep?: Record<string, StepRelated>;
}

export function WorkflowStepper({ steps, relatedByStep = {} }: WorkflowStepperProps) {
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    function compute() {
      try {
        const raw = localStorage.getItem("vibeprompt-tasks-v1");
        const checked = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
        const completed = new Set<string>();
        steps.forEach((step) => {
          const flat = step.tasks.flatMap((g) => g.items);
          const allDone = flat.length > 0 && flat.every((_, i) => checked[`step-${step.step}-${i}`]);
          if (allDone) completed.add(step.step);
        });
        setCompletedSteps(completed);
      } catch {}
    }
    compute();
    window.addEventListener("vp-tasks-changed", compute);
    return () => window.removeEventListener("vp-tasks-changed", compute);
  }, [steps]);

  function go(i: number) {
    setCurrent(i);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const s = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const taskCount = s.tasks.reduce((n, g) => n + g.items.filter(i => !i.text.startsWith("Watch:") && !i.text.startsWith("Read:")).length, 0);
  const learnCount = s.tasks.reduce((n, g) => n + g.items.filter(i => i.text.startsWith("Watch:") || i.text.startsWith("Read:")).length, 0);

  const related = relatedByStep[s.step] ?? { articles: [], fixes: [] };
  const relatedArticles = related.articles;
  const relatedProblems = related.fixes;

  return (
    <div className="border border-foreground/20 overflow-hidden">

      {/* Step tabs, same as category tabs in browse/awesome */}
      <div className="relative border-b border-foreground/12">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />
        <div className="flex items-center overflow-x-auto no-scrollbar px-4">
          {steps.map((step, i) => {
            const isActive = i === current;
            const isDone = completedSteps.has(step.step);
            return (
              <button
                key={step.step}
                onClick={() => go(i)}
                className={`shrink-0 flex items-center gap-1.5 border-b-2 px-3 py-3.5 text-xs transition-colors ${
                  isActive ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {isDone && (
                  <span className="font-mono text-[10px] tabular-nums text-foreground/40">✓</span>
                )}
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step header */}
      <div className="border-b border-foreground/12 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {s.step !== ", " && (
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/30">
                Step {s.step}
              </p>
            )}
            <h2 className="text-base font-semibold text-foreground/90 sm:text-sm">{s.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.whatThis}</p>
          </div>
          {(taskCount > 0 || learnCount > 0) && (
            <div className="shrink-0 flex flex-col items-end gap-1 pt-0.5">
              {taskCount > 0 && <span className="font-mono text-[10px] tabular-nums text-foreground/25">{taskCount} tasks</span>}
              {learnCount > 0 && <span className="font-mono text-[10px] tabular-nums text-foreground/20">{learnCount} resources</span>}
            </div>
          )}
        </div>
      </div>

      {/* Intro (Before You Start) */}
      {s.intro && (
        <>
          <div className="flex items-center gap-3 border-b border-foreground/[0.06] bg-foreground/[0.02] px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">This is for you if</span>
          </div>
          <div className="divide-y divide-foreground/[0.06]">
            {s.intro.forWho.map((line, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-4 sm:px-6 sm:py-3.5">
                <span className="shrink-0 mt-1 text-foreground/20">◆</span>
                <p className="text-sm leading-relaxed text-foreground/80">{line}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 border-y border-foreground/[0.06] bg-foreground/[0.02] px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">The struggle</span>
          </div>
          <div className="divide-y divide-foreground/[0.06]">
            {s.intro.struggle.map((line, i) => (
              <div key={i} className="px-4 py-4 sm:px-6 sm:py-3.5">
                <div className="border-l-2 border-foreground/[0.08] pl-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{line}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-foreground/[0.06] px-4 py-4 sm:px-6">
            <p className="text-xs italic text-muted-foreground/50">,  {s.intro.origin}</p>
          </div>
        </>
      )}

      {/* Tasks */}
      {s.tasks.length > 0 && (
        <StepChecklist
          step={s.step}
          items={s.tasks}
          startIndex={0}
          storageKey="vibeprompt-tasks-v1"
        />
      )}

      {/* Prompts CTA, as row */}
      {s.browseSlug && (
        <Link
          href={`/browse?category=${s.browseSlug}`}
          className="group flex items-center gap-4 border-t border-foreground/12 px-4 py-4 sm:px-6 sm:py-3.5 transition-colors hover:bg-foreground/[0.03]"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/60 transition-colors group-hover:text-foreground/90">Prompts for this step</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground/40">Battle-tested prompts, ready to copy</p>
          </div>
          <span className="text-[11px] text-foreground/25 transition-colors group-hover:text-foreground/70">Browse →</span>
        </Link>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-foreground/12">
          <div className="flex items-center gap-3 bg-foreground/[0.02] px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
              Read this for depth
            </span>
          </div>
          <div className="divide-y divide-foreground/[0.06]">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group flex items-start gap-3 px-4 py-3.5 sm:px-6 transition-colors hover:bg-foreground/[0.03]"
              >
                <span className="shrink-0 mt-1 text-foreground/20 text-[10px]">◆</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium leading-snug text-foreground/85 transition-colors group-hover:text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-foreground/45 line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <span className="shrink-0 mt-1 text-[9px] text-foreground/20 transition-colors group-hover:text-foreground/45">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related fixes — when things break at this step */}
      {relatedProblems.length > 0 && (
        <div className="border-t border-foreground/12">
          <div className="flex items-center gap-3 bg-foreground/[0.02] px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
              When it breaks
            </span>
          </div>
          <div className="divide-y divide-foreground/[0.06]">
            {relatedProblems.map((problem) => (
              <Link
                key={problem.id}
                href={problem.articleSlug ? `/articles/${problem.articleSlug}#${problem.id}` : "/articles"}
                className="group flex items-baseline gap-3 px-4 py-3 sm:px-6 transition-colors hover:bg-foreground/[0.03]"
              >
                <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/30 w-12">
                  {LIST_CATEGORY_LABEL[problem.category]}
                </span>
                <span className="flex-1 text-[12px] leading-snug text-foreground/65 transition-colors group-hover:text-foreground">
                  {problem.title}
                </span>
                <span className="shrink-0 text-[9px] text-foreground/20 transition-colors group-hover:text-foreground/45">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next, as footer row */}
      <div className="flex border-t border-foreground/12">
        <button
          onClick={() => go(current - 1)}
          disabled={isFirst}
          className="flex flex-1 items-center gap-2 border-r border-foreground/12 px-4 py-4 sm:px-6 text-xs text-muted-foreground transition-colors hover:bg-foreground/[0.03] hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          <span>←</span>
          <span>{steps[current - 1]?.title}</span>
        </button>
        <button
          onClick={() => go(current + 1)}
          disabled={isLast}
          className="flex flex-1 items-center justify-end gap-2 px-4 py-4 sm:px-6 text-xs text-muted-foreground transition-colors hover:bg-foreground/[0.03] hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          <span>{steps[current + 1]?.title}</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
