---
title: "What Vibe Coding Actually Is (and What It Isn't)"
description: "Karpathy coined the term in February 2025. Since then it's been twisted into a hype word for both fans and critics. Here's the practical definition, and the line between using AI well and shipping slop."
date: "2026-04-26"
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80"
imageAlt: "Code on a dark monitor"
author: "vibeprompt"
---

Andrej Karpathy coined "vibe coding" in February 2025. He described it as a new kind of coding where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists."

That definition is great copy. It's also the reason half the internet thinks vibe coding means typing one prompt, accepting whatever comes out, and shipping it. That version exists, and it produces exactly the broken half-apps you'd expect.

The version that actually ships products looks different.

---

## Two definitions, one term

There are two things people mean when they say vibe coding, and they're not the same activity.

**Pure vibe coding.** You trust the AI completely. You don't read the code. You describe, generate, run, ship. This works for throwaway weekend projects, internal scripts, and prototypes that will never see a real user. It's the version that goes viral on X.

**Responsible vibe coding.** You treat the AI as a very fast pair programmer. You describe, generate, review every line, test immediately, commit if it works. This is what people who actually ship apps do. It's the version nobody posts about because "I reviewed 400 lines of generated code today" doesn't go viral.

This article is about the second one. The first one is fine for a side project. It's a bad idea for anything with users.

---

## Why this matters now

Two things changed at the same time.

**The talent shortage is real.** 82% of businesses report a developer shortage. Hiring is slow and expensive. The gap between "having an idea" and "shipping a product" used to be technical skill or money for engineers. For most people, that gap was unbridgeable.

**AI capability is doubling roughly every seven months.** We've gone from autocomplete to function generation to feature generation to full-app generation in three years. The line of what one person can build alone keeps moving up.

The result: anyone who can describe what they want clearly can now build the thing themselves. Not without effort, not without learning, but without years of CS training or a $50k engineering hire.

Teams using AI-assisted development consistently report 3-6x faster shipping. That's not a marketing claim, it's what falls out of the data when you actually measure.

---

## The role shift

The mental model that breaks people is thinking of themselves as the coder. They're not, anymore. Their job changed.

**Before:** You write every line. Your bottleneck is typing speed and how much syntax you remember.

**After:** You direct. The AI types. Your bottleneck is the clarity of what you ask for and the rigor of how you review what comes back.

This sounds easier. It isn't. It's a different skill, and most people don't realize they need to develop it. The people who ship are the ones who've accepted they're now the product manager, the architect, and the code reviewer in one seat. The AI is the executor. Every gap you leave in your spec, your context, or your review gets filled by the AI's defaults, which are trained on generic code, not your project.

---

## The actual time math

A real feature, end-to-end, with responsible vibe coding:

- Writing a specific requirement: 2 minutes
- AI generation: 30 seconds
- Reviewing every line: 5 minutes
- Testing the happy path and edge cases: 3 minutes

Roughly 10 minutes per small feature. Compare that to manual coding for the same scope, which usually runs 40 minutes by the time you've understood the requirement, written it, debugged it, and tested.

That's a 4x speed-up, but only because the review and test steps stay in. If you skip them, you're not faster, you're just shipping bugs at machine speed.

Across three real Android apps shipped in three weeks, the pattern was consistent: about 15% of AI-generated code had to be rewritten on review. Critical bugs caught before shipping per project: 6 to 11. Critical bugs that reached users: 0 to 2 (minor UI issues only). The 4x stayed because the gate held.

---

## Where it works and where it doesn't

Vibe coding is not equally safe across all use cases.

**Works well:** MVPs without a backend, landing pages, internal tools, prototypes for user testing, anything where users won't lose data or money if something breaks.

**Risky:** Production apps with paying users. Authentication. Payment processing. Anything storing personal data. Apps with hundreds of active users where technical debt compounds fast.

The pattern is: speed scales linearly with AI, risk scales exponentially with what's at stake. The same prompt that's fine for a todo app is dangerous for a banking flow. Not because the AI got worse, but because the cost of one ungated mistake got higher.

A real example from shipping practice: AI generated a working login flow that looked correct, and quietly included five separate security holes (plaintext password transit, no HTTPS enforcement, insecure token storage, no rate limiting, error messages that leaked which emails existed). Every single one would have been a real exploit in production. The fix wasn't a better prompt. The fix was: stop, don't ship auth without a security review from someone who knows what they're looking at.

---

## What separates the people who ship

The builders who consistently finish projects don't have a secret prompt. They have a different operating system around the AI.

**They go slow at the start.** The first week sets every pattern that the rest of the project inherits. Naming conventions, file structure, how state is managed, how errors are handled. Rushing this produces a codebase that's hard to reason about by week three. Slow at the start, fast overall.

**They build vertical slices.** One complete feature, end-to-end, before starting the next. Frontend plus API plus test, together. The most common failure mode in vibe coding is building a complete UI, then trying to wire it to a separately-built backend, and discovering the data shapes don't match. Vertical slices prevent the entire category.

**They review every diff.** Not skim. Review. Every changed line, against the spec. If something changed that wasn't in the task scope, that's a flag. If a new dependency appeared, that's a flag.

**They know when to stop.** The moment the project crosses into auth, payments, or anything storing real user data, they pause and either learn the security side properly or hire someone who already has.

---

## The bottom line

Vibe coding is a tool, not magic. Used well, it compresses months of work into weeks and lets one person ship what used to take a team. Used badly, it produces half-working apps with bugs that surface after launch and security holes that surface after a breach.

The difference between the two outcomes is not the AI you're using. It's whether you stayed in the loop or handed it the wheel.
