"use client";

import { useMemo, useState } from "react";

type Kind = "agents" | "prd";

const STORAGE_KEY = "vibeprompt-generator-v1";
const AI_ENABLED = process.env.NEXT_PUBLIC_AI_ENABLED === "true";

type FormData = {
  agents: {
    projectName: string;
    oneLiner: string;
    stack: string;
    fileConventions: string;
    noTouch: string;
  };
  prd: {
    projectName: string;
    targetUser: string;
    goal: string;
    why: string;
    features: string;
    outOfScope: string;
    successCriteria: string;
  };
};

const DEFAULT_DATA: FormData = {
  agents: {
    projectName: "",
    oneLiner: "",
    stack: "Next.js 16, TypeScript, Tailwind v4, Supabase, Vercel",
    fileConventions: "kebab-case filenames, PascalCase component exports, no file over 500 lines",
    noTouch: ".env, .env.local, package-lock.json, next.config.ts, /public",
  },
  prd: {
    projectName: "",
    targetUser: "",
    goal: "",
    why: "",
    features: "",
    outOfScope: "",
    successCriteria: "",
  },
};

function loadInitial(): FormData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<FormData>;
    return {
      agents: { ...DEFAULT_DATA.agents, ...(parsed.agents ?? {}) },
      prd: { ...DEFAULT_DATA.prd, ...(parsed.prd ?? {}) },
    };
  } catch {
    return DEFAULT_DATA;
  }
}

function persist(data: FormData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors etc.
  }
}

export function GeneratorClient() {
  const [kind, setKind] = useState<Kind>("agents");
  const [data, setData] = useState<FormData>(loadInitial);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [aiState, setAiState] = useState<"idle" | "loading" | "error">("idle");
  const [aiError, setAiError] = useState<string | null>(null);

  function update<K extends Kind>(k: K, field: keyof FormData[K], value: string) {
    setData((prev) => {
      const next = { ...prev, [k]: { ...prev[k], [field]: value } };
      persist(next);
      return next;
    });
    // Invalidate any AI output when inputs change so user re-generates.
    if (aiOutput !== null) setAiOutput(null);
  }

  // Reset AI state when switching tabs.
  function switchKind(next: Kind) {
    setKind(next);
    setAiOutput(null);
    setAiState("idle");
    setAiError(null);
  }

  async function enhanceWithAi() {
    setAiState("loading");
    setAiError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, data: data[kind] }),
      });
      const json = (await res.json()) as { markdown?: string; error?: string };
      if (!res.ok) {
        setAiError(json.error ?? "AI generation failed.");
        setAiState("error");
        return;
      }
      setAiOutput(json.markdown ?? "");
      setAiState("idle");
    } catch {
      setAiError("Network error. Try again.");
      setAiState("error");
    }
  }

  const templateOutput = useMemo(() => (kind === "agents" ? renderAgents(data.agents) : renderPrd(data.prd)), [kind, data]);
  const output = aiOutput ?? templateOutput;
  const filename = kind === "agents" ? "AGENTS.md" : "PRD.md";
  const isAi = aiOutput !== null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="mb-5 flex gap-1 border-b border-foreground/12">
          <TabButton active={kind === "agents"} onClick={() => switchKind("agents")}>
            AGENTS.md
          </TabButton>
          <TabButton active={kind === "prd"} onClick={() => switchKind("prd")}>
            PRD.md
          </TabButton>
        </div>

        {kind === "agents" ? (
          <div className="space-y-5">
            <Field
              label="Project name"
              value={data.agents.projectName}
              onChange={(v) => update("agents", "projectName", v)}
              placeholder="My SaaS"
            />
            <Field
              label="One-line description"
              value={data.agents.oneLiner}
              onChange={(v) => update("agents", "oneLiner", v)}
              placeholder="What it does in plain English. One sentence."
            />
            <Field
              label="Stack"
              value={data.agents.stack}
              onChange={(v) => update("agents", "stack", v)}
              placeholder="Next.js 16, TypeScript, Tailwind v4, Supabase, Vercel"
            />
            <Field
              textarea
              label="File conventions"
              value={data.agents.fileConventions}
              onChange={(v) => update("agents", "fileConventions", v)}
              placeholder="kebab-case filenames, PascalCase component exports, no file over 500 lines"
            />
            <Field
              textarea
              label="No-touch list (comma-separated)"
              value={data.agents.noTouch}
              onChange={(v) => update("agents", "noTouch", v)}
              placeholder=".env, .env.local, package-lock.json, next.config.ts"
            />
          </div>
        ) : (
          <div className="space-y-5">
            <Field
              label="Project name"
              value={data.prd.projectName}
              onChange={(v) => update("prd", "projectName", v)}
              placeholder="My SaaS"
            />
            <Field
              textarea
              label="Target user"
              value={data.prd.targetUser}
              onChange={(v) => update("prd", "targetUser", v)}
              placeholder="A freelance designer with 3-5 active clients who loses track of feedback threads."
            />
            <Field
              textarea
              label="Goal (one sentence)"
              value={data.prd.goal}
              onChange={(v) => update("prd", "goal", v)}
              placeholder="A minimal client portal where freelancers collect and track feedback."
            />
            <Field
              textarea
              label="Why (business value, what problem it solves)"
              value={data.prd.why}
              onChange={(v) => update("prd", "why", v)}
              placeholder="Freelancers lose hours per week sorting client feedback across email + Slack + Notion."
            />
            <Field
              textarea
              label="MVP features (one per line, max 5)"
              value={data.prd.features}
              onChange={(v) => update("prd", "features", v)}
              placeholder={"Client invite link\nFeedback thread per client\nMark thread resolved\nEmail digest\nSimple billing"}
            />
            <Field
              textarea
              label="Out of scope (one per line, at least 3)"
              value={data.prd.outOfScope}
              onChange={(v) => update("prd", "outOfScope", v)}
              placeholder={"No mobile app\nNo team accounts\nNo file uploads"}
            />
            <Field
              textarea
              label="Success criteria (one per line)"
              value={data.prd.successCriteria}
              onChange={(v) => update("prd", "successCriteria", v)}
              placeholder={"New user signs up, invites first client, and reaches dashboard in under 60s\nFirst paying user within 14 days of public launch"}
            />
          </div>
        )}
      </div>

      <OutputPanel
        markdown={output}
        filename={filename}
        onEnhance={enhanceWithAi}
        aiState={aiState}
        aiError={aiError}
        isAi={isAi}
        onRevertToTemplate={() => {
          setAiOutput(null);
          setAiState("idle");
          setAiError(null);
        }}
      />
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
        active ? "text-foreground" : "text-foreground/45 hover:text-foreground/75"
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-2 -bottom-px h-px bg-foreground" />}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const baseCls = "w-full border border-foreground/15 bg-transparent px-3 py-2 text-[13px] text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-foreground/45";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${baseCls} font-mono resize-vertical leading-relaxed`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseCls}
        />
      )}
    </label>
  );
}

