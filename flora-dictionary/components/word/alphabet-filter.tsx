const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

type AlphabetFilterProps = {
  selectedLetter: string;
  hasActiveFilters: boolean;
  onSelectLetter: (letter: string) => void;
  onClearFilters: () => void;
};

export function AlphabetFilter({
  selectedLetter,
  hasActiveFilters,
  onSelectLetter,
  onClearFilters,
}: AlphabetFilterProps) {
  return (
    <div className="mt-5 border-b border-zinc-200 pb-5 dark:border-white/10">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
          Filtrar por letra
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
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
              onClick={() => onSelectLetter(letter)}
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
  );
}