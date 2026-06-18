import { Loader2 } from "lucide-react";

export function WordLoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[380px] flex-col items-center justify-center text-center"
    >
      <Loader2
        className="animate-spin text-[#6A00F4] dark:text-[#5BFF5A]"
        size={40}
        aria-hidden="true"
      />

      <p className="mt-4 text-lg font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
        Buscando palavra...
      </p>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Consultando a API do dicionário.
      </p>
    </div>
  );
}