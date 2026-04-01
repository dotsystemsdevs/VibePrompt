---
title: Tech Stack Decision Doc
---

## When to use
Before writing any code, to lock all technology decisions in writing so your AI coding agent never has to guess or make stack decisions independently.

## Prompt

```
Generate a TechDesign.md document for my project. Every decision must be made — no TBD, no "we'll decide later." This document will be committed to the repo and read by the AI coding agent at the start of every session. Ambiguous decisions create inconsistent code.

Project name: [PROJECT NAME]
What it does: [ONE SENTENCE]
Target users: [WHO USES IT]
Expected scale at launch: [e.g. <1000 users, <100 requests/minute]
My constraints: [e.g. must use Vercel free tier, must use Postgres, no paid auth services]

Generate TechDesign.md with these exact sections. For each decision, state the choice AND the reason it was chosen over the main alternative:

## Frontend
- Framework: [Decision + version + reason]
- UI Component Library: [Decision + version + reason, or "none — using Tailwind only"]
- Styling: [e.g. Tailwind CSS 3.4.x — reason]
- State management: [e.g. React state + URL params only — reason, or specific library]
- Form handling: [e.g. React Hook Form 7.x — reason]
- Data fetching: [e.g. Server Components + fetch — reason, or SWR/React Query]

## Backend
- Runtime: [e.g. Next.js API Routes / Edge Functions / Node.js — reason]
- API style: [e.g. REST with Next.js route handlers — reason]
- ORM: [e.g. Drizzle ORM 0.30.x — reason, or Prisma, or raw SQL]

## Database
- Database: [e.g. Postgres via Supabase — reason]
- Schema management: [e.g. Drizzle migrations — reason]
- Connection pooling: [e.g. Supabase pooler — reason, or none needed at this scale]

## Auth
- Provider: [e.g. Clerk — reason, or NextAuth, Supabase Auth]
- Session strategy: [e.g. JWT via Clerk — what this means for API calls]
- Protected routes: [e.g. middleware.ts handles all route protection]

## File Storage (if needed)
- Provider: [e.g. Supabase Storage — reason, or Cloudflare R2, or not applicable]

## Deployment
- Hosting: [e.g. Vercel — reason]
- CI/CD: [e.g. Vercel GitHub integration — auto-deploys on push to main]
- Environment management: [e.g. Vercel env vars for prod, .env.local for dev]

## Observability
- Error tracking: [e.g. Sentry free tier — reason]
- Analytics: [e.g. PostHog free tier — reason, or not implemented at MVP]
- Logging: [e.g. console only at MVP, structured logging in V2]

## Dependency Versions (pinned)
List all key packages with their exact pinned versions. No ^ or ~ ranges.

## Decisions That Are Explicitly OFF The Table
List 3-5 technologies that might seem reasonable but are explicitly not being used, and why. This prevents the AI from suggesting them.

---

After generating the document, flag any section where my constraints conflict with each other or where my stated scale doesn't match my tech choices.
```
