---
title: Out-of-Scope List Builder
---

## When to use
After writing your MVP features, to explicitly define what you are NOT building — this list goes directly into your AGENTS.md and PRD to prevent AI scope creep during the build.

## Prompt

```
I need to build a comprehensive out-of-scope list for my MVP. AI coding agents have a tendency to add "helpful" features that were never asked for — better onboarding flows, admin dashboards, notification systems, settings pages. I need to name every obvious scope-creep addition explicitly so the agent cannot claim it was implied.

My product: [DESCRIBE WHAT IT DOES]
My MVP feature list:
1. [FEATURE 1]
2. [FEATURE 2]
3. [FEATURE 3]
4. [FEATURE 4]
5. [FEATURE 5]

For each MVP feature, do the following:

1. IDENTIFY SCOPE CREEP ADDITIONS: List every obvious "while I'm in here" addition an AI might build alongside this feature without being asked. Think about: UI polish the user didn't request, additional API endpoints "for future use," data validation layers beyond what's needed, loading states and skeleton screens, toast notifications and modals, admin or superuser views, logging and analytics instrumentation, settings or preferences pages, email notifications, role-based permissions.

2. LABEL EACH AS OUT OF SCOPE: State explicitly that these are NOT to be built.

After processing all features, also add these universal out-of-scope items (unless already in my feature list — if so, skip):
- User profile editing page
- Email notification system
- Admin dashboard or back-office interface
- Multi-tenancy or team/organization support
- API rate limiting logic
- Internationalization (i18n) or multi-language support
- Dark mode or theme switching
- Mobile-specific UI (unless the core product is mobile)
- Export or download functionality
- Third-party integrations beyond what's explicitly listed

OUTPUT FORMAT: A flat, numbered out-of-scope list I can paste directly into my PRD and AGENTS.md. Each item should be one sentence starting with "Do not build..." or "The AI must not implement..."
```
