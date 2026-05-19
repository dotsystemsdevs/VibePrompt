import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllArticles, type ArticleMeta, type Category as ArticleCategory } from "@/lib/articles";
import { getPromptLibrary } from "@/lib/prompt-library";
import type { Prompt } from "@/lib/types";
import { LIST_PROBLEMS, type ListProblem, type ListCategory } from "@/lib/list-problems";
import { WorkflowStepper } from "@/components/workflow/workflow-stepper";
import { WORKFLOW_PAGE_STEPS } from "@/lib/workflow-data";

type HandbookChapter = {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  promptCategorySlugs?: string[];
  articleCategories?: ArticleCategory[];
  articleSlugs?: string[];
  listCategories?: ListCategory[];
  listIds?: string[];
};

// Chapter order mirrors the 9-step build loop (Research → PRD → Stack → Context → Build → Quality → Ship → Iterate),
// bookended by Mindset (pre-everything) and post-launch chapters (Grow, Earn & Stay).
const HANDBOOK_CHAPTERS: HandbookChapter[] = [
  {
    number: "01",
    slug: "mindset",
    title: "Mindset",
    tagline: "What vibe coding actually is, and what kills it before you start.",
    blurb: "Most people fail at vibe coding for the same three reasons: wrong mental model, wrong expectations about the last 20%, wrong scope. Start here.",
    articleCategories: ["method"],
  },
  {
    number: "02",
    slug: "research",
    title: "Research",
    tagline: "Validate demand before writing a line of code.",
    blurb: "The cheapest bug to fix is the one you never built. Kill criteria, competitive landscape, validation prompts.",
    promptCategorySlugs: ["research-validate"],
  },
  {
    number: "03",
    slug: "plan",
    title: "Plan & Spec",
    tagline: "PRDs, MVP scoping, and what done looks like.",
    blurb: "The reason your MVP becomes a v1 is that you never wrote down what would make it complete. Specs are the leash on scope.",
    promptCategorySlugs: ["prd-spec"],
    articleSlugs: ["what-an-mvp-actually-is"],
  },
  {
    number: "04",
    slug: "architect",
    title: "Architect",
    tagline: "Stack, boundaries, and the shape of the thing.",
    blurb: "Pick the stack you have, not the stack you wish you had. Architecture decisions made at hour one cost 10x to change at week four.",
    promptCategorySlugs: ["architecture-stack"],
  },
  {
    number: "05",
    slug: "context",
    title: "Context",
    tagline: "Set up the agent so it actually understands your project.",
    blurb: "AGENTS.md, CLAUDE.md, memory, file-system constraints. The difference between an agent that ships features and one that hallucinates new state every prompt.",
    promptCategorySlugs: ["agent-setup"],
    articleSlugs: ["context-is-everything"],
  },
  {
    number: "06",
    slug: "build",
    title: "Build",
    tagline: "Where AI does the typing and you do the steering.",
    blurb: "Feature shipping, prompting patterns, and the receipts from real builds. Includes the most common build-time problems and the fixes that actually work.",
    promptCategorySlugs: ["build-ship", "prompting-craft"],
    articleSlugs: ["vibecoding-real-examples-with-time-data", "one-shot-myth", "vibe-coding-mistakes"],
    listCategories: ["build"],
  },
  {
    number: "07",
    slug: "quality",
    title: "Quality",
    tagline: "Tests, security, and the audit pass before you ship.",
    blurb: "45% of AI-generated code has at least one security issue. Quality gates aren't optional, they're the thing that keeps you off the front page of a breach post-mortem.",
    promptCategorySlugs: ["testing-quality"],
  },
  {
    number: "08",
    slug: "ship",
    title: "Ship",
    tagline: "Closed testing, store review, and getting from done to live.",
    blurb: "iOS and Android have different rulebooks. Closed testing needs real users, App Review is unpredictable, and the deploy that worked locally won't work in production.",
    promptCategorySlugs: ["launch-growth"],
    articleCategories: ["android", "ios"],
    listCategories: ["ship"],
  },
  {
    number: "09",
    slug: "iterate",
    title: "Iterate",
    tagline: "Post-launch maintenance, ops, and the long tail of shipping.",
    blurb: "Launch is the start, not the finish. Ops, monitoring, post-launch troubleshooting, and the prompts that keep small things from becoming incidents.",
    promptCategorySlugs: ["ops-maintenance"],
    articleSlugs: ["after-launch-troubleshooting"],
  },
  {
    number: "10",
    slug: "grow",
    title: "Grow",
    tagline: "How people actually find your thing.",
    blurb: "Distribution is the #1 reason 90% of indie products fail. ASO, SEO, store listings, screenshots, reviews, the channels that work and the ones that waste your time.",
    articleCategories: ["growth"],
    listCategories: ["grow"],
  },
  {
    number: "11",
    slug: "earn-stay",
    title: "Earn & Stay",
    tagline: "Pricing, monetization, and not burning out before PMF.",
    blurb: "54% of solo founders cite burnout as the #1 cause of failure, ahead of product and capital. Pricing too low is the second. Both have field-tested fixes.",
    listCategories: ["earn", "stay"],
  },
];

