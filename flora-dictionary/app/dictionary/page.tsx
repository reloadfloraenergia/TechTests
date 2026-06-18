import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { DictionarySearch } from "@/components/word/dictionary-search";
import { CompleteDictionary } from "@/components/word/complete-dictionary";

export default function DictionaryPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Dicionário"
        title="Buscar palavras"
        description="Pesquise uma palavra em inglês para visualizar fonética, definições, exemplos e sinônimos."
      />

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

        <CompleteDictionary />
      </div>
    </AppShell>
  );
}