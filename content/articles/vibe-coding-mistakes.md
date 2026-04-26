---
title: "The 7 Most Common Vibe Coding Mistakes"
description: "Every project failure follows the same pattern. Here's what actually goes wrong when you build with AI, and the exact fix for each one."
date: "2026-04-21"
image: "https://images.unsplash.com/photo-1611890798517-07b0fcb4a811?w=1200&q=80"
imageAlt: "Yellow warning sign"
author: "vibeprompt"
---

After analyzing hundreds of posts across r/vibecoding, r/ClaudeAI, r/cursor, and r/ClaudeCode, the same failures keep appearing. Different projects, different stacks, same mistakes.

Here's what's actually going wrong, and how to fix it.

---

## 1. No AGENTS.md, the AI forgets everything between sessions

Every new chat is a blank slate. If you haven't written down your stack, your conventions, and your rules, the AI fills every gap with its own defaults. Those defaults ship.

**The fix:** Create `AGENTS.md` in your repo root on day one. At minimum: framework, folder structure, naming conventions, and a no-touch list. Claude Code reads it automatically. Cursor reads it if you set it as an Always rule. Without it, you're re-explaining your project from scratch every session.

---

## 2. Tasks that are too big, "add auth" is not a task

"Add authentication" sent to an AI produces a massive diff you can't review. You accept it, deploy it, and discover three sessions later that it hardcoded something, missed an edge case, or quietly replaced code that was working.

**The fix:** Break your PRD into 20–30 atomic tasks before you write a single line of code. One task = one file changed, or one function added. If a task touches more than three files, split it. Small diffs get reviewed. Big diffs ship unread.

---

## 3. Skipping Plan Mode, executing before thinking

The AI will immediately start writing code if you let it. The first thing it writes is almost never the right architecture.

**The fix:** In Claude Code, press `Shift+Tab` before every non-trivial task, this activates Plan Mode. In Cursor, start your prompt with "DO NOT code yet, just plan." Review the plan. Approve it. Then execute. One plan review prevents most of the "wait, that's not what I meant" sessions.

---

## 4. Context window bloat, coding in a 10,000-message thread

A long context window degrades output quality. The AI starts forgetting earlier decisions, contradicting itself, and hallucinating APIs that don't exist in your codebase.

**The fix:** One task per chat session. After each task is done and committed, start a new chat. In Claude Code, use `/compact` (not `/clear`) to compress history when the window fills up. `/clear` loses your session state. `/compact` preserves it in a summary.

---

## 5. No kill criteria, building past the point of no return

"I'll validate after I build the MVP" is how you end up six weeks deep in something nobody wants. The community calls this the sunk-cost loop.

**The fix:** Write kill criteria before writing any code. Literally: "If I can't find 10 real complaints about this problem on Reddit in one hour, I stop." Write it in your PRD. You won't enforce a rule you didn't commit to before you started building.

---

## 6. Leaking secrets, API keys in git history

This one is not theoretical. There are bots scanning GitHub for API keys in real time. One leaked Supabase key or Stripe secret key can drain an account in minutes.

**The fix:** `.env.local` must be in `.gitignore` before the first commit. Run `git log --all --grep='API_KEY'` before every deploy to check history. Use `git-secrets` as a pre-commit hook. The AI will never remind you of this, it's your job.

---

## 7. Accepting the diff without reading it

The most common failure mode: the AI writes 400 lines of changes, you skim it, it looks right, you accept it. Three sessions later something is broken and you don't know where it started.

**The fix:** Review every changed line before accepting. Not every file, every line. Check each change against your PRD: was this specced? If a function is longer than 40 lines, that's a flag. If a new dependency appeared, that's a flag. If something outside the task scope changed, reject it and ask why.

---

## The pattern underneath all of these

Every mistake on this list is the same mistake: letting the AI make a decision that you should have made.

The AI is a very fast executor. It is not a product manager, not an architect, and not a code reviewer. Every gap you leave in your spec, your context, or your review process gets filled by the AI's training data, which is optimized for general correctness, not your specific project.

The vibe coding workflow exists to keep those decisions yours.
