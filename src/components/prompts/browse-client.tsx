"use client";

import { useState, useMemo } from "react";
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
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [category, prompts, query]);

  return (
    <div className="border border-foreground/20 overflow-hidden">
      {/* Search */}
      <div className="border-b border-foreground/12 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-4 focus-within:ring-1 focus-within:ring-foreground/20 rounded-sm">
          <label htmlFor="browse-search" className="sr-only">Search prompts</label>
          <svg className="h-4 w-4 shrink-0 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            id="browse-search"
            type="text"
            placeholder="Search prompts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base sm:text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="shrink-0 text-xs text-muted-foreground/40 hover:text-foreground">✕</button>}
        </div>
      </div>

      {/* Category filter, select on mobile, tabs on desktop */}
      <div className="border-b border-foreground/12">
        {/* Mobile */}
        <div className="sm:hidden px-4 py-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-background border border-foreground/15 text-xs text-foreground/70 outline-none cursor-pointer px-3 py-2.5 appearance-none"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        {/* Desktop */}
        <div className="relative hidden sm:block">
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />
          <div className="flex items-center overflow-x-auto no-scrollbar px-4">
            <button onClick={() => setCategory("all")} className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${category === "all" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}>All</button>
            {categories.map((c) => (
              <button key={c.slug} onClick={() => setCategory(c.slug)} className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${category === c.slug ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}>{c.name}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/prompts/${p.slug}`}
              prefetch={false}
              className="group flex flex-col gap-3 border-b sm:border-r border-foreground/[0.08] p-5 transition-colors hover:bg-foreground/[0.04]"
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
