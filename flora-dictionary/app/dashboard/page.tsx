import { AppShell } from "@/components/layout/app-shell";
import Link from "next/link";
import { BookOpen, Clock, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div>
        <p className="mb-4 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-bold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
          Área logada
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#6A00F4] dark:text-[#5BFF5A]">
          Bem-vinda ao seu painel de vocabulário.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
          Busque palavras em inglês, visualize definições completas, salve
          favoritos e acompanhe seu histórico de consultas.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Link
            href="/dictionary"
            className="group rounded-3xl border border-[#6A00F4]/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1F0A3D]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
              <BookOpen size={24} />
            </div>

            <h2 className="text-xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
              Dicionário
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Consulte palavras, veja fonética, definições, exemplos e
              sinônimos.
            </p>
          </Link>

          <Link
            href="/favorites"
            className="group rounded-3xl border border-[#6A00F4]/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1F0A3D]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
              <Star size={24} />
            </div>

            <h2 className="text-xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
              Favoritos
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Organize suas palavras preferidas e acesse rapidamente depois.
            </p>
          </Link>

          <div className="rounded-3xl border border-[#6A00F4]/10 bg-[#6A00F4] p-6 text-white shadow-lg dark:border-white/10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#5BFF5A]">
              <Clock size={24} />
            </div>

            <h2 className="text-xl font-black text-[#5BFF5A]">Histórico</h2>

            <p className="mt-3 text-sm leading-6 text-white/80">
              Veja as últimas palavras pesquisadas durante seus estudos.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}