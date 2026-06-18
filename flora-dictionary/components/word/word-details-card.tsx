import { Star, StarOff, Volume2 } from "lucide-react";
import type { DictionaryEntry } from "@/types/dictionary";

type WordDetailsCardProps = {
  entry: DictionaryEntry;
  audioUrl?: string;
  isFavorite: boolean;
  onPlayAudio: () => void;
  onToggleFavorite: () => void;
};

export function WordDetailsCard({
  entry,
  audioUrl,
  isFavorite,
  onPlayAudio,
  onToggleFavorite,
}: WordDetailsCardProps) {
  return (
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
            onClick={onPlayAudio}
            disabled={!audioUrl}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            aria-label="Reproduzir pronúncia"
            title="Reproduzir pronúncia"
          >
            <Volume2 size={21} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition hover:brightness-95 ${
              isFavorite
                ? "bg-[#6A00F4] text-white dark:bg-[#5BFF5A] dark:text-[#6A00F4]"
                : "bg-[#5BFF5A] text-[#6A00F4]"
            }`}
            aria-label={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            title={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
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
                {meaning.definitions.slice(0, 3).map((definition, index) => (
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
  );
}