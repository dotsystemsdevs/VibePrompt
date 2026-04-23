import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VibePrompt",
  description: "VibePrompt privacy policy. We collect minimal data and never sell it.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 pb-24">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-foreground/40">Last updated April 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/60">
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">What we collect</h2>
          <p>VibePrompt collects anonymous usage analytics via Vercel Analytics (page views, no personal data). If you sign in, Clerk handles authentication and stores only your email and session data.</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">What we don&apos;t do</h2>
          <p>We do not sell data, run ads, or share your information with third parties beyond what is required to operate the service (Vercel, Clerk, Supabase).</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">Cookies</h2>
          <p>We use session cookies for authentication only. No tracking cookies.</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">Contact</h2>
          <p>Questions? Reach us at <a href="mailto:dot.systems@proton.me" className="text-foreground/80 underline hover:text-foreground">dot.systems@proton.me</a></p>
        </section>
      </div>
    </div>
  );
}
