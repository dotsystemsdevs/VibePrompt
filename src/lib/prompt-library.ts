import "server-only";

import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import type { Category, Prompt } from "@/lib/types";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

const PROMPTS_ROOT = path.join(process.cwd(), "prompt-library");

const SECTION_HEADERS = [
  "When to use",
  "Input",
  "Instructions",
  "Variants",
  // legacy — kept for backward compat with existing prompts
  "Purpose",
  "Output Format",
  "Quality Criteria",
] as const;

const GLOBAL_SEARCH_TAGS: string[] = [];

const TAG_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "from",
  "full",
  "in",
  "into",
  "of",
  "on",
  "or",
  "same",
  "side",
  "small",
  "smart",
  "the",
  "to",
  "with",
  "first",
  "more",
  "new",
  "core",
]);

const TAG_ALIASES: Record<string, string> = {
  ai: "ai",
  app: "app",
  architecture: "architecture",
  brief: "brief",
  build: "build",
  clarify: "clarity",
  code: "code",
  decision: "decision",
  delivery: "delivery",
  development: "development",
  error: "errors",
  flow: "flow",
  gates: "gates",
  happy: "journey",
  idea: "idea",
  large: "large",
  multi: "multi",
  path: "paths",
  persist: "persistence",
  pivot: "pivot",
  plan: "planning",
  prd: "prd",
  product: "product",
  project: "project",
  requirements: "requirements",
  research: "research",
  scope: "scope",
  spec: "spec",
  stop: "stop",
  tasks: "tasks",
  universal: "universal",
};

const CATEGORY_TAGS: Record<string, string[]> = {
  "prd-core": ["prd", "planning", "mvp"],
  "build-brief": ["brief", "planning", "saas"],
  "architecture-stack": ["architecture", "backend", "api"],
  "feature-shipping": ["shipping", "features", "webapp"],
  "testing-release": ["testing", "release", "qa"],
  "launch-growth": ["launch", "growth", "marketing"],
  "ops-maintenance": ["ops", "maintenance", "deployment"],
};

const SEARCH_KEYWORD_TAGS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /\bsaas\b/i, tag: "saas" },
  { pattern: /\bwebsite\b|\bweb site\b/i, tag: "website" },
  { pattern: /\bweb[-\s]?app\b/i, tag: "webapp" },
  { pattern: /\bmobile\b|\bmobile[-\s]?app\b/i, tag: "mobile" },
  { pattern: /\bapi\b|\brest\b|\bgraphql\b/i, tag: "api" },
  { pattern: /\bbackend\b/i, tag: "backend" },
  { pattern: /\bfrontend\b/i, tag: "frontend" },
  { pattern: /\bopen[-\s]?source\b/i, tag: "opensource" },
  { pattern: /\bautomation\b/i, tag: "automation" },
  { pattern: /\bcli\b|\btooling\b/i, tag: "tooling" },
  { pattern: /\bmvp\b/i, tag: "mvp" },
  { pattern: /\bprd\b|\brequirements?\b/i, tag: "prd" },
  { pattern: /\btesting?\b|\bqa\b/i, tag: "testing" },
  { pattern: /\bsecurity\b/i, tag: "security" },
  { pattern: /\bdeploy(?:ment)?\b|\bhosting\b/i, tag: "deployment" },
  { pattern: /\blaunch\b|\bgrowth\b/i, tag: "growth" },
  { pattern: /\bui\b|\bux\b|\bdesign\b/i, tag: "uiux" },
];

function stripFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\s*\n?/, "");
}

function parseFrontmatterField(content: string, field: string): string | null {
  // Only look inside the leading --- block
  const fmMatch = content.match(/^---([\s\S]*?)---/);
  if (!fmMatch) return null;
  const re = new RegExp(`^${field}:\\s*(.+)$`, "mi");
  return fmMatch[1].match(re)?.[1]?.trim() ?? null;
}

