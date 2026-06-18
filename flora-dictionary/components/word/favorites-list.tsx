"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Star, Trash2 } from "lucide-react";
import type { FavoriteWord } from "@/types/favorite";
import {
  getFavoriteWords,
  removeFavoriteWord,
} from "@/lib/favorites-storage";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteWord[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteWords());
  }, []);

  function handleRemoveFavorite(word: string) {
    const updatedFavorites = removeFavoriteWord(word);
    setFavorites(updatedFavorites);
  }

  if (!favorites.length) {
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

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {favorites.map((favorite) => (
        <article
          key={favorite.word}
          className="rounded-[2rem] border border-[#6A00F4]/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1F0A3D]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6A00F4] dark:text-[#5BFF5A]">
                Favorito
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#6A00F4] dark:text-white">
                {favorite.word}
              </h2>

              {favorite.phonetic && (
                <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  {favorite.phonetic}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleRemoveFavorite(favorite.word)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-400/30 dark:text-red-200 dark:hover:bg-red-400/10"
              aria-label={`Remover ${favorite.word} dos favoritos`}
              title="Remover dos favoritos"
            >
              <Trash2 size={19} aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
            Adicionada em{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(favorite.addedAt))}
          </p>

          <Link
            href={`/dictionary?word=${encodeURIComponent(favorite.word)}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A00F4] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110 dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
          >
            <Search size={17} aria-hidden="true" />
            Ver detalhes
          </Link>
        </article>
      ))}
    </div>
  );
}