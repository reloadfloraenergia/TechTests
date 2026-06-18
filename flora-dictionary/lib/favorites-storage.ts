import type { FavoriteWord } from "@/types/favorite";

const FAVORITES_STORAGE_PREFIX = "flora_favorite_words";

function getCurrentUserEmail() {
  if (typeof window === "undefined") {
    return null;
  }

  const userRaw = localStorage.getItem("flora_user");

  if (!userRaw) {
    return null;
  }

  try {
    const user = JSON.parse(userRaw) as { email?: string };

    return user.email?.trim().toLowerCase() ?? null;
  } catch {
    return null;
  }
}

function normalizeStorageKey(value: string) {
  return value.replace(/[^a-z0-9]/g, "_");
}

function getFavoritesStorageKey() {
  const email = getCurrentUserEmail();

  if (!email) {
    return `${FAVORITES_STORAGE_PREFIX}_guest`;
  }

  return `${FAVORITES_STORAGE_PREFIX}_${normalizeStorageKey(email)}`;
}

export function getFavoriteWords(): FavoriteWord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const favoritesRaw = localStorage.getItem(getFavoritesStorageKey());

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
  localStorage.setItem(getFavoritesStorageKey(), JSON.stringify(favorites));
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