function extractSection(content: string, section: string): string {
  // Matches "## SectionName" and "## SectionName (with any suffix)"
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`##\\s+${escaped}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i");
  const match = content.match(re);
  return match?.[1]?.trim() ?? "";
}

function stripOuterCodeFence(text: string): string {
  // Use \r?\n to handle both LF and CRLF line endings
  const match = text.trim().match(/^```(?:\w+)?\r?\n([\s\S]*?)```\s*$/);
  return match ? match[1].trim() : text;
}

function extractAllCodeBlocks(text: string): string {
  const blocks: string[] = [];
  // Find all fenced code blocks with their preceding ## header
  const sectionRe = /^##\s+([^\n]+)\n+([\s\S]*?)(?=\n##\s+|$)/gm;
  let match;
  while ((match = sectionRe.exec(text)) !== null) {
    const header = match[1].trim();
    const sectionBody = match[2].trim();
    const fenceMatch = sectionBody.match(/^```(?:\w+)?\r?\n([\s\S]*?)```/);
    if (fenceMatch) {
      blocks.push(`${header}:\n${fenceMatch[1].trim()}`);
    } else if (sectionBody) {
      blocks.push(`${header}:\n${sectionBody}`);
    }
  }
  return blocks.length > 0 ? blocks.join("\n\n---\n\n") : text.replace(/^#[^\n]*\n+/, "").trim();
}

function firstParagraph(text: string): string {
  const normalized = text.trim();
  if (!normalized) return "";
  const split = normalized.split(/\n\s*\n/);
  return split[0]?.replace(/\s+/g, " ").trim() ?? "";
}

// Like firstParagraph but skips markdown headings (lines starting with #)
function firstMeaningfulParagraph(text: string): string {
  const paragraphs = text.trim().split(/\n\s*\n/);
  for (const para of paragraphs) {
    const cleaned = para.replace(/\s+/g, " ").trim();
    if (cleaned && !cleaned.startsWith("#")) return cleaned;
  }
  return "";
}

function normalizeTitleText(value: string): string {
  return value
    .replace(/\bAi\b/g, "AI")
    .replace(/\bPrd\b/g, "PRD")
    .replace(/\bApi\b/g, "API")
    .replace(/\bUi\b/g, "UI")
    .replace(/\bUx\b/g, "UX")
    .replace(/\bMvp\b/g, "MVP")
    .replace(/\bSaas\b/g, "SaaS");
}

function titleFromFileName(fileName: string): string {
  const formatted = fileName
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return normalizeTitleText(formatted);
}

function normalizedTokensFromFileName(fileName: string): string[] {
  return fileName
    .replace(/\.md$/i, "")
    .split(/[-_]+/g)
    .map((token) => token.toLowerCase().trim())
    .filter((token) => token.length > 2 && !TAG_STOP_WORDS.has(token))
    .map((token) => TAG_ALIASES[token] ?? token);
}

function tagsFromSearchKeywords(input: string): string[] {
  return SEARCH_KEYWORD_TAGS.filter((item) => item.pattern.test(input)).map((item) => item.tag);
}

function buildTags(categorySlug: string, fileName: string, content: string): string[] {
  const categoryTags = CATEGORY_TAGS[categorySlug] ?? [];
  const fileTags = normalizedTokensFromFileName(fileName);
  const semanticTags = tagsFromSearchKeywords(`${fileName}\n${content}`);
  const merged = [...GLOBAL_SEARCH_TAGS, ...categoryTags, ...fileTags, ...semanticTags];
  return [...new Set(merged)].slice(0, 6);
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildPromptText(content: string): string {
  const body = stripFrontmatter(content);

  // Explicit ## Prompt section takes priority — this is the copyable prompt text
  const promptSection = extractSection(body, "Prompt");
  if (promptSection) return stripOuterCodeFence(promptSection);

  // Standard format: Purpose / Input / Instructions / Output Format / etc.
  const sections = SECTION_HEADERS.map((header) => {
    const sectionContent = extractSection(body, header);
    if (!sectionContent) return "";
    return `${header}:\n${sectionContent}`;
  }).filter(Boolean);
  if (sections.length > 0) return sections.join("\n\n");

  // Multi-section format: multiple named ## sections each containing a code block
  return extractAllCodeBlocks(body);
}

async function readPromptFile(
  categorySlug: string,
  categoryName: string,
  absolutePath: string,
  fileName: string
): Promise<Prompt> {
  const rawContent = await fs.readFile(absolutePath, "utf8");
  const content = rawContent.replace(/\r\n/g, "\n"); // normalize Windows CRLF
  const stats = await fs.stat(absolutePath);
  const body = stripFrontmatter(content);

  const frontmatterTitle = parseFrontmatterField(content, "title");
  const frontmatterSource = parseFrontmatterField(content, "source");
  const fileBasedTitle = titleFromFileName(fileName);
  const title = frontmatterTitle ? normalizeTitleText(frontmatterTitle) : fileBasedTitle;

  const whenToUseSection = extractSection(body, "When to use").trim();
  const inputSection = extractSection(body, "Input").trim();
  const purpose = extractSection(body, "Purpose");
  const bodyFirstParagraph = firstMeaningfulParagraph(body);

  // Strip any leading code-fence artifacts from freeform paragraphs
  const cleanBodyParagraph = bodyFirstParagraph.startsWith("```")
    ? ""
    : bodyFirstParagraph;

  const whenToUse = whenToUseSection || inputSection || cleanBodyParagraph || "Use before implementation for structured execution.";
  const useCase = firstParagraph(purpose) || whenToUseSection || cleanBodyParagraph || "Shipping-focused prompt for real product work.";

  const promptText = buildPromptText(content);
  const slug = `${categorySlug}-${fileName.replace(/\.md$/i, "").toLowerCase()}`;
  const popularitySeed = hashString(slug);

  return {
    slug,
    title,
    category: categorySlug,
    categoryName,
    tags: buildTags(categorySlug, fileName, content),
    difficulty: "intermediate",
    tools: ["claude-code", "cursor", "codex"],
    author: "vibeprompt",
    useCase,
    whenToUse,
    prompt: promptText,
    notes: frontmatterSource ? `Source: ${frontmatterSource}` : undefined,
    upvotes: 20 + (popularitySeed % 220),
    commentCount: popularitySeed % 35,
    createdAt: stats.mtime.toISOString().slice(0, 10),
  };
}

