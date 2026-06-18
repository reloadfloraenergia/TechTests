import type { DictionaryEntry } from "@/types/dictionary";

export async function fetchWordDetails(word: string): Promise<DictionaryEntry> {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Não encontramos essa palavra. Tente outro termo em inglês.");
    }

    throw new Error("Não foi possível buscar a palavra agora.");
  }

  const data = (await response.json()) as DictionaryEntry[];

  if (!data.length) {
    throw new Error("Nenhum resultado encontrado.");
  }

  return data[0];
}