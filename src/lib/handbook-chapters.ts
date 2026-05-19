import "server-only";
import type { Category as ArticleCategory } from "@/lib/articles";
import type { ListCategory } from "@/lib/list-problems";

export type HandbookChapter = {
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

export const HANDBOOK_CHAPTERS: HandbookChapter[] = [
  {
    number: "01",
    slug: "mindset",
    title: "Mindset",
    tagline: "What vibe coding actually is, and what kills it before you start.",
    blurb:
      "Most people fail at vibe coding for the same three reasons: wrong mental model, wrong expectations about the last 20%, wrong scope. Start here.",
    articleCategories: ["method"],
  },
  {
    number: "02",
    slug: "context",
    title: "Context",
    tagline: "Set up the agent so it actually understands your project.",
    blurb:
      "AGENTS.md, CLAUDE.md, memory, file-system constraints. The difference between an agent that ships features and one that hallucinates new state every prompt.",
    promptCategorySlugs: ["agent-setup"],
    articleSlugs: ["context-is-everything"],
  },
  {
    number: "03",
    slug: "research",
    title: "Research",
    tagline: "Validate demand before writing a line of code.",
    blurb:
      "The cheapest bug to fix is the one you never built. Kill criteria, competitive landscape, validation prompts.",
    promptCategorySlugs: ["research-validate"],
  },
  {
    number: "04",
    slug: "plan",
    title: "Plan & Spec",
    tagline: "PRDs, MVP scoping, and what done looks like.",
    blurb:
      "The reason your MVP becomes a v1 is that you never wrote down what would make it complete. Specs are the leash on scope.",
    promptCategorySlugs: ["prd-spec"],
    articleSlugs: ["what-an-mvp-actually-is"],
  },
  {
    number: "05",
    slug: "architect",
    title: "Architect",
    tagline: "Stack, boundaries, and the shape of the thing.",
    blurb:
      "Pick the stack you have, not the stack you wish you had. Architecture decisions made at hour one cost 10x to change at week four.",
    promptCategorySlugs: ["architecture-stack"],
  },
  {
    number: "06",
    slug: "build",
    title: "Build",
    tagline: "Where AI does the typing and you do the steering.",
    blurb:
      "Feature shipping, prompting patterns, and the receipts from real builds. Includes the most common build-time problems and the fixes that actually work.",
    promptCategorySlugs: ["build-ship", "prompting-craft"],
    articleSlugs: ["vibecoding-real-examples-with-time-data", "one-shot-myth", "vibe-coding-mistakes"],
    listCategories: ["build"],
  },
  {
    number: "07",
    slug: "quality",
    title: "Quality",
    tagline: "Tests, security, and the audit pass before you ship.",
    blurb:
      "45% of AI-generated code has at least one security issue. Quality gates aren't optional, they're the thing that keeps you off the front page of a breach post-mortem.",
    promptCategorySlugs: ["testing-quality"],
  },
  {
    number: "08",
    slug: "ship",
    title: "Ship",
    tagline: "Closed testing, store review, and getting from done to live.",
    blurb:
      "iOS and Android have different rulebooks. Closed testing needs real users, App Review is unpredictable, and the deploy that worked locally won't work in production.",
    promptCategorySlugs: ["launch-growth"],
    articleCategories: ["android", "ios"],
    listCategories: ["ship"],
  },
  {
    number: "09",
    slug: "grow",
    title: "Grow",
    tagline: "How people actually find your thing.",
    blurb:
      "Distribution is the #1 reason 90% of indie products fail. ASO, SEO, store listings, screenshots, reviews, the channels that work and the ones that waste your time.",
    articleCategories: ["growth"],
    listCategories: ["grow"],
  },
  {
    number: "10",
    slug: "earn-stay",
    title: "Earn & Stay",
    tagline: "Pricing, monetization, and not burning out before PMF.",
    blurb:
      "54% of solo founders cite burnout as the #1 cause of failure, ahead of product and capital. Pricing too low is the second. Both have field-tested fixes.",
    listCategories: ["earn", "stay"],
  },
  {
    number: "11",
    slug: "iterate",
    title: "Iterate",
    tagline: "Post-launch maintenance, ops, and the long tail of shipping.",
    blurb:
      "Launch is the start, not the finish. Ops, monitoring, post-launch troubleshooting, and the prompts that keep small things from becoming incidents.",
    promptCategorySlugs: ["ops-maintenance"],
    articleSlugs: ["after-launch-troubleshooting"],
  },
];
