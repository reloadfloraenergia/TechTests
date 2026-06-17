"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Search, Star, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

type AppShellProps = {
  children: React.ReactNode;
};

type User = {
  name: string;
  email: string;
};

const navigationItems = [
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

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("flora_token");
    const storedUser = localStorage.getItem("flora_user");

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(storedUser) as User);
    setIsCheckingAuth(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("flora_user");
    localStorage.removeItem("flora_token");
    router.push("/login");
  }

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#6A00F4] dark:bg-[#13002E] dark:text-[#5BFF5A]">
        <p className="text-lg font-bold">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-[#13002E] dark:text-white">
      <header className="sticky top-0 z-40 border-b border-[#6A00F4]/10 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#13002E]/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-2xl font-black text-[#6A00F4] dark:text-white"
          >
            <span className="text-[#5BFF5A]">✱</span>
            flora dictionary
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                      : "text-zinc-600 hover:bg-[#6A00F4]/10 hover:text-[#6A00F4] dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-[#5BFF5A]"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-zinc-800 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {user?.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="flex border-t border-[#6A00F4]/10 px-4 py-3 md:hidden dark:border-white/10">
          <div className="grid w-full grid-cols-3 gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                      : "text-zinc-600 hover:bg-[#6A00F4]/10 hover:text-[#6A00F4] dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-[#5BFF5A]"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>
    </main>
  );
}