import { Link } from "react-router";
import { useCarrinho } from "../contexts/CarrinhoContext";

function ProdutoCard({ produto }) {
  const { adicionar } = useCarrinho();

  return (
    <article className="produto-card">
      <h3>
        <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
      </h3>
      <p className="produto-marca">{produto.marca}</p>
      <p className="produto-preco">{produto.preco}</p>
      <p className="produto-compat">Compatível com: {produto.compatibilidade}</p>
      <button
        type="button"
        className="botao botao--pequeno"
        onClick={() => adicionar(produto)}
      >
        Adicionar ao carrinho
      </button>
    </article>
  );
}

export default ProdutoCard;
