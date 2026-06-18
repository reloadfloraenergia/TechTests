import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/auth/login-form";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
    localStorage.clear();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      })
    );
  });

  it("renderiza os campos de e-mail e senha", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("exibe erro quando tenta enviar sem preencher os campos", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(
      screen.getByText(/informe seu e-mail e senha para continuar/i)
    ).toBeInTheDocument();
  });

  it("exibe erro quando o e-mail não está cadastrado", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "teste@email.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(
      screen.getByText(/e-mail não encontrado/i)
    ).toBeInTheDocument();
  });

  it("redireciona para o dashboard quando o login é válido", async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      "flora_registered_users",
      JSON.stringify([
        {
          name: "Ellen",
          email: "ellen@email.com",
        },
      ])
    );

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "ellen@email.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });
});