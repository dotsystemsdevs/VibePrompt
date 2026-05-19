# @architecture.md

> Map of the codebase. The AI reads this before every session.
> Template from [vibeprompt.tech](https://vibeprompt.tech). Update when shape changes.

## Stack

- **Frontend:** [e.g. Next.js 16 App Router, React 19, TypeScript strict]
- **Styling:** [e.g. Tailwind v4, no UI library, custom components]
- **Backend:** [e.g. Next.js server actions, Supabase Postgres, Edge runtime where possible]
- **Auth:** [e.g. Supabase Auth, magic link only]
- **Storage:** [e.g. Supabase Storage for user uploads, Vercel KV for counters]
- **Deploy:** [e.g. Vercel, master auto-deploys, PRs get preview URLs]

## File map

```
src/
  app/                  # Next.js App Router routes
    api/                # Route handlers (server-only)
    [route]/page.tsx    # Pages
  components/
    [domain]/           # Components grouped by feature, not by type
    layout/             # Navbar, footer, shared shells
  lib/
    [domain].ts         # Server-only helpers, data access
    types.ts            # Shared TypeScript types
content/                # Markdown content for the site
public/                 # Static assets
docs/
  PRD.md                # Spec — always read
memory-bank/
  @architecture.md      # This file — always read
  @design-doc.md        # PRD pointer — always read
  progress.md           # Completed work log
  implementation-plan.md # Ordered task list
```

## Where state lives

- **URL params:** filter state, current page, current view
- **localStorage:** [e.g. user preferences, completed checklist items]
- **Supabase:** [e.g. all user-facing data]
- **Vercel KV:** [e.g. counters, ephemeral state]

## Server vs client

- All data fetching happens in server components or route handlers
- Client components are marked `"use client"` and only handle interactivity
- Files in `lib/` import `"server-only"` to enforce server-only access
- Edge runtime is the default for routes that don't need Node APIs

## Conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase` exports
- Hooks: `useFoo`, in the component file or a colocated hook file
- No file exceeds 500 lines

## What doesn't belong here

- **Implementation details of features** — those live in the feature's own folder
- **TODOs and bug lists** — those live in `progress.md` and `implementation-plan.md`
- **PRD content** — that lives in `docs/PRD.md`, this file just points at it

---

_Save as `memory-bank/@architecture.md`. The `@` prefix makes some tools treat it
as an always-on context file._
