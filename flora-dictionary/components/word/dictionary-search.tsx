"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Clock,
  Loader2,
  Search,
  Star,
  StarOff,
  Volume2,
} from "lucide-react";
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

const INITIAL_WORD = "";

export function DictionarySearch() {
  const searchParams = useSearchParams();
  const initialWordFromUrl = searchParams.get("word") ?? INITIAL_WORD;

  const [searchTerm, setSearchTerm] = useState(initialWordFromUrl);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const cleanSearchTerm = debouncedSearchTerm.trim().toLowerCase();

  const audioUrl = useMemo(() => {
    return entry?.phonetics?.find((phonetic) => phonetic.audio)?.audio;
  }, [entry]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (!cleanSearchTerm) {
      setEntry(null);
      setError("");
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
        setRecentSearches(addRecentSearch(data.word));
      } catch (err) {
        if (!isCurrentRequest) {
          return;
        }

        setEntry(null);
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

  useEffect(() => {
    if (!entry?.word) {
      setIsFavorite(false);
      return;
    }

    setIsFavorite(isFavoriteWord(entry.word));
  }, [entry]);

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
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Ex: energy, clean, future..."
            className="w-full bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
          />
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-white/10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock
                size={16}
                className="text-[#6A00F4] dark:text-[#5BFF5A]"
                aria-hidden="true"
              />

              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                Pesquisas recentes
              </p>
            </div>

            {!!recentSearches.length && (
              <button
                type="button"
                onClick={handleClearRecentSearches}
                className="text-xs font-bold text-zinc-500 transition hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-200"
              >
                Limpar
              </button>
            )}
          </div>

          {!recentSearches.length ? (
            <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
              Suas buscas recentes aparecerão aqui.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <button
                    key={`${search.word}-${search.searchedAt}`}
                    type="button"
                    onClick={() => handleSelectRecentSearch(search.word)}
                    aria-label={`Abrir detalhes da palavra ${search.word}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#6A00F4]/10 px-3 py-2 text-xs font-bold text-[#6A00F4] transition hover:bg-[#6A00F4] hover:text-white dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A] dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4]"
                  >
                    {search.word}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                Clique em uma palavra para reabrir os detalhes.
              </p>
            </>
          )}
        </div>
      </aside>

      <section className="min-h-[460px] rounded-[2rem] border border-[#6A00F4]/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
        {isLoading && (
          <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
            <Loader2
              className="animate-spin text-[#6A00F4] dark:text-[#5BFF5A]"
              size={40}
              aria-hidden="true"
            />

            <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
              Buscando palavra...
            </p>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Consultando a API do dicionário.
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-200">
              <AlertCircle size={28} aria-hidden="true" />
            </div>

            <p className="mt-4 text-lg font-bold text-red-600 dark:text-red-200">
              Ops, algo deu errado
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && !entry && (
          <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
              <Search size={28} aria-hidden="true" />
            </div>

            <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
              Comece pesquisando uma palavra
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Digite um termo em inglês para visualizar definições, exemplos e
              sinônimos.
            </p>
          </div>
        )}

        {!isLoading && !error && entry && (
          <article>
            <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 dark:border-white/10 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6A00F4] dark:text-[#5BFF5A]">
                  Palavra
                </p>

                <h2 className="mt-2 text-5xl font-black text-[#6A00F4] dark:text-white">
                  {entry.word}
                </h2>

                <p className="mt-2 text-lg font-semibold text-zinc-500 dark:text-zinc-300">
                  {entry.phonetic ??
                    entry.phonetics?.[0]?.text ??
                    "Sem fonética disponível"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  disabled={!audioUrl}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                  aria-label="Reproduzir pronúncia"
                  title="Reproduzir pronúncia"
                >
                  <Volume2 size={21} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition hover:brightness-95 ${
                    isFavorite
                      ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                      : "bg-[#5BFF5A] text-[#6A00F4]"
                  }`}
                  aria-label={
                    isFavorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                  title={
                    isFavorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  {isFavorite ? (
                    <StarOff size={21} aria-hidden="true" />
                  ) : (
                    <Star size={21} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {entry.meanings.slice(0, 4).map((meaning, meaningIndex) => {
                const uniqueSynonyms = Array.from(
                  new Set(meaning.synonyms ?? [])
                ).slice(0, 8);

                return (
                  <section
                    key={`${meaning.partOfSpeech}-${meaningIndex}`}
                    className="rounded-3xl border border-zinc-200 p-5 dark:border-white/10"
                  >
                    <h3 className="text-lg font-black text-[#6A00F4] dark:text-[#5BFF5A]">
                      {meaning.partOfSpeech}
                    </h3>

                    <div className="mt-4 space-y-4">
                      {meaning.definitions
                        .slice(0, 3)
                        .map((definition, index) => (
                          <div
                            key={`${meaning.partOfSpeech}-${meaningIndex}-${index}`}
                          >
                            <p className="font-medium leading-7 text-zinc-800 dark:text-zinc-100">
                              {index + 1}. {definition.definition}
                            </p>

                            {definition.example && (
                              <p className="mt-2 rounded-2xl bg-[#6A00F4]/10 px-4 py-3 text-sm italic text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                                “{definition.example}”
                              </p>
                            )}
                          </div>
                        ))}
                    </div>

                    {!!uniqueSynonyms.length && (
                      <div className="mt-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                          Sinônimos
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {uniqueSynonyms.map((synonym) => (
                            <span
                              key={synonym}
                              className="rounded-full bg-[#5BFF5A] px-3 py-1 text-xs font-bold text-[#6A00F4]"
                            >
                              {synonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </article>
        )}
      </section>
    </div>
  );
}