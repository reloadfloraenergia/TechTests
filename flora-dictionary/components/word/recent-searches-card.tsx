import { Clock } from "lucide-react";
import type { RecentSearch } from "@/types/recent-search";

type RecentSearchesCardProps = {
  recentSearches: RecentSearch[];
  onSelectRecentSearch: (word: string) => void;
  onClearRecentSearches: () => void;
};

export function RecentSearchesCard({
  recentSearches,
  onSelectRecentSearch,
  onClearRecentSearches,
}: RecentSearchesCardProps) {
  return (
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
            onClick={onClearRecentSearches}
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
                onClick={() => onSelectRecentSearch(search.word)}
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
  );
}