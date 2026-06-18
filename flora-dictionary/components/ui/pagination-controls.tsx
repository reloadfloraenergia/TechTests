import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  selectedLetter?: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  selectedLetter,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
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
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 rounded-xl border border-[#6A00F4]/20 px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:bg-[#6A00F4]/10 focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:focus:ring-[#5BFF5A]/20"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Anterior
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5BFF5A] px-4 py-2 text-sm font-bold text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Próxima
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}