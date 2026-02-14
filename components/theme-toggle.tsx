"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "ali-shamah-theme";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      className="relative inline-flex h-11 w-[108px] items-center rounded-full border border-zinc-500/60 bg-zinc-700 p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Dark mode" : "Light mode"}
    >
      <span className="grid w-1/2 place-items-center" aria-hidden="true">
        <Image
          src="/moon_icon_white.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain opacity-95"
        />
      </span>
      <span className="grid w-1/2 place-items-center" aria-hidden="true">
        <Image
          src="/sun_icon_white.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain opacity-95"
        />
      </span>

      <span
        className={`absolute left-1 top-1 grid h-9 w-9 place-items-center rounded-full border border-zinc-300/80 bg-zinc-100 transition-transform duration-300 ${isDark ? "translate-x-0" : "translate-x-14"}`}
        aria-hidden="true"
      >
        <Image
          src={isDark ? "/moon_icon.png" : "/sun_icon.png"}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      </span>
    </button>
  );
}
