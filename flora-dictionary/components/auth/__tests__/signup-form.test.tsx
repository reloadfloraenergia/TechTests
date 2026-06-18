import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "@/components/auth/signup-form";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("SignupForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
    localStorage.clear();
  });

  it("renderiza os campos de cadastro", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /criar minha conta/i })
    ).toBeInTheDocument();
  });

  it("exibe erro quando tenta cadastrar sem preencher os campos", async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    await user.click(screen.getByRole("button", { name: /criar minha conta/i }));

    expect(
      screen.getByText(/preencha todos os campos para continuar/i)
    ).toBeInTheDocument();
  });

  it("exibe erro quando a senha tem menos de 6 caracteres", async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    await user.type(screen.getByLabelText(/nome/i), "Ellen");
    await user.type(screen.getByLabelText(/e-mail/i), "ellen@email.com");
    await user.type(screen.getByLabelText(/senha/i), "123");
    await user.click(screen.getByRole("button", { name: /criar minha conta/i }));

    expect(
      screen.getByText(/a senha precisa ter pelo menos 6 caracteres/i)
    ).toBeInTheDocument();
  });

  it("salva usuário e redireciona para login após cadastro válido", async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    await user.type(screen.getByLabelText(/nome/i), "Ellen");
    await user.type(screen.getByLabelText(/e-mail/i), "ellen@email.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /criar minha conta/i }));

    const storedUsers = JSON.parse(
      localStorage.getItem("flora_registered_users") ?? "[]"
    ) as Array<{ name: string; email: string }>;

    expect(storedUsers).toEqual([
      {
        name: "Ellen",
        email: "ellen@email.com",
      },
    ]);

    await waitFor(
      () => {
        expect(pushMock).toHaveBeenCalledWith("/login");
      },
      {
        timeout: 2000,
      }
    );
  });
});