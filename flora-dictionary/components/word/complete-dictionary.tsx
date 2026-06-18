"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { getPaginatedWords } from "@/services/words-service";

const WordDetailsModal = dynamic(
  () =>
    import("@/components/word/word-details-modal").then(
      (mod) => mod.WordDetailsModal
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

const ITEMS_PER_PAGE = 12;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export function CompleteDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadWords() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getPaginatedWords({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: debouncedSearchTerm,
          startsWith: selectedLetter,
        });

        if (!isCurrentRequest) {
          return;
        }

        setWords(data.words);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);

        if (data.currentPage !== currentPage) {
          setCurrentPage(data.currentPage);
        }
      } catch {
        if (!isCurrentRequest) {
          return;
        }

        setWords([]);
        setTotalItems(0);
        setTotalPages(1);
        setError("Não foi possível carregar a lista de palavras.");
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    loadWords();

    return () => {
      isCurrentRequest = false;
    };
  }, [currentPage, debouncedSearchTerm, selectedLetter]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  const handleSelectLetter = useCallback((letter: string) => {
    setSelectedLetter((currentLetter) =>
      currentLetter === letter ? "" : letter
    );
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedLetter("");
    setCurrentPage(1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }, [totalPages]);

  const hasActiveFilters = !!searchTerm || !!selectedLetter;

  return (
    <section className="mt-10 rounded-[2rem] border border-[#6A00F4]/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
      <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-bold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
            <BookOpen size={16} aria-hidden="true" />
            Dicionário completo
          </p>

          <h2 className="text-3xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
            Lista paginada de palavras
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Navegue pela lista, filtre por termo ou escolha uma letra para abrir
            rapidamente os detalhes de uma palavra.
          </p>
        </div>

        <div className="w-full lg:max-w-sm">
          <label
            htmlFor="complete-dictionary-search"
            className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-200"
          >
            Filtrar palavras
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-4 py-3 focus-within:border-[#6A00F4] focus-within:ring-4 focus-within:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:focus-within:border-[#5BFF5A] dark:focus-within:ring-[#5BFF5A]/10">
            <Search className="text-zinc-400" size={20} aria-hidden="true" />

            <input
              id="complete-dictionary-search"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Filtrar por palavra..."
              className="w-full bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
            />

            {!!searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-[#6A00F4] focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 dark:hover:bg-white/10 dark:hover:text-[#5BFF5A] dark:focus:ring-[#5BFF5A]/20"
                aria-label="Limpar filtro de palavra"
                title="Limpar filtro"
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 border-b border-zinc-200 pb-5 dark:border-white/10">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
            Filtrar por letra
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-left text-xs font-bold text-zinc-500 transition hover:text-[#6A00F4] focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 dark:text-zinc-400 dark:hover:text-[#5BFF5A] dark:focus:ring-[#5BFF5A]/20 sm:text-right"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {ALPHABET.map((letter) => {
            const isSelected = selectedLetter === letter;

            return (
              <button
                key={letter}
                type="button"
                onClick={() => handleSelectLetter(letter)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-black uppercase transition focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 dark:focus:ring-[#5BFF5A]/20 ${
                  isSelected
                    ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                    : "border border-[#6A00F4]/10 bg-zinc-50 text-[#6A00F4] hover:bg-[#6A00F4] hover:text-white dark:border-white/10 dark:bg-[#13002E] dark:text-[#5BFF5A] dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4]"
                }`}
                aria-pressed={isSelected}
                aria-label={`Filtrar palavras pela letra ${letter.toUpperCase()}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[260px] flex-col items-center justify-center text-center"
        >
          <Loader2
            className="animate-spin text-[#6A00F4] dark:text-[#5BFF5A]"
            size={36}
            aria-hidden="true"
          />

          <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
            Carregando palavras...
          </p>
        </div>
      )}

      {!isLoading && error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[260px] flex-col items-center justify-center text-center"
        >
          <p className="text-lg font-bold text-red-600 dark:text-red-200">
            {error}
          </p>
        </div>
      )}

      {!isLoading && !error && !totalItems && (
        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
            <Search size={28} aria-hidden="true" />
          </div>

          <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
            Nenhuma palavra encontrada
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Tente buscar por outro termo ou limpe os filtros.
          </p>
        </div>
      )}

      {!isLoading && !error && !!totalItems && (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {words.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => setSelectedWord(word)}
                className="rounded-2xl border border-[#6A00F4]/10 bg-zinc-50 px-4 py-4 text-left font-bold text-[#6A00F4] transition hover:-translate-y-0.5 hover:border-[#6A00F4]/30 hover:bg-[#6A00F4] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 dark:border-white/10 dark:bg-[#13002E] dark:text-[#5BFF5A] dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4] dark:focus:ring-[#5BFF5A]/20"
                aria-label={`Abrir detalhes da palavra ${word}`}
              >
                {word}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              Página{" "}
              <span className="font-black text-[#6A00F4] dark:text-[#5BFF5A]">
                {currentPage}
              </span>{" "}
              de{" "}
              <span className="font-black text-[#6A00F4] dark:text-[#5BFF5A]">
                {totalPages}
              </span>{" "}
              • {totalItems} palavra(s)
              {selectedLetter && (
                <>
                  {" "}
                  com a letra{" "}
                  <span className="font-black uppercase text-[#6A00F4] dark:text-[#5BFF5A]">
                    {selectedLetter}
                  </span>
                </>
              )}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 rounded-xl border border-[#6A00F4]/20 px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:bg-[#6A00F4]/10 focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:focus:ring-[#5BFF5A]/20"
              >
                <ChevronLeft size={18} aria-hidden="true" />
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5BFF5A] px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}

      <WordDetailsModal
        word={selectedWord}
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
      />
    </section>
  );
}