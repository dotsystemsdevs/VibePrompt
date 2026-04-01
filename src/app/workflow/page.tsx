import Link from "next/link";
import type { Metadata } from "next";
import { GithubCta } from "@/components/cta/github-cta";
import { Hero } from "@/components/hero/hero";
import { WorkflowStepNav } from "@/components/workflow/workflow-step-nav";

export const metadata: Metadata = {
  title: "Ultimate Vibe Coding Workflow | 8 steps from idea to shipped",
  description:
    "The complete build loop for indie devs: validate the problem, spec it tight, lock the stack, set AI context, build in loops, gate quality, ship fast, and iterate on signal.",
  alternates: { canonical: "/workflow" },
};

type Resource = { label: string; href: string; usage?: string[] };

type Step = {
  step: string;
  title: string;
  emoji: string;
  whatThis: string;
  why: string;
  tasks: string[];
  commonMistakes: string[];
  resources: Resource[];
  output: string[];
  browseSlug: string;
};

const STEPS: Step[] = [
  {
    step: "00",
    title: "Setup Your Environment",
    emoji: "⚙️",
    whatThis: "Get the minimum tools in place so nothing blocks you later.",
    why: "A broken environment stops you before you start. Most beginners don't fail because of bad ideas — they get stuck in setup. Get this right once, then forget about it.",
    tasks: [
      "Install Cursor (recommended) or VS Code as your code editor.",
      "Install Git and create a GitHub account if you don't have one.",
      "Create a GitHub repo before writing any code — not after.",
      "Install Node.js LTS if you're building a web app.",
      "Run one simple project locally to confirm everything works.",
    ],
    commonMistakes: [
      "Skipping Git — you will lose work",
      "Not running anything locally before starting — problems compound fast",
      "Installing every tool you've seen mentioned — you need maybe three",
      "Following YouTube setup guides — most are outdated",
    ],
    resources: [
      {
        label: "Cursor",
        href: "https://cursor.com",
        usage: ["AI-native editor — no plugins or extra config needed"],
      },
      {
        label: "GitHub",
        href: "https://github.com",
        usage: ["Create the repo before writing any code, not after"],
      },
      {
        label: "Node.js",
        href: "https://nodejs.org",
        usage: ["LTS version only — the current release often breaks things"],
      },
    ],
    output: [
      "Code editor installed and open",
      "GitHub account created and first repo ready",
      "node -v returns a version number",
      "One project running locally",
    ],
    browseSlug: "agent-setup",
  },
  {
    step: "01",
    title: "Validate",
    emoji: "🔍",
    whatThis: "Confirm the problem is real before writing a single line of code.",
    why: "Most projects fail before the build starts. The two killers: no real demand, no real differentiation. An hour here saves weeks of building the wrong thing.",
    tasks: [
      "Google your idea like a user would. No results = red flag, not opportunity.",
      "Open Google Trends. Compare 2–3 keywords over 12 months. Spikes don't count.",
      'Search Reddit and X for complaints. Try: "niche + annoying" or "tool + problem". No complaints = weak problem.',
      "List 3 competitors. One thing each does well, one specific thing each misses.",
      'Write kill criteria before you start. Example: "Can\'t find 10 real complaints → I stop."',
    ],
    commonMistakes: [
      "Treating your own excitement as evidence of demand",
      "Finding no competitors and calling it a blue ocean",
      "Researching with AI instead of real users",
      "Skipping kill criteria — without them, you'll never stop",
      "Validating the solution instead of the problem",
    ],
    resources: [
      {
        label: "Google Trends",
        href: "https://trends.google.com",
        usage: ["Compare keywords side by side, 12 months minimum", "Flat or declining = shrinking market"],
      },
      {
        label: "Reddit search",
        href: "https://reddit.com/search",
        usage: ['Search: "niche + problem" — sort by Top, past year', "No results or no frustration = the pain isn't strong enough"],
      },
      {
        label: "Perplexity AI",
        href: "https://perplexity.ai",
        usage: ['Ask: "What are alternatives to X and what do they miss?"', "Use it to surface competitors you wouldn't have Googled"],
      },
      {
        label: "SimilarWeb",
        href: "https://similarweb.com",
        usage: ["Check if competitor sites have real traffic — zero traffic usually means no market"],
      },
    ],
    output: [
      "3 competitors listed with one specific gap each",
      "5–10 real complaints saved (links, not paraphrases)",
      "Differentiator written in one sentence",
      "Kill criteria written before any code",
    ],
    browseSlug: "research-validate",
  },
  {
    step: "02",
    title: "Specify",
    emoji: "📝",
    whatThis: "Write a one-page document that defines what you're building — and what you're not.",
    why: "Without a spec, AI fills every gap with assumptions — and those assumptions ship. Every vague sentence in your PRD becomes a bug or an unplanned feature.",
    tasks: [
      "Name one target user. A real person in a real situation — not a demographic.",
      "Write the problem in one sentence. No solution. Just the pain.",
      "List MVP features. Five maximum. No exceptions.",
      "Write the out-of-scope list. AI builds what you didn't explicitly forbid.",
      "Define done as a testable condition — not 'feels finished.'",
    ],
    commonMistakes: [
      "Writing 'users' as your target — pick one specific person",
      "Including the solution inside the problem statement",
      "Listing 10+ features and calling it an MVP",
      "Skipping the out-of-scope list",
      "Leaving done undefined — you'll never know when to stop",
    ],
    resources: [
      {
        label: "Claude",
        href: "https://claude.ai",
        usage: ['Prompt: "I\'m building X for Y who struggles with Z. Write a tight one-page PRD."', "Then cut everything it adds that you didn't ask for"],
      },
      {
        label: "Notion",
        href: "https://notion.so",
        usage: ["One page — not a nested wiki", "Paste the direct link into every new AI session"],
      },
      {
        label: "VibePrompt PRD prompts",
        href: "/browse?category=prd-spec",
        usage: ["Use the clarify-requirements prompt before writing", "Use the vague-goal-to-spec prompt to sharpen scope"],
      },
    ],
    output: [
      "One target user described in two sentences",
      "Problem written in one sentence with no solution in it",
      "Five or fewer MVP features listed",
      "Out-of-scope list with at least three explicit exclusions",
      "Done condition written as a testable statement",
    ],
    browseSlug: "prd-spec",
  },
  {
    step: "03",
    title: "Design Stack",
    emoji: "🎨",
    whatThis: "Lock every technology decision before writing code.",
    why: "Mid-build stack changes cost ten times more than upfront decisions. The AI picks whatever it's trained on most — not what fits your project. Undecided dependencies become blocked work.",
    tasks: [
      "Pick your frontend framework and UI system. Write them down — no 'we'll decide later.'",
      "Pick your database and auth provider. One each.",
      "Pick your deployment target. Vercel, Railway, or Fly — commit to one.",
      "Pin every dependency to an exact version in package.json.",
      "Write all decisions in TechDesign.md before writing any code.",
    ],
    commonMistakes: [
      "Leaving the stack 'flexible' — the AI will decide for you",
      "Picking tech you've never used on a deadline project",
      "Not pinning versions — a breaking change mid-sprint will cost you hours",
      "Skipping TechDesign.md — undocumented decisions get relitigated every session",
      "Switching stacks mid-build because something shinier appeared",
    ],
    resources: [
      {
        label: "v0.dev",
        href: "https://v0.dev",
        usage: ["Prototype UI before writing any component code", "UI scaffolding only — don't use it for logic"],
      },
      {
        label: "Supabase",
        href: "https://supabase.com",
        usage: ["DB + auth + storage in one service — sensible default for most projects", "Generate TypeScript types from your schema before writing any queries"],
      },
      {
        label: "Vercel",
        href: "https://vercel.com",
        usage: ["Connect the repo on day one — not at launch", "Env vars go in the dashboard, never in code"],
      },
    ],
    output: [
      "Framework and UI system chosen and written in TechDesign.md",
      "Database and auth provider chosen — no open decisions",
      "Deployment target connected and working",
      "All dependency versions pinned in package.json",
    ],
    browseSlug: "architecture-stack",
  },
  {
    step: "04",
    title: "Context Setup",
    emoji: "🗂️",
    whatThis: "Write a file that gives every AI session the same rules from the start.",
    why: "Every new AI chat is a blank agent — no memory, no rules, no conventions. Without a context file, sessions drift. Patterns diverge. Decisions get made twice. One file fixes all of this.",
    tasks: [
      "Create AGENTS.md in the repo root.",
      "Write your stack, folder structure, and naming conventions in plain English.",
      "Add a no-touch list: files the AI must never modify without explicit permission.",
      "Paste a 3-sentence PRD summary directly into AGENTS.md.",
      "Start every new session with: 'Read AGENTS.md before doing anything.'",
    ],
    commonMistakes: [
      "Re-explaining context in every session instead of loading a file",
      "Writing vague conventions — 'use good naming' is not a rule",
      "Not updating AGENTS.md when scope or stack changes",
      "Skipping the no-touch list — the AI will rewrite files you didn't think to protect",
    ],
    resources: [
      {
        label: "Claude Code",
        href: "https://claude.ai/code",
        usage: ["Reads AGENTS.md automatically — still reference it explicitly in your first message", "Update it when conventions change, not after something breaks"],
      },
      {
        label: "Cursor",
        href: "https://cursor.com",
        usage: ["Use .cursorrules as the equivalent of AGENTS.md", "Keep rules short — long files get skimmed or ignored"],
      },
      {
        label: "VibePrompt agent setup prompts",
        href: "/browse?category=agent-setup",
        usage: ["The AGENTS.md master template is a solid starting point"],
      },
    ],
    output: [
      "AGENTS.md in repo root with stack, structure, and conventions",
      "No-touch list with at least three critical files named",
      "PRD summary (3 sentences) inside AGENTS.md",
      "First session run with AGENTS.md loaded",
    ],
    browseSlug: "agent-setup",
  },
  {
    step: "05",
    title: "Build in Loops",
    emoji: "🔄",
    whatThis: "Ship one small task at a time. Verify it. Commit it. Repeat.",
    why: "Big prompts produce big diffs. Big diffs don't get properly reviewed. Small loops mean smaller diffs, clean rollback points, and a codebase you can actually trust.",
    tasks: [
      "Break your PRD into 20–30 atomic tasks. Each should fit in one prompt.",
      "Give the AI exactly one task per session. Not two. One.",
      "Read every changed line before accepting. Don't understand it — reject it.",
      "Commit after every verified task with a clear one-line message.",
      "Start a fresh session between features. Load AGENTS.md again.",
    ],
    commonMistakes: [
      "Giving the AI the full PRD and asking it to 'build the app'",
      "Accepting diffs without reading them because they look right",
      "Not committing between tasks — you lose rollback when something breaks",
      "Carrying broken context across sessions instead of resetting",
      "Treating a passing build as a verified feature",
    ],
    resources: [
      {
        label: "Claude Code",
        href: "https://claude.ai/code",
        usage: ["Review the diff in the terminal before approving", "Use /clear between features — don't carry stale context forward"],
      },
      {
        label: "Cursor",
        href: "https://cursor.com",
        usage: ["If the diff touches files it shouldn't, reject and re-prompt"],
      },
      {
        label: "VibePrompt build prompts",
        href: "/browse?category=build-ship",
        usage: ["The no-unwanted-changes guard is worth running before every session"],
      },
    ],
    output: [
      "PRD broken into 20–30 atomic tasks",
      "At least one feature shipped with a clean commit history",
      "Zero unreviewed diffs accepted",
    ],
    browseSlug: "build-ship",
  },
  {
    step: "06",
    title: "Quality Gates",
    emoji: "🛡️",
    whatThis: "Run a structured check before any code reaches production.",
    why: "AI code passes surface checks and misses the subtle ones. Secrets leak. Spec drift accumulates quietly. You are the only gate — and it can't be handed back to the model that wrote the code.",
    tasks: [
      "Review every changed file against your PRD. Does it do exactly what was specced?",
      "Scan for secrets: API keys, tokens, hardcoded URLs, .env values in source.",
      "Run the TypeScript build. Zero errors before any merge — non-negotiable.",
      "Run at least one E2E test covering the primary user flow.",
      "Send the diff to a second model with fresh context. Ask what's wrong.",
    ],
    commonMistakes: [
      "Accepting 'it works on my machine' as a quality gate",
      "Skipping the secrets scan — one leaked key can kill a project",
      "Treating TypeScript errors as warnings",
      "Writing no tests because 'the AI tested it'",
      "Using the same model that wrote the code to review it",
    ],
    resources: [
      {
        label: "Playwright",
        href: "https://playwright.dev",
        usage: ["One E2E test per primary user flow — not per component", "If it fails, don't ship"],
      },
      {
        label: "Vitest",
        href: "https://vitest.dev",
        usage: ["Unit test pure functions and data transforms — not framework behavior"],
      },
      {
        label: "Snyk",
        href: "https://snyk.io",
        usage: ["Run on every dependency update", "Critical vulnerabilities are deploy blockers"],
      },
    ],
    output: [
      "All changed files reviewed against PRD — no undocumented features",
      "No secrets in code or git history",
      "TypeScript build passes with zero errors",
      "At least one E2E test passes on the primary flow",
    ],
    browseSlug: "testing-quality",
  },
  {
    step: "07",
    title: "Ship & Observe",
    emoji: "🚀",
    whatThis: "Get a real URL in front of real people and watch what they do.",
    why: "Localhost is fiction. Real users break assumptions you didn't know you had. One real session beats a week of testing in isolation.",
    tasks: [
      "Connect your repo to Vercel. Enable auto-deploys from main. Do this on day one.",
      "Share the URL the moment it's live. Rough is fine. Waiting is not.",
      "Add PostHog (free tier): pageviews, click events, session recordings.",
      "Add Sentry (free tier): catch errors before users report them.",
      "Watch at least one real session end to end before making any changes.",
    ],
    commonMistakes: [
      "Waiting until it's 'ready' — it never is, and you're delaying learning",
      "Deploying without analytics — you'll have no idea what actually happened",
      "Skipping error tracking — silent failures are the hardest to debug",
      "Sharing only with friends who won't be honest",
      "Making product decisions without watching a single real session",
    ],
    resources: [
      {
        label: "Vercel",
        href: "https://vercel.com",
        usage: ["Connect the repo on day one — preview deploys catch bugs before they hit main", "Env vars in the dashboard only, never in code"],
      },
      {
        label: "PostHog",
        href: "https://posthog.com",
        usage: ["Enable session recording on setup — not after something goes wrong", "Build a funnel for your core flow immediately"],
      },
      {
        label: "Sentry",
        href: "https://sentry.io",
        usage: ["Set up error alerts before you share the URL with anyone", "Every new error type is a blocker until triaged"],
      },
    ],
    output: [
      "Live URL accessible without a login wall",
      "PostHog installed and recording sessions",
      "Sentry installed and catching errors",
      "At least one real user session watched end to end",
    ],
    browseSlug: "build-ship",
  },
  {
    step: "08",
    title: "Iterate",
    emoji: "🔁",
    whatThis: "Use real usage data to decide what to fix next.",
    why: "What users say and what users do are different data. Behavior doesn't lie. Iterating without session data is just guessing with extra steps.",
    tasks: [
      "Open PostHog. Find where users drop off, rage-click, or stop.",
      "Pick exactly three friction points. Not ten. Three.",
      "Update your PRD with the new scope before re-entering the build loop.",
      "Run the build loop again from Step 05 with the updated spec.",
      "Ship the update. Check if the specific friction point actually improved.",
    ],
    commonMistakes: [
      "Iterating on what users said instead of what they did",
      "Picking ten things to fix at once and doing none of them well",
      "Skipping the PRD update before the next build loop",
      "Shipping without measuring whether it moved the specific metric",
      "Thinking iteration is a phase — it's the whole job",
    ],
    resources: [
      {
        label: "PostHog",
        href: "https://posthog.com",
        usage: ["Start with session recordings, not dashboards", "Rage clicks and dead clicks show you exactly where the UX breaks"],
      },
      {
        label: "Hotjar",
        href: "https://hotjar.com",
        usage: ["Scroll maps reveal what content nobody reaches", "Pair with PostHog — they answer different questions"],
      },
      {
        label: "Typeform",
        href: "https://typeform.com",
        usage: ["3 questions max", "Treat every answer as a hypothesis — verify it with behavior data"],
      },
    ],
    output: [
      "3 friction points identified from session data — not assumptions",
      "PRD updated to reflect new scope",
      "Update shipped and live",
      "Specific metric checked to confirm improvement",
    ],
    browseSlug: "launch-growth",
  },
];

