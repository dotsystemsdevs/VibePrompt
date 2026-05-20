---
title: "Taking Payment as an Indie Dev: Stripe, IAP, and the 30% Tax"
description: "Charging for software used to require a sales team and a year of integration. In 2026 it takes an afternoon — but the decision tree (Stripe vs IAP vs subscriptions) is where most indie devs lose money they didn't have to lose. Here's how to pick."
date: "2026-05-20"
image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1200&q=80"
imageAlt: "Phone with payment app interface"
author: "vibeprompt"
category: growth
---

The moment you charge for something, three things change: your tax setup, your refund obligations, and your relationship with whichever platform serves your customers. Most indie devs default to whatever feels easy in the moment and pay for it later in margin and migration cost.

The good news: in 2026 the decision is genuinely simple if you know the four real options. Here's the breakdown.

---

## The four real options

You'll see a hundred "payment providers" advertised. They mostly fall into four buckets:

| Option | Fee | Use when | Don't use when |
|---|---|---|---|
| **Stripe Checkout** (web) | ~2.9% + 30¢ | Web app, B2B, anything where users sign up on a website | You distribute exclusively on App Store / Play Store |
| **Apple IAP** | 30% (15% after year 1 for subs) | iOS-only consumer app, you must use it for digital goods | Subscription business + you want margin |
| **Play Billing** | 15% under $1M revenue, 30% above | Android consumer app, mandatory for in-app digital goods | Same as IAP |
| **Lemonsqueezy / Paddle** | ~5% + 50¢ | EU customers, you want VAT/sales-tax handled, web only | You're price-sensitive AND in a low-VAT region |

Important 2026 update: Apple's recent court rulings now allow you to **link out from your iOS app to a web checkout** for digital subscriptions. If your customers buy on the web, you keep 100% (minus Stripe). For SaaS-shaped apps, this is the answer.

---

## The pricing-as-signal layer

Before payment integration, price the thing. The price is a positioning signal more than it is a number.

| Price | What it signals |
|---|---|
| Free | Hobby project, will disappear |
| $1–4 | Indie tool, low ambition |
| $5–9 | Consumer app, freemium suspicion |
| $9–19 | Real product, indie ambition |
| $19–49 | Pro tool, B2B-adjacent |
| $49–99 | B2B starter |
| $99+ | Enterprise / serious |

Most indie devs price too low. The instinct is "people won't pay $19 for this" — but the people who would pay $19 read your $5 price as "not worth bothering with" and bounce. Test the same product at 3x your current price for new signups. Existing customers grandfather in. If conversion stays flat, you were leaving money on the table.

---

## Stripe Checkout: the indie default

If your app is web-first or you can drive customers to a web signup:

1. Stripe account → live mode (15 minutes, get business verification done early)
2. Stripe Checkout link or embedded checkout (no card form to build)
3. Webhook handler in your backend listens for `checkout.session.completed`
4. Update your `users` table with `subscription_status`
5. Done

The full integration is ~150 lines of code for a single-product SaaS. AI-coded in a session. Don't over-engineer it — Stripe handles cards, taxes (with Stripe Tax), receipts, dispute flow, customer portal.

Watch out for:
- **Stripe Tax.** Enable it on day one. Sales tax for digital goods in the EU/UK/CA/AU is non-optional. $1500/year tax penalty is worse than the 0.4% Stripe Tax fee.
- **Webhook signing.** Verify webhook signatures. Without it, anyone can fake a "checkout completed" event and grant themselves access.
- **Test mode card.** `4242 4242 4242 4242` for happy path, `4000 0000 0000 9995` for "card declined" to test your error states.

---

## Apple IAP: when you have to

If your app is iOS-only consumer (games, productivity, lifestyle), you must use IAP for digital goods. Apple is strict about this — selling a $5 unlock through Stripe from inside your iOS app gets you removed.

The 30% tax hurts, but two things soften it:
- **Subscriptions drop to 15% after year 1** if a user stays on IAP
- **The Small Business Program** drops IAP fees to 15% if your annual proceeds are under $1M (most indie devs)

