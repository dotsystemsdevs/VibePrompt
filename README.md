# VibePrompt

Open-source prompt library and learning hub for vibe coders, prompt engineers, and AI-assisted builders.

Repository: [dotsystemsdevs/VibePrompt](https://github.com/dotsystemsdevs/VibePrompt)

---

## What This Is

VibePrompt is a Next.js app that makes it easy to find, use, and learn from high-quality prompts for AI-assisted development.

- Browse a curated prompt library organized by category
- Follow structured workflows for building with AI
- Explore the Awesome list of vibe coding tools and resources
- Save prompts to your personal library (auth via Clerk)
- Built on Supabase for persistence

The goal: make prompt-based building easier to start, learn, and ship.

---

## Routes

| Route | What it does |
|---|---|
| `/` | Homepage |
| `/browse` | Browse all prompts by category |
| `/prompts/[slug]` | Individual prompt detail page |
| `/workflow` | Step-by-step vibe coding workflow |
| `/awesome` | Curated list of AI/vibe coding tools |
| `/library` | Your saved prompts (requires sign-in) |
| `/learn` | Learning resources |
| `/about` | About the project |

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
│  │  ├─ library/           # Personal library components
│  │  ├─ prompts/           # Prompt cards, browse, actions
│  │  ├─ workflow/          # Workflow step components
│  │  └─ ui/                # Base UI primitives
│  └─ lib/                  # Data, types, and utilities
│     ├─ actions/           # Server actions (saves, etc.)
│     ├─ prompt-library.ts  # Prompt data loading
│     ├─ categories.ts      # Category definitions
│     ├─ awesome-data.ts    # Awesome list data
│     ├─ supabase.ts        # Supabase client
│     └─ types.ts           # Shared types
├─ content/
│  └─ prompts/              # Markdown prompt source files
├─ prompt-library/          # Organized prompt playbook (markdown)
│  ├─ Agent Setup/
│  ├─ Architecture Stack/
│  ├─ Build Ship/
│  ├─ Launch Growth/
│  ├─ Ops Maintenance/
│  ├─ PRD Spec/
│  ├─ Prompting Craft/
│  ├─ Research Validate/
│  └─ Testing Quality/
├─ public/                  # Static assets
├─ scripts/                 # Utility scripts
├─ AGENTS.md                # AI agent guidance for this repo
└─ CLAUDE.md                # Claude Code project instructions
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
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

The `prompt-library/` directory contains standalone markdown prompt files organized by category. These are the source of truth for prompts shown in the app. Each file follows a consistent format with title, description, use case, and the prompt itself.

Categories:

- **Agent Setup** — configure AI agents, session protocols, file guards
- **Architecture Stack** — API contracts, DB schema, tech stack decisions
- **Build Ship** — atomic tasks, diffs, commit messages, single-task framing
- **Launch Growth** — distribution plans, positioning, user feedback
- **Ops Maintenance** — cost reviews, incident runbooks, dependency checks
- **PRD Spec** — PRDs, MVP scoping, acceptance criteria
- **Prompting Craft** — prompt chains, output constraints, disagreement handling
- **Research Validate** — competitor gaps, demand signals, kill criteria
- **Testing Quality** — e2e tests, pre-ship gates, secret scanning, code review

---

## Contributing

Contributions are welcome — especially new prompts, content fixes, and UI improvements.

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

When submitting prompts:

- One prompt per file
- Follow the existing frontmatter format
- Include a clear use case and example output if possible
- Keep PRs focused and small

---

## License

MIT — see [LICENSE](./LICENSE)
