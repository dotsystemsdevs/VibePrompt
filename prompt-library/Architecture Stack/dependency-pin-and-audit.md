---
title: Dependency Pin and Audit
---

## When to use
Before starting a project or after adding new dependencies — lock your versions and catch problems before a surprise breaking change kills your build mid-sprint.

## Prompt

```
Audit my current package.json and produce a hardened version. I want all dependencies pinned to exact versions with no range specifiers, and I want a full audit of what I'm installing.

Here is my current package.json:
[PASTE YOUR PACKAGE.JSON HERE]

Perform the following operations:

1. PIN ALL VERSIONS: Remove every ^ and ~ from dependencies and devDependencies. Replace each version range with the exact current version that the range resolves to. If you don't know the exact resolved version, flag it for me to pin manually rather than guessing.

2. SECURITY AUDIT: Flag any package that has known security vulnerabilities. For each flagged package, state: the CVE or issue, the severity, and whether a patched version is available.

3. DEPRECATED PACKAGES: Flag any package that is officially deprecated or unmaintained (no updates in 2+ years, archived GitHub repo, deprecated npm notice). For each, suggest the recommended replacement if one exists.

4. DUPLICATE FUNCTIONALITY: Identify any pairs or groups of packages that serve the same purpose. Example: having both axios and node-fetch, or both date-fns and dayjs. Flag these and recommend keeping one.

5. BUNDLE SIZE FLAGS: Identify any package that is known to be large and may have a lighter alternative. Flag: moment.js (use date-fns), lodash (use lodash-es or native JS), heavy icon sets installed in full (use specific imports). These are particularly important for frontend bundles.

6. MISSING PEER DEPENDENCIES: Are there packages installed that have peer dependencies not present in package.json? List any missing peer deps.

7. DEV VS PROD CLASSIFICATION: Are all packages correctly classified? Flag any package in dependencies that should be in devDependencies (test runners, type definitions, build tools) and vice versa.

Output the following:
A. The corrected package.json dependencies and devDependencies sections with all versions pinned (valid JSON only — no comments)
B. A numbered audit findings list organized by: SECURITY, DEPRECATED, DUPLICATES, BUNDLE, OTHER
C. A summary count: X issues found, Y critical, Z warnings
```
