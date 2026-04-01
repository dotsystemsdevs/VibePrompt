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

  function selectCat(slug: string) {
    setActiveSlug(slug);
  }

  return (
    <article className="border border-foreground/20 overflow-hidden">
      {/* Search + categories */}
      <div className="border-b-2 border-foreground/25 bg-foreground/[0.03] px-6 pt-4 pb-4">
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
              placeholder='Search tools… e.g. "deploy", "auth", "analytics"'
              value={query}
              onChange={(e) => { setQuery(e.target.value); }}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="ml-2 shrink-0 text-xs text-muted-foreground/40 transition-colors hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground/40 tabular-nums">
            {sortedFilteredItems.length} tools
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-6" style={{ gridTemplateRows: "repeat(2, auto)" }}>
          <button
            onClick={() => selectCat("all")}
            className={`border-2 px-3 py-2 text-xs transition-colors ${
              activeSlug === "all"
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                : "border-foreground/25 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => selectCat(cat.slug)}
              className={`border-2 px-3 py-2 text-xs transition-colors ${
                activeSlug === cat.slug
                  ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                  : "border-foreground/25 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              <span className="text-[9px] opacity-70">{String(i).padStart(2, "0")}</span> {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {sortedFilteredItems.length > 0 ? (
        <div className="divide-y divide-foreground/15">
          {sortedFilteredItems.map((item) => (
            <a
              key={`${item.catSlug}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 px-6 py-4 transition-colors hover:bg-card"
            >
              <div className="flex items-center gap-5 min-w-0">
                <Favicon href={item.href} emoji={item.catEmoji} />
                <p className="w-40 shrink-0 text-sm font-semibold text-foreground">{item.name}</p>
                <p className="truncate text-xs text-muted-foreground">{item.description}</p>
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
              <button onClick={() => selectCat("all")} className="text-xs text-foreground hover:underline">
                Clear filter →
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
