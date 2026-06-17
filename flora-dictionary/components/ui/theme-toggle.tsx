"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#6A00F4]/20 bg-white/90 text-[#6A00F4] shadow-xl backdrop-blur transition hover:scale-105 hover:bg-[#5BFF5A] focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40 dark:border-white/20 dark:bg-[#6A00F4]/90 dark:text-white dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4]"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {isDark ? (
        <Sun size={22} strokeWidth={2.4} aria-hidden="true" />
      ) : (
        <Moon size={22} strokeWidth={2.4} aria-hidden="true" />
      )}
    </button>
  );
}