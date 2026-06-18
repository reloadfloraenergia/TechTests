"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  email: string;
  password: string;
};

const INITIAL_FORM_STATE: FormState = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!email || !password) {
      setError("Informe seu e-mail e senha para continuar.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    const registeredUsersRaw = localStorage.getItem("flora_registered_users");

    if (!registeredUsersRaw) {
      setError("Nenhuma conta encontrada. Crie uma conta antes de entrar.");
      return;
    }

    const registeredUsers = JSON.parse(registeredUsersRaw) as Array<{
      name: string;
      email: string;
    }>;

    const registeredUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === email
    );

    if (!registeredUser) {
      setError("E-mail não encontrado. Verifique os dados ou crie uma conta.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        setError(data.message ?? "Não foi possível realizar o login.");
        return;
      }

      localStorage.setItem("flora_user", JSON.stringify(registeredUser));

      router.push("/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente em instantes.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200"
        >
          {error}
        </div>
      )}

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
          value={form.email}
          onChange={handleChange}
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
          value={form.password}
          onChange={handleChange}
          placeholder="Digite sua senha"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#6A00F4] focus:ring-4 focus:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:text-white dark:focus:border-[#5BFF5A] dark:focus:ring-[#5BFF5A]/10"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#5BFF5A] px-6 py-4 text-lg font-bold text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40"
      >
        Entrar
      </button>
    </form>
  );
}