function OutputPanel({
  markdown,
  filename,
  onEnhance,
  aiState,
  aiError,
  isAi,
  onRevertToTemplate,
}: {
  markdown: string;
  filename: string;
  onEnhance: () => void;
  aiState: "idle" | "loading" | "error";
  aiError: string | null;
  isAi: boolean;
  onRevertToTemplate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="lg:sticky lg:top-20 lg:self-start">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
          Preview · {filename}
          {isAi && <span className="ml-2 text-foreground/45">· AI-enhanced ✨</span>}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 border border-foreground/25 px-3 py-1.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.04]"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-1.5 border border-foreground/25 px-3 py-1.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.04]"
          >
            Download
          </button>
        </div>
      </div>
      <pre className="max-h-[600px] overflow-auto border border-foreground/15 bg-foreground/[0.02] p-4 text-[12px] leading-relaxed text-foreground/85 font-mono whitespace-pre-wrap">
        {markdown}
      </pre>

      {AI_ENABLED && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {!isAi ? (
            <button
              type="button"
              onClick={onEnhance}
              disabled={aiState === "loading"}
              className="inline-flex items-center gap-1.5 border border-foreground/45 bg-foreground/[0.04] px-3 py-1.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.08] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiState === "loading" ? "Generating…" : "Enhance with AI ✨"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onRevertToTemplate}
              className="inline-flex items-center gap-1.5 border border-foreground/25 px-3 py-1.5 text-[11px] font-semibold text-foreground/70 transition-colors hover:bg-foreground/[0.04]"
            >
              ← Revert to template
            </button>
          )}
          <p className="text-[10px] text-foreground/40">
            {isAi
              ? "AI version — re-generates when you edit inputs."
              : "AI version uses Claude Haiku. 5 per hour. Template version is free, unlimited."}
          </p>
        </div>
      )}

      {AI_ENABLED && aiError && (
        <p className="mt-2 text-[11px] text-red-500">{aiError}</p>
      )}

      <p className="mt-3 text-[10px] text-foreground/40">
        {AI_ENABLED
          ? "Template inputs save to your browser. Nothing leaves your machine unless you tap “Enhance with AI”."
          : "All inputs save to your browser. Nothing leaves your machine."}
      </p>
    </div>
  );
}

