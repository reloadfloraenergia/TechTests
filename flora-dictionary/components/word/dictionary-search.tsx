"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { fetchWordDetails } from "@/services/dictionary-service";
import type { DictionaryEntry } from "@/types/dictionary";
import type { RecentSearch } from "@/types/recent-search";
import {
  addFavoriteWord,
  isFavoriteWord,
  removeFavoriteWord,
} from "@/lib/favorites-storage";
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
} from "@/lib/recent-searches-storage";
import { RecentSearchesCard } from "@/components/word/recent-searches-card";
import { WordDetailsCard } from "@/components/word/word-details-card";
import { WordLoadingState } from "@/components/word/word-loading-state";
import { WordErrorState } from "@/components/word/word-error-state";
import { WordEmptyState } from "@/components/word/word-empty-state";

const INITIAL_WORD = "";

export function DictionarySearch() {
  const searchParams = useSearchParams();
  const initialWordFromUrl = searchParams.get("word") ?? INITIAL_WORD;

  const [searchTerm, setSearchTerm] = useState(initialWordFromUrl);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() =>
    getRecentSearches()
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const cleanSearchTerm = debouncedSearchTerm.trim().toLowerCase();

  const audioUrl = useMemo(() => {
    return entry?.phonetics?.find((phonetic) => phonetic.audio)?.audio;
  }, [entry]);

  useEffect(() => {
    if (!cleanSearchTerm) {
      return;
    }

    let isCurrentRequest = true;

    async function loadWord() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchWordDetails(cleanSearchTerm);

        if (!isCurrentRequest) {
          return;
        }

        setEntry(data);
        setIsFavorite(isFavoriteWord(data.word));
        setRecentSearches(addRecentSearch(data.word));
      } catch (err) {
        if (!isCurrentRequest) {
          return;
        }

        setEntry(null);
        setIsFavorite(false);
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível buscar a palavra."
        );
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    loadWord();

    return () => {
      isCurrentRequest = false;
    };
  }, [cleanSearchTerm]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearchTerm(value);

    if (!value.trim()) {
      setEntry(null);
      setError("");
      setIsLoading(false);
      setIsFavorite(false);
    }
  }

  function handlePlayAudio() {
    if (!audioUrl) {
      return;
    }

    const audio = new Audio(audioUrl);

    audio.play().catch(() => {
      setError("Não foi possível reproduzir o áudio desta palavra.");
    });
  }

  function handleToggleFavorite() {
    if (!entry) {
      return;
    }

    if (isFavorite) {
      removeFavoriteWord(entry.word);
      setIsFavorite(false);
      return;
    }

    addFavoriteWord({
      word: entry.word,
      phonetic: entry.phonetic ?? entry.phonetics?.[0]?.text,
      addedAt: new Date().toISOString(),
    });

    setIsFavorite(true);
  }

  function handleSelectRecentSearch(word: string) {
    setSearchTerm(word);
  }

  function handleClearRecentSearches() {
    setRecentSearches(clearRecentSearches());
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <aside className="h-fit rounded-[2rem] border border-[#6A00F4]/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
        <label
          htmlFor="word-search"
          className="text-sm font-bold text-zinc-700 dark:text-zinc-200"
        >
          Busque uma palavra em inglês
        </label>

        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-4 py-3 focus-within:border-[#6A00F4] focus-within:ring-4 focus-within:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:focus-within:border-[#5BFF5A] dark:focus-within:ring-[#5BFF5A]/10">
          <Search className="text-zinc-400" size={20} aria-hidden="true" />

          <input
            id="word-search"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Ex: energy, clean, future..."
            className="w-full bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
          />
        </div>

        <RecentSearchesCard
          recentSearches={recentSearches}
          onSelectRecentSearch={handleSelectRecentSearch}
          onClearRecentSearches={handleClearRecentSearches}
        />
      </aside>

      <section className="min-h-[460px] rounded-[2rem] border border-[#6A00F4]/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
        {isLoading && <WordLoadingState />}

        {!isLoading && error && <WordErrorState message={error} />}

        {!isLoading && !error && (!entry || !cleanSearchTerm) && (
          <WordEmptyState />
        )}

        {!isLoading && !error && entry && cleanSearchTerm && (
          <WordDetailsCard
            entry={entry}
            audioUrl={audioUrl}
            isFavorite={isFavorite}
            onPlayAudio={handlePlayAudio}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>
    </div>
  );
}