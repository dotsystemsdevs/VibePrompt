"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Category, Prompt } from "@/lib/types";

interface BrowseClientProps {
  categories: Category[];
  prompts: Prompt[];
}

export function BrowseClient({ categories, prompts }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<"new" | "popular">("new");
  const [copyCounts, setCopyCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (sort === "popular") {
      fetch("/api/copy-counts")
        .then((r) => r.json())
        .then((data: Record<string, number>) => setCopyCounts(data))
        .catch(() => {});
    }
  }, [sort]);

  const normalize = (v: string) =>
    v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const results = useMemo(() => {
    let list = [...prompts];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = normalize(query);
      list = list.filter((p) =>
        normalize(`${p.title} ${p.useCase} ${p.whenToUse} ${p.categoryName} ${p.tags.join(" ")} ${p.prompt}`).includes(q)
      );
    }
    if (sort === "popular") {
      list.sort((a, b) => (copyCounts[b.slug] ?? 0) - (copyCounts[a.slug] ?? 0));
    } else {
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [category, prompts, query, sort, copyCounts]);

  return (
    <div className="border border-foreground/20 overflow-hidden">
      {/* Search */}
      <div className="border-b border-foreground/12 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-4">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {query && <button onClick={() => setQuery("")} className="shrink-0 text-xs text-muted-foreground/40 hover:text-foreground">✕</button>}
          <div className="flex shrink-0 items-center gap-1 border-l border-foreground/12 pl-4">
            <button onClick={() => setSort("new")} className={`text-[10px] uppercase tracking-widest transition-colors ${sort === "new" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>New</button>
            <span className="text-foreground/15">|</span>
            <button onClick={() => setSort("popular")} className={`text-[10px] uppercase tracking-widest transition-colors ${sort === "popular" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Popular</button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="relative border-b border-foreground/12">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />
        <div className="flex items-center overflow-x-auto no-scrollbar px-4">
          <button onClick={() => setCategory("all")} className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${category === "all" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}>All</button>
          {categories.map((c) => (
            <button key={c.slug} onClick={() => setCategory(c.slug)} className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${category === c.slug ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}>{c.name}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2">
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/prompts/${p.slug}`}
              prefetch={false}
              className="group flex flex-col gap-3 border-b border-r border-foreground/[0.08] p-5 transition-colors hover:bg-foreground/[0.04]"
            >
              <div>
                <h3 className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.useCase}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <button
                      key={t}
                      onClick={(e) => { e.preventDefault(); setQuery(t); }}
                      className="text-[10px] transition-opacity hover:opacity-70"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-foreground/20 transition-colors group-hover:text-foreground/60">→</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-8 py-20 text-center">
          <p className="text-sm text-muted-foreground">No prompts found.</p>
          <div className="mt-3 flex justify-center gap-4">
            {query && <button onClick={() => setQuery("")} className="text-xs text-foreground hover:underline">Clear search →</button>}
            {category !== "all" && <button onClick={() => setCategory("all")} className="text-xs text-foreground hover:underline">Clear filter →</button>}
          </div>
        </div>
      )}
    </div>
  );
}
