import { AppShell } from "@/components/layout/app-shell";
import { DictionarySearch } from "@/components/word/dictionary-search";
import { Suspense } from "react";

export default function DictionaryPage() {
  return (
    <AppShell>
      <div>
        <p className="mb-4 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-bold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
          Dicionário
        </p>

        <h1 className="text-4xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
          Buscar palavras
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
          Pesquise uma palavra em inglês para visualizar fonética, definições,
          exemplos e sinônimos.
        </p>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="rounded-[2rem] border border-[#6A00F4]/10 bg-white p-8 text-center shadow-lg dark:border-white/10 dark:bg-[#1F0A3D]">
                <p className="font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
                  Carregando dicionário...
                </p>
              </div>
            }
          >
            <DictionarySearch />
          </Suspense>
        </div>
      </div>
    </AppShell>
  );
}