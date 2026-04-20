import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
  title: "VibePrompt - AI Prompts, Workflow & Tools for Builders",
  description:
    "36+ battle-tested prompts for AI development. Free prompt library with workflows and tools for shipping with AI. Copy in one click, no login needed. Join the community of vibe coders.",
  keywords: "AI prompts, prompt engineering, AI tools, vibe coding, open source prompts",
  metadataBase: getMetadataBase(),
  openGraph: {
    title: "VibePrompt - Everything You Need to Ship with AI",
    description:
      "Free open-source prompt library with 36+ tested prompts, workflows, and tools for AI developers.",
    siteName: "VibePrompt",
    type: "website",
    url: "https://vibeprompt.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibePrompt - AI Prompts for Builders",
    description:
      "36+ battle-tested prompts for shipping with AI. Free, open-source, no login required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClerkProvider
          appearance={{
            variables: {
              colorBackground: "#09090b",
              colorInputBackground: "#09090b",
              colorInputText: "#fafafa",
              colorText: "#fafafa",
              colorTextSecondary: "#71717a",
              colorPrimary: "#fafafa",
              colorDanger: "#d4d4d8",
              borderRadius: "0px",
              fontFamily: "inherit",
              fontSize: "14px",
            },
            elements: {
              card: { boxShadow: "none", border: "1px solid #27272a", backgroundColor: "#09090b", borderRadius: "0px" },
              headerTitle: { color: "#fafafa", fontWeight: "600", fontSize: "16px" },
              headerSubtitle: { color: "#71717a", fontSize: "13px" },
              socialButtonsBlockButton: { border: "1px solid #3f3f46", backgroundColor: "transparent", color: "#fafafa", borderRadius: "0px", boxShadow: "none", transition: "border-color 0.15s, background-color 0.15s" },
              socialButtonsBlockButtonText: { color: "#d4d4d8", fontSize: "13px" },
              socialButtonsProviderIcon__github: { filter: "invert(1)" },
              dividerLine: { backgroundColor: "#27272a" },
              dividerText: { color: "#52525b", fontSize: "11px" },
              formFieldLabel: { color: "#a1a1aa", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" },
              formFieldInput: { backgroundColor: "transparent", border: "1px solid #52525b", borderRadius: "0px", color: "#fafafa", boxShadow: "none", outline: "none", transition: "border-color 0.15s" },
              formButtonPrimary: { backgroundColor: "#fafafa", color: "#09090b", fontWeight: "500", borderRadius: "0px", border: "none", boxShadow: "none", fontSize: "13px", transition: "background-color 0.15s, opacity 0.15s" },
              footerActionLink: { color: "#a1a1aa", transition: "color 0.15s" },
              footerActionText: { color: "#52525b", fontSize: "12px" },
              footer: { backgroundColor: "#09090b", borderTop: "1px solid #27272a" },
              formFieldInputShowPasswordButton: { color: "#71717a" },
              formFieldSuccessText: { color: "#22c55e" },
              formFieldErrorText: { color: "#d4d4d8", fontSize: "12px" },
              alertText: { fontSize: "13px" },
              otpCodeFieldInput: { border: "1px solid #52525b", borderRadius: "0px", color: "#fafafa", backgroundColor: "#18181b", boxShadow: "none", outline: "none" },
              otpCodeField: { gap: "8px" },
              userButtonPopoverCard: { backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "0px", boxShadow: "none" },
              userButtonPopoverActionButton: { color: "#fafafa", borderRadius: "0px", "&:hover": { background: "#3f3f46", color: "#ffffff" } },
              userButtonPopoverActionButtonText: { color: "#fafafa", fontSize: "13px" },
              userButtonPopoverActionButtonIcon: { color: "#a1a1aa" },
              userPreviewMainIdentifier: { color: "#fafafa", fontSize: "13px", fontWeight: "500" },
              userPreviewSecondaryIdentifier: { color: "#71717a", fontSize: "12px" },
              userButtonPopoverFooter: { borderTop: "1px solid #27272a", backgroundColor: "#09090b" },
              userButtonAvatarBox: { width: "32px", height: "32px", borderRadius: "50%", background: "#3f3f46" },
              userButtonAvatarImage: { display: "none" },
              avatarBox: { borderRadius: "50%", background: "#3f3f46" },
              avatarImage: { display: "none" },
            },
          }}
        >
          <Navbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
