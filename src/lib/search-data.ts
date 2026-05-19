import "server-only";
import { getAllArticles } from "@/lib/articles";
import { getPromptLibrary } from "@/lib/prompt-library";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export type SearchItem = {
  type: "article" | "prompt" | "problem" | "page";
  id: string;
  title: string;
  href: string;
  snippet?: string;
  category?: string;
};

const STATIC_PAGES: SearchItem[] = [
  { type: "page", id: "workflow", title: "The 9-step workflow", href: "/workflow", snippet: "Interactive build loop from idea to shipped." },
  { type: "page", id: "browse", title: "Prompt library", href: "/browse", snippet: "Battle-tested prompts grouped by stage." },
  { type: "page", id: "articles", title: "Articles", href: "/articles", snippet: "Deep-dives with real receipts from shipped apps." },
  { type: "page", id: "templates", title: "Templates", href: "/templates", snippet: "AGENTS.md, PRD, memory-bank, implementation plan." },
  { type: "page", id: "awesome", title: "Awesome tools", href: "/awesome", snippet: "Curated tools, platforms, and resources." },
  { type: "page", id: "scan", title: "Scan a site", href: "/scan", snippet: "Free site auditor for SEO, conversion, security." },
  { type: "page", id: "vs-books", title: "vs. the vibe coding books", href: "/vs-books", snippet: "How vibeprompt compares to Gene Kim and Smykowski." },
  { type: "page", id: "faq", title: "FAQ", href: "/faq", snippet: "Frequently asked questions." },
];

export async function getSearchData(): Promise<SearchItem[]> {
  const [{ prompts }, articles] = await Promise.all([
    getPromptLibrary(),
    getAllArticles(),
  ]);

  const articleItems: SearchItem[] = articles.map((a) => ({
    type: "article",
    id: a.slug,
    title: a.title,
    href: `/articles/${a.slug}`,
    snippet: a.description,
    category: a.category,
  }));

  const promptItems: SearchItem[] = prompts.map((p) => ({
    type: "prompt",
    id: p.slug,
    title: p.title,
    href: `/prompts/${p.slug}`,
    snippet: p.useCase,
    category: p.categoryName,
  }));

  const problemItems: SearchItem[] = LIST_PROBLEMS.map((p) => ({
    type: "problem",
    id: p.id,
    title: p.title,
    href: `/articles/${p.articleSlug}#${p.id}`,
    snippet: p.answer.slice(0, 140),
    category: p.category,
  }));

  return [...STATIC_PAGES, ...articleItems, ...promptItems, ...problemItems];
}
