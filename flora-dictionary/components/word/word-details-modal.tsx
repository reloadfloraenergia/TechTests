"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { DictionaryEntry } from "@/types/dictionary";
import { fetchWordDetails } from "@/services/dictionary-service";
import { WordDetailsCard } from "@/components/word/word-details-card";
import { WordLoadingState } from "@/components/word/word-loading-state";
import { WordErrorState } from "@/components/word/word-error-state";
import {
  addFavoriteWord,
  isFavoriteWord,
  removeFavoriteWord,
} from "@/lib/favorites-storage";

type WordDetailsModalProps = {
  word: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export function WordDetailsModal({
  word,
  isOpen,
  onClose,
}: WordDetailsModalProps) {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const audioUrl = useMemo(() => {
    return entry?.phonetics?.find((phonetic) => phonetic.audio)?.audio;
  }, [entry]);

  useEffect(() => {
    if (!isOpen || !word) {
      return;
    }

    const selectedWord = word;
    let isCurrentRequest = true;

    async function loadWordDetails() {
      setIsLoading(true);
      setError("");
      setEntry(null);

      try {
        const data = await fetchWordDetails(selectedWord);

        if (!isCurrentRequest) {
          return;
        }

        setEntry(data);
        setIsFavorite(isFavoriteWord(data.word));
      } catch (err) {
        if (!isCurrentRequest) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os detalhes."
        );
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    loadWordDetails();

    return () => {
      isCurrentRequest = false;
    };
  }, [isOpen, word]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !word) {
    return null;
  }

  function handlePlayAudio() {
    if (!audioUrl) {
      return;
    }

    const audio = new Audio(audioUrl);

    audio.play().catch(() => {
      setError("Não foi possível reproduzir o áudio desta palavra.");
    });
  }

  function handleToggleFavorite() {
    if (!entry) {
      return;
    }

    if (isFavorite) {
      removeFavoriteWord(entry.word);
      setIsFavorite(false);
      return;
    }

    addFavoriteWord({
      word: entry.word,
      phonetic: entry.phonetic ?? entry.phonetics?.[0]?.text,
      addedAt: new Date().toISOString(),
    });

    setIsFavorite(true);
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes da palavra ${word}`}
    >
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl dark:bg-[#1F0A3D]">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-white/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6A00F4] dark:text-[#5BFF5A]">
              Detalhes
            </p>

            <h2 className="mt-1 text-2xl font-black text-[#6A00F4] dark:text-white">
              {word}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#6A00F4]/20 text-[#6A00F4] transition hover:bg-[#6A00F4]/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            aria-label="Fechar modal"
            title="Fechar"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {isLoading && <WordLoadingState />}

        {!isLoading && error && <WordErrorState message={error} />}

        {!isLoading && !error && entry && (
          <WordDetailsCard
            entry={entry}
            audioUrl={audioUrl}
            isFavorite={isFavorite}
            onPlayAudio={handlePlayAudio}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}