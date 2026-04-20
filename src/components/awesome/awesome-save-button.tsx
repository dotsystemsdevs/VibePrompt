"use client";

import { useEffect, useState } from "react";
import { isLocallySaved, toggleLocalSave } from "@/lib/local-saves";

interface AwesomeSaveButtonProps {
  href: string;
  initialSaved: boolean;
}

export function AwesomeSaveButton({ href, initialSaved }: AwesomeSaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const key = `awesome:${encodeURIComponent(href)}`;

  useEffect(() => {
    setSaved(isLocallySaved(key));
    function onChanged() {
      setSaved(isLocallySaved(key));
    }
    window.addEventListener("vp:saves-changed", onChanged as EventListener);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("vp:saves-changed", onChanged as EventListener);
      window.removeEventListener("storage", onChanged);
    };
  }, [key]);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const nextSaved = toggleLocalSave(key);
      setSaved(nextSaved);
    } catch {
      setSaved(isLocallySaved(key));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`shrink-0 text-[10px] uppercase tracking-widest transition-colors ${
        saved ? "text-foreground" : "text-muted-foreground/40 hover:text-foreground"
      }`}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
