import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "vibeprompt vs. Replit, Lovable, Bolt, Cursor, Claude Code — which vibe coding tool to pick",
  description:
    "Side-by-side comparison of the major vibe coding tools (Replit, Lovable, Bolt.new, Cursor, Claude Code, v0.dev, Windsurf, Aider) against vibeprompt — the free methodology + prompt library you use with them.",
  alternates: { canonical: "/vs-tools" },
  keywords: "vibe coding tools, replit vs cursor, lovable vs bolt, vibe code workflow, claude code, cursor alternative, ai coding tool comparison, indie hacker tools 2026",
  openGraph: {
    title: "vibeprompt vs. the major vibe coding tools",
    description: "Replit, Lovable, Bolt, Cursor, Claude Code, v0.dev — how vibeprompt fits alongside each.",
    url: "https://vibeprompt.tech/vs-tools",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

type Tool = {
  name: string;
  url: string;
  kind: "App builder" | "IDE" | "CLI agent" | "UI generator" | "Methodology";
  pricing: string;
  worksOn: string;
  bestFor: string;
  caveat: string;
};

const TOOLS: Tool[] = [
  {
    name: "vibeprompt",
    url: "https://vibeprompt.tech",
    kind: "Methodology",
    pricing: "Free, MIT",
    worksOn: "Use with ANY tool below",
    bestFor: "Knowing what to prompt, what order to build in, how to fix it when it breaks",
    caveat: "Doesn't write code itself — it teaches you how to make any of the tools below write better code",
  },
  {
    name: "Claude Code",
    url: "https://www.anthropic.com/claude-code",
    kind: "CLI agent",
    pricing: "Pay per use ($20+/mo equivalent)",
    worksOn: "Any project, terminal-native",
    bestFor: "Existing repos, real engineering work, autonomous multi-step tasks",
    caveat: "Terminal UI scares non-devs. Strong with structured context (AGENTS.md helps a lot)",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    kind: "IDE",
    pricing: "$20/mo Pro, $40/mo Business",
    worksOn: "Any project, GUI editor",
    bestFor: "Devs migrating from VS Code who want AI inline",
    caveat: "Easy to overuse Tab/inline edits and end up with a messy codebase. Same patterns as Claude Code apply.",
  },
  {
    name: "Windsurf",
    url: "https://windsurf.com",
    kind: "IDE",
    pricing: "$15/mo Pro, $30/mo Teams",
    worksOn: "Any project, GUI editor",
    bestFor: "Cursor alternative with a different agent loop (Cascade)",
    caveat: "Similar trade-offs to Cursor. Pick based on which agent UX you prefer.",
  },
  {
    name: "Replit (Agent)",
    url: "https://replit.com",
    kind: "App builder",
    pricing: "Free tier, Core $20/mo",
    worksOn: "New apps, in-browser only",
    bestFor: "Non-devs building greenfield apps from a prompt, with hosting + DB included",
    caveat: "Vendor lock-in to Replit's runtime. Migrating out later is painful. Best for prototypes.",
  },
  {
    name: "Lovable",
    url: "https://lovable.dev",
    kind: "App builder",
    pricing: "Free trial, $20+/mo",
    worksOn: "New apps, in-browser",
    bestFor: "Non-devs who want a polished landing page or simple full-stack app from a chat",
    caveat: "Similar to Replit — beautiful first 80%, painful last 20% when complexity arrives.",
  },
  {
    name: "Bolt.new",
    url: "https://bolt.new",
    kind: "App builder",
    pricing: "Free tier, $20+/mo Pro",
    worksOn: "New apps (StackBlitz-hosted)",
    bestFor: "Quick web app prototypes you can export and host yourself",
    caveat: "Output is exportable (better than Replit/Lovable for that) but you still own the maintenance.",
  },
  {
    name: "v0.dev",
    url: "https://v0.dev",
    kind: "UI generator",
    pricing: "Free tier, $20/mo Pro",
    worksOn: "React + Tailwind components",
    bestFor: "Generating one-off UI components or pages with shadcn/Tailwind",
    caveat: "UI only. Not a full app builder. Pair with Cursor/Claude Code for the backend.",
  },
  {
    name: "Aider",
    url: "https://aider.chat",
    kind: "CLI agent",
    pricing: "Free, BYO API key",
    worksOn: "Any git repo, terminal",
    bestFor: "Open-source CLI agent, full control, works with any model (Claude, GPT, Gemini, local)",
    caveat: "More configuration than Claude Code. Best for devs who want to tinker with the agent loop.",
  },
];

export default async function VsToolsPage() {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"vibeprompt vs.\nthe tools."}
          description="Replit, Lovable, Bolt, Cursor, Claude Code, v0 — they all do part of vibe coding. vibeprompt is the methodology and prompt library you use with whichever tool you pick. Honest comparison, no affiliate links."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">

        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm leading-relaxed text-foreground/70">
              The confusing thing about &ldquo;vibe coding tools&rdquo; is that they&rsquo;re not all the same kind of tool.
              App builders like Replit and Lovable host your code. IDEs like Cursor live on your machine.
              CLI agents like Claude Code run in your terminal. UI generators like v0 only do one slice.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              vibeprompt is a different category entirely — it&rsquo;s the workflow, the {prompts.length} prompts,
              the {articles.length} field-tested articles you use{" "}
              <em>with</em> any of these tools. That&rsquo;s why every cell in our column reads &ldquo;use with any tool below.&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Comparison cards */}
        <div className="space-y-6">
          {TOOLS.map((t, i) => (
            <Reveal key={t.name}>
              <article
                className={`border ${i === 0 ? "border-foreground/30 bg-foreground/[0.02]" : "border-foreground/12"} p-6 sm:p-7`}
              >
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground">
                      {t.name}
                    </h2>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                      {t.kind} · {t.pricing}
                    </p>
                  </div>
                  {i === 0 ? (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                      You are here
                    </span>
                  ) : (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-foreground/45 transition-colors hover:text-foreground"
                    >
                      Visit →
                    </a>
                  )}
                </div>

                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-3 text-[12px]">
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">Works on</dt>
                    <dd className="text-foreground/80 leading-snug">{t.worksOn}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">Best for</dt>
                    <dd className="text-foreground/80 leading-snug">{t.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">Caveat</dt>
                    <dd className="text-foreground/65 leading-snug italic">{t.caveat}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Picker matrix */}
        <Reveal>
          <section className="mt-16 border-t border-foreground/12 pt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              Decision matrix
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-8">
              Which one should you actually use?
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <PickCard
                situation="You&rsquo;re a non-dev with a SaaS idea"
                pick="Replit Agent or Lovable + vibeprompt's workflow"
                why="Use the app builder for speed. Use vibeprompt's PRD template before you start, AGENTS.md template after the first 80% lands."
              />
              <PickCard
                situation="You're a dev shipping production code"
                pick="Claude Code or Cursor + vibeprompt"
                why="The CLI/IDE agents handle complex codebases best. vibeprompt's 10-step workflow + 56 prompts mean you spend less time figuring out what to ask."
              />
              <PickCard
                situation="You're building a UI prototype only"
                pick="v0.dev + vibeprompt's prompting craft prompts"
                why="v0 makes the components. vibeprompt's prompting prompts (PromptCraft section) help you get exactly the layout you want on the first try."
              />
              <PickCard
                situation="You want full control + open source"
                pick="Aider + vibeprompt"
                why="Aider runs locally with any model. vibeprompt fills the gap Aider doesn't — what prompts to send, what order to build in."
              />
              <PickCard
                situation="You're moving an existing repo to AI-first"
                pick="Claude Code + AGENTS.md from vibeprompt"
                why="Existing codebases need careful context setup. Download vibeprompt's AGENTS.md template, fill it in for your repo, then run Claude Code with it loaded."
              />
              <PickCard
                situation="You're stuck post-launch"
                pick="vibeprompt's fixes + your existing tool"
                why="46 field-tested fixes for indie devs cover the &ldquo;0 conversions&rdquo;, &ldquo;Show HN sank&rdquo;, &ldquo;refund requests in week 1&rdquo; problems your tool doesn't address."
              />
            </div>
          </section>
        </Reveal>

        {/* Why vibeprompt makes any tool better */}
        <Reveal>
          <section className="mt-16 border-t border-foreground/12 pt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              Why combine
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Tools without methodology produce slop.
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <Reason
                title="The tools all hit the same wall"
                body="Replit, Lovable, Cursor, Claude Code — every one builds the first 80% fast and chokes on the last 20%. That's an industry-wide problem. vibeprompt's articles cover the exact patterns to break out of."
              />
              <Reason
                title="Prompts compound"
                body={`Most vibe coders rewrite the same prompts every session. ${prompts.length} battle-tested prompts (planning, debugging, refactor, prompting craft) save hours per project — works with any of the tools above.`}
              />
              <Reason
                title="Fixes for what tools can't fix"
                body="No tool fixes 'I priced it at $5 and nobody trusts it' or 'Reddit removed my post for self-promotion'. vibeprompt does — these are content-shaped problems."
              />
            </div>

            <Link
              href="/vs-books"
              className="mt-8 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground"
            >
              Comparing books instead? See vs-books →
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <GithubCta
            title={"Tool missing\nor described wrong?"}
            description="This page should be honest. If we got a tool wrong or missed one, open an issue or PR. No affiliate links anywhere — we don't earn from any of the tools listed."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a fix"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="View source"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}

function PickCard({ situation, pick, why }: { situation: string; pick: string; why: string }) {
  return (
    <div className="border border-foreground/12 p-5">
      <p
        className="text-[11px] font-medium text-foreground/55 leading-snug mb-3"
        dangerouslySetInnerHTML={{ __html: situation }}
      />
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">Pick</p>
      <p className="text-[14px] font-semibold text-foreground mb-3">{pick}</p>
      <p
        className="text-[12px] leading-relaxed text-foreground/60"
        dangerouslySetInnerHTML={{ __html: why }}
      />
    </div>
  );
}

function Reason({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold text-foreground/90 mb-2">{title}</h3>
      <p className="text-[12px] leading-relaxed text-foreground/60">{body}</p>
    </div>
  );
}

export const revalidate = 3600;
