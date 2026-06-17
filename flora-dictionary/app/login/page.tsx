import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
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
            Continue sua jornada de aprendizado.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
            Entre para consultar palavras, revisar seu histórico e manter sua
            lista de favoritos sempre organizada.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#6A00F4]/10 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#1F0A3D]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#6A00F4] dark:text-[#5BFF5A]">
              Login
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Informe seus dados para continuar.
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
            Ainda não tem uma conta?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#6A00F4] transition hover:underline dark:text-[#5BFF5A]"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}