export const metadata: Metadata = {
  title: "The Vibe Coding Cookbook | vibeprompt",
  description:
    "Recipes for shipping with AI, in one place. Free, open source, updated weekly. 11 chapters plus a 9-step interactive build loop, covering mindset, context, build, quality, ship, grow, earn, stay, and iterate.",
  alternates: { canonical: "/cookbook" },
  openGraph: {
    title: "The Vibe Coding Cookbook, vibeprompt",
    description: "Recipes for shipping with AI, in one place. Free, open source, updated weekly.",
    url: "https://vibeprompt.tech/cookbook",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

function resolveChapter(
  chapter: HandbookChapter,
  allArticles: ArticleMeta[],
  allPrompts: Prompt[],
): { articles: ArticleMeta[]; prompts: Prompt[]; problems: ListProblem[] } {
  const articlesBySlug = chapter.articleSlugs
    ? chapter.articleSlugs
        .map((s) => allArticles.find((a) => a.slug === s))
        .filter((a): a is ArticleMeta => Boolean(a))
    : [];
  const articlesByCategory = chapter.articleCategories
    ? allArticles.filter(
        (a) =>
          chapter.articleCategories!.includes(a.category) &&
          !articlesBySlug.some((b) => b.slug === a.slug),
      )
    : [];
  const articles = [...articlesBySlug, ...articlesByCategory];

  const prompts = chapter.promptCategorySlugs
    ? allPrompts.filter((p) => chapter.promptCategorySlugs!.includes(p.category))
    : [];

  const problemsByCat = chapter.listCategories
    ? LIST_PROBLEMS.filter((p) => chapter.listCategories!.includes(p.category))
    : [];
  const problemsById = chapter.listIds
    ? LIST_PROBLEMS.filter((p) => chapter.listIds!.includes(p.id))
    : [];
  const problems = [
    ...problemsById,
    ...problemsByCat.filter((p) => !problemsById.some((b) => b.id === p.id)),
  ];

  return { articles, prompts, problems };
}

export default async function CookbookPage() {
  const [articles, library] = await Promise.all([getAllArticles(), getPromptLibrary()]);
  const { prompts } = library;

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"The Vibe Coding\nCookbook."}
          description={`Recipes for shipping with AI, in one place. ${HANDBOOK_CHAPTERS.length} chapters · 9-step interactive build loop · ${articles.length} articles · ${prompts.length} prompts · ${LIST_PROBLEMS.length} field-tested problems. Free. Open source. Updated weekly.`}
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-6 pb-10">

        {/* Interactive build loop — the centerpiece, right after hero */}
        <section id="workflow" className="mb-20 scroll-mt-24">
          <header className="mb-6 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              The build loop
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground mb-3">
              From idea to shipped, in 9 steps.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/60">
              Interactive checklist with tasks, learning resources, and prompts at each phase. Progress saves locally — close the tab and come back tomorrow, your checkmarks are still there.
            </p>
          </header>
          <WorkflowStepper steps={WORKFLOW_PAGE_STEPS} />
        </section>

        {/* Reference library — slim TOC then chapters */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
            Reference library
          </p>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground mb-3">
            {HANDBOOK_CHAPTERS.length} chapters, deep dives, prompts, and field-tested fixes.
          </h2>
        </div>

        <nav aria-label="Chapter index" className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-foreground/10 pb-5 text-[11px]">
          {HANDBOOK_CHAPTERS.map((c, i) => (
            <span key={c.slug} className="flex items-baseline gap-3">
              {i > 0 && <span className="text-foreground/15">·</span>}
              <a href={`#${c.slug}`} className="text-foreground/55 transition-colors hover:text-foreground">
                <span className="tabular-nums text-foreground/25 mr-1.5">{c.number}</span>
                {c.title}
              </a>
            </span>
          ))}
        </nav>

        <div id="chapters">
          {HANDBOOK_CHAPTERS.map((chapter) => {
            const { articles: chArticles, prompts: chPrompts, problems: chProblems } = resolveChapter(chapter, articles, prompts);
            return (
              <Chapter
                key={chapter.slug}
                chapter={chapter}
                articles={chArticles}
                prompts={chPrompts}
                problems={chProblems}
              />
            );
          })}
        </div>

        <Reveal>
          <GithubCta
            title={"Something\nmissing?"}
            description="A chapter, a problem you've hit, a prompt that works. Suggest it on GitHub — if it helps vibe coders ship, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a chapter"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}

function Chapter({
  chapter,
  articles,
  prompts,
  problems,
}: {
  chapter: HandbookChapter;
  articles: ArticleMeta[];
  prompts: Prompt[];
  problems: ListProblem[];
}) {
  const hasContent = articles.length > 0 || prompts.length > 0 || problems.length > 0;

  return (
    <Reveal>
      <section
        id={chapter.slug}
        className="mb-14 border-t border-foreground/12 pt-10 scroll-mt-24"
      >
        <header className="mb-6 max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
            Chapter {chapter.number}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground mb-3">
            {chapter.title}
          </h2>
          <p className="text-sm font-medium leading-snug text-foreground/75 mb-3">
            {chapter.tagline}
          </p>
          <p className="text-[13px] leading-relaxed text-foreground/55">
            {chapter.blurb}
          </p>
        </header>

        {hasContent ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 && (
              <ChapterColumn label="Articles" count={articles.length}>
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="group block py-2"
                  >
                    <p className="text-[13px] font-medium leading-snug text-foreground/85 group-hover:text-foreground transition-colors">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-foreground/40 line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </ChapterColumn>
            )}

            {prompts.length > 0 && (
              <ChapterColumn label="Prompts" count={prompts.length}>
                {prompts.slice(0, 8).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/prompts/${p.slug}`}
                    className="block py-1.5 text-[13px] leading-snug text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
                {prompts.length > 8 && (
                  <Link
                    href="/browse"
                    className="mt-1 inline-block py-1 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
                  >
                    +{prompts.length - 8} more →
                  </Link>
                )}
              </ChapterColumn>
            )}

            {problems.length > 0 && (
              <ChapterColumn label="Problems" count={problems.length}>
                {problems.slice(0, 8).map((p) => (
                  <Link
                    key={p.id}
                    href={`/list?cat=${p.category}#${p.id}`}
                    className="block py-1.5 text-[13px] leading-snug text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
                {problems.length > 8 && (
                  <Link
                    href={`/list?cat=${problems[0].category}`}
                    className="mt-1 inline-block py-1 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
                  >
                    +{problems.length - 8} more →
                  </Link>
                )}
              </ChapterColumn>
            )}
          </div>
        ) : (
          <p className="text-[11px] italic text-foreground/35">
            Content coming. Suggest entries on GitHub.
          </p>
        )}
      </section>
    </Reveal>
  );
}

function ChapterColumn({ label, count, children }: { label: string; count?: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2 border-b border-foreground/12 pb-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
          {label}
        </p>
        {count !== undefined && (
          <span className="text-[10px] tabular-nums text-foreground/30">{count}</span>
        )}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export const revalidate = 3600;
