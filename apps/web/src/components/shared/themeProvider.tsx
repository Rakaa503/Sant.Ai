"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { getStorage, setStorage } from "@/lib/storage";

type AppTheme = "light" | "dark";

const ThemeContext = createContext<{ theme: AppTheme; setTheme: (t: AppTheme) => void; toggle: () => void }>({
  theme: "light",
  setTheme: () => {},
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme(): AppTheme {
  try {
    const stored = getStorage("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>("light");

  const applyTheme = (t: AppTheme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    setStorage("theme", t);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const t = getInitialTheme();
    if (t !== "light") setThemeState(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!getStorage("theme")) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = (t: AppTheme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      <RadixTheme accentColor="blue" grayColor="slate" appearance={theme} hasBackground>
        {children}
      </RadixTheme>
    </ThemeContext.Provider>
  );
}
