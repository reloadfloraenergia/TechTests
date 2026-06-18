import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoritesEmptyState } from "@/components/word/favorites-empty-state";

describe("FavoritesEmptyState", () => {
  it("renderiza mensagem de favoritos vazios", () => {
    render(<FavoritesEmptyState />);

    expect(
      screen.getByText(/nenhuma palavra favorita ainda/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/busque uma palavra no dicionário/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /buscar palavras/i })
    ).toHaveAttribute("href", "/dictionary");
  });
});