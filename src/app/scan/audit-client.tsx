"use client";

import { useState, useRef, useEffect } from "react";
import type { AuditResult, Finding } from "@/app/api/audit/route";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "result"; data: AuditResult }
  | { status: "error"; message: string };

type FilterKey = "all" | "quickwins" | string;

const SEV_COLOR: Record<string, string> = { high: "#ef4444", medium: "#f97316", low: "#6b7280" };
const CAT_LABEL: Record<string, string> = {
  seo: "SEO", conversion: "Conversion", trust: "Trust", structure: "Structure",
  performance: "Performance", security: "Security", aeo: "AI / AEO",
};

function scoreColor(s: number) { return s >= 75 ? "#3b82f6" : s >= 50 ? "#f97316" : "#ef4444"; }

export function CountUp({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target <= 0) return;
    const start = { t: 0 };
    function tick(ts: number) {
      if (!start.t) start.t = ts;
      const elapsed = ts - start.t;
      const duration = Math.min(1200 + target * 0.4, 2400);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return <span className="font-mono tabular-nums">{display.toLocaleString()}</span>;
}

// ── Finding row ──────────────────────────────────────────────────────────────

const SEV_LABEL: Record<string, string> = { high: "High", medium: "Med", low: "Low" };

function FindingRow({ f, activeFilter }: { f: Finding; isQuickWin: boolean; activeFilter: FilterKey }) {
  return (
    <div className="flex gap-3 px-5 py-3 border-b border-foreground/6 last:border-0">
      <span
        className="shrink-0 mt-[3px] text-[9px] font-semibold uppercase tracking-wide w-7"
        style={{ color: SEV_COLOR[f.severity] }}
      >
        {SEV_LABEL[f.severity]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-[12px] font-medium text-foreground/75 leading-snug">{f.title}</p>
          {activeFilter !== f.category && (
            <span className="text-[9px] text-foreground/20 shrink-0">{CAT_LABEL[f.category]}</span>
          )}
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-foreground/35">{f.fix}</p>
      </div>
    </div>
  );
}

// ── Result panel ─────────────────────────────────────────────────────────────

function ResultPanel({ data }: { data: AuditResult }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const hostname = (() => { try { return new URL(data.url).hostname; } catch { return data.url; } })();
  const quickWinIds = new Set(data.quickWins.map((f) => f.id));
  const activeCategories = Array.from(new Set(data.findings.map((f) => f.category)));

  const tabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: data.findings.length },
    ...(data.quickWins.length > 0 ? [{ key: "quickwins" as FilterKey, label: "Quick wins", count: data.quickWins.length }] : []),
    ...activeCategories.map((cat) => ({ key: cat, label: CAT_LABEL[cat], count: data.findings.filter((f) => f.category === cat).length })),
  ];

  const filtered =
    filter === "all" ? data.findings
    : filter === "quickwins" ? data.findings.filter((f) => quickWinIds.has(f.id))
    : data.findings.filter((f) => f.category === filter);

  const sc = scoreColor(data.score);

  return (
    <div className="mt-8 space-y-6">
      {data.isSPA && (
        <div className="border border-yellow-500/20 bg-yellow-500/[0.03] px-4 py-3">
          <p className="text-xs font-medium text-yellow-400/70">Client-rendered page, results may be incomplete</p>
        </div>
      )}

      {/* ── Score card ── */}
      <div className="border border-foreground/12 overflow-hidden">
        {/* Header, favicon + hostname + overall score */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-foreground/8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://icons.duckduckgo.com/ip3/${hostname}.ico`} alt="" width={16} height={16} className="shrink-0 rounded-sm ring-1 ring-foreground/15" />
          <span className="flex-1 text-sm font-semibold text-foreground/70 truncate">{hostname}</span>
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="text-2xl font-black tabular-nums leading-none" style={{ color: sc }}>{data.score}</span>
            <span className="text-[10px] text-foreground/20 font-medium">/100</span>
          </div>
        </div>

        {/* Category rows, clickable to filter */}
        <div className="divide-y divide-foreground/[0.05]">
          {(Object.entries(data.categories) as [string, { score: number; label: string }][]).map(([key, cat]) => {
            const c = scoreColor(cat.score);
            const isActive = filter === key;
            const issueCount = data.findings.filter((f) => f.category === key).length;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(isActive ? "all" : key)}
                className={`w-full flex items-center gap-4 px-5 py-2 transition-colors text-left ${isActive ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.025]"}`}
              >
                <span className="w-24 shrink-0 text-[10px] text-foreground/55">{cat.label}</span>
                <div className="flex-1 h-[3px] rounded-full bg-foreground/10">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cat.score}%`, background: c }} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {issueCount > 0 && (
                    <span className="text-[9px] text-foreground/25 tabular-nums">{issueCount} issue{issueCount !== 1 ? "s" : ""}</span>
                  )}
                  <span className="w-6 text-right font-mono text-[11px] tabular-nums font-semibold" style={{ color: c }}>{cat.score}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Findings card ── */}
      {data.findings.length > 0 && (
        <div className="border border-foreground/12 overflow-hidden">
          {/* Tab bar */}
          <div className="flex flex-wrap border-b border-foreground/8">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-[11px] border-b-2 -mb-px transition-colors ${
                    active
                      ? "border-foreground/50 text-foreground/75 font-medium"
                      : "border-transparent text-foreground/30 hover:text-foreground/55"
                  }`}
                >
                  {tab.label}
                  <span className={`text-[9px] font-mono tabular-nums ${active ? "text-foreground/40" : "text-foreground/20"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            {filtered.length === 0
              ? <p className="py-8 text-center text-xs text-foreground/25">No findings in this category.</p>
              : filtered.map((f) => <FindingRow key={f.id} f={f} isQuickWin={quickWinIds.has(f.id)} activeFilter={filter} />)
            }
          </div>
        </div>
      )}

      {data.findings.length === 0 && (
        <div className="border border-foreground/15 px-5 py-10 text-center">
          <p className="text-sm font-medium text-foreground/70">No issues found</p>
          <p className="mt-1 text-xs text-foreground/30">This page passes all audit checks.</p>
        </div>
      )}

<p className="text-[9px] text-foreground/20">
        Scanned {new Date(data.scannedAt).toLocaleString()} · Static HTML only
      </p>
    </div>
  );
}

// ── Demo panel ────────────────────────────────────────────────────────────────

const DEMO_CATS = [
  { label: "SEO", score: 70 }, { label: "Conversion", score: 48 },
  { label: "Security", score: 55 }, { label: "AI / AEO", score: 40 },
];
const DEMO_FINDINGS = [
  { id: "d1", sev: "high" as const, cat: "conversion", title: "No CTA above the fold", fix: "Add a prominent button with action-oriented copy like 'Start for free'." },
  { id: "d2", sev: "medium" as const, cat: "seo", title: "Missing meta description", fix: "Write a 140–160 char description with your core value proposition." },
  { id: "d3", sev: "medium" as const, cat: "security", title: "Missing Strict-Transport-Security", fix: "Add HSTS header: max-age=31536000; includeSubDomains" },
  { id: "d4", sev: "low" as const, cat: "aeo", title: "No llms.txt file", fix: "Create /llms.txt describing your site for AI search engines." },
];

function DemoPanel() {
  return (
    <div className="mt-10 select-none pointer-events-none opacity-40">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-foreground/8" />
        <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/30">Example result</span>
        <div className="h-px flex-1 bg-foreground/8" />
      </div>

      {/* Score card, matches real ResultPanel */}
      <div className="border border-foreground/10 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-foreground/8">
          <div className="w-4 h-4 rounded-sm bg-foreground/15 shrink-0" />
          <span className="flex-1 text-sm font-semibold text-foreground/30 truncate">yoursite.com</span>
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="text-2xl font-black tabular-nums leading-none text-foreground/30">62</span>
            <span className="text-[10px] text-foreground/15 font-medium">/100</span>
          </div>
        </div>
        <div className="divide-y divide-foreground/[0.04]">
          {DEMO_CATS.map(({ label, score }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-2">
              <span className="w-24 shrink-0 text-[10px] text-foreground/25">{label}</span>
              <div className="flex-1 h-[3px] rounded-full bg-foreground/8">
                <div className="h-full rounded-full bg-foreground/20" style={{ width: `${score}%` }} />
              </div>
              <span className="w-6 text-right font-mono text-[11px] text-foreground/20">{score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Findings, matches real FindingRow */}
      <div className="mt-4 border border-foreground/8 overflow-hidden">
        {DEMO_FINDINGS.map((f) => (
          <div key={f.id} className="flex gap-3 px-5 py-3 border-b border-foreground/6 last:border-0">
            <span className="shrink-0 mt-[3px] text-[9px] font-semibold uppercase tracking-wide w-7 text-foreground/20">
              {SEV_LABEL[f.sev]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="text-[12px] font-medium text-foreground/35">{f.title}</p>
                <span className="text-[9px] text-foreground/15">{CAT_LABEL[f.cat]}</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-foreground/20">{f.fix}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AuditClient() {
  const [state, setState] = useState<State>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  async function runScan(url: string) {
    if (inputRef.current) inputRef.current.value = url;
    setState({ status: "loading" });
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok || data.error) { setState({ status: "error", message: data.error ?? "Unknown error" }); return; }
      setState({ status: "result", data });
      window.history.pushState(null, "", `/scan?url=${encodeURIComponent(url)}`);
    } catch {
      setState({ status: "error", message: "Network error, check your connection and try again." });
    }
  }

  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get("url");
    if (u) runScan(u); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    const url = inputRef.current?.value.trim() ?? "";
    if (!url) return;
    runScan(url);
  }

  function reset() {
    setState({ status: "idle" });
    if (inputRef.current) inputRef.current.value = "";
    window.history.pushState(null, "", "/scan");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20">
      <div className="max-w-2xl">
      <form onSubmit={handleScan} className="flex">
        <input
          ref={inputRef}
          type="url"
          placeholder="https://yoursite.com"
          required
          className="flex-1 border border-foreground/20 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-foreground/40 transition-colors"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="shrink-0 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
        >
          {state.status === "loading"
            ? <span className="flex items-center gap-2"><span className="h-3 w-3 animate-spin rounded-full border border-foreground/30 border-t-foreground/70" />Scanning</span>
            : "Scan →"}
        </button>
      </form>

      {state.status === "idle" && (
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {["stripe.com", "linear.app", "vercel.com"].map((site) => (
            <button
              key={site}
              type="button"
              onClick={() => runScan(`https://${site}`)}
              className="text-[10px] text-foreground/30 hover:text-foreground/60 border border-foreground/10 hover:border-foreground/25 px-2 py-0.5 transition-colors"
            >
              {site}
            </button>
          ))}
        </div>
      )}

      {state.status === "loading" && (
        <div className="mt-8 px-5 py-6 border border-foreground/8">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-spin rounded-full border border-foreground/15 border-t-foreground/50 shrink-0" />
            <p className="text-sm text-foreground/40">Fetching and running audit rules…</p>
          </div>
          <div className="mt-3 space-y-1">
            {["SEO signals", "Conversion elements", "Trust & security headers", "AI discoverability"].map((s) => (
              <p key={s} className="text-[10px] text-foreground/20">{s}…</p>
            ))}
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-6 border border-red-500/15 bg-red-500/[0.03] px-4 py-4">
          <p className="text-xs font-medium text-red-400/80">Scan failed</p>
          <p className="mt-0.5 text-xs text-foreground/40">{state.message}</p>
          <button type="button" onClick={reset} className="mt-2 text-[10px] text-foreground/35 hover:text-foreground/55 underline transition-colors">Try again</button>
        </div>
      )}

      {state.status === "result" && <ResultPanel data={state.data} />}
      {state.status === "idle" && <DemoPanel />}
      </div>
    </div>
  );
}
