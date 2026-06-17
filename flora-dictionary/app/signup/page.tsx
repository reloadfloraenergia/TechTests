import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-[#13002E] dark:text-white">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2">
        <div>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-3xl font-bold text-[#6A00F4] dark:text-white"
          >
            <span className="text-[#5BFF5A]">✱</span>
            flora dictionary
          </Link>

          <h1 className="max-w-xl text-5xl font-extrabold tracking-tight text-[#6A00F4] sm:text-6xl">
            Comece a organizar seu vocabulário em inglês.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
            Cadastre-se para buscar palavras, salvar favoritos e acompanhar seu
            histórico de pesquisas em uma experiência rápida e responsiva.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#6A00F4]/10 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#1F0A3D]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#6A00F4] dark:text-[#5BFF5A]">
              Criar conta
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Preencha os dados abaixo para continuar.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#6A00F4] focus:ring-4 focus:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:text-white dark:focus:border-[#5BFF5A] dark:focus:ring-[#5BFF5A]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="voce@email.com"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#6A00F4] focus:ring-4 focus:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:text-white dark:focus:border-[#5BFF5A] dark:focus:ring-[#5BFF5A]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Crie uma senha"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#6A00F4] focus:ring-4 focus:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:text-white dark:focus:border-[#5BFF5A] dark:focus:ring-[#5BFF5A]/10"
              />
            </div>

            <button
              type="submit" 
              className="w-full rounded-xl bg-[#5BFF5A] px-6 py-4 text-lg font-bold text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40"
            >
              Criar minha conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-bold text-[#6A00F4] transition hover:underline dark:text-[#5BFF5A]"
            >
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}