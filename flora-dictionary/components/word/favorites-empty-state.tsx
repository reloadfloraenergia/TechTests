import Link from "next/link";
import { Search, Star } from "lucide-react";

export function FavoritesEmptyState() {
  return (
    <div className="rounded-[2rem] border border-[#6A00F4]/10 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
        <Star size={30} aria-hidden="true" />
      </div>

      <h2 className="mt-5 text-2xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
        Nenhuma palavra favorita ainda
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        Busque uma palavra no dicionário e clique na estrela para salvar seus
        termos favoritos.
      </p>

      <Link
        href="/dictionary"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5BFF5A] px-6 py-3 font-bold text-[#6A00F4] transition hover:brightness-95"
      >
        <Search size={18} aria-hidden="true" />
        Buscar palavras
      </Link>
    </div>
  );
}