What kills indie apps on IAP isn't the tax — it's the conversion drop. Apple's payment sheet adds 1–2 seconds of friction and a feeling of "ugh, Apple is involved" that depresses conversion vs Stripe Checkout by maybe 15–25%. It is what it is.

If your app is hybrid (web + iOS), the new ruling lets you direct iOS users to web checkout. Most subscription SaaS should take advantage:

```
iOS app screen:
  "Upgrade on the web →"  (opens Safari to your /pricing)
  
Same app, also keeps:
  "Or upgrade in-app →"  (uses IAP, you pay 15-30%)
```

Some users will prefer IAP (it's frictionless). Some will prefer web (you keep 100%). Offer both, let them choose.

---

## Free tier vs trial vs paid-only

A choice that matters more than the payment integration:

### Freemium (free tier exists)
- **Conversion rate:** 1–5% over the lifetime of a user
- **Pro:** lower friction acquisition, viral effects
- **Con:** most users will never pay, support cost on free users, free tier scope creep
- **Use when:** the value scales with usage (more users = more value to remaining users) or the free tier seeds your distribution

### Trial (e.g. 7–14 days)
- **Conversion rate:** 10–30%
- **Pro:** captures users at the moment of intent, narrows your support cost to people who'll pay
- **Con:** higher acquisition friction, "credit card required" depresses signups
- **Use when:** your product needs 2–3 sessions before the value is clear

### Paid-only
- **Conversion rate:** depends entirely on positioning
- **Pro:** every user is a paying user, support cost is justified
- **Con:** requires real trust (reviews, brand) before launch
- **Use when:** you have a clear B2B audience or your brand is already strong

For most indie products: **trial beats freemium**. The "free tier converts at 0.3%" problem is a freemium problem, not a conversion problem.

---

## Annual vs monthly

Industry-default: annual = 10x monthly (~16% discount). Anything more aggressive than that is leaving cash on the table — annual users have higher LTV anyway, you don't need to discount that hard.

What annual gets you:
- 12 months of cashflow on day one
- Lower churn (committed users churn less)
- Less monthly support overhead per customer

What it costs:
- Higher refund risk in month 1–2
- Some customers feel locked in and resent it (mitigated by a 14-day no-questions refund policy)

Default position: offer both, lead with monthly on the pricing page (lower commit) but show annual as "save 2 months" next to it.

---

## Refunds and disputes

Refund rate above 3% is a red flag. Above 5% is a fix-now problem.

The two reasons indie SaaS gets refund-spiked:

1. **Onboarding didn't show the value in 60 seconds.** User pays based on the promise, gets confused on first use, refunds. See [onboarding fix](/articles/onboarding-that-actually-converts).
2. **Pricing tier was confusing.** They picked wrong, feel ripped off. Simplify your tiers. Three is the max.

Watch the first 5 refund recordings (PostHog session replay catches this). The pattern is usually the same screen. Fix that screen and refund rate drops 50%+ within a week.

For Stripe disputes: respond within 7 days, attach the user's session log, attach their email receipt, attach the screen they saw at signup. Win rate ~60% if you respond, ~10% if you don't.

---

## Discount codes

Avoid for the first 6 months unless:
- You're rewarding annual upgrades from monthly customers
- You have a clear vertical that's price-sensitive (students, nonprofits)

Generic "30% off everything" campaigns attract coupon-hunters, not real customers. They churn at 3x the rate of full-price customers and cost you LTV you'll never see.

If you must run a launch discount: time-cap it (48 hours), require an email for the code, and tag those customers in your DB so you can measure their retention vs full-price.

---

## Bottom line

For 90% of indie SaaS in 2026:

```
Web app → Stripe Checkout, $19–49/mo, trial-first, annual at 10x monthly
iOS-only consumer → IAP (Small Business Program for 15%) until you can offer
                    web signup with link-out, then move users to web
Android consumer → Play Billing (15% under $1M revenue)
```

The payment integration is the smallest part of this. The pricing decision, the trial-vs-freemium call, the refund-rate watchpoint — those are where indie devs win or lose. Get those right and the integration is an afternoon.
