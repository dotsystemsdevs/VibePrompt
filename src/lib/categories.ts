export const CATEGORY_DEFINITIONS = [
  // Matches workflow step order: 00 Environment → 01 Research → 02 PRD → 03 Stack → 04 Context → 05 Build → 06 Quality → 07 Ship → 08 Iterate
  {
    slug: "agent-setup",
    dirName: "Agent Setup",
    name: "Context",
    shortName: "Context",
    description: "AGENTS.md, CLAUDE.md, memory banks, and context engineering for AI coding agents.",
    icon: "🤖",
    color: "#f59e0b",
  },
  {
    slug: "research-validate",
    dirName: "Research Validate",
    name: "Research",
    shortName: "Research",
    description: "Validate demand, kill criteria, and competitive landscape before writing a line.",
    icon: "🔍",
    color: "#06b6d4",
  },
  {
    slug: "prd-spec",
    dirName: "PRD Spec",
    name: "PRD",
    shortName: "PRD",
    description: "Requirements, acceptance criteria, and scope before implementation.",
    icon: "📋",
    color: "#8b5cf6",
  },
  {
    slug: "architecture-stack",
    dirName: "Architecture Stack",
    name: "Stack",
    shortName: "Stack",
    description: "Stack decisions, system boundaries, and implementation strategy.",
    icon: "🏗️",
    color: "#3b82f6",
  },
  {
    slug: "build-ship",
    dirName: "Build Ship",
    name: "Build",
    shortName: "Build",
    description: "Feature implementation, code generation, and iterative shipping prompts.",
    icon: "🚀",
    color: "#22c55e",
  },
  {
    slug: "prompting-craft",
    dirName: "Prompting Craft",
    name: "Prompting",
    shortName: "Prompting",
    description: "Prompt techniques, output control, and AI communication patterns.",
    icon: "✨",
    color: "#ec4899",
  },
  {
    slug: "testing-quality",
    dirName: "Testing Quality",
    name: "Quality",
    shortName: "Quality",
    description: "Code review, security audits, testing plans, and release gates.",
    icon: "🛡️",
    color: "#ef4444",
  },
  {
    slug: "launch-growth",
    dirName: "Launch Growth",
    name: "Ship",
    shortName: "Ship",
    description: "Distribution, positioning, and launch execution prompts.",
    icon: "📣",
    color: "#f97316",
  },
  {
    slug: "ops-maintenance",
    dirName: "Ops Maintenance",
    name: "Iterate",
    shortName: "Iterate",
    description: "Operations, reliability, and post-launch maintenance workflows.",
    icon: "⚙️",
    color: "#6b7280",
  },
] as const;

export const CATEGORY_COLOR_MAP: Record<string, string> = CATEGORY_DEFINITIONS.reduce(
  (acc, category) => {
    acc[category.slug] = category.color;
    return acc;
  },
  {} as Record<string, string>
);
