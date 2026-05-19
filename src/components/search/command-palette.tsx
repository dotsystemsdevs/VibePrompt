"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/lib/search-data";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  article: "Article",
  prompt: "Prompt",
  problem: "Fix",
  page: "Page",
};

const TYPE_ORDER: SearchItem["type"][] = ["page", "article", "problem", "prompt"];

export function CommandPalette({ data }: { data: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return data.filter((d) => d.type === "page").slice(0, 8);
    }
    const matches = data.filter((d) => {
      return (
        d.title.toLowerCase().includes(q) ||
        (d.snippet ?? "").toLowerCase().includes(q) ||
        (d.category ?? "").toLowerCase().includes(q)
      );
    });
    return matches
      .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
      .slice(0, 30);
  }, [query, data]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function go(item: SearchItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[selectedIndex];
      if (item) go(item);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search vibeprompt"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-xl mx-4 border border-foreground/20 bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-foreground/12 px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-foreground/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search articles, prompts, fixes, pages..."
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-foreground/35 outline-none"
            autoComplete="off"
            aria-label="Search query"
          />
          <kbd className="hidden sm:inline-block rounded border border-foreground/15 px-1.5 py-0.5 font-mono text-[10px] text-foreground/40">
            esc
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[13px] text-foreground/55 mb-2">No matches.</p>
              <p className="text-[11px] text-foreground/35">
                Try shorter keywords like &ldquo;testflight&rdquo;, &ldquo;aso&rdquo;, &ldquo;refactor&rdquo;.
              </p>
            </div>
          ) : (
            <ul role="listbox" aria-label="Search results">
              {filtered.map((item, i) => {
                const active = i === selectedIndex;
                return (
                  <li key={`${item.type}-${item.id}`} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => go(item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left px-4 py-3 border-b border-foreground/[0.06] last:border-b-0 transition-colors ${
                        active ? "bg-foreground/[0.06]" : ""
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="shrink-0 w-12 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
                          {TYPE_LABEL[item.type]}
                        </span>
                        <span className="flex-1 min-w-0 text-[13px] font-medium text-foreground/90 leading-snug">
                          {item.title}
                        </span>
                      </div>
                      {item.snippet && (
                        <p className="mt-1 ml-[60px] text-[11px] leading-relaxed text-foreground/45 line-clamp-1">
                          {item.snippet}
                        </p>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-between border-t border-foreground/12 px-4 py-2 text-[10px] text-foreground/35">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> open</span>
          </div>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteTrigger() {
  function open() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open search (Cmd+K)"
      className="hidden md:inline-flex items-center gap-2 border border-foreground/20 px-3 py-1.5 text-xs text-foreground/55 transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
      </svg>
      <span>Search</span>
      <kbd className="font-mono text-[10px] text-foreground/35">⌘K</kbd>
    </button>
  );
}
