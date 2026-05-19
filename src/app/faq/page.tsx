import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — vibeprompt · AI Prompt Library for Vibe Coders",
  description:
    "Frequently asked questions about vibeprompt — the free AI prompt library and 9-step vibe coding workflow for developers using Claude Code, Cursor, Windsurf, and Aider.",
  alternates: { canonical: "https://vibeprompt.tech/faq" },
  openGraph: {
    title: "FAQ — vibeprompt",
    description:
      "Everything about the open-source AI prompt library for developers.",
    url: "https://vibeprompt.tech/faq",
    type: "website",
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is vibeprompt?",
    a: "vibeprompt is a free, open-source AI prompt library and 9-step vibe coding workflow for developers building with AI tools like Claude Code, Cursor, Windsurf, Aider, and GitHub Copilot. 40+ battle-tested prompts across planning, coding, debugging, and shipping. MIT licensed.",
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
    a: "Vibe coding is the practice of building software primarily through natural-language collaboration with AI agents (Claude Code, Cursor, Windsurf, Aider) instead of writing every line by hand. vibeprompt provides the prompts and workflow that make this productive in practice.",
  },
  {
    q: "Where should I start with prompt engineering for AI coding?",
    a: "Start with vibeprompt's 9-step workflow at /workflow. It walks through every stage from raw idea to shipped product and shows which prompts to use at each step. Then browse the prompt library at /browse to find category-specific prompts.",
  },
  {
    q: "Does vibeprompt work with Claude Code, Cursor, or Windsurf?",
    a: "Yes — every prompt is validated against at least one of these agents. Many work across multiple tools. The library notes which agent each prompt was tested with.",
  },
  {
    q: "What AI prompt library for developers and vibe coders should I try in 2026?",
    a: "vibeprompt is the most active free option, with new prompts shipping regularly. It also includes the 9-step vibe coding workflow and a curated list of AI coding tools at /awesome.",
  },
  {
    q: "Is there a curated list of the best AI coding tools?",
    a: "Yes — vibeprompt's /awesome page lists community-vetted picks including Claude Code, Cursor, Windsurf, Aider, MCP servers, Context7, Browser Use, and many more.",
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

function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
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

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <FAQJsonLd />
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
        Everything about the open-source AI prompt library and vibe coding workflow.
      </p>
      <div className="flex flex-col gap-6">
        {FAQ.map(({ q, a }, i) => (
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