function renderAgents(d: FormData["agents"]): string {
  const name = d.projectName.trim() || "[Your project]";
  const oneLiner = d.oneLiner.trim() || "[What it does in plain English. One sentence.]";
  const stack = d.stack.trim() || "[Your stack]";
  const conventions = d.fileConventions.trim() || "[Your conventions]";
  const noTouch = d.noTouch
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `\`${s}\``)
    .join(", ") || "`.env`, `.env.local`, `package-lock.json`";

  return `# AGENTS.md

> The file every AI coding session reads first. Keep it short, specific, and updated.

## Project

**Name:** ${name}
**One-line:** ${oneLiner}
**Stack:** ${stack}

## Conventions

${conventions
  .split(/\n|,/)
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => `- ${s}`)
  .join("\n")}

## Hard rules

1. **Never overwrite existing code unless explicitly asked.** Read before writing.
2. **No new state, deps, or files unless I ask.** Use what's already imported.
3. **Every new feature needs 3 tests:** 1 expected use, 1 edge case, 1 failure case.
4. **No-touch list:** ${noTouch}.

## Memory bank

The \`memory-bank/\` folder holds long-lived context. Read before any task:

- \`@architecture.md\` — file map, where state lives, server/client boundaries (always read)
- \`@design-doc.md\` — the PRD, what we're building and why (always read)
- \`progress.md\` — completed steps, current state
- \`implementation-plan.md\` — ordered task list

## Session kickoff

At the start of every chat:

> Read AGENTS.md, docs/PRD.md, and memory-bank/@architecture.md before doing
> anything. Summarize what you understand before coding.

## Debugging contract

When something breaks:

1. Don't refactor. Reproduce the bug in isolation.
2. Add logging, run \`git bisect\` if the bug is regression-shaped.
3. Show me the minimum diff that fixes it.
4. Only then suggest broader cleanup.

---

_Template from [vibeprompt.tech](https://vibeprompt.tech/generator). Edit freely._
`;
}

function renderPrd(d: FormData["prd"]): string {
  const name = d.projectName.trim() || "[Project name]";
  const targetUser = d.targetUser.trim() || "[Who is this for? Be specific. Avoid \"developers\" or \"small businesses\".]";
  const goal = d.goal.trim() || "[One sentence. If you need two, you haven't decided yet.]";
  const why = d.why.trim() || "[Who benefits? What metric improves? Why does this matter to ship?]";

  const features = d.features
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const featuresBlock = features.length
    ? features.slice(0, 5).map((f, i) => `${i + 1}. ${f}`).join("\n")
    : "1. [Feature 1]\n2. [Feature 2]\n3. [Feature 3]\n4. [Feature 4]\n5. [Feature 5]";

  const outOfScope = d.outOfScope
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const outOfScopeBlock = outOfScope.length
    ? outOfScope.map((s) => `- No ${s.replace(/^no\s+/i, "")}`).join("\n")
    : "- No [feature you might be tempted to add]\n- No [another tempting one]\n- No [a third]";

  const success = d.successCriteria
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const successBlock = success.length
    ? success.map((s) => `- ${s}`).join("\n")
    : "- A new user signs up, verifies email, and reaches the dashboard in under 60 seconds without errors\n- [Criterion 2]\n- [Criterion 3]";

  return `# PRD — ${name}

> The one file you paste into every AI session before asking for code.

## Target user

${targetUser}

## Goal

${goal}

## Why

${why}

## What — MVP features (max 5)

${featuresBlock}

## Out of scope

${outOfScopeBlock}

## Success criteria

${successBlock}

---

_Save as \`docs/PRD.md\`. Reference from \`AGENTS.md\`. Paste the relevant section
into every AI session before asking for code._

_Template from [vibeprompt.tech](https://vibeprompt.tech/generator). Edit freely._
`;
}
