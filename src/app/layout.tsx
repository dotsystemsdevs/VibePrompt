import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";

const getMetadataBase = () => {
  const fallback = "https://vibeprompt.tech";
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
};

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  title: "vibeprompt — The vibe coding cookbook",
  description:
    "Recipes for shipping with AI: a 9-step workflow, 55 battle-tested prompts, 45 field-tested fixes, 15 deep-dives. Free, open source, updated as you ship.",
  keywords:
    "vibe coding, vibe coding cookbook, vibe coding playbook, vibe coding book, vibe coding guide, vibe coding handbook, AI coding workflow, Claude Code prompts, Cursor prompts, prompt library, AI development methodology, indie hacker, solo developer",
  metadataBase: getMetadataBase(),
  alternates: { canonical: "https://vibeprompt.tech" },
  openGraph: {
    title: "vibeprompt — The vibe coding cookbook",
    description:
      "Recipes for shipping with AI: a 9-step workflow, 55 prompts, 45 fixes, and 15 deep-dives. Free, open source, web-native, updated weekly.",
    siteName: "vibeprompt",
    type: "website",
    url: "https://vibeprompt.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibeprompt — The vibe coding cookbook",
    description:
      "Recipes for shipping with AI. 9-step workflow, 55 prompts, 45 fixes, 15 deep-dives. Free, open source, updated weekly.",
  },
};

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
