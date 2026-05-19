import { getAllArticles } from "@/lib/articles";

const SITE = "https://vibeprompt.tech";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getAllArticles();
  const buildDate = new Date().toUTCString();
  const lastArticleDate = articles[0]?.date ? new Date(articles[0].date).toUTCString() : buildDate;

  const items = articles
    .map((a) => {
      const pubDate = a.date ? new Date(a.date).toUTCString() : buildDate;
      const url = `${SITE}/articles/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.description)}</description>
      <author>noreply@vibeprompt.tech (${escapeXml(a.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>vibeprompt — articles</title>
    <link>${SITE}/articles</link>
    <description>Practical guides for vibe coders, what actually works when building with AI.</description>
    <language>en</language>
    <lastBuildDate>${lastArticleDate}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
