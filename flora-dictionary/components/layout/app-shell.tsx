"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Search, Star } from "lucide-react";
import {
  clearCurrentUser,
  type RegisteredUser,
} from "@/lib/auth-storage";

type AppShellProps = {
  children: React.ReactNode;
};

const navigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dictionary",
    label: "Dicionário",
    icon: Search,
  },
  {
    href: "/favorites",
    label: "Favoritos",
    icon: Star,
  },
];

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getCurrentUserRaw() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("flora_user");
}

function getServerCurrentUserRaw() {
  return null;
}

function subscribeToMountedState() {
  return () => {};
}

function parseUser(userRaw: string | null): RegisteredUser | null {
  if (!userRaw) {
    return null;
  }

  try {
    return JSON.parse(userRaw) as RegisteredUser;
  } catch {
    return null;
  }
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isMounted = useSyncExternalStore(
    subscribeToMountedState,
    () => true,
    () => false
  );

  const userRaw = useSyncExternalStore(
    subscribeToStorage,
    getCurrentUserRaw,
    getServerCurrentUserRaw
  );

  const user = useMemo(() => parseUser(userRaw), [userRaw]);

  useEffect(() => {
    if (isMounted && !user) {
      router.replace("/login");
    }
  }, [isMounted, router, user]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      clearCurrentUser();
      router.replace("/login");
    }
  }

  if (!isMounted || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#6A00F4] dark:bg-[#13002E] dark:text-[#5BFF5A]">
        <p className="text-lg font-bold">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-[#13002E] dark:text-white">
      <header className="border-b border-[#6A00F4]/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#1F0A3D]/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="text-2xl font-black text-[#6A00F4] dark:text-white"
            >
              <span className="text-[#5BFF5A]">✱</span> flora dictionary
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 lg:hidden"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-wrap gap-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                      : "bg-[#6A00F4]/10 text-[#6A00F4] hover:bg-[#6A00F4] hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4]"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right">
              <p className="text-sm font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
                {user.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>
    </main>
  );
}