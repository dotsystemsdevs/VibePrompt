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
  title: "VibePrompt - AI Prompts, Workflow & Tools for Builders",
  description:
    "40 battle-tested prompts for AI development. Free prompt library with workflows and tools for shipping with AI. Copy in one click, no login needed.",
  keywords: "AI prompts, vibe coding workflow, prompt library",
  metadataBase: getMetadataBase(),
  alternates: { canonical: "https://vibeprompt.tech" },
  openGraph: {
    title: "VibePrompt - Everything You Need to Ship with AI",
    description:
      "Free open-source prompt library with 40 tested prompts, workflows, and tools for AI developers.",
    siteName: "VibePrompt",
    type: "website",
    url: "https://vibeprompt.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibePrompt - AI Prompts for Builders",
    description:
      "40 battle-tested prompts for shipping with AI. Free, open-source, no login required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
