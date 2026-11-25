import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import { useCarrinho } from "../contexts/CarrinhoContext";

function Detalhe() {
  const { id } = useParams();
  const { adicionar } = useCarrinho();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("/produtos.json")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        return resposta.json();
      })
      .then(setProdutos)
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <main className="container">
        <Carregando />
      </main>
    );
  }

  if (erro) {
    return (
      <main className="container">
        <MensagemErro mensagem={erro} />
      </main>
    );
  }

  const produto = produtos.find((item) => String(item.id) === id);

  if (!produto) {
    return (
      <main className="container">
        <h1>Produto não encontrado</h1>
        <Link to="/">Voltar para o catálogo</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/" className="link-voltar">
        ← Voltar ao catálogo
      </Link>

      <article className="produto-detalhe">
        <h1>{produto.nome}</h1>
        <p className="produto-preco">{produto.preco}</p>

        <dl className="produto-specs">
          <div>
            <dt>Categoria</dt>
            <dd>{produto.categoria}</dd>
          </div>
          <div>
            <dt>Marca</dt>
            <dd>{produto.marca}</dd>
          </div>
          <div>
            <dt>Compatibilidade</dt>
            <dd>{produto.compatibilidade}</dd>
          </div>
        </dl>

        <button type="button" className="botao" onClick={() => adicionar(produto)}>
          Adicionar ao carrinho
        </button>
      </article>
    </main>
  );
}

export default Detalhe;
