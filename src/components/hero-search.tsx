"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/browse?q=${encodeURIComponent(q.trim())}`);
    else router.push("/browse");
  }

  return (
    <form
      onSubmit={submit}
      className="mt-8 flex max-w-lg items-center transition-all"
      style={{
        border: "1px solid var(--border)",
        background: "var(--muted)",
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLFormElement).style.borderColor = "var(--foreground)";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLFormElement).style.borderColor = "var(--border)";
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search prompts, tools, workflows..."
        className="flex-1 bg-transparent px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 border-l px-5 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-foreground"
        style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
      >
        Search
      </button>
    </form>
  );
}
