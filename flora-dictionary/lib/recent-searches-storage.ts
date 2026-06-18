import type { RecentSearch } from "@/types/recent-search";

const RECENT_SEARCHES_STORAGE_PREFIX = "flora_recent_searches";
const MAX_RECENT_SEARCHES = 6;

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

function getRecentSearchesStorageKey() {
  const email = getCurrentUserEmail();

  if (!email) {
    return `${RECENT_SEARCHES_STORAGE_PREFIX}_guest`;
  }

  return `${RECENT_SEARCHES_STORAGE_PREFIX}_${normalizeStorageKey(email)}`;
}

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") {
    return [];
  }

  const recentSearchesRaw = localStorage.getItem(getRecentSearchesStorageKey());

  if (!recentSearchesRaw) {
    return [];
  }

  try {
    return JSON.parse(recentSearchesRaw) as RecentSearch[];
  } catch {
    return [];
  }
}

export function saveRecentSearches(recentSearches: RecentSearch[]) {
  localStorage.setItem(
    getRecentSearchesStorageKey(),
    JSON.stringify(recentSearches)
  );
}

export function addRecentSearch(word: string) {
  const normalizedWord = word.trim().toLowerCase();

  if (!normalizedWord) {
    return getRecentSearches();
  }

  const currentSearches = getRecentSearches();

  const searchesWithoutCurrentWord = currentSearches.filter(
    (search) => search.word.toLowerCase() !== normalizedWord
  );

  const updatedSearches = [
    {
      word: normalizedWord,
      searchedAt: new Date().toISOString(),
    },
    ...searchesWithoutCurrentWord,
  ].slice(0, MAX_RECENT_SEARCHES);

  saveRecentSearches(updatedSearches);

  return updatedSearches;
}

export function clearRecentSearches() {
  saveRecentSearches([]);

  return [];
}