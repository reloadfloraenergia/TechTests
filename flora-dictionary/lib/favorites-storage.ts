import type { FavoriteWord } from "@/types/favorite";

const FAVORITES_STORAGE_KEY = "flora_favorite_words";

export function getFavoriteWords(): FavoriteWord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const favoritesRaw = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!favoritesRaw) {
    return [];
  }

  try {
    return JSON.parse(favoritesRaw) as FavoriteWord[];
  } catch {
    return [];
  }
}

export function saveFavoriteWords(favorites: FavoriteWord[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavoriteWord(word: string) {
  const normalizedWord = word.trim().toLowerCase();

  return getFavoriteWords().some(
    (favorite) => favorite.word.toLowerCase() === normalizedWord
  );
}

export function addFavoriteWord(favorite: FavoriteWord) {
  const favorites = getFavoriteWords();

  const alreadyExists = favorites.some(
    (item) => item.word.toLowerCase() === favorite.word.toLowerCase()
  );

  if (alreadyExists) {
    return favorites;
  }

  const updatedFavorites = [favorite, ...favorites];

  saveFavoriteWords(updatedFavorites);

  return updatedFavorites;
}

export function removeFavoriteWord(word: string) {
  const normalizedWord = word.trim().toLowerCase();

  const updatedFavorites = getFavoriteWords().filter(
    (favorite) => favorite.word.toLowerCase() !== normalizedWord
  );

  saveFavoriteWords(updatedFavorites);

  return updatedFavorites;
}