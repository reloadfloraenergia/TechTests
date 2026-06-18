import { WORDS } from "@/data/words";

type GetPaginatedWordsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type PaginatedWordsResponse = {
  words: string[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

function normalizeWord(word: string) {
  return word.trim().toLowerCase();
}

export async function getPaginatedWords({
  page = 1,
  limit = 12,
  search = "",
}: GetPaginatedWordsParams): Promise<PaginatedWordsResponse> {
  const cleanSearch = normalizeWord(search);

  const filteredWords = WORDS.filter((word) => {
    if (!cleanSearch) {
      return true;
    }

    return word.toLowerCase().includes(cleanSearch);
  });

  const totalItems = filteredWords.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (currentPage - 1) * limit;
  const words = filteredWords.slice(startIndex, startIndex + limit);

  return {
    words,
    totalItems,
    totalPages,
    currentPage,
    limit,
  };
}