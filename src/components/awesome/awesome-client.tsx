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
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
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
  const [query, setQuery] = useState("");

  const allItems = useMemo(
    () => categories.flatMap((cat) => cat.items.map((item) => ({ ...item, catSlug: cat.slug, catEmoji: cat.emoji, catTitle: cat.title }))),
    [categories]
  );

  const sortedFilteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = q
      ? allItems.filter((item) => {
          const searchable = `${item.name} ${item.description} ${item.tags.join(" ")} ${item.catTitle}`.toLowerCase();
          return q.split(/\s+/).every((term) => searchable.includes(term));
        })
      : allItems;
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [allItems, query]);

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
            placeholder="Search tools, tags, open source…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="shrink-0 text-xs text-muted-foreground/40 hover:text-foreground">✕</button>
          )}
        </div>
      </div>

      {/* List */}
      {sortedFilteredItems.length > 0 ? (
        <div className="divide-y divide-foreground/[0.06]">
          {sortedFilteredItems.map((item) => (
            <a
              key={`${item.catSlug}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-4 py-3.5 sm:px-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <div className="shrink-0">
                <Favicon href={item.href} emoji={item.catEmoji} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{item.name}</p>
                  <span className="text-xs text-foreground/20 transition-colors group-hover:text-foreground/50">↗</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground/70">{item.description}</p>
              </div>
              <div className="hidden sm:flex shrink-0 flex-wrap justify-end gap-x-2 gap-y-1 max-w-[40%]">
                {item.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => { e.preventDefault(); setQuery(tag); }}
                    className="text-[10px] text-foreground/30 hover:text-foreground/60 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="px-6 py-20 text-center">
          <p className="text-sm text-muted-foreground">No tools found.</p>
          {query && (
            <button onClick={() => setQuery("")} className="mt-3 text-xs text-foreground hover:underline">
              Clear search →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
