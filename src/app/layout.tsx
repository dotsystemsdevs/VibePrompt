import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

const getMetadataBase = () => {
  const fallback = "https://vibeprompt.tech";
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const p = prompts.length;
  const f = LIST_PROBLEMS.length;
  const a = articles.length;
  const longDesc = `Recipes for shipping with AI: a 9-step workflow, ${p} battle-tested prompts, ${f} field-tested fixes, ${a} deep-dives. Free, open source, updated as you ship.`;
  const ogDesc = `Recipes for shipping with AI: a 9-step workflow, ${p} prompts, ${f} fixes, and ${a} deep-dives. Free, open source, web-native, updated weekly.`;
  const twDesc = `Recipes for shipping with AI. 9-step workflow, ${p} prompts, ${f} fixes, ${a} deep-dives. Free, open source, updated weekly.`;

  return {
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    title: "vibeprompt — The vibe coding cookbook",
    description: longDesc,
    keywords:
      "vibe coding, vibe coding cookbook, vibe coding playbook, vibe coding book, vibe coding guide, vibe coding handbook, AI coding workflow, Claude Code prompts, Cursor prompts, prompt library, AI development methodology, indie hacker, solo developer",
    metadataBase: getMetadataBase(),
    alternates: {
      canonical: "https://vibeprompt.tech",
      types: { "application/rss+xml": "https://vibeprompt.tech/feed.xml" },
    },
    openGraph: {
      title: "vibeprompt — The vibe coding cookbook",
      description: ogDesc,
      siteName: "vibeprompt",
      type: "website",
      url: "https://vibeprompt.tech",
    },
    twitter: {
      card: "summary_large_image",
      title: "vibeprompt — The vibe coding cookbook",
      description: twDesc,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <script defer src="https://tracker-mauve-sigma.vercel.app/t.js" data-project="vibeprompt" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
