"use client";

import { useEffect, useState } from "react";
import type { FavoriteWord } from "@/types/favorite";
import {
  getFavoriteWords,
  removeFavoriteWord,
} from "@/lib/favorites-storage";
import { FavoriteWordCard } from "@/components/word/favorite-word-card";
import { FavoritesEmptyState } from "@/components/word/favorites-empty-state";

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
    return <FavoritesEmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {favorites.map((favorite) => (
        <FavoriteWordCard
          key={favorite.word}
          favorite={favorite}
          onRemove={handleRemoveFavorite}
        />
      ))}
    </div>
  );
}