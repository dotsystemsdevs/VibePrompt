---
title: Incident Runbook Generator
---

## When to use
Before going to production, to prepare for the most likely failure scenarios — write the runbook when you're calm, not at 2am when the site is down.

## Prompt

```
Generate an incident runbook for [SERVICE NAME]. I need a practical, step-by-step guide that I (or anyone I trust) can follow during a real outage — at 3am, half-awake, under pressure.

Service name: [SERVICE NAME]
What it does: [ONE SENTENCE]
Tech stack: [YOUR STACK — include hosting, database, auth, external APIs]
Monitoring tools: [e.g. Sentry, Vercel dashboard, Supabase dashboard, UptimeRobot]
Deployment method: [e.g. Vercel auto-deploy from GitHub main branch]
Database: [e.g. Supabase Postgres]

Generate runbooks for the 5 most likely failure modes for this type of application. For each, use this exact structure:

---
INCIDENT: [SHORT NAME — e.g. "Site returns 500 on all pages"]

SYMPTOM (what a user sees):
[Describe exactly what a user experiences — error message text, blank page, redirect loop, etc.]

ALERT THAT FIRES:
[What monitoring tool would catch this and what does the alert say — or if no alert would fire, flag that as a gap]

SEVERITY: [P1 - Site down / P2 - Core feature broken / P3 - Degraded experience]

DIAGNOSTIC STEPS (in order — do these before trying to fix anything):
1. [First thing to check — e.g. "Check Vercel deployment dashboard for failed builds"]
2. [Second thing to check — e.g. "Check Sentry for error volume spike in last 15 minutes"]
3. [Third thing to check — e.g. "Check Supabase dashboard for database connection errors or query timeouts"]

MOST COMMON ROOT CAUSES (in order of likelihood):
1. [Most likely cause and how to confirm it]
2. [Second most likely cause and how to confirm it]
3. [Less likely but possible cause]

MITIGATION / ROLLBACK PROCEDURE:
[Step-by-step procedure to restore service. Be specific. Include exact commands, dashboard clicks, or config changes. If rollback means reverting a deployment, describe exactly how.]

COMMUNICATION TEMPLATE (if users need to be notified):
"[Short status message to post — include what is affected, that you're investigating, and when you'll update]"

POST-INCIDENT ACTION (to prevent recurrence):
[What to add, change, or monitor to prevent this from happening again]
---

After all 5 runbooks:

GAPS TO FIX BEFORE GOING LIVE:
List any scenario where no alert would fire and the incident would only be discovered by a user complaint. These are monitoring blind spots that must be addressed.

RUNBOOK LOCATION:
Recommend where this runbook should be stored so it's accessible during an outage (not just in the codebase — somewhere reachable when the site is down).
```
