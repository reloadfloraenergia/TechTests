export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-zinc-950 transition-colors dark:bg-[#13002E] dark:text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-semibold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
          Dashboard
        </p>

        <h1 className="text-4xl font-extrabold text-[#6A00F4] dark:text-[#5BFF5A]">
          Bem-vinda ao Flora Dictionary
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-700 dark:text-zinc-200">
          Sua conta foi criada com sucesso. Agora vamos montar a busca de
          palavras, favoritos e histórico.
        </p>
      </section>
    </main>
  );
}