export default function WorkflowPage() {
  return (
    <div className="pt-12">
      <WorkflowStepNav />
      <Hero
        title={"8 steps.\nIdea to shipped."}
        description="The complete vibe coding playbook — validation, spec, stack, context, build loops, quality gates, launch, iteration."
        accent="#ffffff"
      />

      <div className="mx-auto max-w-6xl pt-12">
        <section className="grid grid-cols-1 gap-3">
          {STEPS.map((s) => (
            <article key={s.step} id={`step-${s.step}`} className="border border-foreground/20 overflow-hidden">

              {/* Header */}
              <div className="relative border-b border-foreground/20 bg-foreground/[0.03] px-8 py-8">
                <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none text-[8rem] font-bold leading-none text-foreground/5">
                  {s.step}
                </span>
                <div className="relative">
                  <h2 className="hero-display leading-none">
                    <Link href={`/browse?category=${s.browseSlug}`} className="hover:text-foreground/70 transition-colors">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">{s.whatThis} {s.why}</p>
                </div>
              </div>

              {/* What to do */}
              <div className="border-b border-foreground/20 px-8 py-6">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">What to do</p>
                <ol className="space-y-3">
                  {s.tasks.map((t, i) => (
                    <li key={i} className="flex items-baseline gap-4">
                      <span className="shrink-0 text-xs tabular-nums text-foreground/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mistakes + Done */}
              <div className="grid grid-cols-1 border-b border-foreground/20 sm:grid-cols-2">
                <div className="border-b border-foreground/20 px-8 py-6 sm:border-b-0 sm:border-r">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-red-400/80">Common mistakes</p>
                  <ul className="space-y-3">
                    {s.commonMistakes.map((m, i) => (
                      <li key={i} className="flex items-baseline gap-3">
                        <span className="shrink-0 text-xs font-bold text-red-400/70">✕</span>
                        <span className="text-sm text-foreground/80">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 py-6">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">Done when</p>
                  <ul className="space-y-3">
                    {s.output.map((o, i) => (
                      <li key={i} className="flex items-baseline gap-3">
                        <span className="shrink-0 text-xs font-bold text-emerald-400/90">✓</span>
                        <span className="text-sm text-foreground">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources */}
              <div className="px-8 py-6">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">Resources — use like this</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {s.resources.map((r) => {
                    const domain = r.href.startsWith("http") ? new URL(r.href).hostname : null;
                    return (
                      <div key={r.label} className="border border-foreground/20 bg-foreground/[0.03] p-4 transition-colors hover:bg-foreground/[0.07]">
                        <a
                          href={r.href}
                          target={r.href.startsWith("http") ? "_blank" : undefined}
                          rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group mb-3 flex items-center gap-2.5"
                        >
                          {domain && (
                            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt="" aria-hidden="true" width={18} height={18} className="shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-foreground/70">
                            {r.label}
                          </span>
                          <span className="ml-auto text-xs text-foreground/30">↗</span>
                        </a>
                        {r.usage && (
                          <ul className="space-y-1.5 border-t border-foreground/10 pt-2.5">
                            {r.usage.map((u) => (
                              <li key={u} className="flex gap-2">
                                <span className="mt-0.5 shrink-0 text-[9px] text-foreground/30">→</span>
                                <span className="text-xs leading-relaxed text-foreground/60">{u}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </article>
          ))}
        </section>
        <GithubCta
          title={"Something\nmissing?"}
          description="Open a PR and improve the workflow for every builder who comes after you."
          accent="#ffffff"
          primaryHref="https://github.com/dotsystemsdevs/VibePrompt"
          primaryLabel="Submit on GitHub"
        />
      </div>

    </div>
  );
}
