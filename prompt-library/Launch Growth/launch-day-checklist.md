---
title: Launch Day Checklist
---

## When to use
24 hours before any public launch or significant user-facing release — run through every item and do not flip the switch until everything is confirmed.

## Prompt

```
Generate a launch day checklist for [PRODUCT NAME]. I am launching in 24 hours. Every item must be verified — not assumed. Output each item with a checkbox, the verification step, and the pass condition.

Product: [PRODUCT NAME]
Live URL: [YOUR PRODUCTION URL]
Tech stack: [YOUR STACK]
Auth provider: [e.g. Clerk]
Error tracking: [e.g. Sentry]
Analytics: [e.g. PostHog]
Payment provider (if applicable): [e.g. Stripe]

LAUNCH CHECKLIST:

[ ] 1. LIVE URL ACCESSIBLE
Verification: Open [URL] in an incognito browser window with no cookies.
Pass condition: The page loads without error. There is no "coming soon" page, login wall, or Vercel "project not found" screen blocking the landing page.

[ ] 2. CORE USER FLOW — END TO END IN PRODUCTION
Verification: As a brand new user with no account, complete the full core value loop from the production URL.
Pass condition: [DESCRIBE YOUR CORE FLOW — e.g. "Sign up → create first item → see it in the list → delete it"]. Every step completes. No errors. The end state is correct.

[ ] 3. ERROR TRACKING IS LIVE
Verification: Deliberately trigger an error in production (bad API call, invalid route). Check the error tracking dashboard.
Pass condition: The error appears in [Sentry / your error tracker] within 60 seconds. It includes the stack trace and affected URL.

[ ] 4. ANALYTICS IS RECORDING
Verification: Load the production site and navigate through 3 pages. Check the analytics dashboard.
Pass condition: Sessions and page views appear in [PostHog / your analytics] in real time or within 5 minutes.

[ ] 5. ALL ENVIRONMENT VARIABLES SET IN PRODUCTION
Verification: Check the deployment platform's environment variable settings. Cross-reference against your local .env file.
Pass condition: Every variable in .env.local has a corresponding production value set. No variable is missing.

[ ] 6. NO SECRETS IN SOURCE CODE
Verification: Run the secret-leak-scanner prompt on the final production build's source.
Pass condition: CLEAN output — no credentials in source.

[ ] 7. PAYMENT FLOW WORKS (if applicable)
Verification: Complete a real purchase in production using a test card that charges a real payment. Then immediately refund it.
Pass condition: Payment succeeds, the product is unlocked, the webhook fires, the refund processes.

[ ] 8. EMAIL DELIVERY WORKS (if applicable)
Verification: Trigger every transactional email (welcome, verification, password reset) from a real email address.
Pass condition: Every email is delivered within 2 minutes. Emails render correctly on mobile. Unsubscribe link works.

[ ] 9. ROLLBACK PLAN IS READY
Verification: Document in writing exactly how to roll back this deployment if something goes wrong.
Pass condition: The rollback procedure is written down. You can execute it in under 5 minutes. The previous working version is accessible.

[ ] 10. SUPPORT CHANNEL IS OPEN
Verification: Confirm that the email address or contact method shown to users is actively monitored.
Pass condition: You have checked this inbox in the last hour. Auto-responder is configured if needed.

LAUNCH VERDICT:
- ALL CHECKED: You are clear to launch.
- ANY UNCHECKED: Do not launch. Fix the outstanding items first. A botched launch is worse than a delayed one.
```
