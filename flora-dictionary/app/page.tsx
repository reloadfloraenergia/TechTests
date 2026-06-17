import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-[#13002E] dark:text-white">
      <header className="border-b border-white/10 bg-[#6A00F4]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-3xl font-bold text-white">
            <span className="text-[#5BFF5A]">✱</span>
            flora dictionary
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#6A00F4]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-semibold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
            Flora Dictionary
          </p>

          <h1 className="max-w-xl text-5xl font-extrabold tracking-tight text-[#6A00F4] sm:text-6xl">
            Aprenda inglês com busca rápida, favoritos e histórico.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
            Consulte palavras em inglês, veja fonética, definições, exemplos,
            sinônimos e organize seus termos favoritos em uma experiência
            simples, bonita e responsiva.
          </p>

          <p className="mt-5 max-w-xl text-xl font-bold text-[#6A00F4] dark:text-[#5BFF5A]">
            100% online, rápido e com foco em experiência do usuário.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-[#5BFF5A] px-8 py-4 text-center text-lg font-bold text-[#6A00F4] transition hover:brightness-95"
            >
              Começar agora
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-[#6A00F4]/30 px-8 py-4 text-center text-lg font-bold text-[#6A00F4] transition hover:bg-[#6A00F4]/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Entrar
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#6A00F4] to-[#320071] p-8 shadow-2xl">
            <div className="rounded-3xl bg-white p-6 text-zinc-950 shadow-xl dark:bg-[#1F0A3D] dark:text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6A00F4] dark:text-[#5BFF5A]">
                    Palavra do dia
                  </p>
                  <h2 className="mt-1 text-4xl font-extrabold">energy</h2>
                </div>

                <span className="rounded-full bg-[#5BFF5A] px-4 py-2 text-sm font-bold text-[#6A00F4]">
                  favorito
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Fonética
                  </p>
                  <p className="mt-1 text-lg font-semibold">/ˈenərdʒi/</p>
                </div>

                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Definição
                  </p>
                  <p className="mt-1">
                    The power and ability to be physically and mentally active.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#6A00F4] p-4 text-white">
                  <p className="text-sm text-white/70">Exemplo</p>
                  <p className="mt-1 font-medium">
                    Clean energy can transform the future.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-[#5BFF5A] px-6 py-4 font-bold text-[#6A00F4] shadow-xl md:block">
            Busca com debounce
          </div>
        </div>
      </section>
    </main>
  );
}