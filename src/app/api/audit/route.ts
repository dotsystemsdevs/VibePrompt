import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Severity = "high" | "medium" | "low";
type Category = "seo" | "conversion" | "trust" | "structure" | "performance" | "security" | "aeo";
type Effort = "quick" | "moderate" | "involved";

interface ParsedPage {
  title: string;
  metaDescription: string;
  h1s: string[];
  h2s: string[];
  h3s: string[];
  buttonCount: number;
  realButtonCount: number;
  buttonTexts: string[];
  isSPA: boolean;
  totalImages: number;
  imagesWithoutAlt: number;
  imagesWithoutLazy: number;
  links: string[];
  externalBlankLinks: number;
  emptyLinks: number;
  hasNav: boolean;
  hasFooter: boolean;
  hasMain: boolean;
  hasCanonical: boolean;
  hasStructuredData: boolean;
  hasViewport: boolean;
  hasFavicon: boolean;
  hasForm: boolean;
  hasFaq: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  renderBlockingScripts: number;
  buzzwordCount: number;
  rawText: string;
  // Security headers
  hasCSP: boolean;
  hasHSTS: boolean;
  hasXFrameOptions: boolean;
  hasXContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  // AEO (from HTML)
  hasFaqSchema: boolean;
  hasQuestionHeadings: boolean;
  hasTwitterCard: boolean;
  // AEO (from external files)
  robotsBlocksAICrawlers: boolean;
  hasLlmsTxt: boolean;
}

export interface Finding {
  id: string;
  category: Category;
  severity: Severity;
  effort: Effort;
  title: string;
  description: string;
  fix: string;
  scoreImpact: number;
}

export interface AuditResult {
  url: string;
  score: number;
  grade: string;
  pageTitle: string;
  isSPA: boolean;
  categories: Record<Category, { score: number; label: string }>;
  findings: Finding[];
  quickWins: Finding[];
  scannedAt: string;
}

// ── HTML helpers ────────────────────────────────────────────────────────────

function getMetaContent(html: string, name: string): string {
  const pats = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]*name=["']${name}["']`, "i"),
  ];
  for (const p of pats) {
    const m = html.match(p);
    if (m?.[1] !== undefined) return m[1];
  }
  return "";
}

function getMetaProperty(html: string, prop: string): string {
  const pats = [
    new RegExp(`<meta[^>]+property=["']${prop}["'][^>]*content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]*property=["']${prop}["']`, "i"),
  ];
  for (const p of pats) {
    const m = html.match(p);
    if (m?.[1] !== undefined) return m[1];
  }
  return "";
}

type HtmlParsed = Omit<ParsedPage, "hasCSP" | "hasHSTS" | "hasXFrameOptions" | "hasXContentTypeOptions" | "hasReferrerPolicy" | "robotsBlocksAICrawlers" | "hasLlmsTxt">;

