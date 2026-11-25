import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProdutoCard from "./ProdutoCard";
import { CarrinhoProvider } from "../contexts/CarrinhoContext";

const produtoTeste = {
  id: 1,
  nome: "Teclado Teste",
  categoria: "Teclado",
  marca: "MarcaTeste",
  preco: "R$ 99,90",
  compatibilidade: "PC",
};

function renderizar(ui) {
  return render(
    <MemoryRouter>
      <CarrinhoProvider>{ui}</CarrinhoProvider>
    </MemoryRouter>,
  );
}

describe("ProdutoCard", () => {
  it("mostra o nome, a marca e o preço do produto", () => {
    renderizar(<ProdutoCard produto={produtoTeste} />);

    expect(screen.getByText("Teclado Teste")).toBeInTheDocument();
    expect(screen.getByText("MarcaTeste")).toBeInTheDocument();
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
  });

  it("o link do título aponta pra página de detalhe do produto", () => {
    renderizar(<ProdutoCard produto={produtoTeste} />);

    const link = screen.getByRole("link", { name: "Teclado Teste" });
    expect(link).toHaveAttribute("href", "/produtos/1");
  });
});
