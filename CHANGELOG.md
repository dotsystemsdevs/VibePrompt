# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Workflow page** — 9-step vibe coding workflow built from top open-source vibe coding repos (KhazP, EnzeD, coleam00, filipecalegario, and others). Steps: Environment, Research, PRD, Stack, Context, Build, Quality, Ship, Iterate
- **Workflow content** — tasks, resources, and inline link chips with favicons for each of the 9 steps
- **WorkflowStepper component** — tab navigation with completion state, task/resource counts, Prev/Next navigation
- **WorkflowChecklist component** — card variant with inline link chips, localStorage persistence (`vibeprompt-tasks-v1`)
- **Workflow step metadata** — `src/lib/workflow-steps.ts` with canonical step order and titles
- **Library route** — `/library` added to navbar and routing
- **Contact route** — `/contact` page
- **Prompt contributor component** — `src/components/prompts/prompt-contributor.tsx`
- **Local saves** — `src/lib/local-saves.ts` for non-auth save state
- **GitHub contributor utilities** — `src/lib/github-prompt-contributor.ts`, `src/lib/github-repo-contributors.ts`
- **New prompts** — Memory Bank Setup, Plan Mode Protocol, Context Engineering PRD (PRP pattern)
- **Open-source baseline docs** — `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`
- **Issue templates** — suggest and bug report templates in `.github/`

### Changed

- **Category names** — unified across all surfaces (workflow tabs, browse, awesome list):
  - Agent Setup → **Context**
  - Research Validate → **Research**
  - PRD Spec → **PRD**
  - Architecture Stack → **Stack**
  - Build Ship → **Build**
  - Testing Quality → **Quality**
  - Launch Growth → **Ship**
  - Ops Maintenance → **Iterate**
  - Prompting Craft → **Prompting** (unchanged slug)
- **Footer** — contributors integrated as overlapping avatar strip under site name; removed separate contributors block
- **Navbar** — added Library link
- **Homepage** — updated workflow step count from 8 to 9
- **Browse page** — mobile-optimized padding and search bar
- **Awesome page** — mobile-optimized padding and item rows
- **AGENTS.md** — expanded from a single Next.js warning to full contributor guidance (stack, conventions, 500-line rule, category system, commit conventions, protected files)
- **README.md** — updated category names, accurate prompt count (39), contributor guide for prompts and awesome list entries
- **prompt-library/Agent Setup/** — updated `agents-md-generator.md` and `session-kickoff-protocol.md` with memory-bank patterns, TASK.md protocol, 3-file scope rule
- **prompt-library/Build Ship/** — updated `atomic-task-splitter.md` with commit rule and TASK.md entries per task

### Removed

- "Before You Start" step from workflow (content merged into Environment step)
- Separate contributors section from footer
- Contributors and FeaturedPrompt components from homepage (`src/components/home/`)

## [0.1.0] — Initial open-source release

### Added

- Open-source baseline docs (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`)
- Initial README with project structure and contribution guidance
- Community templates for issues and pull requests
- Standardized repository links and contribution flow
