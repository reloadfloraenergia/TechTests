import { AppShell } from "@/components/layout/app-shell";
import { FavoritesList } from "@/components/word/favorites-list";

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

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
          Acesse rapidamente os termos que você salvou durante suas pesquisas.
        </p>

        <div className="mt-8">
          <FavoritesList />
        </div>
      </div>
    </AppShell>
  );
}