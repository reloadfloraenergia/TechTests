import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FavoritesList } from "@/components/word/favorites-list";

export default function FavoritesPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Favoritos"
        title="Palavras favoritas"
        description="Acesse rapidamente os termos que você salvou durante suas pesquisas."
      />

      <div className="mt-8">
        <FavoritesList />
      </div>
    </AppShell>
  );
}