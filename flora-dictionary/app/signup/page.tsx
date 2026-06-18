import { SignupForm } from "@/components/auth/signup-form";
import { AuthPageLayout } from "@/components/layout/auth-page-layout";

export default function SignupPage() {
  return (
    <AuthPageLayout
      badge="Crie sua conta"
      title="Comece a organizar seu vocabulário em inglês."
      description="Cadastre-se para buscar palavras, salvar favoritos e acompanhar seu histórico de pesquisas em uma experiência rápida e responsiva."
      cardTitle="Criar conta"
      cardDescription="Preencha os dados abaixo para continuar."
      footerText="Já tem uma conta?"
      footerLinkText="Entrar"
      footerLinkHref="/login"
    >
      <SignupForm />
    </AuthPageLayout>
  );
}