import { Category, Comment, Prompt } from "./types";

export const CATEGORY_COLORS: Record<string, string> = {
  "app-store":    "#3b82f6",
  "play-store":   "#22c55e",
  "aso":          "#f59e0b",
  "landing-page": "#f97316",
  "ui-ux":        "#ec4899",
  "mvp-docs":     "#06b6d4",
  "api-backend":  "#8b5cf6",
  "testing":      "#ef4444",
};

export const CATEGORIES: Category[] = [
  {
    slug: "app-store",
    name: "App Store",
    shortName: "App Store",
    description: "iOS App Store descriptions that convert",
    icon: "📱",
    count: 12,
  },
  {
    slug: "play-store",
    name: "Play Store",
    shortName: "Play Store",
    description: "Google Play descriptions optimized for installs",
    icon: "🤖",
    count: 9,
  },
  {
    slug: "aso",
    name: "ASO",
    shortName: "ASO",
    description: "App Store Optimization — keywords, titles, subtitles",
    icon: "📈",
    count: 15,
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    shortName: "Landing",
    description: "Copy that turns visitors into users",
    icon: "🚀",
    count: 18,
  },
  {
    slug: "ui-ux",
    name: "UI / UX",
    shortName: "UI/UX",
    description: "Design audits, flows, and component prompts",
    icon: "🎨",
    count: 21,
  },
  {
    slug: "mvp-docs",
    name: "MVP Docs",
    shortName: "MVP",
    description: "PRDs, scopes, and product specs",
    icon: "📋",
    count: 11,
  },
  {
    slug: "api-backend",
    name: "API / Backend",
    shortName: "Backend",
    description: "Architecture, endpoints, and database design",
    icon: "⚙️",
    count: 16,
  },
  {
    slug: "testing",
    name: "Testing",
    shortName: "Testing",
    description: "QA, test cases, and bug reports",
    icon: "🧪",
    count: 8,
  },
];

