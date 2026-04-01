"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Prompt } from "@/lib/types";
import { PromptCard } from "@/components/prompts/prompt-card";

interface BrowseClientProps {
  categories: Category[];
  prompts: Prompt[];
}

export function BrowseClient({ categories, prompts }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const results = useMemo(() => {
    let list = [...prompts];

    if (category !== "all") {
      list = list.filter((prompt) => prompt.category === category);
    }

    if (query.trim()) {
      const q = normalize(query);
      list = list.filter((prompt) =>
        normalize(`${prompt.title} ${prompt.useCase} ${prompt.whenToUse} ${prompt.categoryName} ${prompt.tags.join(" ")} ${prompt.prompt}`).includes(q)
      );
    }

    list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return list;
  }, [category, prompts, query]);

  return (
    <article className="border border-foreground/20 overflow-hidden">
      {/* Search + categories */}
      <div className="border-b border-foreground/20 bg-foreground/[0.03] px-6 pt-4 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex flex-1 items-center border border-foreground/20 bg-background px-4 py-3 transition-colors focus-within:border-foreground/50">
            <svg
              className="mr-3 h-4 w-4 shrink-0 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder='Search prompts… e.g. "deploy", "debug", "refactor"'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2 shrink-0 text-xs text-muted-foreground/40 transition-colors hover:text-foreground">
                ✕
              </button>
            )}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground/40 tabular-nums">
            {results.length} prompts
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-6" style={{ gridTemplateRows: "repeat(2, auto)" }}>
          <button
            onClick={() => setCategory("all")}
            className={`border-2 px-3 py-2 text-xs transition-colors ${
              category === "all"
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                : "border-foreground/25 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`border-2 px-3 py-2 text-xs transition-colors ${
                category === c.slug
                  ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                  : "border-foreground/25 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              <span className="text-[9px] opacity-70">{String(i + 1).padStart(2, "0")}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {results.map((prompt, i) => (
            <div key={prompt.slug} className="border-b border-r border-foreground/20">
              <PromptCard prompt={prompt} number={i + 1} />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-8 py-20 text-center">
          <p className="text-sm text-muted-foreground">No prompts found.</p>
          <div className="mt-3 flex items-center justify-center gap-4">
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-foreground hover:underline">
                Clear search →
              </button>
            )}
            {category !== "all" && (
              <button onClick={() => setCategory("all")} className="text-xs text-foreground hover:underline">
                Clear filter →
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
