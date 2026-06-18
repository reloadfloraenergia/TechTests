"use client";

import { useMemo, useState } from "react";
import type { FavoriteWord } from "@/types/favorite";
import {
  getFavoriteWords,
  removeFavoriteWord,
} from "@/lib/favorites-storage";
import { FavoriteWordCard } from "@/components/word/favorite-word-card";
import { FavoritesEmptyState } from "@/components/word/favorites-empty-state";

const INITIAL_VISIBLE_FAVORITES = 6;
const FAVORITES_LOAD_STEP = 6;

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteWord[]>(() =>
    getFavoriteWords()
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_FAVORITES);

  const visibleFavorites = useMemo(() => {
    return favorites.slice(0, visibleCount);
  }, [favorites, visibleCount]);

  const hiddenFavoritesCount = Math.max(favorites.length - visibleCount, 0);
  const hasMoreFavorites = hiddenFavoritesCount > 0;
  const isShowingMoreThanInitial = visibleCount > INITIAL_VISIBLE_FAVORITES;

  function handleRemoveFavorite(word: string) {
    const updatedFavorites = removeFavoriteWord(word);

    setFavorites(updatedFavorites);

    if (updatedFavorites.length <= INITIAL_VISIBLE_FAVORITES) {
      setVisibleCount(INITIAL_VISIBLE_FAVORITES);
    }
  }

  function handleShowMoreFavorites() {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + FAVORITES_LOAD_STEP, favorites.length)
    );
  }

  function handleShowLessFavorites() {
    setVisibleCount(INITIAL_VISIBLE_FAVORITES);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!favorites.length) {
    return <FavoritesEmptyState />;
  }

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleFavorites.map((favorite) => (
          <FavoriteWordCard
            key={favorite.word}
            favorite={favorite}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>

      {(hasMoreFavorites || isShowingMoreThanInitial) && (
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          {hasMoreFavorites && (
            <button
              type="button"
              onClick={handleShowMoreFavorites}
              className="rounded-xl bg-[#5BFF5A] px-8 py-3 text-sm font-black text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40"
            >
              Ver mais favoritos
            </button>
          )}

          {isShowingMoreThanInitial && (
            <button
              type="button"
              onClick={handleShowLessFavorites}
              className="text-sm font-bold text-zinc-500 transition hover:text-[#6A00F4] dark:text-zinc-400 dark:hover:text-[#5BFF5A]"
            >
              Mostrar menos
            </button>
          )}

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Exibindo {visibleFavorites.length} de {favorites.length} favorito(s)
          </p>
        </div>
      )}
    </section>
  );
}