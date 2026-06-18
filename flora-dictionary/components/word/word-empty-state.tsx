import { Search } from "lucide-react";

export function WordEmptyState() {
  return (
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
  );
}