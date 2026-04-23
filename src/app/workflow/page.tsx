import type { Metadata } from "next";
import { WorkflowStepper, type StepData } from "@/components/workflow/workflow-stepper";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Vibe Coding Workflow | From idea to shipped",
  description:
    "The complete build loop for indie devs: validate, spec, stack, context, build, gate, ship, iterate.",
  alternates: { canonical: "/workflow" },
};

const STEPS: StepData[] = [
  {
    step: "00",
    title: "Environment",
    emoji: "⚙️",
    whatThis: "Get your terminal, editor, Git, Node.js, and AI tool working before you write a single line of code.",
    why: "Most beginners fail in setup chaos, not bad ideas. Lock this in once, you'll never think about it again.",
    tasks: [
      {
        heading: "Checklist",
        description: "Confirm each tool works before moving on.",
        items: [
          {
            text: "Open a terminal and run `ls`, confirm files appear.",
            links: [
              { label: "Windows Terminal", href: "https://aka.ms/terminal" },
              { label: "iTerm2", href: "https://iterm2.com" },
            ],
          },
          {
            text: "Install Claude Code (CLI, the most capable AI coding tool) or Cursor/VS Code if you prefer an IDE.",
            detail: "Claude Code runs in your terminal and has direct access to your whole codebase. No copy-pasting.",
            links: [
              { label: "Claude Code", href: "https://claude.ai/download" },
              { label: "Cursor", href: "https://cursor.com" },
              { label: "VS Code", href: "https://code.visualstudio.com" },
            ],
          },
          {
            text: "Install Git and run `git --version` to confirm.",
            links: [{ label: "Git", href: "https://git-scm.com" }],
          },
          {
            text: "Create a GitHub account, make a new repo, and push an empty README.",
            links: [{ label: "GitHub", href: "https://github.com" }],
          },
          {
            text: "Install Node.js LTS (not Current) and run `node -v` to confirm.",
            links: [{ label: "Node.js", href: "https://nodejs.org" }],
          },
          {
            text: "Run `npx create-next-app@latest`, confirm the project opens at localhost.",
            detail: "If it installs, starts, and opens, your terminal, Node, and npm are all wired correctly.",
          },
          {
            text: "Create `TASK.md` in the repo root. This is your living task list, add tasks before starting, check them off immediately when done.",
            detail: "Format: task text + date added. Add a 'Discovered During Work' section for tasks that surface mid-session.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Watch before or during setup.",
        items: [
          {
            text: "Watch: Terminal and command line basics for beginners",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=terminal+command+line+basics+beginners" }],
          },
          {
            text: "Watch: Git explained in 100 seconds",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=git+explained+100+seconds+fireship" }],
          },
          {
            text: "Watch: Claude Code getting started tutorial",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=claude+code+getting+started+tutorial+2024" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "",
  },
  {
    step: "01",
    title: "Research",
    emoji: "🔍",
    whatThis: "Confirm the problem is real before writing any code. Use a chat AI with web search for deep research, not your IDE.",
    why: "Most projects fail before the build starts. One hour here saves weeks of building the wrong thing.",
    tasks: [
      {
        heading: "Checklist",
        description: "Manual signal first, AI will hallucinate demand if you skip this.",
        items: [
          {
            text: "Google your idea exactly as a user would search for it.",
            detail: "No results = red flag. 10 existing tools = good signal, people want this.",
          },
          {
            text: "Check Google Trends with 12 months of data. Rising or flat = healthy. One spike then nothing = hype.",
            links: [{ label: "Google Trends", href: "https://trends.google.com" }],
          },
          {
            text: "Search Reddit and X for real complaints. Try '[topic] annoying' or '[tool] broken'. No complaints in 2 years = pain isn't strong enough.",
            links: [
              { label: "Reddit", href: "https://reddit.com/search" },
              { label: "X", href: "https://x.com/search" },
            ],
          },
          {
            text: "Find 3 direct competitors on Product Hunt or SimilarWeb. Write one strength and one gap for each.",
            detail: "Can't find 3 = you probably don't have a market. All 3 share the same gap = that's your opening.",
            links: [
              { label: "Product Hunt", href: "https://producthunt.com" },
              { label: "SimilarWeb", href: "https://similarweb.com" },
            ],
          },
          {
            text: "Open Claude.ai or ChatGPT with web search on. Paste: 'Research this market for me: [your idea]. Who are the competitors? What are users complaining about? What gaps exist?' Save the output to `docs/research.md`.",
            detail: "Use a chat AI with web search for research, not your coding IDE. This is the right tool for this phase.",
            links: [
              { label: "Claude.ai", href: "https://claude.ai" },
              { label: "ChatGPT", href: "https://chatgpt.com" },
            ],
          },
          {
            text: "Write kill criteria before any code: 'If I can't find 10 real complaints in 1 hour → I stop.'",
            detail: "Write it now, in writing, before any code. You won't enforce it later if you don't commit now.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Understand validation before you collect signal.",
        items: [
          {
            text: "Watch: How to validate a startup idea",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=how+to+validate+startup+idea+indie+hacker" }],
          },
          {
            text: "Watch: Finding startup ideas that work",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=how+to+find+startup+ideas+that+work" }],
          },
          {
            text: "Read: How to Get Startup Ideas, Paul Graham",
            links: [{ label: "paulgraham.com", href: "https://paulgraham.com/startupideas.html" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "research-validate",
  },
  {
    step: "02",
    title: "PRD",
    emoji: "📝",
    whatThis: "Write one file that says exactly what you're building, why, and what success looks like. This is what you hand to AI at the start of every session.",
    why: "Without a spec, AI fills every gap with assumptions, and those assumptions ship. Most agent failures are context failures, not model failures.",
    tasks: [
      {
        heading: "Checklist",
        description: "Write this yourself. A vague PRD produces a vague product.",
        items: [
          {
            text: "Name one target user. One real person, one real situation.",
            detail: "Not 'developers'. Example: 'a freelance designer with 3–5 clients who loses track of client feedback threads'.",
          },
          {
            text: "Write Goal: what the product does in one sentence.",
            detail: "Example: 'A minimal client portal where freelancers collect and track feedback in one place.'",
          },
          {
            text: "Write Why: what business value this creates and what problem it solves.",
            detail: "Who benefits? What metric improves? Why does this matter to ship?",
          },
          {
            text: "List max 5 MVP features under What. If your list has 12, that's a roadmap. Cut to 5.",
            links: [{ label: "Shape Up", href: "https://basecamp.com/shapeup" }],
          },
          {
            text: "Write the out-of-scope list with at least 3 explicit exclusions.",
            detail: "'No user profiles', 'no notifications', 'no admin dashboard'. Without this, every feature you didn't mention becomes a maybe.",
          },
          {
            text: "Write Success Criteria as testable conditions. Not 'auth works', 'a new user signs up, verifies email, and reaches the dashboard in under 60 seconds without errors'.",
          },
          {
            text: "Save as `docs/PRD.md` in the repo root. You will paste this into every AI session and load it into AGENTS.md.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Understand what a spec is and why cutting features is the point.",
        items: [
          {
            text: "Watch: How to write a product requirements document (PRD)",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=how+to+write+product+requirements+document+PRD" }],
          },
          {
            text: "Watch: What is an MVP, and why cutting features is the point",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=what+is+minimum+viable+product+mvp+explained" }],
          },
          {
            text: "Read: Context Engineering intro, how PRDs feed AI context",
            links: [{ label: "github.com/coleam00", href: "https://github.com/coleam00/context-engineering-intro" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "prd-spec",
  },
  {
    step: "03",
    title: "Stack",
    emoji: "🎨",
    whatThis: "Lock every technology decision in one file before writing any code. The AI picks whatever it was trained on most, not what fits your project.",
    why: "Mid-build stack changes cost ten times more than upfront decisions. No open choices past this step.",
    tasks: [
      {
        heading: "Checklist",
        description: "Make every decision now. Ask AI: 'What is the simplest yet most robust stack for this PRD?'",
        items: [
          {
            text: "Pick a frontend framework. Next.js is the default for 90% of indie projects, SEO, one-click Vercel deploy, massive ecosystem. Use Remix if your app is form-heavy. If unsure: Next.js.",
            links: [
              { label: "Next.js", href: "https://nextjs.org" },
              { label: "Remix", href: "https://remix.run" },
            ],
          },
          {
            text: "Pick a UI system. Tailwind CSS + shadcn/ui is the indie standard, components you copy and own, no dependency lock-in.",
            links: [
              { label: "Tailwind CSS", href: "https://tailwindcss.com" },
              { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            ],
          },
          {
            text: "Pick a database and auth. Supabase handles Postgres + auth + storage in one service. Use Clerk for auth as a standalone product.",
            links: [
              { label: "Supabase", href: "https://supabase.com" },
              { label: "Clerk", href: "https://clerk.com" },
            ],
          },
          {
            text: "Connect your repo to Vercel today, not at launch. Every push to main deploys automatically. Every PR gets a preview URL.",
            links: [
              { label: "Vercel", href: "https://vercel.com" },
              { label: "Railway", href: "https://railway.app" },
            ],
          },
          {
            text: "Write all decisions in `docs/TechDesign.md`. Include framework, UI, DB, auth, deploy, and why you chose each.",
            detail: "This file gets loaded into every AI session alongside your PRD. No open decisions allowed.",
          },
          {
            text: "Install Context7 MCP if using Claude Code, it pulls the current docs for any library directly into the LLM context window.",
            detail: "Prevents hallucinated APIs. AI sees the actual API for your exact version, not what it was trained on.",
            links: [{ label: "Context7", href: "https://context7.com" }],
          },
        ],
      },
      {
        heading: "Learn",
        description: "Get familiar with the tools before you build with them.",
        items: [
          {
            text: "Watch: Next.js App Router crash course",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=nextjs+app+router+crash+course+2024" }],
          },
          {
            text: "Watch: shadcn/ui, add and customize components",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=shadcn+ui+tutorial+crash+course" }],
          },
          {
            text: "Watch: Supabase crash course for beginners",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=supabase+crash+course+beginner" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "architecture-stack",
  },
  {
    step: "04",
    title: "Context",
    emoji: "🗂️",
    whatThis: "Build the memory system every AI session reads from, AGENTS.md plus a memory-bank folder. This is what separates a codebase that stays coherent from one that doesn't.",
    why: "Every new chat is a blank slate. Without a persistent context layer, every session drifts, different decisions, different conventions, broken consistency.",
    tasks: [
      {
        heading: "Checklist",
        description: "Set this up once. Every session reads from it, no more re-explaining your stack.",
        items: [
          {
            text: "Create `AGENTS.md` (or `CLAUDE.md`) in the repo root. Claude Code reads it automatically at the start of every session.",
            links: [
              { label: "Claude Code memory docs", href: "https://docs.anthropic.com/en/docs/claude-code/memory" },
              { label: "KhazP template", href: "https://github.com/KhazP/vibe-coding-prompt-template/blob/main/AGENTS.md" },
            ],
          },
          {
            text: "Write your stack, folder structure, and naming conventions in plain English. Not code, sentences.",
            detail: "'We use Next.js App Router. All components go in src/components. File names are kebab-case. No file exceeds 500 lines, refactor into modules instead.'",
          },
          {
            text: "Add the 500-line rule: never create a file longer than 500 lines. If you're approaching the limit, refactor into modules first.",
            detail: "This single rule prevents the monolith problem that makes vibe-coded codebases unmaintainable.",
          },
          {
            text: "Add the never-overwrite rule: never delete or overwrite existing code unless explicitly instructed.",
            detail: "Prevents silent regressions. The AI that wrote the code is primed to defend it, this rule forces an explicit ask.",
          },
          {
            text: "Add the test rule: every new feature needs 3 tests, 1 expected use, 1 edge case, 1 failure case.",
          },
          {
            text: "Add a no-touch list: files the AI must never modify. Examples: `.env`, `package-lock.json`, critical config files.",
          },
          {
            text: "Create a `memory-bank/` folder with these files: `@architecture.md` (file map, always read), `@design-doc.md` (your PRD, always read), `progress.md` (completed steps), `implementation-plan.md` (ordered task list).",
            detail: "Files prefixed with @ are set as 'Always' rules in your tool. The AI reads them before every session.",
            links: [{ label: "EnzeD memory-bank pattern", href: "https://github.com/EnzeD/vibe-coding" }],
          },
          {
            text: "Start every AI session: 'Read AGENTS.md, docs/PRD.md, and memory-bank/@architecture.md before doing anything. Summarize what you understand before coding.'",
          },
        ],
      },
      {
        heading: "Learn",
        description: "See how experienced builders set up context files.",
        items: [
          {
            text: "Watch: AGENTS.md and Claude Code memory setup",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=claude+code+agents+md+memory+setup+tutorial" }],
          },
          {
            text: "Read: Context Engineering intro, the full pattern",
            links: [{ label: "github.com/coleam00", href: "https://github.com/coleam00/context-engineering-intro" }],
          },
          {
            text: "Read: KhazP vibe coding template, full project scaffold",
            links: [{ label: "github.com/KhazP", href: "https://github.com/KhazP/vibe-coding-prompt-template" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "agent-setup",
  },
  {
    step: "05",
    title: "Build",
    emoji: "🔄",
    whatThis: "One task. Plan first. Execute. Verify. Commit. Start a new chat. Repeat. Planning is everything, do not let the AI plan autonomously.",
    why: "Big prompts produce big diffs. Big diffs don't get reviewed. Small loops mean smaller diffs, clean rollback points, and a codebase you can understand.",
    tasks: [
      {
        heading: "Checklist",
        description: "Plan first, always. The AI builds what it understands, you define what that is.",
        items: [
          {
            text: "Go slow at the start. The first week sets the patterns every future session inherits, naming conventions, file structure, component shape. Rushing this produces a codebase that's hard to reason about by week three. Slow at the start is fast overall.",
            detail: "This is the most consistent difference between projects that ship cleanly and projects that get stuck in debugging loops. The foundation compounds.",
          },
          {
            text: "Build vertical slices, one complete feature at a time (UI + API + test together). Never build a full frontend and connect it to the backend later. Disconnected layers accumulate mismatched assumptions that take longer to reconcile than they would have taken to align from the start.",
            detail: "The most common vibe coding failure mode is 'I built the whole UI, now I need to wire it to the API.' By that point, the data shapes don't match, the auth logic doesn't align, and half the state management is wrong. One slice at a time prevents all of it.",
          },
          {
            text: "Break your PRD into 20–30 atomic tasks in `TASK.md`. 'Add auth' is not atomic. 'Add /login route that renders the Clerk sign-in component' is. If a task touches more than 3 files, split it.",
          },
          {
            text: "Use Plan Mode before every task. In Claude Code: press `shift+tab` before executing. In Cursor: start your prompt with 'DO NOT code yet, just plan.' Approve the plan. Then execute.",
            detail: "Never let the AI make architectural decisions unsupervised. Review the plan first.",
          },
          {
            text: "Add `ultrathink` to prompts before complex tasks: 'ultrathink this before coding.' Use `think` for simple tasks, `think hard` for moderate, `ultrathink` for anything architectural.",
            detail: "These are escalating reasoning triggers for Claude. They produce significantly better plans on hard problems.",
          },
          {
            text: "Give the AI one task per session. After it's done, review every changed line, then commit: `git commit -m 'feat: add login page'`. Then start a new chat.",
            detail: "New chat per step is the key habit. A fresh context window produces better output than a long, noisy one.",
            links: [{ label: "Conventional Commits", href: "https://conventionalcommits.org" }],
          },
          {
            text: "Monitor your context window. Keep it above 50–60% capacity. Use `/compact` in Claude Code to compress history, not `/clear`. Clearing loses your session state.",
          },
          {
            text: "Pause before irreversible actions. Before deleting, before a major refactor, before deploying: ask 'What are the risks? What can't be undone?' Then proceed.",
          },
          {
            text: "Troubleshoot with these prompts, AI ignoring docs: 'Read AGENTS.md, PRD, and TechDesign. Summarize key requirements before coding.' AI overcomplicating: 'Prioritize MVP scope. Give me the simplest working implementation.'",
          },
          {
            text: "Add this suffix to any prompt where quality matters: 'Think as long as needed. What matters is that you follow precisely what I asked and execute it perfectly. Ask me questions if I am not precise enough.'",
          },
        ],
      },
      {
        heading: "Learn",
        description: "How experienced builders structure AI build loops.",
        items: [
          {
            text: "Watch: Claude Code build loop and Plan Mode walkthrough",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=claude+code+plan+mode+build+loop+workflow" }],
          },
          {
            text: "Watch: Agentic coding workflow, one task, one diff",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=agentic+coding+workflow+cursor+claude+build+loop" }],
          },
          {
            text: "Read: EnzeD vibe coding guide, the full build loop methodology",
            links: [{ label: "github.com/EnzeD", href: "https://github.com/EnzeD/vibe-coding" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "build-ship",
  },
  {
    step: "06",
    title: "Quality",
    emoji: "🛡️",
    whatThis: "Run a structured check before any code reaches production. You are the only gate. The AI that wrote the code is primed to defend it.",
    why: "AI code passes surface checks and misses subtle ones. Secrets leak. Spec drift accumulates quietly. Vibe-coded codebases have systematic blind spots.",
    tasks: [
      {
        heading: "Checklist",
        description: "Run these yourself. Don't ask the model that wrote the code to review it.",
        items: [
          {
            text: "Check every changed file against your PRD. If it wasn't specced, it doesn't ship until you explicitly approve it.",
          },
          {
            text: "Check no file exceeds 500 lines. If it does, open a new session and ask the AI to refactor it into modules before merging.",
          },
          {
            text: "Verify the test triangle for every new feature: 1 expected-use test, 1 edge-case test, 1 failure-case test.",
          },
          {
            text: "Scan for exposed secrets: `sk-`, `API_KEY`, `Bearer`, `SUPABASE_`, `password`. Confirm `.env` is in `.gitignore`.",
            detail: "One leaked key can rack up bills overnight. Run `git log --all --grep='API_KEY'` to check history too.",
            links: [{ label: "git-secrets", href: "https://github.com/awslabs/git-secrets" }],
          },
          {
            text: "Run `npm audit`, critical and high severity = deploy blockers.",
          },
          {
            text: "Run `npx tsc --noEmit`, zero TypeScript errors, non-negotiable.",
          },
          {
            text: "Write one E2E test for your primary flow. Run `npx playwright codegen`, record by clicking through your app. Landing → sign up → core action → success.",
            links: [{ label: "Playwright", href: "https://playwright.dev" }],
          },
          {
            text: "Send the diff to a second AI with a fresh context window. Ask: 'What's wrong with this code? What security risks do you see?' Fresh context finds what the author can't.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Learn what to check and why vibe-coded code has specific failure modes.",
        items: [
          {
            text: "Watch: How to keep API keys and secrets out of GitHub",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=keep+api+keys+secrets+out+of+github" }],
          },
          {
            text: "Watch: Playwright E2E testing crash course",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=playwright+testing+crash+course+beginners" }],
          },
          {
            text: "Read: OWASP Top 10, check your app against at least the first three",
            links: [{ label: "owasp.org", href: "https://owasp.org/www-project-top-ten" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "testing-quality",
  },
  {
    step: "07",
    title: "Ship",
    emoji: "🚀",
    whatThis: "Get a real URL in front of real people. Watch what they actually do.",
    why: "Localhost is fiction. Real users break assumptions you didn't know you had.",
    tasks: [
      {
        heading: "Checklist",
        description: "Set up observability before you share the URL, not after.",
        items: [
          {
            text: "Connect your repo to Vercel, every push to main deploys, every PR gets a preview URL.",
            links: [{ label: "Vercel", href: "https://vercel.com" }],
          },
          {
            text: "Install PostHog and enable session recording immediately. Free tier. Early sessions are the most revealing.",
            links: [{ label: "PostHog Next.js quickstart", href: "https://posthog.com/docs/libraries/next-js" }],
          },
          {
            text: "Install Sentry before sharing the URL, it catches unhandled exceptions with full stack traces.",
            links: [{ label: "Sentry Next.js setup", href: "https://docs.sentry.io/platforms/javascript/guides/nextjs/" }],
          },
          {
            text: "Share the URL the moment it's live. Rough is fine.",
            detail: "Post in relevant subreddits, Discord servers, X. People who try rough versions give the most honest feedback.",
          },
          {
            text: "Watch one full session recording before making any changes.",
            detail: "Don't open dashboards first. Watch a recording. One recording = more insight than 1000 pageviews.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Set up analytics and learn how to get first users.",
        items: [
          {
            text: "Watch: PostHog setup, session recordings and analytics",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=posthog+session+recording+analytics+setup" }],
          },
          {
            text: "Watch: How to get your first users as an indie hacker",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=how+to+get+first+users+indie+hacker+saas+launch" }],
          },
          {
            text: "Watch: Sentry setup for Next.js",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=sentry+nextjs+error+tracking+setup" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "launch-growth",
  },
  {
    step: "08",
    title: "Iterate",
    emoji: "🔁",
    whatThis: "Use real behavior data to decide what to fix next. Not gut feelings. Not user requests. Behavior.",
    why: "What users say and what users do are different data. Iterating without session data is guessing with extra steps.",
    tasks: [
      {
        heading: "Checklist",
        description: "Do this analysis before you open a new build session.",
        items: [
          {
            text: "Watch 5 PostHog session recordings before opening any dashboard. Rage clicks and dead clicks show exactly where the UX breaks.",
            links: [{ label: "PostHog session replays", href: "https://posthog.com/docs/session-replay/how-to-use-session-replays" }],
          },
          {
            text: "Set up a PostHog funnel for your main user flow. Drop-off rate per step = most actionable early metric.",
            links: [{ label: "PostHog funnels", href: "https://posthog.com/docs/product-analytics/funnels" }],
          },
          {
            text: "Pick exactly 3 friction points to fix. Not ten.",
            detail: "Pick the ones that appear in 3+ recordings, not one-off edge cases.",
          },
          {
            text: "Update your PRD before re-entering the build loop.",
            detail: "The spec you have is for v0.1. Update done conditions and out-of-scope before any AI session.",
          },
          {
            text: "Note the baseline metric before shipping.",
            detail: "Example: 60% drop-off at step 2. Check again in 48–72 hours. If it didn't move, your root cause theory was wrong.",
          },
        ],
      },
      {
        heading: "Learn",
        description: "Learn how to read behavior data and act on it.",
        items: [
          {
            text: "Watch: How to analyze session recordings",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=how+to+analyze+session+recordings+posthog+ux" }],
          },
          {
            text: "Watch: Product analytics fundamentals, funnels and retention",
            links: [{ label: "YouTube", href: "https://www.youtube.com/results?search_query=product+analytics+funnels+retention+beginners" }],
          },
          {
            text: "Read: How to use session replays, PostHog guide",
            links: [{ label: "posthog.com", href: "https://posthog.com/docs/session-replay/how-to-use-session-replays" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "ops-maintenance",
  },
];

export default function WorkflowPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"The vibe coding\nworkflow."}
          description="9 steps from idea to shipped, built from the most-starred vibe coding repos."
          accent="#ffffff"
        />
      </Reveal>
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <WorkflowStepper steps={STEPS} />
        <Reveal>
          <GithubCta
            title={"Something\nmissing?"}
            description="Suggest a step, a resource, or a fix. If it belongs here, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/VibePrompt/issues/new"
            primaryLabel="Suggest a change"
            secondaryHref="https://github.com/dotsystemsdevs/VibePrompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}
