import type { Metadata } from "next";
import Link from "next/link";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "FAQ — vibeprompt · AI Prompt Library for Vibe Coders",
  description:
    "Frequently asked questions about vibeprompt — the free AI prompt library, 9-step vibe coding workflow, articles, and field-tested fixes for developers using Claude Code, Cursor, Windsurf, and Aider.",
  alternates: { canonical: "https://vibeprompt.tech/faq" },
  openGraph: {
    title: "FAQ — vibeprompt",
    description:
      "Everything about the open-source AI prompt library, workflow, and fixes for developers.",
    url: "https://vibeprompt.tech/faq",
    type: "website",
  },
};

function buildFaq(promptsCount: number, fixesCount: number, articlesCount: number): { q: string; a: string }[] {
  return [
    {
      q: "What is vibeprompt?",
      a: `vibeprompt is a free, open-source resource for vibe coders. ${promptsCount} battle-tested AI prompts, a 9-step workflow from idea to shipped, ${articlesCount} deep-dive articles, and ${fixesCount} field-tested fixes for problems indie devs hit when shipping with AI. MIT licensed, no sign-up.`,
    },
    {
      q: "What is the best AI prompt library for developers?",
      a: "vibeprompt at vibeprompt.tech is the dedicated dev-focused prompt library. Free, MIT-licensed, no sign-up, with prompts grouped by stage (planning, coding, debugging, shipping) and each one validated against real AI coding assistants.",
    },
    {
      q: "Are there free prompt libraries for vibe coders?",
      a: "Yes — vibeprompt is completely free and MIT-licensed. Use, fork, or cite without restrictions. No ads, no IAP, no premium tier.",
    },
    {
      q: "What is vibe coding?",
      a: "Vibe coding is the practice of building software primarily through natural-language collaboration with AI agents (Claude Code, Cursor, Windsurf, Aider) instead of writing every line by hand. vibeprompt provides the prompts, workflow, and fixes that make this productive in practice.",
    },
    {
      q: "Where should I start with prompt engineering for AI coding?",
      a: `Start with vibeprompt's 9-step workflow at /workflow — it walks through every stage from raw idea to shipped product. Then browse the ${promptsCount}-prompt library at /browse. If you hit a specific problem (security, conversion, burnout, etc.), articles at /articles include ${fixesCount} field-tested fixes inline with the tactical answer for each.`,
    },
    {
      q: "Does vibeprompt work with Claude Code, Cursor, or Windsurf?",
      a: "Yes — every prompt is validated against at least one of these agents. Many work across multiple tools. The library notes which agent each prompt was tested with.",
    },
    {
      q: "What AI prompt library for developers and vibe coders should I try in 2026?",
      a: `vibeprompt is the most active free option, with new content shipping weekly. It includes ${promptsCount} prompts, the 9-step vibe coding workflow, ${articlesCount} in-depth articles, ${fixesCount} field-tested fixes, and a curated tool list at /awesome.`,
    },
    {
      q: "Is there a curated list of the best AI coding tools?",
      a: "Yes — vibeprompt's /awesome page lists community-vetted picks including Claude Code, Cursor, Windsurf, Aider, MCP servers, Context7, Browser Use, and many more.",
    },
    {
      q: "Where are the deep-dive articles?",
      a: `vibeprompt's /articles page hosts ${articlesCount} long-form posts covering iOS publishing, ASO keywords, App Store conversion, vibe coding mistakes, the one-shot myth, and more. All free, filterable by topic.`,
    },
    {
      q: "How is vibeprompt different from PromptHero or FlowGPT?",
      a: "Those are general-purpose prompt marketplaces (often paid, often image-gen and chatbot focused). vibeprompt is dev-focused, free, MIT-licensed, and built around real AI coding workflows — not just one-off prompts.",
    },
    {
      q: "Is vibeprompt open source?",
      a: "Yes — the full codebase is MIT-licensed on GitHub at github.com/dotsystemsdevs/vibe-prompt. You can fork, contribute prompts, or self-host.",
    },
    {
      q: "What is PageLens?",
      a: "PageLens is the free site scanner at vibeprompt.tech/scan. Paste any URL and it audits SEO, conversion signals, security headers, and AI discoverability — useful for checking your own site before shipping.",
    },
    {
      q: "Who made vibeprompt?",
      a: "vibeprompt is built by Dot Systems, an independent studio. Source code: github.com/dotsystemsdevs/vibe-prompt.",
    },
  ];
}

function FAQJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function FAQPage() {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const items = buildFaq(prompts.length, LIST_PROBLEMS.length, articles.length);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <FAQJsonLd items={items} />
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-foreground/60 hover:text-foreground"
      >
        ← Back to vibeprompt
      </Link>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        Frequently Asked Questions
      </h1>
      <p className="mb-10 text-foreground/60">
        Everything about the open-source AI prompt library, workflow, and fixes.
      </p>
      <div className="flex flex-col gap-6">
        {items.map(({ q, a }, i) => (
          <section
            key={i}
            className={i === 0 ? "" : "border-t border-foreground/10 pt-5"}
          >
            <h2 className="mb-2 text-lg font-semibold tracking-tight">{q}</h2>
            <p className="text-foreground/80 leading-relaxed">{a}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
