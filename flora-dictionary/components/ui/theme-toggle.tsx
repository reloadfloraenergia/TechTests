"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function subscribeToMountedState() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isMounted = useSyncExternalStore(
    subscribeToMountedState,
    () => true,
    () => false
  );

  if (!isMounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#6A00F4]/20 bg-white text-[#6A00F4] shadow-lg transition hover:scale-105 dark:border-white/20 dark:bg-[#1F0A3D] dark:text-[#5BFF5A]"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {isDark ? (
        <Sun size={22} aria-hidden="true" />
      ) : (
        <Moon size={22} aria-hidden="true" />
      )}
    </button>
  );
}