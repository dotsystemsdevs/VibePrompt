<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# VibePrompt — Agent & Contributor Guide

Read this before writing any code in this repo.

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Breaking changes vs Next.js 13/14 — read the docs |
| UI | React 19, Tailwind CSS v4 | v4 syntax differs from v3 — no `tailwind.config.js` |
| Components | shadcn/ui | Components in `src/components/ui/` |
| Auth | Clerk | `@clerk/nextjs` — middleware in `middleware.ts` |
| Database | Supabase | Client in `src/lib/supabase.ts` |
| Animations | GSAP | Use sparingly, prefer Tailwind transitions |
| Language | TypeScript | Strict mode — no `any` |

## File Conventions

- **Pages** live in `src/app/` using App Router conventions (`page.tsx`, `layout.tsx`)
- **Client components** are co-located with their server counterparts, suffixed `-client.tsx`
- **Data files** live in `src/lib/` — types in `types.ts`, category defs in `categories.ts`
- **Prompt content** lives in `content/prompts/` as markdown files
- **Prompt playbook** lives in `prompt-library/` as standalone markdown — not imported by the app

## Design System

Use these patterns consistently:

```tsx
// Section containers
<div className="border border-foreground/20 overflow-hidden">

// Mobile-first padding (touch targets)
className="px-4 py-4 sm:px-6 sm:py-3.5"

// Section labels
className="text-[9px] uppercase tracking-[0.18em] text-foreground/40"
```

Dark/light mode via CSS variables — never hardcode colors. Use `text-foreground`, `bg-background`, `border-foreground/20`.

## Category System

Categories are defined in `src/lib/categories.ts` as `CATEGORY_DEFINITIONS`. Each entry maps:
- `slug` — URL-safe identifier used in routes
- `dirName` — actual folder name in `prompt-library/`
- `name` / `shortName` — display name shown in UI

The folder names in `prompt-library/` are NOT the same as display names. Check `categories.ts` before referencing either.

## The 500-Line Rule

No file should exceed 500 lines. If a file is approaching this limit, split it before adding more — extract a component, a hook, or a utility. Flag it rather than ignore it.

## Never-Overwrite Rule

Never silently overwrite data. Server actions that write to Supabase must check for existing records. Saves are upserts, not blind inserts.

## 3-File Scope Rule

Any single task should touch at most 3 files. If your change requires more, split it by layer: data → server action → UI component as separate tasks.

## Commit Convention

Use conventional commits:

```
feat: add X
fix: correct Y in Z
chore: update dependencies
prompt(category): add new-prompt-name
content(awesome): add tool-name to category
```

## Protected Files

Do not modify these without explicit instruction:
- `CLAUDE.md` — references `AGENTS.md`
- `src/lib/categories.ts` — changing slugs breaks routes
- `src/lib/types.ts` — shared across the whole app
- `.env.local` — never commit this

## Adding a Prompt

1. Choose the correct folder in `prompt-library/` (check `categories.ts` for `dirName`)
2. Create a kebab-case `.md` file
3. Use this structure exactly:

```markdown
---
title: Prompt Title
---

## When to use
One or two sentences.

## Prompt

\```
The prompt text.
\```
```

4. The prompt will be automatically picked up by `src/lib/prompt-library.ts`

## Running the App

```bash
npm install
npm run dev       # localhost:3000
npm run build     # production build
npm run lint      # ESLint check
```

Environment variables needed in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
