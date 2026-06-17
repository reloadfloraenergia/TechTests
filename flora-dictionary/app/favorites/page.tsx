import { AppShell } from "@/components/layout/app-shell";

export default function FavoritesPage() {
  return (
    <AppShell>
      <div>
        <p className="mb-4 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-bold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
          Favoritos
        </p>

        <h1 className="text-4xl font-black text-[#6A00F4] dark:text-[#5BFF5A]">
          Palavras favoritas
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-700 dark:text-zinc-200">
          Próximo passo: vamos listar aqui as palavras salvas pelo usuário.
        </p>
      </div>
    </AppShell>
  );
}