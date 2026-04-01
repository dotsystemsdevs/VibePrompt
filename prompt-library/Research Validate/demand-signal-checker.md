---
title: Demand Signal Checker
---

## When to use
When you want to verify that real demand exists for your product idea before investing weeks of build time — turn your gut feeling into a structured evidence checklist.

## Prompt

```
Help me verify demand signals for my product idea before I start building. I need evidence of real demand, not just a feeling that people have this problem.

My product idea: [DESCRIBE YOUR PRODUCT IDEA]
Target user: [WHO IT'S FOR]
The core problem it solves: [ONE SENTENCE]

For each of the following demand signals, tell me:
- WHERE to look for evidence (exact sources, subreddits, communities, search terms)
- WHAT to look for (what a positive signal actually looks like)
- HOW to score it: STRONG SIGNAL, WEAK SIGNAL, or NO SIGNAL FOUND
- EVIDENCE REQUIRED: What I need to find before marking this as confirmed

DEMAND SIGNAL CHECKLIST:

1. REDDIT COMPLAINTS: Are people actively complaining about this problem on Reddit? Which subreddits? What search terms should I use? A strong signal = multiple posts with 10+ upvotes and comments expressing the same frustration.

2. TWITTER/X COMPLAINTS: Are people venting about this problem on X? What search operators should I use? A strong signal = posts with engagement, not isolated rants.

3. GOOGLE TRENDS: Is search volume for this problem growing, flat, or declining over the past 24 months? What search terms should I track? A strong signal = upward trend or stable high volume.

4. EXISTING WORKAROUNDS: Are people using janky workarounds (spreadsheets, manual processes, duct-tape tools) to solve this problem themselves? This is often the strongest demand signal. Where would I find evidence of this?

5. COMPETITOR TRAFFIC: Do competitors in this space have real traffic? What tools (Similarweb, Ahrefs, etc.) would show this? A strong signal = competitors with 10k+ monthly visits.

6. COMMUNITY PRESENCE: Are there communities (Slack groups, Discord servers, Facebook groups, forums) built around this problem or adjacent topic? Community = latent demand.

7. WILLINGNESS TO PAY: Is there evidence that people already pay for partial solutions to this problem? Name existing paid products that address part of this need.

After listing all signals, output a DEMAND VERDICT:
- STRONG: 4+ signals confirmed. Build.
- MODERATE: 2-3 signals confirmed. Do one manual validation (talk to 5 real users) before building.
- WEAK: 0-1 signals confirmed. Do not build until you have talked to at least 10 people who have this problem.
```
