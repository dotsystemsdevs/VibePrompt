"use client";

import { SignInButton } from "@clerk/nextjs";

export function SignInPrompt() {
  return (
    <SignInButton mode="modal">
      <button className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ backgroundColor: "var(--accent-blue)" }}>
        Sign in →
      </button>
    </SignInButton>
  );
}
