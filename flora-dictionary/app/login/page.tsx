import { LoginForm } from "@/components/auth/login-form";
import { AuthPageLayout } from "@/components/layout/auth-page-layout";

export default function LoginPage() {
  return (
    <AuthPageLayout
      badge="Acesse sua conta"
      title="Continue sua jornada de aprendizado."
      description="Entre para consultar palavras, revisar seu histórico e manter sua lista de favoritos sempre organizada."
      cardTitle="Login"
      cardDescription="Informe seus dados para continuar."
      footerText="Ainda não tem uma conta?"
      footerLinkText="Criar conta"
      footerLinkHref="/signup"
    >
      <LoginForm />
    </AuthPageLayout>
  );
}