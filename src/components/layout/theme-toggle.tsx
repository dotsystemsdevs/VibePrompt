"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "light";
}

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(getInitialTheme);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [isLight]);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
