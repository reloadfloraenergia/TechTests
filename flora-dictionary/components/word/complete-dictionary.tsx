"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { WORDS } from "@/data/words";
import { WordDetailsModal } from "@/components/word/word-details-modal";
import { useDebounce } from "@/hooks/use-debounce";

const ITEMS_PER_PAGE = 12;

export function CompleteDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const cleanSearchTerm = debouncedSearchTerm.trim().toLowerCase();

  const filteredWords = useMemo(() => {
    if (!cleanSearchTerm) {
      return WORDS;
    }

    return WORDS.filter((word) => word.toLowerCase().includes(cleanSearchTerm));
  }, [cleanSearchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredWords.length / ITEMS_PER_PAGE));

  const paginatedWords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredWords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredWords]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function handlePreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function handleNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

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
            Navegue pela lista, filtre termos e clique em uma palavra para abrir
            os detalhes em um modal.
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
          </div>
        </div>
      </div>

      {!filteredWords.length ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
            <Search size={28} aria-hidden="true" />
          </div>

          <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
            Nenhuma palavra encontrada
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Tente buscar por outro termo ou limpe o filtro.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => setSelectedWord(word)}
                className="rounded-2xl border border-[#6A00F4]/10 bg-zinc-50 px-4 py-4 text-left font-bold text-[#6A00F4] transition hover:-translate-y-0.5 hover:border-[#6A00F4]/30 hover:bg-[#6A00F4] hover:text-white dark:border-white/10 dark:bg-[#13002E] dark:text-[#5BFF5A] dark:hover:bg-[#5BFF5A] dark:hover:text-[#6A00F4]"
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
              • {filteredWords.length} palavra(s)
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 rounded-xl border border-[#6A00F4]/20 px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:bg-[#6A00F4]/10 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                <ChevronLeft size={18} aria-hidden="true" />
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5BFF5A] px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
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