import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { checkExternalFiles, checkSecurityHeaders, parseHtml } from "@/lib/audit/parser";
import { runAudit } from "@/lib/audit/scoring";
import type { ParsedPage } from "@/lib/audit/types";

export type { AuditResult, Finding } from "@/lib/audit/types";

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

// Bot-protection challenge pages return HTML but the body is a challenge,
// not the actual site. Auditing them produces garbage findings (no meta,
// no headers, etc.) — so we detect and report honestly instead.
function detectBotProtection(html: string, headers: Headers): { provider: string; hint: string } | null {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = (titleMatch?.[1] ?? "").trim();
  const lower = html.slice(0, 5000).toLowerCase();

  if (/vercel security checkpoint/i.test(title) || lower.includes("vercel security checkpoint")) {
    return {
      provider: "Vercel Bot Protection",
      hint: "The site is behind Vercel's bot challenge. Disable Bot Protection or allowlist the vibepromptBot user-agent to enable scanning.",
    };
  }
  if (/just a moment/i.test(title) && (lower.includes("cloudflare") || headers.get("server")?.toLowerCase().includes("cloudflare"))) {
    return {
      provider: "Cloudflare Bot Fight Mode",
      hint: "The site is behind Cloudflare's bot challenge. Adjust Bot Fight Mode or add a WAF rule for vibepromptBot.",
    };
  }
  if (/attention required! \| cloudflare/i.test(title)) {
    return {
      provider: "Cloudflare WAF",
      hint: "Cloudflare blocked the scanner. Add a WAF allow rule for vibepromptBot.",
    };
  }
  if (/access denied/i.test(title) && lower.includes("akamai")) {
    return {
      provider: "Akamai Bot Manager",
      hint: "Akamai blocked the scanner. Allowlist the vibepromptBot user-agent.",
    };
  }
  return null;
}

export const maxDuration = 30;

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

  const origin = new URL(targetUrl).origin;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const [res, external] = await Promise.all([
      fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; vibepromptBot/1.0; +https://vibeprompt.tech/scan)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
        },
        redirect: "follow",
        cache: "no-store",
      }),
      checkExternalFiles(origin),
    ]);

    clearTimeout(timeout);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("html")) {
      return NextResponse.json(
        { error: `URL returned non-HTML content (${contentType || "unknown type"})` },
        { status: 422 }
      );
    }

    const html = await res.text();

    const botBlock = detectBotProtection(html, res.headers);
    if (botBlock) {
      return NextResponse.json(
        {
          error: `Couldn't audit, ${botBlock.provider} blocked the scanner.`,
          detail: botBlock.hint,
          botProtection: botBlock.provider,
        },
        { status: 422 }
      );
    }

    const page: ParsedPage = {
      ...parseHtml(html),
      ...checkSecurityHeaders(res.headers),
      ...external,
    };
    const result = runAudit(page, targetUrl);
    try { await kv.incr("scan_count"); } catch {}
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