function parseHtml(html: string): HtmlParsed {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = (titleMatch?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
  const metaDescription = getMetaContent(html, "description");

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);

  const imgMatches = [...html.matchAll(/<img[^>]+>/gi)];
  const totalImages = imgMatches.length;
  const imagesWithoutAlt = imgMatches.filter((m) => {
    const alt = m[0].match(/\balt\s*=\s*["']([^"']*)["']/i);
    return !alt || alt[1].trim() === "";
  }).length;
  const imagesWithoutLazy = imgMatches.filter((m) => !/loading\s*=\s*["']lazy["']/i.test(m[0])).length;

  const realButtons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)];
  const CTA_CLASS = /\b(?:btn|button|cta|action|primary|hero.?cta|call.?to.?action)\b/i;
  const CTA_TEXT = /^(get started|start free|sign up|try free|try it|buy now|subscribe|join now|download|book a demo|schedule|request demo|get a demo|upgrade|claim|launch|install)\b/i;
  const linkMatches = [...html.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)];
  const buttonLikeLinks = linkMatches.filter((m) => {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    return CTA_CLASS.test(m[0]) || /role\s*=\s*["']button["']/i.test(m[0]) || CTA_TEXT.test(text);
  });
  const realButtonCount = realButtons.length;
  const buttonCount = realButtons.length + buttonLikeLinks.length;
  const buttonTexts = [
    ...realButtons.map((m) => m[1].replace(/<[^>]+>/g, "").trim()),
    ...buttonLikeLinks.map((m) => m[1].replace(/<[^>]+>/g, "").trim()),
  ].filter(Boolean);

  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const externalBlankLinks = linkMatches.filter((m) => {
    return /target\s*=\s*["']_blank["']/i.test(m[0])
      && /href\s*=\s*["']https?:\/\//i.test(m[0])
      && !/noopener/i.test(m[0]);
  }).length;
  const emptyLinks = linkMatches.filter((m) => {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    return text.length === 0
      && !/aria-label\s*=\s*["'][^"']+["']/i.test(m[0])
      && !/\btitle\s*=\s*["'][^"']+["']/i.test(m[0]);
  }).length;

  const hasNav = /<nav[\s>]/i.test(html);
  const hasFooter = /<footer[\s>]/i.test(html);
  const hasMain = /<main[\s>]/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);
  const hasStructuredData = /type=["']application\/ld\+json["']/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);
  const hasFavicon = /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/i.test(html);
  const hasForm = /<form[\s>]/i.test(html) || /<input[^>]+type=["']email["']/i.test(html);
  const hasFaq = /\bfaq\b|frequently asked|common questions/i.test(html);

  const ogTitle = getMetaProperty(html, "og:title");
  const ogDescription = getMetaProperty(html, "og:description");
  const ogImage = getMetaProperty(html, "og:image");

  const renderBlockingScripts = [...html.matchAll(/<script[^>]+src=["'][^"']+["'][^>]*>/gi)]
    .filter((m) => !/\bdefer\b|\basync\b/i.test(m[0])).length;

  const BUZZWORD_RE = /\b(powerful|seamless|intuitive|revolutionary|game.changing|cutting.edge|next.gen|next.generation|best.in.class|world.class|innovative|state.of.the.art|robust|scalable|disruptive|synergy|bleeding.edge|frictionless|paradigm)\b/gi;
  const buzzwordCount = (html.match(BUZZWORD_RE) ?? []).length;

  const rawText = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const isSPA = rawText.length < 600;

  const hasFaqSchema = /"@type"\s*:\s*["'](?:FAQPage|HowTo)["']/i.test(html);
  const hasTwitterCard = /<meta[^>]+name=["']twitter:card["'][^>]*>/i.test(html);
  const allHeadings = [...h2s, ...h3s];
  const hasQuestionHeadings = allHeadings.some((h) =>
    /^(what|how|why|can|is|are|do|does|when|where|who|which)\b/i.test(h)
  );

  return {
    title, metaDescription, h1s, h2s, h3s,
    buttonCount, realButtonCount, buttonTexts, isSPA,
    totalImages, imagesWithoutAlt, imagesWithoutLazy,
    links, externalBlankLinks, emptyLinks,
    hasNav, hasFooter, hasMain, hasCanonical, hasStructuredData,
    hasViewport, hasFavicon, hasForm, hasFaq,
    ogTitle, ogDescription, ogImage,
    renderBlockingScripts, buzzwordCount, rawText,
    hasFaqSchema, hasTwitterCard, hasQuestionHeadings,
  };
}

function checkSecurityHeaders(headers: Headers): Pick<ParsedPage, "hasCSP" | "hasHSTS" | "hasXFrameOptions" | "hasXContentTypeOptions" | "hasReferrerPolicy"> {
  return {
    hasCSP: !!headers.get("content-security-policy"),
    hasHSTS: !!headers.get("strict-transport-security"),
    hasXFrameOptions: !!headers.get("x-frame-options"),
    hasXContentTypeOptions: headers.get("x-content-type-options")?.toLowerCase().includes("nosniff") ?? false,
    hasReferrerPolicy: !!headers.get("referrer-policy"),
  };
}

async function checkExternalFiles(origin: string): Promise<Pick<ParsedPage, "robotsBlocksAICrawlers" | "hasLlmsTxt">> {
  const AC = new AbortController();
  const t = setTimeout(() => AC.abort(), 4000);
  const AC2 = new AbortController();
  const t2 = setTimeout(() => AC2.abort(), 4000);

  const AI_AGENT = /^User-agent:\s*(GPTBot|ClaudeBot|anthropic-ai|PerplexityBot|CCBot|cohere-ai|ChatGPT-User)/im;
  const DISALLOW_ROOT = /^Disallow:\s*\/\s*$/m;

  const [robotsRes, llmsRes] = await Promise.allSettled([
    fetch(`${origin}/robots.txt`, { signal: AC.signal, cache: "no-store" }),
    fetch(`${origin}/llms.txt`, { signal: AC2.signal, cache: "no-store" }),
  ]);
  clearTimeout(t); clearTimeout(t2);

  let robotsBlocksAICrawlers = false;
  if (robotsRes.status === "fulfilled" && robotsRes.value.ok) {
    const txt = await robotsRes.value.text().catch(() => "");
    const sections = txt.split(/(?=^User-agent:)/im);
    robotsBlocksAICrawlers = sections.some((s) => AI_AGENT.test(s) && DISALLOW_ROOT.test(s));
  }

  const hasLlmsTxt =
    llmsRes.status === "fulfilled" && llmsRes.value.ok && llmsRes.value.status === 200;

  return { robotsBlocksAICrawlers, hasLlmsTxt };
}

// ── Constants ───────────────────────────────────────────────────────────────

const WEAK_CTA = /^(submit|click here|click|read more|more|here|go|ok|yes|send|continue|next|proceed)$/i;
const SOCIAL_PROOF = /testimonial|review|rated|stars|customers|clients|users|trusted by|loved by|featured in|as seen in|5\/5|4\.5|★/i;
const PRICING = /pricing|price|plans?|per month|\/month|\/mo|\$\d|\€\d|free tier|free plan|upgrade/i;
const PRIVACY = /privacy|terms of service|cookie policy|legal/i;

const EFFORT_SCORE: Record<Effort, number> = { quick: 3, moderate: 2, involved: 1 };

// ── Rules ───────────────────────────────────────────────────────────────────

interface Rule {
  id: string;
  category: Category;
  severity: Severity;
  effort: Effort;
  title: string;
  description: string;
  fix: string;
  scoreImpact: number;
  check: (p: ParsedPage) => boolean;
}

const RULES: Rule[] = [
  // ── SEO ──
  {
    id: "seo_no_h1", category: "seo", severity: "high", effort: "moderate",
    title: "Missing H1 heading",
    description: "No H1 tag found. Search engines use H1 to understand your page's main topic.",
    fix: "Add a single, descriptive H1 that clearly states what the page is about.",
    scoreImpact: 10, check: (p) => p.h1s.length === 0,
  },
  {
    id: "seo_multiple_h1", category: "seo", severity: "medium", effort: "quick",
    title: "Multiple H1 headings",
    description: "Multiple H1 tags found. This dilutes your SEO signal and confuses page structure.",
    fix: "Keep exactly one H1 per page. Convert the rest to H2 or H3.",
    scoreImpact: 5, check: (p) => p.h1s.length > 1,
  },
  {
    id: "seo_no_meta_desc", category: "seo", severity: "high", effort: "quick",
    title: "Missing meta description",
    description: "No meta description found. Search engines use this as the snippet in search results.",
    fix: "Add a meta description of 120–160 characters that summarizes the page with a call to action.",
    scoreImpact: 8, check: (p) => p.metaDescription.length === 0,
  },
  {
    id: "seo_meta_desc_too_long", category: "seo", severity: "low", effort: "quick",
    title: "Meta description too long",
    description: "Meta description exceeds 160 characters and will be truncated in search results.",
    fix: "Shorten your meta description to under 160 characters.",
    scoreImpact: 3, check: (p) => p.metaDescription.length > 160,
  },
  {
    id: "seo_meta_desc_short", category: "seo", severity: "low", effort: "quick",
    title: "Meta description too short",
    description: "Meta description is under 50 characters, too brief to be useful in search results.",
    fix: "Expand your meta description to 120–160 characters. Include your core value proposition.",
    scoreImpact: 3, check: (p) => p.metaDescription.length > 0 && p.metaDescription.length < 50,
  },
  {
    id: "seo_no_title", category: "seo", severity: "high", effort: "quick",
    title: "Missing page title",
    description: "No <title> tag found. This is critical for SEO and browser tab display.",
    fix: "Add a descriptive <title> tag of 50–60 characters including your main keyword.",
    scoreImpact: 8, check: (p) => p.title.length === 0,
  },
  {
    id: "seo_title_too_long", category: "seo", severity: "low", effort: "quick",
    title: "Page title too long",
    description: "Title exceeds 60 characters and will be cut off in Google search results.",
    fix: "Shorten your title to under 60 characters. Put the most important keyword first.",
    scoreImpact: 3, check: (p) => p.title.length > 60,
  },
  {
    id: "seo_no_canonical", category: "seo", severity: "low", effort: "quick",
    title: "No canonical URL",
    description: "Missing canonical link. Search engines may index duplicate versions of your page.",
    fix: "Add <link rel='canonical' href='your-url'> in the <head>.",
    scoreImpact: 4, check: (p) => !p.hasCanonical,
  },
  {
    id: "seo_no_favicon", category: "seo", severity: "low", effort: "quick",
    title: "No favicon",
    description: "No favicon found. Missing favicons reduce brand recognition in browser tabs and bookmarks.",
    fix: "Add <link rel='icon' href='/favicon.ico'> (or .svg/.png) in the <head>.",
    scoreImpact: 3, check: (p) => !p.hasFavicon,
  },

  // ── Conversion ──
  {
    id: "conv_no_cta", category: "conversion", severity: "medium", effort: "involved",
    title: "No CTA buttons detected",
    description: "No buttons or action-oriented links found. Visitors may not know what to do next. Note: client-rendered CTAs won't appear in a static scan.",
    fix: "Add at least one visible CTA above the fold. Use a <button> or <a> with a btn/cta class and action verbs like 'Get started' or 'Try free'.",
    scoreImpact: 10, check: (p) => p.buttonCount === 0,
  },
  {
    id: "conv_weak_cta", category: "conversion", severity: "medium", effort: "quick",
    title: "Weak CTA copy",
    description: "One or more buttons use generic text like 'Submit' or 'Click here' which reduces click-through rates.",
    fix: "Replace generic text with value-driven copy: 'Start for free', 'See how it works', 'Get my report'.",
    scoreImpact: 6, check: (p) => p.buttonTexts.some((b) => WEAK_CTA.test(b)),
  },
  {
    id: "conv_h1_too_long", category: "conversion", severity: "low", effort: "quick",
    title: "Hero headline too long",
    description: "Main H1 exceeds 80 characters. Long headlines reduce impact above the fold.",
    fix: "Trim your H1 to under 70 characters. Move secondary info to a subtitle.",
    scoreImpact: 4, check: (p) => p.h1s.some((h) => h.length > 80),
  },
  {
    id: "conv_no_social_proof", category: "conversion", severity: "medium", effort: "involved",
    title: "No social proof detected",
    description: "No testimonials, reviews, or trust signals found. Social proof increases conversions by 15–40%.",
    fix: "Add 2–3 customer testimonials, a star rating, or company logos near your main CTA.",
    scoreImpact: 8, check: (p) => !SOCIAL_PROOF.test(p.rawText),
  },
  {
    id: "conv_no_pricing", category: "conversion", severity: "low", effort: "involved",
    title: "No pricing information",
    description: "No pricing or plan mentions found. Visitors who can't find pricing tend to leave.",
    fix: "Add a pricing section or at least mention 'free', 'pricing', or a starting price visibly.",
    scoreImpact: 5, check: (p) => !PRICING.test(p.rawText),
  },
  {
    id: "conv_too_many_cta", category: "conversion", severity: "medium", effort: "moderate",
    title: "Too many competing CTAs",
    description: "More than 5 primary action buttons detected. Too many choices create decision paralysis.",
    fix: "Consolidate to 1 primary CTA per section. Demote secondary actions to text links.",
    scoreImpact: 5, check: (p) => p.realButtonCount > 5,
  },
  {
    id: "conv_no_form", category: "conversion", severity: "low", effort: "moderate",
    title: "No inline email capture",
    description: "No form or email input found. Capturing emails directly on the page converts better than linking to a separate signup page.",
    fix: "Add an email input in the hero, even a single field with 'Get early access' increases conversion.",
    scoreImpact: 3, check: (p) => !p.hasForm,
  },
  {
    id: "conv_no_faq", category: "conversion", severity: "low", effort: "moderate",
    title: "No FAQ section",
    description: "No FAQ section detected. FAQs reduce pre-purchase anxiety and capture long-tail SEO queries.",
    fix: "Add an FAQ section answering the top 4–6 questions visitors have before converting.",
    scoreImpact: 4, check: (p) => !p.hasFaq,
  },
  {
    id: "conv_buzzwords", category: "conversion", severity: "low", effort: "quick",
    title: "Heavy buzzword usage",
    description: "Vague words like 'powerful', 'seamless', or 'innovative' detected multiple times. They reduce credibility.",
    fix: "Replace buzzwords with specific, measurable claims. Not 'powerful tool' but 'saves 4 hours per week'.",
    scoreImpact: 4, check: (p) => p.buzzwordCount > 4,
  },

  // ── Trust ──
  {
    id: "trust_no_og", category: "trust", severity: "medium", effort: "quick",
    title: "Missing Open Graph tags",
    description: "No og:title or og:description found. Social shares will look broken or generic.",
    fix: "Add og:title, og:description, and og:image meta tags in the <head>.",
    scoreImpact: 6, check: (p) => !p.ogTitle && !p.ogDescription,
  },
  {
    id: "trust_no_og_image", category: "trust", severity: "low", effort: "quick",
    title: "Missing OG image",
    description: "No og:image tag found. Social shares will show no image, hurting click-through rates.",
    fix: "Add <meta property='og:image'> with a 1200×630px image.",
    scoreImpact: 4, check: (p) => !p.ogImage,
  },
  {
    id: "trust_images_no_alt", category: "trust", severity: "medium", effort: "quick",
    title: "Images missing alt text",
    description: "One or more images have no alt attribute. This hurts accessibility and image SEO.",
    fix: "Add descriptive alt attributes to all content images. Use alt='' for decorative ones.",
    scoreImpact: 5, check: (p) => p.totalImages > 0 && p.imagesWithoutAlt > 0,
  },
  {
    id: "trust_no_structured_data", category: "trust", severity: "low", effort: "moderate",
    title: "No structured data",
    description: "No JSON-LD found. Structured data unlocks rich results in Google Search.",
    fix: "Add JSON-LD markup using schema.org types (Organization, Product, FAQ).",
    scoreImpact: 4, check: (p) => !p.hasStructuredData,
  },
  {
    id: "trust_no_privacy", category: "trust", severity: "medium", effort: "moderate",
    title: "No privacy or terms link",
    description: "No privacy policy or terms of service link detected. This reduces trust and may violate regulations.",
    fix: "Add links to your privacy policy and terms of service in the footer.",
    scoreImpact: 5,
    check: (p) => {
      const footerArea = p.rawText.slice(-3000).toLowerCase();
      const allLinks = p.links.join(" ").toLowerCase();
      return !PRIVACY.test(footerArea) && !PRIVACY.test(allLinks);
    },
  },
  {
    id: "trust_blank_no_noopener", category: "trust", severity: "medium", effort: "quick",
    title: "External links missing rel=noopener",
    description: "Links with target='_blank' are missing rel='noopener noreferrer'. This exposes users to tab-napping attacks.",
    fix: "Add rel='noopener noreferrer' to all <a target='_blank'> links.",
    scoreImpact: 4, check: (p) => p.externalBlankLinks > 0,
  },

  // ── Structure ──
  {
    id: "struct_no_viewport", category: "structure", severity: "high", effort: "quick",
    title: "Missing viewport meta tag",
    description: "No viewport meta tag. Your page won't render correctly on mobile devices.",
    fix: "Add <meta name='viewport' content='width=device-width, initial-scale=1'> to the <head>.",
    scoreImpact: 7, check: (p) => !p.hasViewport,
  },
  {
    id: "struct_no_nav", category: "structure", severity: "medium", effort: "quick",
    title: "No <nav> element",
    description: "No <nav> element found. Navigation helps users and search engines understand your site.",
    fix: "Wrap your navigation links in a <nav> element with an aria-label.",
    scoreImpact: 6, check: (p) => !p.hasNav,
  },
  {
    id: "struct_no_main", category: "structure", severity: "medium", effort: "quick",
    title: "No <main> landmark",
    description: "No <main> element. Screen readers and search engines use <main> to identify primary content.",
    fix: "Wrap your page's primary content in a <main> element.",
    scoreImpact: 4, check: (p) => !p.hasMain,
  },
  {
    id: "struct_no_footer", category: "structure", severity: "low", effort: "moderate",
    title: "No <footer> element",
    description: "No <footer> element. Footers provide important navigation, trust signals, and legal links.",
    fix: "Add a <footer> with contact info, nav links, and legal pages.",
    scoreImpact: 4, check: (p) => !p.hasFooter,
  },
  {
    id: "struct_heading_skip", category: "structure", severity: "low", effort: "quick",
    title: "Heading levels skipped",
    description: "H1 jumps to H3 with no H2. This breaks document outline and screen reader navigation.",
    fix: "Use headings in order: H1 → H2 → H3. Use CSS for visual sizing, not heading levels.",
    scoreImpact: 3, check: (p) => p.h1s.length > 0 && p.h3s.length > 0 && p.h2s.length === 0,
  },
  {
    id: "struct_empty_links", category: "structure", severity: "medium", effort: "quick",
    title: "Links with no accessible text",
    description: "One or more links have no text and no aria-label. Screen readers can't describe them.",
    fix: "Add descriptive text or aria-label to all <a> elements, especially icon-only links.",
    scoreImpact: 4, check: (p) => p.emptyLinks > 0,
  },

  // ── Performance ──
  {
    id: "perf_render_blocking", category: "performance", severity: "medium", effort: "quick",
    title: "Render-blocking scripts",
    description: "External <script src> tags found without defer or async. These block page rendering until fully downloaded.",
    fix: "Add defer or async to all non-critical external scripts. Use defer for scripts that need the DOM.",
    scoreImpact: 7, check: (p) => p.renderBlockingScripts > 0,
  },
  {
    id: "perf_no_lazy_images", category: "performance", severity: "low", effort: "quick",
    title: "Images not lazy-loaded",
    description: "Images found without loading='lazy'. Off-screen images load on page load, slowing initial render.",
    fix: "Add loading='lazy' to all <img> tags below the fold. Keep loading='eager' only on the hero image.",
    scoreImpact: 5, check: (p) => p.totalImages > 2 && p.imagesWithoutLazy > 1,
  },
  {
    id: "perf_no_hints", category: "performance", severity: "low", effort: "quick",
    title: "No resource hints",
    description: "No <link rel='preconnect'> or <link rel='preload'> found. Critical resources load later than necessary.",
    fix: "Add preconnect hints for external domains (fonts, APIs). Add preload for your hero image and main font.",
    scoreImpact: 4,
    check: (p) => !/<link[^>]+rel=["'](?:preconnect|preload|dns-prefetch)["']/i.test(p.rawText) && p.totalImages > 0,
  },

  // ── AEO ──
  {
    id: "aeo_ai_blocked", category: "aeo", severity: "high", effort: "quick",
    title: "AI crawlers blocked in robots.txt",
    description: "GPTBot, ClaudeBot, or PerplexityBot are disallowed. Your site won't be indexed by ChatGPT, Claude, or Perplexity search.",
    fix: "Remove or update the Disallow rule for GPTBot, ClaudeBot, anthropic-ai, and PerplexityBot in robots.txt. Or add explicit Allow: / rules for each.",
    scoreImpact: 9, check: (p) => p.robotsBlocksAICrawlers,
  },
  {
    id: "aeo_no_llms_txt", category: "aeo", severity: "medium", effort: "quick",
    title: "No llms.txt file",
    description: "No /llms.txt found. This emerging standard helps AI tools understand what your site is about and how to cite it.",
    fix: "Create /public/llms.txt with a brief description of your site, its purpose, and links to key pages. See llmstxt.org for the spec.",
    scoreImpact: 5, check: (p) => !p.hasLlmsTxt,
  },
  {
    id: "aeo_no_faq_schema", category: "aeo", severity: "medium", effort: "moderate",
    title: "No FAQ or HowTo structured data",
    description: "No FAQPage or HowTo JSON-LD found. These unlock rich results in Google and make content directly citable by AI search engines.",
    fix: "Add a FAQPage schema block to your FAQ section. Each question/answer pair becomes a potential AI citation.",
    scoreImpact: 6, check: (p) => !p.hasFaqSchema,
  },
  {
    id: "aeo_no_question_headings", category: "aeo", severity: "low", effort: "moderate",
    title: "No question-style headings",
    description: "None of your H2/H3 headings are phrased as questions. AI search engines prefer content that directly answers questions.",
    fix: "Rephrase 2–3 section headings as questions: 'What is X?', 'How does Y work?', 'Why should I Z?'",
    scoreImpact: 4, check: (p) => !p.hasQuestionHeadings,
  },
  {
    id: "aeo_no_twitter_card", category: "aeo", severity: "low", effort: "quick",
    title: "No Twitter Card meta tags",
    description: "No twitter:card tag found. Links shared on X/Twitter will show no preview image or description.",
    fix: "Add <meta name='twitter:card' content='summary_large_image'> plus twitter:title, twitter:description, twitter:image.",
    scoreImpact: 3, check: (p) => !p.hasTwitterCard,
  },

  // ── Security ──
  {
    id: "sec_no_csp", category: "security", severity: "high", effort: "moderate",
    title: "Missing Content-Security-Policy",
    description: "No CSP header found. Without it, any injected script can access cookies, session tokens, and DOM data. XSS attacks bypass client-side defenses entirely.",
    fix: "Add a Content-Security-Policy header. Start with: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'. Tighten iteratively.",
    scoreImpact: 8, check: (p) => !p.hasCSP,
  },
  {
    id: "sec_no_hsts", category: "security", severity: "high", effort: "quick",
    title: "Missing Strict-Transport-Security",
    description: "No HSTS header found. Without it, browsers may connect over HTTP first, exposing users to downgrade attacks.",
    fix: "Add: Strict-Transport-Security: max-age=31536000; includeSubDomains to your server config or Next.js headers.",
    scoreImpact: 6, check: (p) => !p.hasHSTS,
  },
  {
    id: "sec_no_x_frame", category: "security", severity: "medium", effort: "quick",
    title: "Missing X-Frame-Options",
    description: "No X-Frame-Options header. Your page can be embedded in an iframe, enabling clickjacking attacks.",
    fix: "Add: X-Frame-Options: SAMEORIGIN (or DENY if you never need iframes).",
    scoreImpact: 5, check: (p) => !p.hasXFrameOptions,
  },
  {
    id: "sec_no_x_content_type", category: "security", severity: "medium", effort: "quick",
    title: "Missing X-Content-Type-Options",
    description: "No nosniff header found. Browsers may MIME-sniff responses, interpreting a text file as executable script.",
    fix: "Add: X-Content-Type-Options: nosniff",
    scoreImpact: 4, check: (p) => !p.hasXContentTypeOptions,
  },
  {
    id: "sec_no_referrer_policy", category: "security", severity: "low", effort: "quick",
    title: "Missing Referrer-Policy",
    description: "No Referrer-Policy header. Full URLs (including tokens or paths) may leak to third-party sites via the Referer header.",
    fix: "Add: Referrer-Policy: strict-origin-when-cross-origin",
    scoreImpact: 3, check: (p) => !p.hasReferrerPolicy,
  },
];

// ── Scoring ─────────────────────────────────────────────────────────────────

const ALL_CATEGORIES: Category[] = ["seo", "conversion", "trust", "structure", "performance", "security", "aeo"];

const CATEGORY_LABELS: Record<Category, string> = {
  seo: "SEO",
  conversion: "Conversion",
  trust: "Trust & Social",
  structure: "Structure",
  performance: "Performance",
  security: "Security",
  aeo: "AI / AEO",
};

function calcGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

function runAudit(page: ParsedPage, url: string): AuditResult {
  const findings = RULES.filter((r) => r.check(page)).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ check, ...rest }) => rest as Finding
  );

  const categories = ALL_CATEGORIES.reduce((acc, cat) => {
    const catRules = RULES.filter((r) => r.category === cat);
    const catMax = catRules.reduce((s, r) => s + r.scoreImpact, 0);
    const catLost = findings.filter((f) => f.category === cat).reduce((s, f) => s + f.scoreImpact, 0);
    acc[cat] = {
      score: Math.round(Math.max(10, ((catMax - catLost) / catMax) * 100)),
      label: CATEGORY_LABELS[cat],
    };
    return acc;
  }, {} as Record<Category, { score: number; label: string }>);

  const totalMax = RULES.reduce((s, r) => s + r.scoreImpact, 0);
  const totalLost = findings.reduce((s, f) => s + f.scoreImpact, 0);
  const score = Math.round(Math.max(0, Math.min(100, ((totalMax - totalLost) / totalMax) * 100)));

  // Quick wins: sort by scoreImpact × effort multiplier (high impact, low effort first)
  const quickWins = [...findings]
    .sort((a, b) => b.scoreImpact * EFFORT_SCORE[b.effort] - a.scoreImpact * EFFORT_SCORE[a.effort])
    .slice(0, 5);

  return {
    url,
    score,
    grade: calcGrade(score),
    pageTitle: page.title,
    isSPA: page.isSPA,
    categories,
    findings: findings.sort((a, b) => {
      const sev = { high: 0, medium: 1, low: 2 };
      return sev[a.severity] - sev[b.severity];
    }),
    quickWins,
    scannedAt: new Date().toISOString(),
  };
}

// ── Route handler ────────────────────────────────────────────────────────────

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });

  let targetUrl: string;
  try {
    targetUrl = normalizeUrl(rawUrl);
    new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
      },
      redirect: "follow",
      cache: "no-store",
    });

    clearTimeout(timeout);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("html")) {
      return NextResponse.json(
        { error: `URL returned non-HTML content (${contentType || "unknown type"})` },
        { status: 422 }
      );
    }

    const html = await res.text();
    const origin = new URL(targetUrl).origin;
    const [external] = await Promise.all([checkExternalFiles(origin)]);
    const page: ParsedPage = {
      ...parseHtml(html),
      ...checkSecurityHeaders(res.headers),
      ...external,
    };
    const result = runAudit(page, targetUrl);
    try { kv.incr("scan_count").catch(() => {}); } catch {}
    return NextResponse.json(result);
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out, the site took too long to respond" }, { status: 504 });
    }
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Could not fetch the page: ${detail}` },
      { status: 502 }
    );
  }
}
