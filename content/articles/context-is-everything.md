---
title: "Context Is Everything: How to Set Up Your AI Agent for a New Project"
description: "Bad context is why your AI writes generic code. Here's the exact setup that makes Claude, Cursor, and every other agent actually understand your project."
date: "2026-04-23"
image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&q=80"
imageAlt: "Code on a backlit display"
author: "vibeprompt"
---

There's a moment every vibe coder knows.

You paste a feature request into Claude. It writes something. It looks plausible. You run it. Something breaks. You ask it to fix the thing. It breaks something else. You spend the next two hours chasing it around your codebase.

The problem usually isn't the prompt. It's the context, or the complete absence of it.

## Why AI writes bad code in your project

Every AI model starts a session knowing nothing about you. It doesn't know you're using Next.js 16 with App Router, not Pages Router. It doesn't know your database schema, your naming conventions, or the architectural decisions you made three weeks ago. It's writing for a generic project that doesn't exist.

The result is code that technically compiles but doesn't fit. Wrong patterns. Wrong abstractions. Wrong assumptions about what already exists.

The fix isn't better prompts. It's better context setup.

## The three layers of context

Good AI context comes in three layers, and most people only think about one of them.

**Layer 1: Project rules (CLAUDE.md / AGENTS.md)**

This is a file at the root of your repo that tells the AI how your project works. Not what to build, how to work. Think of it as onboarding documentation for a new engineer who happens to be an AI.

A good project rules file includes:

- Your stack and framework versions (especially breaking-change versions)
- File and folder conventions
- Naming patterns for components, routes, and functions
- What NOT to do (hardcode colors, create files over 500 lines, use `any`)
- How to run the project and what commands matter

The more specific, the better. "Use Tailwind CSS v4, no `tailwind.config.js`, CSS variables only" is useful. "Use Tailwind" is not.

**Layer 2: Current task context**

Before you ask the AI to build something, give it a mental model of what you're building and why. This doesn't need to be long, two or three sentences usually cover it.

Bad: "Add user authentication."

Better: "We need to add authentication. Users should be able to sign in with Google or email. We're using Clerk. The protected routes should live under `/dashboard`."

The second version gives the AI enough to make correct decisions without asking clarifying questions or guessing.

**Layer 3: Existing code context**

When you're working on something that touches existing code, show the AI the relevant files. Don't make it guess what your `Button` component looks like or how your API routes are structured. Paste the relevant parts, or in tools like Claude Code, let it read the files directly.

"Here's how the existing auth middleware works, follow the same pattern" eliminates an entire class of inconsistency.

## The CLAUDE.md / AGENTS.md file

If you're using Claude Code, it reads a file called `CLAUDE.md` (or `AGENTS.md` if you're using other agents) at the start of every session. This is your highest-leverage context investment.

A minimal but effective version:

```markdown
# Stack
- Next.js 16 (App Router)
- Tailwind CSS v4, no config file, CSS variables only
- TypeScript strict mode, no `any`
- Supabase for database and auth

# Conventions
- Pages in src/app/ using App Router
- Client components suffixed -client.tsx
- No file over 500 lines, split before adding

# Never
- Hardcode colors, use CSS variables
- Silent overwrites, check before writing
```

That's it. Fifty lines of this beats a thousand tokens of prompting.

## Context compounds

Here's what changes when you invest in context: the AI stops making the same mistakes twice.

Without a project rules file, every session starts from zero. You correct the same patterns over and over. The AI writes Pages Router code in an App Router project. It uses `any`. It creates 800-line components.

With a project rules file, those corrections happen once, when you write the file. Every subsequent session benefits from them automatically.

The best vibe coders aren't better at prompting. They're better at setup. They invest ten minutes writing a project rules file and save hours of correction across the entire project.

## Start simple

You don't need a perfect CLAUDE.md on day one. Start with three things:

1. Your stack and framework versions
2. One or two conventions you care most about
3. One or two things the AI keeps getting wrong

Add to it whenever the AI makes a mistake you've seen before. After a week, you'll have a file that makes every subsequent session noticeably better.

Context isn't a workaround. It's the skill.