const _getPromptLibrary = async (): Promise<{ categories: Category[]; prompts: Prompt[] }> => {
  const prompts: Prompt[] = [];
  const categories: Category[] = [];

  for (const categoryDef of CATEGORY_DEFINITIONS) {
    const categoryPath = path.join(PROMPTS_ROOT, categoryDef.dirName);
    let entries: string[] = [];

    try {
      entries = await fs.readdir(categoryPath);
    } catch {
      entries = [];
    }

    const markdownFiles = entries
      .filter((entry) => entry.toLowerCase().endsWith(".md") && !entry.toLowerCase().startsWith("readme"))
      .sort((a, b) => a.localeCompare(b));

    const categoryPrompts = await Promise.all(
      markdownFiles.map((fileName) =>
        readPromptFile(categoryDef.slug, categoryDef.name, path.join(categoryPath, fileName), fileName)
      )
    );

    prompts.push(...categoryPrompts);

    categories.push({
      slug: categoryDef.slug,
      name: categoryDef.name,
      shortName: categoryDef.shortName,
      description: categoryDef.description,
      icon: categoryDef.icon,
      count: categoryPrompts.length,
    });
  }

  return { categories, prompts };
};

export const getPromptLibrary = unstable_cache(
  _getPromptLibrary,
  ["prompt-library"],
  { revalidate: process.env.NODE_ENV === "development" ? 5 : false }
);

export async function getPromptBySlug(slug: string): Promise<Prompt | undefined> {
  const { prompts } = await getPromptLibrary();
  return prompts.find((prompt) => prompt.slug === slug);
}

