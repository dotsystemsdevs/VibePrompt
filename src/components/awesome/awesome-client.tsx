"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwesomeCategory } from "@/lib/awesome-data";

function Favicon({ href, emoji }: { href: string; emoji: string }) {
  const domain = new URL(href).hostname;
  const [failed, setFailed] = useState(false);

  if (failed) return <span className="text-sm leading-none">{emoji}</span>;

  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt=""
      width={20}
      height={20}
      className="h-5 w-5 shrink-0 rounded-full"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

export function AwesomeClient({ categories }: { categories: readonly AwesomeCategory[] }) {
  const [activeSlug, setActiveSlug] = useState("all");
  const [query, setQuery] = useState("");

  const allItems = useMemo(
    () => categories.flatMap((cat) => cat.items.map((item) => ({ ...item, catSlug: cat.slug, catEmoji: cat.emoji, catTitle: cat.title }))),
    [categories]
  );

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchesCat = activeSlug === "all" || item.catSlug === activeSlug;
      if (!q) return matchesCat;

      const isGithub = item.href.includes("github.com");
      const domain = (() => { try { return new URL(item.href).hostname.replace("www.", ""); } catch { return ""; } })();
      const implicitTags = [
        isGithub ? "open source opensource free github oss" : "",
        domain,
        item.catTitle,
      ].join(" ").toLowerCase();

      const searchable = `${item.name} ${item.description} ${implicitTags}`.toLowerCase();
      const matchesQuery = q.split(/\s+/).every((term) => searchable.includes(term));
      return matchesCat && matchesQuery;
    });
  }, [allItems, activeSlug, query]);

  const sortedFilteredItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  return (
    <div className="border border-foreground/20 overflow-hidden">
      {/* Search bar — prominent */}
      <div className="border-b border-foreground/12 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-4">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tools, categories, open source…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="shrink-0 text-xs text-muted-foreground/40 hover:text-foreground">✕</button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="relative border-b border-foreground/12">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />
        <div className="flex items-center overflow-x-auto no-scrollbar px-4">
          <button
            onClick={() => setActiveSlug("all")}
            className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${activeSlug === "all" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${activeSlug === cat.slug ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/80"}`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {sortedFilteredItems.length > 0 ? (
        <div className="divide-y divide-foreground/[0.06]">
          {sortedFilteredItems.map((item) => (
            <a
              key={`${item.catSlug}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-4 py-4 sm:px-6 sm:py-3.5 transition-colors hover:bg-foreground/[0.03]"
            >
              <Favicon href={item.href} emoji={item.catEmoji} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{item.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <p className="truncate text-xs text-muted-foreground/70">{item.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={(e) => { e.preventDefault(); setActiveSlug(item.catSlug); }}
                  className="text-[10px] transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent-blue)" }}
                >
                  #{item.catTitle.toLowerCase()}
                </button>
                <span className="text-xs text-foreground/20 transition-colors group-hover:text-foreground/50">↗</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="px-6 py-20 text-center">
          <p className="text-sm text-muted-foreground">No tools found.</p>
          <div className="mt-3 flex items-center justify-center gap-4">
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-foreground hover:underline">
                Clear search →
              </button>
            )}
            {activeSlug !== "all" && (
              <button onClick={() => setActiveSlug("all")} className="text-xs text-foreground hover:underline">
                Clear filter →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
