import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "vibeprompt vs. the vibe coding books | Free guide compared to Gene Kim, Smykowski",
  description:
    "How vibeprompt (free, web-native, updated weekly) compares to the published vibe coding books — Gene Kim & Steve Yegge's Vibe Coding and Tom Smykowski's Vibe Coding Bible. Use whichever fits.",
  alternates: { canonical: "/vs-books" },
  openGraph: {
    title: "vibeprompt vs. the vibe coding books",
    description: "Free, web-native, continuously updated alternative to the paid vibe coding books.",
    url: "https://vibeprompt.tech/vs-books",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

type Resource = {
  name: string;
  format: string;
  price: string;
  updated: string;
  audience: string;
  strengths: string[];
  link?: { href: string; label: string };
};

export default async function ComparePage() {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const promptsCount = prompts.length;
  const fixesCount = LIST_PROBLEMS.length;
  const articlesCount = articles.length;

  const resources: Resource[] = [
    {
      name: "vibeprompt",
      format: "Web app",
      price: "Free, open source",
      updated: "Weekly",
      audience: "Solo + indie builders shipping with AI",
      strengths: [
        `${promptsCount} copyable prompts mapped to a 9-step workflow`,
        `${fixesCount} field-tested fixes searchable by error or topic`,
        `${articlesCount} deep-dives with real receipts from shipped apps`,
        "Interactive checklists that save progress locally",
        "Continuously updated as patterns and tools evolve",
      ],
      link: { href: "/workflow", label: "Open the workflow →" },
    },
    {
      name: "Vibe Coding (Gene Kim & Steve Yegge)",
      format: "Hardcover, ebook, audiobook",
      price: "~$30 retail",
      updated: "Frozen at print date",
      audience: "Engineers and technical leaders at companies adopting AI",
      strengths: [
        "Foreword by Dario Amodei (Anthropic CEO)",
        "Decades of experience from Google, Amazon, Sourcegraph",
        "Strong on enterprise rollout and team adoption",
        "2026 Axiom Gold Medal",
      ],
    },
    {
      name: "Vibe Coding Bible (Tom Smykowski)",
      format: "Self-published ebook, ~459 pages",
      price: "Paid",
      updated: "Static after release",
      audience: "Individual engineers transitioning to AI-first workflows",
      strengths: [
        "Solo-builder lens, written from personal experience",
        "Covers mindset shift in depth",
        "Includes example prompts and mistakes-I-made chapters",
      ],
    },
  ];

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"vibeprompt vs.\nthe vibe coding books."}
          description="Two excellent paid books cover vibe coding. vibeprompt sits alongside them as the free, web-native, continuously updated option. Use whichever fits your moment."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">

        {/* Honest framing */}
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm leading-relaxed text-foreground/70">
              The vibe coding space has three serious resources right now. Each was built for a different
              moment — printed books for depth and binge-reading, vibeprompt for tactical lookup while
              you ship. None of them replaces the others.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              This page exists because the brand on the homepage is &ldquo;the vibe coding cookbook&rdquo; — and
              you deserve a straight answer about what that means and how it compares.
            </p>
          </div>
        </Reveal>

        {/* Comparison cards */}
        <div className="space-y-8">
          {resources.map((r, i) => (
            <Reveal key={r.name}>
              <article
                className={`border ${i === 0 ? "border-foreground/30 bg-foreground/[0.02]" : "border-foreground/12"} p-6 sm:p-8`}
              >
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
                    {r.name}
                  </h2>
                  {i === 0 && (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                      You are here
                    </span>
                  )}
                </div>

                <dl className="mb-5 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[12px]">
                  <Spec label="Format" value={r.format} />
                  <Spec label="Price" value={r.price} />
                  <Spec label="Updated" value={r.updated} />
                  <Spec label="Audience" value={r.audience} />
                </dl>

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                  What it does best
                </p>
                <ul className="space-y-1.5">
                  {r.strengths.map((s, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/75">
                      <span className="mt-1 shrink-0 text-foreground/30">→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                {r.link && (
                  <Link
                    href={r.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-foreground/70"
                  >
                    {r.link.label}
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* When to pick what */}
        <Reveal>
          <section className="mt-16 border-t border-foreground/12 pt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              When to pick what
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-6">
              The honest matrix.
            </h2>

            <div className="grid gap-6 sm:grid-cols-3">
              <PickCard
                title="You're shipping something this week"
                pick="vibeprompt"
                why="Search the fixes for your specific error. Copy the prompt for your current step. No 459-page detour needed."
              />
              <PickCard
                title="You're moving an entire team to AI-first"
                pick="Gene Kim & Yegge"
                why="Deep treatment of organizational rollout, with the legitimacy of an Anthropic-endorsed foreword. Worth the $30."
              />
              <PickCard
                title="You want to understand the mindset shift"
                pick="Smykowski"
                why="A solo builder's deep-dive on the paradigm change. Reads well end-to-end if you have a few evenings."
              />
            </div>

            <p className="mt-8 text-sm leading-relaxed text-foreground/55 max-w-2xl">
              Most people who care about vibe coding will end up using more than one of these. vibeprompt is
              free and stays free — so it can sit in your bookmarks while you decide if the books are worth
              the buy.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <GithubCta
            title={"Spotted\nsomething wrong?"}
            description="If we've described the books unfairly or missed a strength, open an issue. This page should be honest, not promotional."
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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">{label}</dt>
      <dd className="text-foreground/85">{value}</dd>
    </div>
  );
}

function PickCard({ title, pick, why }: { title: string; pick: string; why: string }) {
  return (
    <div className="border border-foreground/12 p-5">
      <p className="text-[11px] font-medium text-foreground/55 leading-snug mb-3">{title}</p>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">Pick</p>
      <p className="text-[15px] font-semibold text-foreground mb-3">{pick}</p>
      <p className="text-[12px] leading-relaxed text-foreground/60">{why}</p>
    </div>
  );
}

export const revalidate = 3600;
