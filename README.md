# VibePrompt

Open-source prompt library and workflow hub for vibe coders — built so you always know what to do next, what to check, and how to ship faster with AI.

[![CI](https://github.com/dotsystemsdevs/VibePrompt/actions/workflows/ci.yml/badge.svg)](https://github.com/dotsystemsdevs/VibePrompt/actions/workflows/ci.yml)
![License](https://img.shields.io/github/license/dotsystemsdevs/VibePrompt)
![Stars](https://img.shields.io/github/stars/dotsystemsdevs/VibePrompt?style=flat)
![Issues](https://img.shields.io/github/issues/dotsystemsdevs/VibePrompt?style=flat)
![PRs](https://img.shields.io/github/issues-pr/dotsystemsdevs/VibePrompt?style=flat)

Repository: [dotsystemsdevs/VibePrompt](https://github.com/dotsystemsdevs/VibePrompt)

---

## Quick links

- **Site**: https://vibeprompt.dev
- **Issues**: https://github.com/dotsystemsdevs/VibePrompt/issues
- **Pull requests**: https://github.com/dotsystemsdevs/VibePrompt/pulls

## What This Is

VibePrompt is a Next.js app that makes it easy to find, use, and learn from high-quality prompts for AI-assisted development.

- **Browse** a curated prompt library organized by workflow stage
- **Follow** a 9-step workflow built from top vibe coding repos
- **Explore** the Awesome list of AI coding tools and resources
- **Save** prompts locally — no account required

The goal: make prompt-based building easier to start, learn, and ship.

---

## Contribute

This project is **open source** and actively improved. If you ship with AI, you can help make VibePrompt better.

- **Good first contributions**: fix copy, tighten UI spacing, improve mobile, add a prompt, or add a tool/resource
- **Public discussions**: open an issue → we’ll track it openly
- **Code changes**: open a PR (small + focused is perfect)

Links:
- [Open an Issue](https://github.com/dotsystemsdevs/VibePrompt/issues)
- [Open a Pull Request](https://github.com/dotsystemsdevs/VibePrompt/pulls)
- [Contributing Guide](./CONTRIBUTING.md)

---

## Routes

| Route | What it does |
|---|---|
| `/` | Homepage |
| `/browse` | Browse all prompts by category |
| `/prompts/[slug]` | Individual prompt detail page |
| `/workflow` | 9-step vibe coding workflow |
| `/awesome` | Curated list of AI/vibe coding tools |
| `/about` | About the project |
| `/contact` | Contact |

---

## Project Structure

```text
VibePrompt/
├─ src/
│  ├─ app/                  # Next.js App Router pages
│  ├─ components/           # UI and feature components
│  │  ├─ awesome/           # Awesome list components
│  │  ├─ cta/               # Call-to-action components
│  │  ├─ hero/              # Hero section
│  │  ├─ layout/            # Navbar, footer, theme toggle
│  │  ├─ motion/            # Animation wrappers
│  │  ├─ prompts/           # Prompt cards, browse, actions
│  │  └─ workflow/          # Workflow step components
│  └─ lib/                  # Data, types, and utilities
│     ├─ actions/           # Server actions (saves, etc.)
│     ├─ categories.ts      # Category definitions and slug→folder mappings
│     ├─ awesome-data.ts    # Awesome list entries
│     ├─ prompt-library.ts  # Prompt data loading from markdown
│     ├─ workflow-steps.ts  # Workflow step metadata
│     ├─ local-saves.ts     # localStorage save helpers
│     ├─ supabase.ts        # Supabase client
│     └─ types.ts           # Shared TypeScript types
├─ content/
│  └─ prompts/              # Markdown prompt source files (one per prompt)
├─ prompt-library/          # Standalone prompt playbook (39 prompts, 9 categories)
│  ├─ Agent Setup/          # → "Context" on site
│  ├─ Architecture Stack/   # → "Stack" on site
│  ├─ Build Ship/           # → "Build" on site
│  ├─ Launch Growth/        # → "Ship" on site
│  ├─ Ops Maintenance/      # → "Iterate" on site
│  ├─ PRD Spec/             # → "PRD" on site
│  ├─ Prompting Craft/      # → "Prompting" on site
│  ├─ Research Validate/    # → "Research" on site
│  └─ Testing Quality/      # → "Quality" on site
├─ public/                  # Static assets
├─ scripts/                 # Utility scripts
├─ AGENTS.md                # AI agent guidance for contributors
└─ CLAUDE.md                # Claude Code project instructions
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Auth | Clerk |
| Database | Supabase |
| Animations | GSAP |
| Language | TypeScript |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### 4. Lint and build

```bash
npm run lint
npm run build
```

---

## Prompt Library

The `prompt-library/` directory contains 39 standalone markdown prompt files organized by workflow stage. These are the source of truth for prompts shown in the app. Each file follows this format:

```markdown
---
title: Prompt Title
---

## When to use
[One or two sentences on the use case]

## Prompt

\```
[The prompt text]
\```
```

**Categories** (folder name → display name on site):

| Folder | Site label | What it covers |
|---|---|---|
| `Agent Setup/` | Context | AGENTS.md, CLAUDE.md, memory banks, context engineering |
| `Research Validate/` | Research | Demand validation, kill criteria, competitive landscape |
| `PRD Spec/` | PRD | Requirements, acceptance criteria, scope definition |
| `Architecture Stack/` | Stack | Stack decisions, system boundaries, implementation strategy |
| `Build Ship/` | Build | Feature implementation, atomic tasks, commit loops |
| `Prompting Craft/` | Prompting | Prompt chains, output control, disagreement handling |
| `Testing Quality/` | Quality | Code review, security audits, testing plans |
| `Launch Growth/` | Ship | Distribution, positioning, launch execution |
| `Ops Maintenance/` | Iterate | Operations, reliability, post-launch maintenance |

---

## Contributing

Contributions are welcome — especially new prompts, content fixes, and UI improvements.

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

**Fast path (5 minutes):**

1. Pick one small thing (copy/UI/prompt/tool)
2. Make the change
3. Open a PR with a clear title and screenshot if it’s UI

**Adding a prompt:**

1. Pick the right folder in `prompt-library/`
2. Create a `.md` file with a kebab-case filename
3. Use the frontmatter + `## When to use` + `## Prompt` structure
4. Keep it focused — one prompt per file, real use case, no fluff
5. Open a PR with the category in the title: `prompt(context): add AGENTS.md generator`

**Adding to the Awesome list:**

Edit `src/lib/awesome-data.ts`. Each entry needs `title`, `href`, `description`, and `category`.

**UI contributions:**

Read `AGENTS.md` before touching any code — it has stack-specific rules that differ from standard Next.js.

---

## License

MIT — see [LICENSE](./LICENSE)
