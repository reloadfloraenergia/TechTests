"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  findRegisteredUserByEmail,
  setCurrentUser,
} from "@/lib/auth-storage";
import { FormError } from "@/components/ui/form-error";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const registeredUser = findRegisteredUserByEmail(email);

    if (!registeredUser) {
      setError("E-mail não encontrado. Verifique os dados ou crie uma conta.");
      return;
    }

    setIsSubmitting(true);

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
        setIsSubmitting(false);
        return;
      }

      setCurrentUser(registeredUser);

      router.push("/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente em instantes.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <FormError message={error} />

      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="voce@email.com"
        autoComplete="email"
      />

      <FormField
        label="Senha"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Digite sua senha"
        autoComplete="current-password"
      />

      <SubmitButton isSubmitting={isSubmitting} loadingText="Entrando...">
        Entrar
      </SubmitButton>
    </form>
  );
}