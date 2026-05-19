# implementation-plan.md

> Ordered task list. The AI reads this to know what comes next.
> Template from [vibeprompt.tech](https://vibeprompt.tech). One atomic task per line.

## How to use

Each task should be **atomic**: ≤3 files touched, can be implemented and reviewed
in one AI session. If a task is bigger than that, split it.

Format:

```
- [ ] [Task] — [acceptance check]
```

Tick a task off only after the code is committed AND the acceptance check passes.

## Phase 1 — Foundation

- [ ] Repo + Next.js scaffold pushed to GitHub — `npm run dev` works
- [ ] Vercel deploy from main — preview URL accessible
- [ ] Supabase project created, env vars set on Vercel — `vercel env pull` works
- [ ] AGENTS.md + memory-bank/ files committed — AI session kickoff works

## Phase 2 — MVP feature 1: [Name from PRD]

- [ ] DB schema for [table] — migration runs locally and on prod
- [ ] Read endpoint — returns expected shape, has 1 test
- [ ] Write endpoint — validates input, has 1 test
- [ ] UI list page — renders empty state + populated state
- [ ] UI create form — submits, shows error on bad input, has 1 e2e test

## Phase 3 — MVP feature 2: [Name from PRD]

- [ ] [Task] — [acceptance check]

## Phase 4 — Ship

- [ ] Pre-launch audit: zero TypeScript errors, zero high/critical npm audit
- [ ] PostHog + Sentry installed — first event/error visible in dashboard
- [ ] Deploy to production — Vercel build green, custom domain attached
- [ ] First 5 users invited — at least one full session recorded

## Discovered during work

> Tasks that surfaced mid-session. Move into a Phase above when you're ready
> to work them.

- [ ] [Surprise scope]
- [ ] [Another]

---

_Save as `memory-bank/implementation-plan.md`. Update after every session._
