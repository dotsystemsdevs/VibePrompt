export const LIST_CATEGORIES = ["build", "ship", "grow", "earn", "stay"] as const;
export type ListCategory = (typeof LIST_CATEGORIES)[number];

export const LIST_CATEGORY_LABEL: Record<ListCategory, string> = {
  build: "Build",
  ship: "Ship",
  grow: "Grow",
  earn: "Earn",
  stay: "Stay",
};

export const LIST_CATEGORY_DESCRIPTION: Record<ListCategory, string> = {
  build: "AI workflow, code quality, the things that break when you vibe code at speed.",
  ship: "Closed testing, store review, deploy. Where finished code meets gatekeepers.",
  grow: "How people actually find your thing. ASO, SEO, channels, conversion.",
  earn: "Pricing, monetization, the awkward gap between free users and paying ones.",
  stay: "Burnout, focus, motivation. The reason 54% of solo founders quit before product.",
};

export type ListProblem = {
  id: string;
  title: string;
  answer: string;
  category: ListCategory;
  articleSlug?: string;
};

export const LIST_PROBLEMS: ListProblem[] = [
  // ── Build ─────────────────────────────────────────────────────────────────
  {
    id: "ai-code-security-holes",
    title: "AI-generated code has hidden security holes",
    category: "build",
    answer: "GitClear data: ~45% of AI-generated code has at least one security issue. The fix isn't \"stop using AI\" — it's adding a security pass to every PR before merge. Read your dependencies, check for hardcoded secrets, run a free SAST scanner like Semgrep or GitHub's CodeQL once a week. The Moltbook breach (1.5M tokens leaked 3 days after launch) was a missing env var check a human would have caught in 30 seconds.",
    articleSlug: "vibe-coding-mistakes",
  },
  {
    id: "last-20-percent",
    title: "AI nails 80%, last 20% takes 5x longer",
    category: "build",
    answer: "This is the universal vibe coding experience and it's not a skill issue. The first 80% is patterns the model has seen 10,000 times. The last 20% is your specific edge cases, error states, browser quirks, and integration glue — things no model has seen exactly. Plan for it. Block out 3x your gut estimate for the polish phase. If you keep promising \"one more hour\", you're estimating against the 80% phase.",
    articleSlug: "one-shot-myth",
  },
  {
    id: "code-duplication-pile",
    title: "Code duplication piles up after weeks of vibe coding",
    category: "build",
    answer: "GitClear measured 4x more duplication in AI-assisted codebases. The model doesn't know your existing helpers exist unless you point at them. Two habits: (1) Keep a `CLAUDE.md` or `AGENTS.md` listing utilities and where to find them. (2) After every feature, ask the agent: \"Did this duplicate logic from anywhere? Show me the closest existing helper.\" Even imperfect dedup beats the default behavior.",
    articleSlug: "context-is-everything",
  },
  {
    id: "dont-know-codebase",
    title: "Lost track of what an AI-built codebase does",
    category: "build",
    answer: "If you can't navigate your code, you can't fix bugs and you can't add features without making it worse. Spend an afternoon writing an architecture overview into `ARCHITECTURE.md` — what each top-level folder does, where state lives, what's a server vs client boundary. Make the AI generate the first draft, then audit it yourself. The act of auditing is half the learning.",
    articleSlug: "context-is-everything",
  },
  {
    id: "ai-confidently-wrong",
    title: "AI confidently writes code that's completely wrong",
    category: "build",
    answer: "Two patterns to break: (1) Always ask \"how would you verify this works?\" before accepting code. Forces the model to think about test cases. (2) If something feels off, paste the code back and ask \"what would happen if X was actually empty/null/large?\". Confident-wrong code usually has a single edge case the model didn't model.",
    articleSlug: "vibe-coding-mistakes",
  },
  {
    id: "tests-pass-feature-broken",
    title: "Tests pass but the feature is broken",
    category: "build",
    answer: "Means your tests cover the wrong layer. AI loves to write tests against the implementation it just wrote — tautological tests. Add one end-to-end smoke test per feature that uses the feature like a user would. Playwright or even a manual checklist beats 200 unit tests that all assert the implementation didn't change.",
    articleSlug: "vibe-coding-mistakes",
  },
  {
    id: "type-errors-cascade",
    title: "One type change cascades across 50 files",
    category: "build",
    answer: "This is TypeScript working correctly — the cascade is showing you every place that needs to change. Don't suppress with `any` or `@ts-ignore`. Walk the errors top-down: fix the root type, regenerate, fix the next one. If you find yourself in a rabbit hole, the change was too big — git stash and split into smaller changes.",
    articleSlug: "vibe-coding-mistakes",
  },
  {
    id: "every-prompt-new-state",
    title: "Every prompt adds unrequested state",
    category: "build",
    answer: "Constrain the model upfront. \"Don't add new state, don't add new dependencies, don't add new files unless I explicitly ask.\" Write it once in your AGENTS.md and reference it. Without constraints, the model defaults to \"add everything that might be useful\" which is the opposite of what shipped code needs.",
    articleSlug: "context-is-everything",
  },
  {
    id: "deprecated-apis",
    title: "AI keeps suggesting deprecated APIs",
    category: "build",
    answer: "Training data is 6-12 months stale. For fast-moving libs (Next.js, React, Tailwind), paste the relevant docs section into context before asking for code. Tools like Context7 MCP do this automatically. Once a quarter, ask the model: \"What's the current best practice for X in [library] version [Y]?\" and verify against official docs.",
    articleSlug: "context-is-everything",
  },
  {
    id: "give-up-refactor",
    title: "Hard bug spirals into a full refactor",
    category: "build",
    answer: "The refactor instinct is escape, not strategy. Spend 45 minutes with the actual bug: add logging, bisect the change history (`git bisect`), reproduce in isolation. 9 times out of 10 the bug is a 3-line fix once you understand it. Refactoring while you don't understand the bug just moves it somewhere harder to find.",
    articleSlug: "one-shot-myth",
  },

  // ── Ship ──────────────────────────────────────────────────────────────────
  {
    id: "play-closed-testing-12",
    title: "Google Play needs 12 real testers for 14 days",
    category: "ship",
    answer: "Real users, real installs, real opens. Where they come from: r/AndroidApps closed-testing weekly thread, indiehackers.com, Twitter, your existing email list. Aim for 30+ because Google sometimes pushes back below that. Stagger sign-ups so people don't all churn at once. Your iOS friends count if they actually have an Android device.",
    articleSlug: "closed-testing-on-google-play",
  },
  {
    id: "app-review-rejected-vague",
    title: "App Review rejection with a vague reason",
    category: "ship",
    answer: "Open the rejection in Resolution Center and click \"reply\" not \"resubmit\". Ask for the specific guideline number (e.g., 4.0, 5.1.1) and the specific screen they're flagging. Reviewers respond to direct questions. Don't just resubmit hoping a different reviewer will pass it — same reviewer often picks it up again.",
    articleSlug: "testflight-and-app-store-publishing",
  },
  {
    id: "testflight-90-days",
    title: "TestFlight only allows 90 days per build",
    category: "ship",
    answer: "Cycle a fresh build every 60-75 days so you never hit the wall mid-testing. Internal testers (up to 100) don't count against this — only external testers do. If your build hits day 90 and you're not ready, upload any incremental change (version bump is fine) to refresh the clock.",
    articleSlug: "testflight-and-app-store-publishing",
  },
  {
    id: "vercel-prod-breaks",
    title: "Works locally, breaks on Vercel",
    category: "ship",
    answer: "90% of the time it's one of: (1) Missing env var in Vercel dashboard (compare with `vercel env pull`), (2) Node version mismatch — pin in `engines` field of package.json, (3) Edge runtime can't run a Node API you used, (4) File system writes that work locally don't on serverless. Check Vercel function logs first — they tell you which one.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "build-size-doubled",
    title: "Bundle size doubled with no obvious cause",
    category: "ship",
    answer: "Run `next build` and look at the route-level breakdown — it shows per-page kB. Then `npx @next/bundle-analyzer` for a visual. Usual culprits: a heavy lib imported in a layout (loads on every page), an icon set fully imported instead of tree-shaken, or accidentally bundling a server-only module into a client component.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "env-vars-broken",
    title: "ENV vars work locally, not in production",
    category: "ship",
    answer: "Three gotchas: (1) `NEXT_PUBLIC_` prefix required for vars used in client code. (2) Vercel preview and production are separate scopes — set the var in both. (3) Server actions don't re-read env at runtime if hot-reloaded weirdly; redeploy clean. Always `vercel env pull` and check the .env.local matches what you expect.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "ci-fails-new-rule",
    title: "CI fails on a lint rule that didn't exist yesterday",
    category: "ship",
    answer: "Library update (often `eslint-plugin-react-hooks`) added a new rule. Don't suppress globally. Fix the violations — usually 5-10 lines — and the rule is doing you a favor by catching a real anti-pattern. If the rule is genuinely wrong for your code, disable it per-line with a comment explaining why.",
    articleSlug: "vibe-coding-mistakes",
  },
  {
    id: "migration-skipped-prod",
    title: "Migration ran locally, skipped on production",
    category: "ship",
    answer: "Most ORMs (Prisma, Drizzle) run migrations on the dev machine but require a manual or build-step trigger in prod. Add `prisma migrate deploy` to your Vercel build command, or use Drizzle Kit's push in a postbuild script. Test by running it once manually against prod-like staging before relying on it.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "ssl-custom-domain",
    title: "SSL breaks after attaching a custom domain",
    category: "ship",
    answer: "Almost always DNS propagation — wait 1 hour, recheck. If still broken: (1) Verify the CNAME or A record matches Vercel/Netlify's exact target. (2) Remove and re-add the domain. (3) Check no other provider (Cloudflare proxy mode) is intercepting and serving its own (invalid) cert.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "cold-start-slow",
    title: "First request takes 8 seconds (cold start)",
    category: "ship",
    answer: "For Vercel: move heavy initialization out of the handler into module scope so it caches across warm invocations. For Supabase/Postgres: use a connection pooler (PgBouncer) — direct connections cold-start slow. For function size: trim deps, the larger the function the slower the cold start.",
    articleSlug: "after-launch-troubleshooting",
  },

  // ── Grow ──────────────────────────────────────────────────────────────────
  {
    id: "60-visitors-zero-conv",
    title: "60 visitors a month, 0 conversions",
    category: "grow",
    answer: "Both numbers are too small to draw conclusions. Get to 500 monthly visitors first — that's the floor where conversion data means anything. Until then, optimize for one thing: more eyeballs. Conversion optimization on 60 visitors is theater.",
    articleSlug: "app-store-conversion-rate-deep-dive",
  },
  {
    id: "rank-brand-only",
    title: "Only ranking for the brand name",
    category: "grow",
    answer: "You haven't done real SEO yet — you've just claimed your name. Pick 3 long-tail keywords your audience actually searches (use Google's search-suggest as free research). Write one in-depth article per keyword, 1500+ words, with real examples. Three articles, three months of indexing — that's the actual start of SEO.",
    articleSlug: "aso-keywords-that-actually-move-installs",
  },
  {
    id: "reddit-removed-post",
    title: "Reddit removes posts as self-promotion",
    category: "grow",
    answer: "Subreddit rules vary but the universal pattern: post 5-10 useful, non-promotional comments BEFORE you ever post your link. Build karma in the sub first. When you do post, the format matters more than the content: \"I built X to solve Y\" works, \"Check out my new app\" doesn't. r/SideProject and r/IndieDev are more tolerant; r/programming is brutal.",
    articleSlug: "instagram-for-indie-apps",
  },
  {
    id: "ph-launch-8-upvotes",
    title: "Product Hunt launch stalls at 8 upvotes",
    category: "grow",
    answer: "PH is now a closed game — 80% of upvotes come in the first 4 hours from people you DM directly. Without a pre-built list of 50+ people who will vote, you'll stall. If you don't have that list, skip PH. Show HN, Reddit r/SideProject, and Twitter via build-in-public are more honest channels for small audiences.",
    articleSlug: "launching-on-google-play",
  },
  {
    id: "show-hn-sunk",
    title: "Show HN sank to page 4 in 2 hours",
    category: "grow",
    answer: "Post Tue-Thu, 8-10 AM Eastern. Title matters more than content: leads with what you built and what's interesting about it, not your name. \"Show HN: I built X — what surprised me about Y\" outperforms \"Show HN: My new app launched\". Reply to every comment in the first 6 hours; engagement keeps you on the front page.",
    articleSlug: "launching-on-google-play",
  },
  {
    id: "store-impressions-no-clicks",
    title: "App Store: 1k impressions, 30 page views",
    category: "grow",
    answer: "3% impression → page-view rate means your icon or subtitle isn't selling the click. Average is 5-7%. Test one of: (1) icon redesign with one strong visual element, (2) subtitle that says what the app does in 5 words, (3) screenshot 1 with a hook overlay. Change one thing, run for 2 weeks, measure.",
    articleSlug: "store-listing-anatomy",
  },
  {
    id: "keywords-full-flat",
    title: "Keywords field is full but conversion is flat",
    category: "grow",
    answer: "ASO is keywords (visibility) + screenshots (conversion). You optimized half. Your impressions probably grew but nobody installs because the listing doesn't sell. Screenshot 1 + 2 carry 80% of the conversion decision. Test rewriting screenshot 1 with a clear value-prop overlay, ship it for 2 weeks, compare against baseline.",
    articleSlug: "aso-keywords-that-actually-move-installs",
  },
  {
    id: "five-stars-three-reviews",
    title: "5 stars, but only 3 reviews",
    category: "grow",
    answer: "Zero reviews = no install. 5 reviews = install permission. 30 reviews = competitive. The jump from 3 to 30 is the highest-ROI marketing move you have. DM your first 30 users individually asking for a review. Not a broadcast — individual messages with their name. Conversion rate is roughly 30-40% if you ask right.",
    articleSlug: "getting-your-first-app-reviews",
  },
  {
    id: "twitter-12-impressions",
    title: "Twitter posts get 12 impressions",
    category: "grow",
    answer: "Following count means almost nothing now; consistency + engagement does. Reply to 10 accounts in your niche every day for 30 days. Don't quote-tweet for clout — reply with something useful. After 30 days your impressions on your own posts will 10-20x because the algorithm has learned you're active.",
    articleSlug: "instagram-for-indie-apps",
  },
  {
    id: "screenshot-1-unclear",
    title: "Screenshot 1 doesn't say what the app does",
    category: "grow",
    answer: "If a user reads only the first screenshot and can't say what the app does in one sentence, you have a conversion bug — not a marketing bug. Format that works: big overlay text describing the value (\"Track your training, no spreadsheet needed\"), small phone mockup behind it. Most apps make the phone the hero. The text is the hero.",
    articleSlug: "store-listing-anatomy",
  },
  {
    id: "instagram-no-installs",
    title: "Instagram grows followers but not installs",
    category: "grow",
    answer: "Instagram is a brand channel, not an install channel — for indie apps. You can drive awareness, you can't drive installs reliably without paid promotion. If your goal is installs, redirect that time to Reddit, Show HN, or App Store SEO. Keep Instagram if it's joy; kill it if it's hope.",
    articleSlug: "instagram-for-indie-apps",
  },

  // ── Earn ──────────────────────────────────────────────────────────────────
  {
    id: "priced-too-low",
    title: "Priced at $5 and nobody trusts it",
    category: "earn",
    answer: "Price is a signal. $5 SaaS reads as \"hobby project, will disappear\". $19-29 reads as \"actual product\". For B2B tools, $49 minimum. Test by 3-4x your current price for new signups; existing customers grandfather in. If conversion stays flat, you were leaving money on the table. If it tanks, ratchet down — but most indie devs are too low, not too high.",
    articleSlug: "taking-payment-as-an-indie-dev",
  },
  {
    id: "free-tier-converts-zero",
    title: "Free tier too generous, paid converts at 0.3%",
    category: "earn",
    answer: "0.3% is industry-typical for freemium SaaS. The fix isn't \"shrink the free tier\" — most users on free aren't going to pay no matter what. The fix is targeting paid users from the start with a trial (7-14 days, full features), not freemium. Trial converts 10-30%, freemium converts 1-5%.",
    articleSlug: "taking-payment-as-an-indie-dev",
  },
  {
    id: "iap-30-percent",
    title: "Apple takes 30% via IAP",
    category: "earn",
    answer: "Three legal options: (1) Stay in IAP — simplest, pay the tax. (2) Subscriptions get 15% after year 1 if you stay on IAP. (3) For digital subscriptions outside the app (link from your website), you keep 100% — Apple's recent ruling allows linking out. SaaS-shaped apps usually have customers sign up via web, then use the app.",
    articleSlug: "taking-payment-as-an-indie-dev",
  },
  {
    id: "annual-price-arbitrary",
    title: "Annual price feels arbitrary",
    category: "earn",
    answer: "Common pattern: annual = 10x monthly (16% discount). Anything more aggressive than that and you're discounting cash you can use. Anything less and customers feel punished for committing. Don't overthink it — pick 10x, observe for 90 days, adjust if needed. Mostly it doesn't matter as much as you think.",
    articleSlug: "taking-payment-as-an-indie-dev",
  },
  {
    id: "discounts-attract-churners",
    title: "Discount codes attract people who churn",
    category: "earn",
    answer: "Coupon hunters are not your buyers — they're a separate audience that costs you LTV. If you must discount, restrict to: (1) Annual upgrades from monthly (rewards commitment), (2) Specific verticals where price is genuinely a blocker (students, nonprofits). Avoid generic 30%-off campaigns — they pull in the worst cohort.",
    articleSlug: "taking-payment-as-an-indie-dev",
  },
  {
    id: "refunds-week-one",
    title: "Refund requests start in week 1",
    category: "earn",
    answer: "Almost always one of: (1) Onboarding didn't show the value in 60 seconds, they got lost and gave up. (2) Pricing tier was confusing — they picked wrong and feel ripped off. Watch the first 5 refund recordings (Hotjar, PostHog). The pattern is usually the same screen. Fix that one screen and refund rate drops 50%+.",
    articleSlug: "onboarding-that-actually-converts",
  },

  // ── Stay ──────────────────────────────────────────────────────────────────
  {
    id: "shipped-three-feel-behind",
    title: "Shipped 3 things this month, still feel behind",
    category: "stay",
    answer: "Twitter's selection bias is brutal — you see people's wins, not their abandoned projects. 99% of indies haven't shipped one thing in 6 months. You shipping 3 isn't behind, it's top 1%. Unfollow accounts that make you feel worse, follow ones that make you feel saner. Your real comparison is your past self.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "twitter-makes-anxious",
    title: "Twitter makes everyone else look like winners",
    category: "stay",
    answer: "The accounts you see are filtered by engagement. Engagement comes from extreme outcomes (huge wins, huge fails) — never the median. Median indie outcome: 6 months of work, $200/mo revenue, slowly dying. You don't see that. Cap your Twitter time at 15 min/day or you'll burn out comparing your inside to other people's outside.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "started-next-before-finishing",
    title: "New project started before finishing the last",
    category: "stay",
    answer: "Universal indie pattern. Two questions to ask before starting: (1) Is the new project actually different, or am I escaping a hard moment on the current one? (2) Will I be embarrassed in 6 months if neither is shipped? If both answers are uncomfortable, force-finish the current one — even badly. Shipping a small version of project N beats half-building N+1.",
    articleSlug: "what-an-mvp-actually-is",
  },
  {
    id: "side-project-100-per-month",
    title: "Side project pays $100/mo, eats every evening",
    category: "stay",
    answer: "$100/mo at 20 evening-hours/week is $1.25/hour. The math doesn't justify the hours unless you're learning skills you couldn't elsewhere or the path to $1k/mo is clear within 90 days. Otherwise: either commit a quarter to push it to $1k+, or sunset it. Indie purgatory drains the energy you need for the next project.",
    articleSlug: "what-an-mvp-actually-is",
  },
  {
    id: "rebuilt-same-saas",
    title: "Same SaaS rebuilt in 3 different stacks",
    category: "stay",
    answer: "You don't have a product problem, you have a fear-of-launching problem. Stacks don't fail products — products fail because nobody knew about them. Pick the stack you have right now, ship to production with that, get 10 paying users, then decide if the stack matters. Spoiler: at that point you'll never want to migrate.",
    articleSlug: "what-an-mvp-actually-is",
  },
  {
    id: "dopamine-build-not-sell",
    title: "Building feels good, selling doesn't (kills pre-PMF)",
    category: "stay",
    answer: "Universal trap. Building is deterministic — your prompt either works or doesn't, you get an instant signal. Selling is probabilistic, delayed, often rejected. Solo founders need to schedule the unloved work like dental cleaning: 1 hour every morning before you let yourself open the editor. Not after — before. Otherwise it never happens.",
    articleSlug: "what-an-mvp-actually-is",
  },
  {
    id: "metrics-anxious",
    title: "Checking metrics triggers anxiety",
    category: "stay",
    answer: "Check metrics on a schedule, not on impulse. Weekly Friday 30-min review. Outside that window, don't open the dashboard. The data didn't change in 4 hours, but your stress level did. The anxiety isn't pointing at a real problem you can fix today; it's pointing at scarcity of progress signals which is just the nature of pre-PMF.",
    articleSlug: "after-launch-troubleshooting",
  },
  {
    id: "havent-talked-to-user",
    title: "No user contact in 6 weeks",
    category: "stay",
    answer: "Without user contact you're drifting. 2026's data: solo founders who do 1 user call per week are 3x more likely to find PMF. \"Call\" can be a 10-min Discord DM. The hard part isn't time, it's the discomfort. Pick the friendliest user, ask one question: \"What were you doing right before you opened the app today?\" — listen for what you didn't anticipate.",
    articleSlug: "what-an-mvp-actually-is",
  },
  {
    id: "mvp-not-mvp",
    title: "What's called an MVP is actually a v1",
    category: "stay",
    answer: "Eric Ries's MVP: smallest thing that lets you LEARN whether the hypothesis is true. Not smallest thing that's shippable, not your minimum-acceptable-quality v1. If you're polishing features instead of putting it in front of users, you're past MVP and into v1 territory. That's not wrong, but call it what it is — and don't claim you're \"validating\" anymore.",
    articleSlug: "what-an-mvp-actually-is",
  },
];
