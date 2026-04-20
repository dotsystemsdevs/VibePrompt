"use client";

import { useEffect, useState } from "react";
import { isLocallySaved, toggleLocalSave } from "@/lib/local-saves";
import { incrementSaveCounter } from "@/lib/actions/saves-counter";

interface SaveButtonProps {
  slug: string;
  initialSaved: boolean;
}

export function SaveButton({ slug, initialSaved }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSaved(isLocallySaved(slug));
    function onChanged() {
      setSaved(isLocallySaved(slug));
    }
    window.addEventListener("vp:saves-changed", onChanged as EventListener);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("vp:saves-changed", onChanged as EventListener);
      window.removeEventListener("storage", onChanged);
    };
  }, [slug]);

  async function handleSave() {
    if (loading) return;
    setLoading(true);
    try {
      const nextSaved = toggleLocalSave(slug);
      setSaved(nextSaved);
      if (nextSaved) {
        void incrementSaveCounter();
      }
    } catch {
      setSaved(isLocallySaved(slug));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-colors border ${
        saved
          ? "border-foreground/30 text-foreground"
          : "border-foreground/15 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
