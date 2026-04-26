---
title: "Real Vibe Coding Examples (With Actual Time Data)"
description: "Seven real prompts from shipping three production apps. The exact requests, what the AI got right, what it got wrong, and how long each one took. No theory, just receipts."
date: "2026-04-24"
image: "https://images.unsplash.com/photo-1704265586142-db3e17d0dea0?w=1200&q=80"
imageAlt: "Close-up of a stopwatch"
author: "vibeprompt"
---

Most posts about vibe coding show the result. Almost none show the prompt that produced it, the iterations, or the time it actually took. This one does.

These are seven real prompts from three Android apps shipped to Google Play in three weeks. For each one: what was asked, what the AI generated, what was wrong, what got fixed, and the actual minutes from start to commit.

If you've been wondering what the time math really looks like, this is it.

---

## 1. Todo home screen, 12 minutes

The prompt was specific. Layout described pixel by pixel: header with title and a settings gear, an input with placeholder text, an add button next to it, a scrollable list of items with checkbox plus text plus a delete icon, completed items in gray strikethrough. Colors stated: white background, primary blue `#4A90E2`. State shape stated: array of `{id, text, completed}` in `useState`.

The AI generated working code on the first try. One issue caught in review: deleting a todo had no confirmation. One follow-up prompt added an `Alert` with cancel/delete buttons. Done.

Total: 12 minutes. The same screen by hand would take about 45.

The reason this worked: every decision the AI could have guessed wrong was already specified.

---

## 2. AsyncStorage persistence, 15 minutes

Day two. Todos disappeared on app close. The fix was a clear ask: save to AsyncStorage after every add/delete/toggle, load on mount, key `"todos"`, value JSON-stringified, errors handled with try/catch and an `Alert` if save fails.

The AI generated complete code. The issue caught was outside the code itself: the package wasn't in `package.json`. A manual `expo install @react-native-async-storage/async-storage` and it worked.

15 minutes total. The lesson: AI doesn't always remember to install what it imports. Always check the package list before running.

---

## 3. Daily push notifications, 28 minutes

The ask was harder: request permission on app start, schedule a daily notification at 6 PM with a body showing the count of uncompleted todos, cancel and reschedule on every todo change, skip the notification if there are zero uncompleted todos.

The first generation was 90% right and 10% wrong in three specific ways:

1. Time was hardcoded as 18:00 UTC, not local time.
2. Permission denial wasn't handled, the app would just fail silently.
3. The notification fired immediately for testing instead of at 6 PM.

Two follow-up prompts fixed the timezone and the denied-permission case. The "fires immediately" line was a leftover from a code example the model had pulled from somewhere; one line removed.

28 minutes total. About an hour by hand, more if you've never wired Expo notifications before.

---

## 4. Login form with five security holes, killed at 30 minutes

The prompt asked for a login screen: email and password inputs, validation, error states, a `POST /api/login` call, save token to AsyncStorage, navigate to Home on success.

The AI delivered a working login form. It also delivered five real security holes:

1. Password sent in plaintext over the request body, no hashing.
2. No HTTPS enforcement.
3. Token stored in `AsyncStorage` (not encrypted), should be in `SecureStore`.
4. No rate limiting; unlimited login attempts.
5. Error messages leaked which emails existed in the database (`"Email not found"` vs `"Invalid credentials"`).

Every one of those would have been a real exploit in production. The decision: stop, don't ship auth without a security review from someone who knows what they're looking at.

The cost of stopping: 40 hours of backend work avoided. The cost of not stopping: a data breach, account takeovers, legal exposure.

This is the example that comes back every time someone asks "can the AI just build the whole thing." For things with security implications, the answer is: it can write code that looks correct and isn't, and you won't know unless you already know.

---

## 5. Excel export, 35 minutes

A button in an income tracker that exports all entries to `.xlsx` and pops the share sheet. Specified: column order, date format, file naming convention, packages to use (`xlsx`, `expo-sharing`, `expo-file-system`).

First generation worked. Three issues caught:

1. File saved to cache directory, which the OS deletes whenever it feels like. Should have been document directory.
2. No loading indicator; on 100+ entries it took 3 seconds and looked like the app froze.
3. With zero entries it crashed instead of showing a "nothing to export" message.

Three follow-up prompts, three fixes. Tested with 0, 5, and 100 entries. All worked.

35 minutes total. By hand, this is closer to 90 minutes once you've fought with `FileSystem` paths.

---

## 6. Production crash debug, 5 minutes

A real bug report two days after shipping: "App crashes when I open Settings." Crash log: `TypeError: Cannot read property 'name' of undefined`.

The prompt was minimal: paste the crash log, paste the component code, describe the trigger flow. Ask the AI to find the bug.

It found it instantly: the screen read `user.name`, but for users who hadn't set a name, `user` was undefined. Fix: optional chaining, `user?.name || 'Set your name'`.

5 minutes from report to fix. Pushed update to Play Store. 20 minutes from user complaint to deployed patch.

The pattern: AI is excellent at debugging when you give it three things, the error, the code, and the reproduction steps. Take any one out and quality drops fast.

---

## 7. The vague prompt that wasted twenty minutes

The ask: "Add a chart to show balls lost over time."

The AI picked a charting library that wasn't installed, generated code with API calls that didn't match anything in the project, populated the chart with random data, and labeled the axes in Spanish for reasons nobody could later explain.

The fix wasn't a better model. The fix was rewriting the prompt to be specific: use `react-native-chart-kit`, `LineChart` component, data source is the `rounds` array with `{id, date, ballsLost}` shape, x-axis is round number, y-axis is balls lost, last 10 rounds only, line color red, exact data format spelled out.

Second generation worked first try. 8 minutes.

The total cost of the vague prompt: the 8 minutes for the right one, plus the 20 minutes of confusion before it, plus the energy of realizing the output was unusable. Vague prompts don't save time. They move time from the writing step to the debugging step, with interest.

---

## What the time data actually says

| Feature | First attempt | Iterations | Total | Manual estimate |
|---|---|---|---|---|
| Todo home screen | 10 min | 2 min | 12 min | 45 min |
| AsyncStorage | 12 min | 3 min | 15 min | 30 min |
| Notifications | 15 min | 13 min | 28 min | 60 min |
| Excel export | 20 min | 15 min | 35 min | 90 min |
| Bug fix | 5 min | 0 | 5 min | 20 min |
| Chart (specific) | 3 min | 5 min | 8 min | 40 min |

Average: 3-4x faster than manual. That's the headline number people quote.

The number people don't quote: 15% of generated code had to be rewritten on review. Every project shipped with bugs caught before users saw them; only a couple minor UI issues slipped through. The 4x stayed because the review and test steps stayed in.

If you skip review and test, you're not faster. You're shipping bugs at machine speed and paying for it later in support and patches.

---

## The pattern across all seven

The prompts that worked specified everything the AI could have guessed wrong: the data shape, the package, the styling values, the edge cases. The prompts that failed left those decisions to the model.

The bug that reached users came from the same cause every time: someone trusted "Done" without re-reading the diff or running the result.

The thing that saved real time was always the same: a tight loop of write specific prompt, generate, read every line, run it, commit. Repeat for the next small thing. Don't batch. Don't trust. Don't skip the read.

That's the entire workflow, in seven examples.
