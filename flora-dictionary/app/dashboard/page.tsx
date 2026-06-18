import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { BookOpen, Clock, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Área logada"
        title="Bem-vinda ao seu painel de vocabulário."
        description="Busque palavras em inglês, visualize definições completas, salve favoritos e acompanhe seu histórico de consultas."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <DashboardCard
          href="/dictionary"
          icon={BookOpen}
          title="Dicionário"
          description="Consulte palavras, veja fonética, definições, exemplos e sinônimos."
          actionLabel="Buscar palavras"
        />

        <DashboardCard
          href="/favorites"
          icon={Star}
          title="Favoritos"
          description="Organize suas palavras preferidas e acesse rapidamente depois."
          actionLabel="Ver favoritos"
        />

        <DashboardCard
          href="/dictionary"
          icon={Clock}
          title="Histórico"
          description="Veja as últimas palavras pesquisadas durante seus estudos."
          variant="highlight"
          actionLabel="Ver pesquisas recentes"
        />
      </div>
    </AppShell>
  );
}