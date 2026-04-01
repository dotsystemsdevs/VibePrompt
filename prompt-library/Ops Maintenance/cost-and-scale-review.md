---
title: Cost and Scale Review
---

## When to use
When monthly infrastructure costs are growing faster than revenue, or before scaling to significantly more users — find the waste and the single points of failure before they find you.

## Prompt

```
Review my current infrastructure setup for cost efficiency and scale readiness. I need specific, actionable findings — not general cloud architecture advice.

Current monthly infrastructure costs:
[LIST EACH SERVICE AND ITS MONTHLY COST — e.g.]
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Clerk Pro: $25/month
- Sentry: $26/month
- PostHog: $0 (free tier)
- Cloudflare: $0 (free tier)
Total: $[X]/month

Current scale:
- Monthly active users: [NUMBER]
- API requests per day: [NUMBER]
- Database size: [e.g. 50MB, 2GB]
- Storage used: [e.g. 100MB]
- Monthly revenue (if any): $[X]/month

Tech stack: [YOUR STACK]

For each service I'm paying for, analyze:

SERVICE: [NAME]
MONTHLY COST: $[X]
WHAT IT DOES: [One sentence]
CURRENT UTILIZATION: Are we using this service's capacity, or are we on a paid tier for headroom we haven't hit yet?
CHEAPER ALTERNATIVE: Is there a self-hosted, open-source, or lower-tier option that would cover our actual usage? What is the cost difference?
MIGRATION DIFFICULTY: If switching, how hard is it? What breaks?
RECOMMENDATION: KEEP / DOWNGRADE / REPLACE with [alternative]

After reviewing all services:

1. SINGLE POINTS OF FAILURE:
Identify any service where an outage or billing lapse would take down the entire product with no fallback. For each:
- What fails if this service goes down
- Whether there is a manual fallback procedure
- Whether this risk is acceptable at current scale

2. COST PER USER:
Calculate the current infrastructure cost per monthly active user. If this number is above $1/user on the free tier or $5/user on any tier, flag which services are disproportionately expensive.

3. SCALE CEILING:
For each service, identify at what user volume the current plan would hit its limits and require an upgrade. What is the next pricing tier and what does it cost?

4. PRIORITY-ORDERED COST REDUCTION ACTIONS:
List concrete actions ordered by: (monthly savings × ease of implementation). Top of the list = highest impact, easiest to do.

For each action:
ACTION: [Specific step — e.g. "Downgrade Sentry to free tier and use Vercel's built-in error logging"]
MONTHLY SAVINGS: $[X]
RISK: [What you lose and whether it matters at current scale]
EFFORT: [How long it would take to implement]

5. COST TARGET:
Based on current and projected scale, what should the monthly infrastructure cost be? What is the realistic cost floor — the minimum you can pay and still run this product reliably?
```
