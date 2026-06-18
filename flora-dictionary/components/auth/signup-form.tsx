"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRegisteredUser } from "@/lib/auth-storage";
import { FormError } from "@/components/ui/form-error";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  password: "",
};

export function SignupForm() {
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!name || !email || !password) {
      setError("Preencha todos os campos para continuar.");
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

    setIsSubmitting(true);

    const result = createRegisteredUser({
      name,
      email,
    });

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    toast.success("Conta criada com sucesso! Faça login para continuar.");

    setForm(INITIAL_FORM_STATE);

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <FormError message={error} />

      <FormField
        label="Nome"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Seu nome"
        autoComplete="name"
      />

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
        placeholder="Crie uma senha"
        autoComplete="new-password"
      />

      <SubmitButton isSubmitting={isSubmitting} loadingText="Criando conta...">
        Criar minha conta
      </SubmitButton>
    </form>
  );
}