export const PROMPTS: Prompt[] = [
  {
    slug: "app-store-description-converter",
    title: "App Store Description Converter",
    category: "app-store",
    categoryName: "App Store",
    tags: ["ios", "conversion", "copywriting"],
    difficulty: "beginner",
    tools: ["claude", "chatgpt"],
    author: "vibeprompt",
    useCase: "Convert a raw feature list into a high-converting App Store description",
    whenToUse: "Right before submitting to App Store, or when rewriting a description that isn't converting.",
    prompt: `You are an expert App Store copywriter. Convert the following app description into an optimized App Store listing.

App details:
[PASTE YOUR APP DETAILS HERE]

Requirements:
- First paragraph: hook the reader in 1-2 sentences (visible above the fold)
- Use short paragraphs (2-3 sentences max)
- Lead with benefits, not features
- Include 3-5 key features as bullet points with emoji
- End with a clear call to action
- Max 4000 characters total
- Tone: [friendly/professional/bold]

Output format:
1. First paragraph (hook)
2. Main body with benefits
3. Feature list (bullets)
4. CTA paragraph`,
    outputExample: `Tired of forgetting your best ideas? PromptVault saves the prompts that actually work — so you can stop searching and start shipping.

Built for builders and indie hackers who live inside AI tools. Find proven prompts, save your favorites, and build your own prompt stack.

✦ 500+ curated prompts for builders
✦ Personal library — save what works for you
✦ Organized by category: ASO, UI/UX, MVP, and more
✦ Open source, GitHub-powered
✦ New prompts added weekly by the community

Download free. Start building faster.`,
    notes: "Try 'bold' tone for developer tools. Run it twice and combine the best parts of both outputs.",
    upvotes: 142,
    commentCount: 18,
    createdAt: "2024-11-15",
  },
  {
    slug: "play-store-short-description",
    title: "Play Store Short Description",
    category: "play-store",
    categoryName: "Play Store",
    tags: ["android", "aso", "conversion"],
    difficulty: "beginner",
    tools: ["claude", "chatgpt", "cursor"],
    author: "indiebuilder",
    useCase: "Write a 80-character Play Store short description that maximizes click-through rate",
    whenToUse: "When setting up your Play Store listing or A/B testing descriptions.",
    prompt: `Write 5 variations of a Google Play short description for this app:

App name: [APP NAME]
Core value: [ONE SENTENCE WHAT IT DOES]
Target user: [WHO IS IT FOR]

Rules:
- Max 80 characters each
- Lead with the #1 benefit
- Use active verbs
- No filler words
- Include a power word if natural

Output: 5 numbered variations, with a note on the strategy used for each.`,
    outputExample: `1. "Track habits that actually stick. Simple, fast, no noise." (benefit-first)
2. "Build routines that last — 2M users can't be wrong." (social proof)
3. "Your daily habits, finally under control." (pain point)
4. "Habit tracker built for people who hate habit trackers." (contrarian)
5. "Small steps. Big results. Start your streak today." (motivational)`,
    notes: "Variation 4 (contrarian) tends to perform best for productivity apps.",
    upvotes: 89,
    commentCount: 7,
    createdAt: "2024-11-20",
  },
  {
    slug: "landing-page-hero-copy",
    title: "Landing Page Hero Copy",
    category: "landing-page",
    categoryName: "Landing Page",
    tags: ["copywriting", "conversion", "saas"],
    difficulty: "intermediate",
    tools: ["claude", "chatgpt"],
    author: "vibeprompt",
    useCase: "Generate hero section copy (headline + subheadline + CTA) that converts",
    whenToUse: "When building a new landing page or when your current hero isn't converting.",
    prompt: `You are a conversion copywriter. Write hero section copy for this product.

Product: [PRODUCT NAME]
What it does: [ONE SENTENCE]
Target audience: [WHO]
Their #1 pain: [WHAT FRUSTRATES THEM]
Your main benefit: [WHAT CHANGES FOR THEM]

Generate:
1. Headline (max 8 words, benefit or pain-focused)
2. Subheadline (1-2 sentences, expand on headline, mention who it's for)
3. Primary CTA button text (3-5 words)
4. Secondary CTA (optional, softer)

Give me 3 complete variations with different angles:
- Angle 1: Pain-focused
- Angle 2: Outcome-focused
- Angle 3: Contrarian or bold claim`,
    outputExample: `PAIN ANGLE:
Headline: Stop losing your best prompts.
Sub: VibePrompt is the open library where builders save and share the prompts that actually ship products.
CTA: Save your first prompt →

OUTCOME ANGLE:
Headline: Ship faster with proven prompts.
Sub: Browse 500+ curated prompts for builders. Save your favorites. Build your own stack.
CTA: Browse prompts free →

BOLD ANGLE:
Headline: Most prompt libraries are slop.
Sub: We fixed that. VibePrompt is a curated, GitHub-powered prompt library built by builders who actually ship.
CTA: See for yourself →`,
    notes: "The bold angle gets more shares. The outcome angle converts better. Test both.",
    upvotes: 203,
    commentCount: 31,
    createdAt: "2024-12-01",
  },
  {
    slug: "mobile-ui-audit",
    title: "Mobile UI Audit",
    category: "ui-ux",
    categoryName: "UI / UX",
    tags: ["mobile", "audit", "design", "ux"],
    difficulty: "intermediate",
    tools: ["claude", "chatgpt", "cursor"],
    author: "uxbuilder",
    useCase: "Get a structured UX audit of any mobile screen",
    whenToUse: "Before a redesign, when users complain about UX, or after adding new features.",
    prompt: `You are a senior mobile UX designer. Audit the following screen.

[PASTE SCREENSHOT OR DESCRIBE THE SCREEN]

Analyze:
1. **Visual hierarchy** — does the eye know where to go first?
2. **CTA clarity** — is the primary action obvious?
3. **Cognitive load** — how many decisions does the user have to make?
4. **Touch targets** — are interactive elements large enough (min 44x44pt)?
5. **Whitespace** — is there enough breathing room?
6. **Consistency** — does it match platform conventions (iOS/Android)?

Output format:
- Rating 1-10 per area
- Top 3 issues with severity (high/medium/low)
- 3 specific, actionable fixes
- One-line overall verdict`,
    notes: "Works best with a screenshot. Describe the screen in detail if you don't have one.",
    upvotes: 156,
    commentCount: 22,
    createdAt: "2024-12-05",
  },
  {
    slug: "prd-one-pager",
    title: "PRD One-Pager",
    category: "mvp-docs",
    categoryName: "MVP Docs",
    tags: ["prd", "product", "planning", "mvp"],
    difficulty: "beginner",
    tools: ["claude", "chatgpt", "cursor"],
    author: "vibeprompt",
    useCase: "Turn a rough idea into a structured 1-page PRD",
    whenToUse: "Before starting to build. Gets you aligned before writing a single line of code.",
    prompt: `You are a product manager. Write a one-page PRD for this idea.

Idea: [DESCRIBE YOUR IDEA IN 1-3 SENTENCES]
Target user: [WHO]
Core problem: [WHAT PROBLEM DOES IT SOLVE]

Structure the PRD as:

## Problem
2-3 sentences on the pain point.

## Solution
What you're building and why it's the right approach.

## Target User
Who specifically. Include a one-line persona.

## MVP Scope (what's IN)
Bullet list — max 5 items.

## Out of Scope (what's NOT in MVP)
Bullet list — what you're explicitly not building yet.

## Success Metrics
3 metrics that tell you if it's working.

## Open Questions
2-3 things you still need to figure out.

Keep the whole thing under 400 words.`,
    outputExample: `## Problem
Builders collect great prompts in notes, chats, and bookmarks — and then can't find them when they need them. There's no structured, searchable place built for the builder workflow.

## Solution
An open, GitHub-powered prompt library where builders browse, save, and contribute prompts. The personal library feature turns a directory into a tool you actually come back to.

## Target User
Indie hackers and vibe coders who ship apps using AI tools. Persona: "Alex, building her 3rd app, keeps rewriting the same prompts from scratch."

## MVP Scope
- Browse prompts by category
- Individual prompt pages with copy button
- Save to personal library (requires login)
- Upvote prompts
- Contribute via GitHub PR

## Out of Scope
- Comments (v2)
- AI-powered search (v2)
- Teams/sharing (v3)

## Success Metrics
1. 100 prompts saved to libraries in first month
2. 20% return visit rate week 2
3. 10 community PRs submitted

## Open Questions
- Do we need auth for browsing, or just for saving?
- GitHub PR flow vs. submission form — which gets more contributions?`,
    upvotes: 178,
    commentCount: 14,
    createdAt: "2024-12-10",
  },
  {
    slug: "rest-api-design",
    title: "REST API Design",
    category: "api-backend",
    categoryName: "API / Backend",
    tags: ["api", "rest", "architecture", "backend"],
    difficulty: "intermediate",
    tools: ["claude", "cursor", "chatgpt"],
    author: "backendbuilder",
    useCase: "Design a clean REST API structure for any feature",
    whenToUse: "Before writing any backend code. Gets you a clean contract to build against.",
    prompt: `Design a REST API for the following feature.

Feature: [DESCRIBE THE FEATURE]
Stack: [YOUR STACK, e.g. Next.js + Supabase]
Auth: [HOW USERS ARE AUTHENTICATED]

Output:
1. **Endpoints** — list all routes with method, path, description
2. **Request/Response** — example JSON for each endpoint
3. **Error codes** — what errors can each endpoint return
4. **Auth requirements** — which endpoints require auth
5. **Rate limiting** — any endpoints that need rate limits

Follow REST conventions:
- Use nouns, not verbs in paths
- Use proper HTTP methods (GET/POST/PUT/DELETE/PATCH)
- Consistent response shape: { data, error, meta }
- Plural resource names`,
    notes: "Paste this directly into Cursor with your stack for instant implementation.",
    upvotes: 94,
    commentCount: 11,
    createdAt: "2024-12-08",
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "alexbuilder",
    avatar: "AB",
    content: "Used this for my last 3 app launches. The bold angle variant is insane for developer tools.",
    createdAt: "2024-12-12",
    upvotes: 24,
  },
  {
    id: "2",
    author: "sarahships",
    avatar: "SS",
    content: "Added a step where I paste in 3 competitor descriptions first and ask Claude to differentiate. Works even better.",
    createdAt: "2024-12-14",
    upvotes: 18,
  },
  {
    id: "3",
    author: "vikramdev",
    avatar: "VD",
    content: "Solid starting point. I usually do 2 rounds — first pass for structure, second for tone.",
    createdAt: "2024-12-15",
    upvotes: 9,
  },
];

export function getPromptsByCategory(category: string): Prompt[] {
  return PROMPTS.filter((p) => p.category === category);
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return PROMPTS.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const FEATURED_PROMPTS = PROMPTS.slice(0, 3);
export const TRENDING_PROMPTS = [...PROMPTS].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4);
